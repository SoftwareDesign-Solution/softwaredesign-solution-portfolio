"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { QuoteRequestConfirmedData, quoteRequestConfirmedSchema, sendQuoteRequestEmailSchema } from "@/schemas/quote-request.schema";
import { sendQuoteRequestConfirmationEmail } from "@/services/emails/send-quote-request-confirmation-email";


const inputSchema = z.object({
    id: z.uuid(),
    token: z.string().min(1)
});

type InputData = z.infer<typeof inputSchema>;

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
            notizen AS "nachricht"
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
            CASE WHEN datum_von IS NOT NULL AND datum_bis IS NOT NULL THEN
                jsonb_build_object(
                    'id', 1,
                    'datumVon', datum_von,
                    'datumBis', datum_bis
                )
            ELSE NULL END AS termin,
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
            notizen AS "nachricht"
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

            const emailData = sendQuoteRequestEmailSchema.parse(data);

            // quote-request-notification-email.tsx per E-Mail versenden
            await sendQuoteRequestConfirmationEmail(emailData);

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
    */

    const existingRows = await db`
        SELECT
            jsonb_build_object(
                'id', workshop_id,
                'titel', workshop_titel
            ) AS workshop,
            CASE WHEN datum_von IS NOT NULL AND datum_bis IS NOT NULL THEN
                jsonb_build_object(
                    'id', 1,
                    'datumVon', datum_von,
                    'datumBis', datum_bis
                )
            ELSE NULL END AS termin,
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