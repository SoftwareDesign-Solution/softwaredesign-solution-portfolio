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
          status: "unsubscribed";
          data: NotificationSignupConfirmationData | null;
      }
    | {
          status: "already-unsubscribed";
          data: NotificationSignupConfirmationData | null;
      }
    | {
          status: "invalid-or-expired";
      };

export async function unsubscribeNotificationSignup(props: InputData): Promise<ConfirmationResult | null> {

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
        SET unsubscribed_at = NOW()
        WHERE id = ${id}
            AND unsubscribe_token = ${token}
            AND unsubscribed_at IS NULL
        RETURNING 
            id,
            workshop_titel AS "workshopTitel",
            vorname,
            nachname,
            email,
            unsubscribe_token AS "unsubscribeToken"
    `;

    if (confirmedRows.length > 0) {

        return {
            status: "unsubscribed",
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
            email,
            unsubscribed_at
        FROM workshop_benachrichtigung
        WHERE id = ${id}
          AND unsubscribe_token = ${token}
        LIMIT 1
    `;

    if (existingRows.length > 0 && existingRows[0]?.unsubscribed_at) {
        return {
            status: "already-unsubscribed",
            data: existingRows[0] as NotificationSignupConfirmationData,
        };
    }

    return {
        status: "invalid-or-expired"
    };

};