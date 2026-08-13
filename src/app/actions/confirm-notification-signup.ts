"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const inputSchema = z.object({
    id: z.uuid(),
    token: z.string().min(1)
});

type InputData = z.infer<typeof inputSchema>;

interface NotificationSignupConfirmationData {
    workshopTitel: string;
    vorname: string;
    nachname: string;
    email: string;
}

export type ConfirmationResult =
    | {
          status: "confirmed";
          data: NotificationSignupConfirmationData | null;
      }
    | {
          status: "already-confirmed";
          data: NotificationSignupConfirmationData | null;
      }
    | {
          status: "invalid-or-expired";
      };

export async function confirmNotificationSignup(props: InputData): Promise<ConfirmationResult | null> {

    const validationResult = inputSchema.safeParse(props);

    if (!validationResult.success) {
        return {
            status: "invalid-or-expired"
        };
    }

    const { id, token } = validationResult.data;

    // Noch nicht bestätigte und nicht abgelaufene Angebotsanfragen bestätigen
    const confirmedRows = await db`
        UPDATE workshop_benachrichtigung
        SET confirmed_at = NOW()
        WHERE id = ${id}
            AND confirmation_token = ${token}
            AND confirmed_at IS NULL
            AND confirmation_expires_at > NOW()
        RETURNING 
            workshop_titel AS "workshopTitel",
            vorname,
            nachname,
            email
    `;

    if (confirmedRows.length > 0) {
        return {
            status: "confirmed",
            data: confirmedRows[0] as NotificationSignupConfirmationData
        };
    }

    // Prüfen, ob der Link zu einer bereits bestätigten Anfrage gehört
    const existingRows = await db`
        SELECT
            id,
            workshop_titel AS "workshopTitel",
            vorname,
            nachname,
            email
        FROM workshop_benachrichtigung
        WHERE id = ${id}
          AND confirmation_token = ${token}
        LIMIT 1
    `;

    if (existingRows.length > 0 && existingRows[0]?.confirmed_at) {
        return {
            status: "already-confirmed",
            data: existingRows[0] as NotificationSignupConfirmationData,
        };
    }

    return {
        status: "invalid-or-expired"
    };

};