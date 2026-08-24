"use server";

import { getClientIp } from "nextjs-turnstile";

import { db } from "@/lib/db";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { CreateBookingData, createBookingSchema, sendBookingConfirmationEmailSchema } from "@/schemas/booking.schema";
import { sendBookingConfirmationEmail } from "@/services/emails/send-booking-confirmation-email";


export interface CreateBookingResult {
    bookingId: string;
    emailId?: string;
    confirmationEmailSent: boolean;
    error?: string;
}

export async function createBooking(data: CreateBookingData): Promise<CreateBookingResult> {
    
    // 1. Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist
    const validationResult = createBookingSchema.safeParse(data);

    if (!validationResult.success) {
        console.error(
            "Ungültige Buchungsdaten",
            validationResult.error.flatten()
        );

        throw new Error(
            "Die eingegebenen Buchungsdaten sind ungültig."
        );
    }

    const bookingData = validationResult.data;


    // 2. Turnstile-Verifizierung — IMMER zuerst, vor jedem DB-Zugriff.
    const isHuman = await verifyTurnstileToken(
        bookingData.turnstile.token
    );

    if (!isHuman) {
        throw new Error(
            "Sicherheitsabfrage fehlgeschlagen. Bitte versuchen Sie es erneut."
        );
    }


    // Optional: Konsistenz zwischen angegebener Anzahl und
    // tatsächlich erfassten Teilnehmern prüfen.
    if (
        bookingData.teilnehmer.length !==
        bookingData.teilnehmerzahl
    ) {
        throw new Error(
            "Die Teilnehmerzahl stimmt nicht mit den erfassten Teilnehmern überein."
        );
    }


    let ipAddress: string | null = null;

    try {
        ipAddress = (await getClientIp()) ?? null;
    } catch (error) {
        console.error("Fehler beim Ermitteln der Client-IP-Adresse:", error);
    }
    
    
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
            t.datum_von AS "datumVon",
            t.datum_bis AS "datumBis"
        FROM workshop w
        INNER JOIN termin t ON t.workshop_id = w.id
        WHERE w.id = ${bookingData.workshop.id}
            AND t.id = ${bookingData.termin?.id}
            AND w.active = TRUE
            AND t.active = TRUE
            AND t.status <> 'ausgebucht'
        LIMIT 1
    `;

    console.log("Workshop und Termin geladen:", workshopTermin);

    if (!workshopTermin) {
        throw new Error(
            "Der ausgewählte Workshop oder Termin ist nicht verfügbar."
        );
    }

    const gesamtbetrag = 
        Number(workshopTermin.preis) * Number(bookingData.teilnehmerzahl);

        
    let bookingId: string;

    // 3. DB-Insert + E-Mail-Versand — in try/catch, aber OHNE redirect() darin!
    //    redirect() wirft intern einen speziellen Error (NEXT_REDIRECT), der sonst
    //    versehentlich vom catch-Block abgefangen würde.
    try {
        
        const [booking] = await db`
            INSERT INTO buchung (
                workshop_id,
                workshop_titel,
                termin_id,
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
                teilnehmer,
                rechnung_firma,
                rechnung_strasse,
                rechnung_plz,
                rechnung_ort,
                notizen,
                preis,
                gesamtpreis,
                ip_adresse
            )
            VALUES (
                ${workshopTermin.workshop_id},
                ${workshopTermin.workshop_titel},
                ${workshopTermin.termin_id},
                ${workshopTermin.datumVon},
                ${workshopTermin.datumBis},
                ${bookingData.teilnehmerzahl},
                ${bookingData.adresse.firma},
                ${bookingData.adresse.strasse},
                ${bookingData.adresse.plz},
                ${bookingData.adresse.ort},
                ${bookingData.webseite ?? null},
                ${bookingData.ansprechpartner.anrede},
                ${bookingData.ansprechpartner.vorname},
                ${bookingData.ansprechpartner.nachname},
                ${bookingData.ansprechpartner.email},
                ${bookingData.ansprechpartner.telefon ?? null},
                ${JSON.stringify(bookingData.teilnehmer)},
                ${bookingData.rechnungsadresse?.firma ?? null},
                ${bookingData.rechnungsadresse?.strasse ?? null},
                ${bookingData.rechnungsadresse?.plz ?? null},
                ${bookingData.rechnungsadresse?.ort ?? null},
                ${bookingData.nachricht ?? null},
                ${workshopTermin.preis},
                ${gesamtbetrag},
                ${ipAddress ?? null} -- TODO: IP-Adresse aus Request-Context ermitteln
            )
            RETURNING id;
        `;

        bookingId = String(booking.id);
        
    } catch (error) {
        throw new Error("Fehler beim Erstellen der Buchung: " + (error as Error).message);
    }


    /*
     * Ab hier ist die Buchung definitiv gespeichert.
     *
     * Ein E-Mail-Fehler darf deshalb nicht mehr dazu führen,
     * dass der Client die gesamte Buchung als fehlgeschlagen
     * behandelt.
     */
    try {

        const emailData = sendBookingConfirmationEmailSchema.parse({
            ...bookingData,
            workshop: {
                id: workshopTermin.workshop_id,
                titel: workshopTermin.workshop_titel,
            },
            termin: {
                id: workshopTermin.id,
                datumVon: String(workshopTermin.datumVon),
                datumBis: String(workshopTermin.datumBis),
            },
            salutation: `Hallo ${bookingData.ansprechpartner.vorname}`,
            gesamtpreis: gesamtbetrag
        })

        // Buchungsbestätigung per E-Mail versenden
        const emailId = await sendBookingConfirmationEmail(emailData);

        return {
            bookingId,
            emailId,
            confirmationEmailSent: true,
        };

    } catch (error) {
        
        return {
            bookingId,
            error: "Fehler beim Versenden der Bestätigungs-E-Mail: " + (error as Error).message,
            confirmationEmailSent: false,
        };

    }

};