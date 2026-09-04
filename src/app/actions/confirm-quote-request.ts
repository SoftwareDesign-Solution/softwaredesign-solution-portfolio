/**
 * @file confirm-quote-request.ts
 * @description Server Action zur Bestätigung einer Angebotsanfrage (Double-Opt-In)
 * über ID + Bestätigungs-Token aus dem E-Mail-Link.
 * @module app/actions/confirm-quote-request
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import {
    type QuoteRequestConfirmedData,
    quoteRequestConfirmedSchema,
    sendQuoteRequestEmailSchema,
} from "@/schemas/quote-request.schema";
import { sendQuoteRequestConfirmationEmail } from "@/services/emails/send-quote-request-confirmation-email";

/** Erwartet Anfrage-ID und Bestätigungs-Token aus dem Query-Parameter des Opt-In-Links. */
const inputSchema = z.object({
    id: z.uuid(),
    token: z
        .string()
        .trim()
        .min(1),
});

type ConfirmQuoteRequestInput = z.output<
    typeof inputSchema
>;

/** Lose typisierte Roh-Zeile aus der DB, bevor sie gegen ein Zod-Schema geparst wird. */
type QuoteRequestDatabaseRow =
    Record<string, unknown>;

/** Ergebnis des Bestätigungsvorgangs für die Anzeige auf der Bestätigungsseite. */
export type ConfirmQuoteRequestResult =
    | {
          data: QuoteRequestConfirmedData;
          status:
              | "confirmed"
              | "already-confirmed";
      }
    | {
          status: "invalid-or-expired";
      };

/**
 * Bestätigt eine Angebotsanfrage (Double-Opt-In) anhand von ID und
 * Bestätigungs-Token und benachrichtigt anschließend das Team per E-Mail.
 * Erkennt drei Fälle: erfolgreich bestätigt, bereits zuvor bestätigt,
 * oder Link ungültig/abgelaufen.
 *
 * @param input - ID und Token aus dem Query-Parameter des E-Mail-Links
 * @returns Ein {@link ConfirmQuoteRequestResult} mit dem erkannten Status
 *          und ggf. den Anfragedaten
 */
export async function confirmQuoteRequest(
    input: ConfirmQuoteRequestInput,
): Promise<ConfirmQuoteRequestResult> {
    const validationResult =
        inputSchema.safeParse(input);

    if (!validationResult.success) {
        return {
            status: "invalid-or-expired",
        };
    }

    const { id, token } = validationResult.data;

    const confirmedRow =
        await confirmQuoteRequestInDatabase(
            id,
            token,
        );

    if (confirmedRow) {
        const data =
            quoteRequestConfirmedSchema.parse(
                confirmedRow,
            );

        await sendConfirmationEmailSafely(data);

        return {
            data,
            status: "confirmed",
        };
    }

    const existingRow =
        await getExistingQuoteRequest(
            id,
            token,
        );

    if (existingRow?.confirmedAt) {
        const data =
            quoteRequestConfirmedSchema.parse(
                existingRow,
            );

        return {
            data,
            status: "already-confirmed",
        };
    }

    return {
        status: "invalid-or-expired",
    };
}

/**
 * Bestätigt die Angebotsanfrage in der DB — aber nur, wenn sie noch nicht
 * bestätigt und die Gültigkeit noch nicht abgelaufen ist (sonst betrifft das
 * UPDATE keine Zeile). Baut dabei Workshop/Termin/Adressen/Ansprechpartner
 * als verschachteltes JSON zusammen, passend zu {@link QuoteRequestConfirmedData}.
 *
 * @param id - ID der Angebotsanfrage
 * @param token - Der zugehörige Bestätigungs-Token
 * @returns Die aktualisierte Zeile bei Erfolg, sonst `null`
 */
