"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { sendQuoteRequestConfirmationEmail } from "@/services/emails/send-quote-request-confirmation-email";
import { QuoteRequestConfirmedData, quoteRequestConfirmedSchema, sendQuoteRequestEmailSchema } from "@/schemas/quote-request.schema";

const inputSchema = z.object({
    id: z.uuid(),
    token: z.string().min(1)
});

type InputData = z.infer<typeof inputSchema>;

/*
export interface QuoteRequestConfirmationData {
    workshopTitel: string;
    datumVon: string;
    datumBis: string;
    firma: string;
    vorname: string;
    nachname: string;
    email: string;
    teilnehmerzahl: number;
}
*/

export type ConfirmationResult =
    | {
          status: "confirmed";
          data: QuoteRequestConfirmedData | null;
      }
    | {
          status: "already-confirmed";
          data: QuoteRequestConfirmedData | null;
      }
    | {
          status: "invalid-or-expired";
      };

export async function confirmQuoteRequest(props: InputData): Promise<ConfirmationResult | null> {

    const validationResult = inputSchema.safeParse(props);

    if (!validationResult.success) {
        return {
            status: "invalid-or-expired"
        };
    }

    const { id, token } = validationResult.data;

    // 1. Angebotsanfrage anhand der ID und des Tokens bestätigen

    /*
    const confirmedRows = await db`
        UPDATE angebotsanfrage
        SET confirmed_at = NOW()
        WHERE id = ${id}
          AND confirmation_token = ${token}
          AND confirmed_at IS NULL
          AND confirmation_expires_at > NOW()
        RETURNING 
            workshop_id,
            workshop_titel,
            datum_von,
            datum_bis,
            firma,
            vorname,
            nachname,
            email,
            teilnehmerzahl,
            notizen
    `;
    */

    const confirmedRows = await db`
        UPDATE angebotsanfrage
        SET confirmed_at = NOW()
        WHERE id = ${id}
          AND confirmation_token = ${token}
          AND confirmed_at IS NULL
          AND confirmation_expires_at > NOW()
        RETURNING 
            jsonb_build_object(
                'id', workshop_id,
                'titel', workshop_titel
            ) AS workshop,
            jsonb_build_object(
                'id', 1,
                'datumVon', datum_von,
                'datumBis', datum_bis
            ) AS termin,
            jsonb_build_object(
                'firma', firma,
                'strasse', strasse,
                'plz', plz,
                'ort', ort
            ) AS adresse,
            website,
            jsonb_build_object(
                'anrede', anrede,
                'vorname', vorname,
                'nachname', nachname,
                'email', email,
                'telefon', telefon
            ) AS ansprechpartner,
            jsonb_build_object(
                'firma', COALESCE(rechnung_firma, ''),
                'strasse', COALESCE(rechnung_strasse, ''),
                'plz', COALESCE(rechnung_plz, ''),
                'ort', COALESCE(rechnung_ort, '')
            ) AS rechnungsadresse,
            CAST(teilnehmerzahl AS INTEGER) AS teilnehmerzahl,
            notizen
    `;

    if (confirmedRows.length > 0) {

        const confirmedRow = confirmedRows[0];

        const data = quoteRequestConfirmedSchema.parse(confirmedRow);
        
        /*
         * Ab hier ist die Angebotsanfrage definitiv bestätigt.
         *
         * Ein E-Mail-Fehler darf deshalb nicht mehr dazu führen,
         * dass der Client die gesamte Buchung als fehlgeschlagen
         * behandelt.
         */
        try {

            /*
            const emailData = sendQuoteRequestEmailSchema.parse({
                workshop: {
                    id: confirmedRow.workshop.id,
                    titel: confirmedRow.workshop.titel,
                },
                termin: {
                    id: 1,
                    datumVon: String(confirmedRow.termin.datumVon),
                    datumBis: String(confirmedRow.termin.datumBis),
                },
                teilnehmerzahl: Number(confirmedRow.teilnehmerzahl),
                adresse: {
                    firma: confirmedRow.adresse.firma,
                    strasse: confirmedRow.adresse.strasse,
                    plz: confirmedRow.adresse.plz,
                    ort: confirmedRow.adresse.ort
                },
                webseite: confirmedRow.webseite || "",
                ansprechpartner: {
                    anrede: confirmedRow.ansprechpartner.anrede,
                    vorname: confirmedRow.ansprechpartner.vorname,
                    nachname: confirmedRow.ansprechpartner.nachname,
                    email: confirmedRow.ansprechpartner.email,
                    telefon: confirmedRow.ansprechpartner.telefon,
                },
                rechnungsadresse: {
                    firma: confirmedRow.rechnungsadresse.firma || "",
                    strasse: confirmedRow.rechnungsadresse.strasse || "",
                    plz: confirmedRow.rechnungsadresse.plz || "",
                    ort: confirmedRow.rechnungsadresse.ort || ""
                },
                notizen: confirmedRow.notizen || "",
                salutation: `Sehr geehrte${confirmedRow.ansprechpartner.anrede === 'Herr' ? 'r Herr' : ' Frau'} ${confirmedRow.ansprechpartner.nachname},`,
            });
            */

            const emailData = sendQuoteRequestEmailSchema.parse(data);

            // quote-request-notification-email.tsx per E-Mail versenden
            const response = await sendQuoteRequestConfirmationEmail(emailData);

            /*
            const response = await sendQuoteRequestConfirmationEmail({
                workshopTitel: confirmedRows[0].workshopTitel,
                termin: {
                    datumVon: confirmedRows[0].datumVon,
                    datumBis: confirmedRows[0].datumBis,
                },
                teilnehmerzahl: confirmedRows[0].teilnehmerzahl,
                firma: confirmedRows[0].firma,
                name: `${confirmedRows[0].vorname} ${confirmedRows[0].nachname}`,
                email: confirmedRows[0].email,
                nachricht: confirmedRows[0].notizen || ""
            });
            */

        } catch (error) {
            console.error("Fehler beim Versenden der Bestätigungs-E-Mail: " + (error as Error).message);
        }

        return {
            status: "confirmed",
            data: data
        };

    }

    // Prüfen, ob der Link zu einer bereits bestätigten Anfrage gehört
    /*
    const existingRows = await db`
        SELECT
            id,
            workshop_titel AS "workshopTitel",
            datum_von AS "datumVon",
            datum_bis AS "datumBis",
            firma,
            vorname,
            nachname,
            email,
            teilnehmerzahl,
            confirmed_at
        FROM angebotsanfrage
        WHERE id = ${id}
          AND confirmation_token = ${token}
        LIMIT 1
    `;
    */

    const existingRows = await db`
        SELECT
            jsonb_build_object(
                'id', workshop_id,
                'titel', workshop_titel
            ) AS workshop,
            jsonb_build_object(
                'id', 1,
                'datumVon', datum_von,
                'datumBis', datum_bis
            ) AS termin,
            jsonb_build_object(
                'firma', firma,
                'strasse', strasse,
                'plz', plz,
                'ort', ort
            ) AS adresse,
            website,
            jsonb_build_object(
                'anrede', anrede,
                'vorname', vorname,
                'nachname', nachname,
                'email', email,
                'telefon', telefon
            ) AS ansprechpartner,
            jsonb_build_object(
                'firma', COALESCE(rechnung_firma, ''),
                'strasse', COALESCE(rechnung_strasse, ''),
                'plz', COALESCE(rechnung_plz, ''),
                'ort', COALESCE(rechnung_ort, '')
            ) AS rechnungsadresse,
            CAST(teilnehmerzahl AS INTEGER) AS teilnehmerzahl,
            notizen,
            confirmed_at
        FROM angebotsanfrage
        WHERE id = ${id}
          AND confirmation_token = ${token}
        LIMIT 1
    `;

    if (existingRows.length > 0 && existingRows[0]?.confirmed_at) {

        const data = quoteRequestConfirmedSchema.parse(existingRows[0]);
        
        return {
            status: "already-confirmed",
            data: data,
        };
    }

    return {
        status: "invalid-or-expired"
    };

}