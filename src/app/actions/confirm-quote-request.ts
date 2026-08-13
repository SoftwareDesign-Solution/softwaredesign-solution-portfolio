"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const inputSchema = z.object({
    id: z.uuid(),
    token: z.string().min(1)
});

type InputData = z.infer<typeof inputSchema>;

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

export type ConfirmationResult =
    | {
          status: "confirmed";
          data: QuoteRequestConfirmationData | null;
      }
    | {
          status: "already-confirmed";
          data: QuoteRequestConfirmationData | null;
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

    // Noch nicht bestätigte und nicht abgelaufene Angebotsanfragen bestätigen
    const confirmedRows = await db`
        UPDATE angebotsanfrage
        SET confirmed_at = NOW()
        WHERE id = ${id}
          AND confirmation_token = ${token}
          AND confirmed_at IS NULL
          AND confirmation_expires_at > NOW()
        RETURNING 
            workshop_titel AS "workshopTitel",
            datum_von AS "datumVon",
            datum_bis AS "datumBis",
            firma,
            vorname,
            nachname,
            email,
            teilnehmerzahl
    `;

    if (confirmedRows.length > 0) {
        return {
            status: "confirmed",
            data: confirmedRows[0] as QuoteRequestConfirmationData
        };
    }

    // Prüfen, ob der Link zu einer bereits bestätigten Anfrage gehört
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
            teilnehmerzahl
        FROM angebotsanfrage
        WHERE id = ${id}
          AND confirmation_token = ${token}
        LIMIT 1
    `;

    if (existingRows.length > 0 && existingRows[0]?.confirmed_at) {
        return {
            status: "already-confirmed",
            data: existingRows[0] as QuoteRequestConfirmationData,
        };
    }

    return {
        status: "invalid-or-expired"
    };

}