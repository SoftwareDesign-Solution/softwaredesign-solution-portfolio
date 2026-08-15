"use server";

import { db } from "@/lib/db";
import { verifyTurnstileToken } from "@/lib/turnstile";
//import { QuoteRequestData, quoteRequestSchema } from "@/schemas/forms/quote-request.schema";
import { getClientIp } from "nextjs-turnstile";
import { generateSecureToken } from "@/utils/generate-secure-token";
import { type CreateQuoteRequestData, createQuoteRequestSchema, sendQuoteRequestOptInEmailSchema } from "@/schemas/quote-request.schema";
import { sendQuoteRequestOptInEmail } from "@/services/emails/send-quote-request-optin-email";
export interface CreateQuoteRequestResult {
    quoteRequestId: string;
    emailId?: string;
    confirmationEmailSent: boolean;
}

export async function createQuoteRequest(data: CreateQuoteRequestData): Promise<CreateQuoteRequestResult> {
    
    // 1. Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist
    const validationResult = createQuoteRequestSchema.safeParse(data);

    if (!validationResult.success) {
        console.error(
            "Ungültige Angebotsanfragedaten",
            validationResult.error.flatten()
        );

        throw new Error(
            "Die eingegebenen Angebotsanfragedaten sind ungültig."
        );
    }


    const quoteRequestData = validationResult.data;


    // 2. Turnstile-Verifizierung — IMMER zuerst, vor jedem DB-Zugriff.
    const isHuman = await verifyTurnstileToken(
        quoteRequestData.turnstile.token
    );

    if (!isHuman) {
        throw new Error(
            "Sicherheitsabfrage fehlgeschlagen. Bitte versuchen Sie es erneut."
        );
    }


    let ipAddress: string | null = null;

    try {
        ipAddress = (await getClientIp()) ?? null;
    } catch (error) {
        console.error("Fehler beim Ermitteln der Client-IP-Adresse:", error);
    }

    const confirmationToken = generateSecureToken();

    /*
     * Workshop, Termin und Preis anhand der IDs serverseitig laden.
     * Idealerweise liefert die Abfrage nur aktive und buchbare Termine.
     */
    const [workshopTermin] = await db`
        SELECT
            w.id AS workshop_id,
            w.titel AS workshop_titel,
            w.preis,
            t.id AS termin_id,
            t.datum_von,
            t.datum_bis
        FROM workshop w
        INNER JOIN termin t ON t.workshop_id = w.id
        WHERE w.id = ${quoteRequestData.workshop.id}
            AND t.id = ${quoteRequestData.termin?.id}
            AND w.active = TRUE
            AND t.active = TRUE
            AND t.status <> 'ausgebucht'
        LIMIT 1
    `;

    if (!workshopTermin) {
        throw new Error(
            "Der ausgewählte Workshop oder Termin ist nicht verfügbar."
        );
    }

    let quoteRequestId: string;

    // 3. DB-Insert + E-Mail-Versand — in try/catch, aber OHNE redirect() darin!
    //    redirect() wirft intern einen speziellen Error (NEXT_REDIRECT), der sonst
    //    versehentlich vom catch-Block abgefangen würde.
    try {

        const gesamtbetrag = 
            Number(workshopTermin.preis) * Number(quoteRequestData.teilnehmerzahl);

        const [quoteRequest] = await db`
            INSERT INTO angebotsanfrage (
                workshop_id,
                workshop_titel,
                datum_von,
                datum_bis,
                teilnehmerzahl,
                firma,
                strasse,
                plz,
                ort,
                website,
                anrede,
                vorname,
                nachname,
                email,
                telefon,
                rechnung_firma,
                rechnung_strasse,
                rechnung_plz,
                rechnung_ort,
                notizen,
                preis,
                gesamtpreis,
                ip_adresse,
                confirmation_token,
                confirmation_expires_at
            )
            VALUES (
                ${workshopTermin.workshop_id},
                ${workshopTermin.workshop_titel},
                ${workshopTermin.datum_von},
                ${workshopTermin.datum_bis},
                ${quoteRequestData.teilnehmerzahl},
                ${quoteRequestData.adresse.firma},
                ${quoteRequestData.adresse.strasse},
                ${quoteRequestData.adresse.plz},
                ${quoteRequestData.adresse.ort},
                ${quoteRequestData.webseite ?? null},
                ${quoteRequestData.ansprechpartner.anrede},
                ${quoteRequestData.ansprechpartner.vorname},
                ${quoteRequestData.ansprechpartner.nachname},
                ${quoteRequestData.ansprechpartner.email},
                ${quoteRequestData.ansprechpartner.telefon ?? null},
                ${quoteRequestData.rechnungsadresse?.firma ?? null},
                ${quoteRequestData.rechnungsadresse?.strasse ?? null},
                ${quoteRequestData.rechnungsadresse?.plz ?? null},
                ${quoteRequestData.rechnungsadresse?.ort ?? null},
                ${quoteRequestData.nachricht ?? null},
                ${workshopTermin.preis},
                ${gesamtbetrag},
                ${ipAddress ?? null}, -- TODO: IP-Adresse aus Request-Context ermitteln
                ${confirmationToken},
                now() + interval '3 DAY' -- confirmation_expires_at
            )
            RETURNING id;
        `;
        
        quoteRequestId = String(quoteRequest.id);

    } catch (error) {
        throw new Error("Fehler beim Erstellen der Angebotsanfrage: " + (error as Error).message);
    }

    /*
     * Ab hier ist die Buchung definitiv gespeichert.
     *
     * Ein E-Mail-Fehler darf deshalb nicht mehr dazu führen,
     * dass der Client die gesamte Buchung als fehlgeschlagen
     * behandelt.
     */
    try {

        console.log("QuoteRequestData:", quoteRequestData);
        console.log("WorkshopTermin:", workshopTermin);

        const emailData = sendQuoteRequestOptInEmailSchema.parse({
            ...quoteRequestData,
            workshop: {
                id: workshopTermin.workshop_id,
                titel: workshopTermin.workshop_titel,
            },
            termin: {
                id: workshopTermin.termin_id,
                datumVon: String(workshopTermin.datum_von),
                datumBis: String(workshopTermin.datum_bis),
            },
            salutation: `Sehr geehrte${quoteRequestData.ansprechpartner.anrede === 'Herr' ? 'r Herr' : ' Frau'} ${quoteRequestData.ansprechpartner.nachname},`,
            confirmationLink: `${process.env.NEXT_PUBLIC_BASE_URL}/offer-requests/${quoteRequestId}/confirm?token=${confirmationToken}`,
        });

        console.log("EmailData:", emailData);

        
        // Benachrichtigung mit Bestätigungslink per E-Mail versenden
        // quote-request-optin-email.tsx per E-Mail versenden
        /*
        const response = await sendQuoteRequestOptInEmail({
            workshopTitel: workshopTermin.workshop_titel,
            termin: {
                datumVon: workshopTermin.datum_von,
                datumBis: workshopTermin.datum_bis,
            },
            salutation: `${quoteRequestData.ansprechpartner.anrede} ${quoteRequestData.ansprechpartner.nachname}`,
            email: quoteRequestData.ansprechpartner.email,
            firma: quoteRequestData.adresse.firma,
            teilnehmerzahl: quoteRequestData.teilnehmerzahl,
            confirmationLink: `${process.env.NEXT_PUBLIC_BASE_URL}/offer-requests/${quoteRequestId}/confirm?token=${confirmationToken}`,
        });
        */
       
        const response = await sendQuoteRequestOptInEmail(emailData);

        return {
            quoteRequestId,
            emailId: response,
            confirmationEmailSent: true,
        };

    } catch (error) {

        throw new Error("Fehler beim Versenden der Bestätigungs-E-Mail: " + (error as Error).message);
        
        return {
            quoteRequestId,
            confirmationEmailSent: false,
        };

    }

}