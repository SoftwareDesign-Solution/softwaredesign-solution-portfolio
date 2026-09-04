"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import {
    type QuoteRequestConfirmedData,
    quoteRequestConfirmedSchema,
    sendQuoteRequestEmailSchema,
} from "@/schemas/quote-request.schema";
import { sendQuoteRequestConfirmationEmail } from "@/services/emails/send-quote-request-confirmation-email";

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

type QuoteRequestDatabaseRow =
    Record<string, unknown>;

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