async function confirmQuoteRequestInDatabase(
    id: string,
    token: string,
): Promise<QuoteRequestDatabaseRow | null> {
    const [confirmedRow] = await db`
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

            CASE
                WHEN datum_von IS NOT NULL
                 AND datum_bis IS NOT NULL
                THEN jsonb_build_object(
                    'id', 1,
                    'datumVon', datum_von,
                    'datumBis', datum_bis
                )
                ELSE NULL
            END AS termin,

            jsonb_build_object(
                'firma', firma,
                'strasse', strasse,
                'plz', plz,
                'ort', ort
            ) AS adresse,

            website AS webseite,

            jsonb_build_object(
                'anrede', anrede,
                'vorname', vorname,
                'nachname', nachname,
                'email', email,
                'telefon', telefon
            ) AS ansprechpartner,

            (
                NULLIF(TRIM(rechnung_firma), '') IS NOT NULL
                OR NULLIF(TRIM(rechnung_strasse), '') IS NOT NULL
                OR NULLIF(TRIM(rechnung_plz), '') IS NOT NULL
                OR NULLIF(TRIM(rechnung_ort), '') IS NOT NULL
            ) AS "abweichendeRechnungsadresse",

            CASE
                WHEN NULLIF(TRIM(rechnung_firma), '') IS NOT NULL
                    OR NULLIF(TRIM(rechnung_strasse), '') IS NOT NULL
                    OR NULLIF(TRIM(rechnung_plz), '') IS NOT NULL
                    OR NULLIF(TRIM(rechnung_ort), '') IS NOT NULL
                THEN jsonb_build_object(
                    'firma',
                        COALESCE(rechnung_firma, ''),
                    'strasse',
                        COALESCE(rechnung_strasse, ''),
                    'plz',
                        COALESCE(rechnung_plz, ''),
                    'ort',
                        COALESCE(rechnung_ort, '')
                )
                ELSE NULL
            END AS rechnungsadresse,

            CAST(
                teilnehmerzahl AS INTEGER
            ) AS teilnehmerzahl,

            notizen AS nachricht,

            confirmed_at AS "confirmedAt"
    `;

    return confirmedRow
        ? confirmedRow as QuoteRequestDatabaseRow
        : null;
}

/**
 * Lädt die Angebotsanfrage unabhängig vom Bestätigungsstatus, um zwischen
 * "bereits bestätigt" und "ungültig/abgelaufen" unterscheiden zu können.
 *
 * @param id - ID der Angebotsanfrage
 * @param token - Der zugehörige Bestätigungs-Token
 * @returns Die gefundene Zeile oder `null`, falls ID/Token nicht zusammenpassen
 */
async function getExistingQuoteRequest(
    id: string,
    token: string,
): Promise<QuoteRequestDatabaseRow | null> {
    const [existingRow] = await db`
        SELECT
            jsonb_build_object(
                'id', workshop_id,
                'titel', workshop_titel
            ) AS workshop,

            CASE
                WHEN datum_von IS NOT NULL
                 AND datum_bis IS NOT NULL
                THEN jsonb_build_object(
                    'id', 1,
                    'datumVon', datum_von,
                    'datumBis', datum_bis
                )
                ELSE NULL
            END AS termin,

            jsonb_build_object(
                'firma', firma,
                'strasse', strasse,
                'plz', plz,
                'ort', ort
            ) AS adresse,

            website AS webseite,

            jsonb_build_object(
                'anrede', anrede,
                'vorname', vorname,
                'nachname', nachname,
                'email', email,
                'telefon', telefon
            ) AS ansprechpartner,

            (
                NULLIF(TRIM(rechnung_firma), '') IS NOT NULL
                OR NULLIF(TRIM(rechnung_strasse), '') IS NOT NULL
                OR NULLIF(TRIM(rechnung_plz), '') IS NOT NULL
                OR NULLIF(TRIM(rechnung_ort), '') IS NOT NULL
            ) AS "abweichendeRechnungsadresse",

            CASE
                WHEN NULLIF(TRIM(rechnung_firma), '') IS NOT NULL
                    OR NULLIF(TRIM(rechnung_strasse), '') IS NOT NULL
                    OR NULLIF(TRIM(rechnung_plz), '') IS NOT NULL
                    OR NULLIF(TRIM(rechnung_ort), '') IS NOT NULL
                THEN jsonb_build_object(
                    'firma',
                        COALESCE(rechnung_firma, ''),
                    'strasse',
                        COALESCE(rechnung_strasse, ''),
                    'plz',
                        COALESCE(rechnung_plz, ''),
                    'ort',
                        COALESCE(rechnung_ort, '')
                )
                ELSE NULL
            END AS rechnungsadresse,

            CAST(
                teilnehmerzahl AS INTEGER
            ) AS teilnehmerzahl,

            notizen AS nachricht,

            confirmed_at AS "confirmedAt"
        FROM angebotsanfrage
        WHERE id = ${id}
          AND confirmation_token = ${token}
        LIMIT 1
    `;

    return existingRow
        ? existingRow as QuoteRequestDatabaseRow
        : null;
}

/**
 * Versendet die interne Benachrichtigungs-E-Mail und fängt dabei jeden Fehler ab,
 * statt ihn zu werfen — die Bestätigung selbst wurde bereits in der DB gespeichert
 * und soll dadurch nicht scheitern.
 *
 * @param data - Die bestätigten Angebotsanfrage-Daten
 */
async function sendConfirmationEmailSafely(
    data: QuoteRequestConfirmedData,
): Promise<void> {
    try {
        const emailData =
            sendQuoteRequestEmailSchema.parse(data);

        await sendQuoteRequestConfirmationEmail(
            emailData,
        );
    } catch (error: unknown) {
        console.error(
            "Quote request was confirmed, but its confirmation email could not be sent.",
            error,
        );
    }
}