"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { sendNotificationSignupConfirmedEmailSchema } from "@/schemas/notification-signup.schema";
import { sendNotificationSignupConfirmedEmail } from "@/services/emails/send-notification-signup-confirmed-email";


const inputSchema = z.object({
    id: z.uuid(),
    token: z.string().min(1)
});

type InputData = z.infer<typeof inputSchema>;

interface NotificationSignupConfirmationData {
    workshop: {
        id: string;
        titel: string;
    };
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
            id,
            jsonb_build_object(
                'id', workshop_id,
                'titel', workshop_titel
            ) AS workshop,
            vorname,
            nachname,
            email,
            unsubscribe_token AS "unsubscribeToken"
    `;

    if (confirmedRows.length > 0) {

        const confirmedRow = confirmedRows[0];

        /*
         * Ab hier ist die Benachrichtigung definitiv aktiviert.
         *
         * Ein E-Mail-Fehler darf deshalb nicht mehr dazu führen,
         * dass der Client die gesamte Buchung als fehlgeschlagen
         * behandelt.
         */
        try {

            const emailData = sendNotificationSignupConfirmedEmailSchema.parse({
                ...confirmedRow,
                unsubscribeLink: `http://localhost:3000/notifications/${confirmedRow.id}/unsubscribe?token=${confirmedRow.unsubscribeToken}`
            });

            // notification-signup-confirmed-email.tsx per E-Mail versenden
            await sendNotificationSignupConfirmedEmail(emailData);

        } catch (error) {
            console.error("Fehler beim Versenden der Bestätigungs-E-Mail: " + (error as Error).message);
        }

        return {
            status: "confirmed",
            data: confirmedRows[0] as NotificationSignupConfirmationData
        };
    }

    // Prüfen, ob der Link zu einer bereits bestätigten Anfrage gehört
    const existingRows = await db`
        SELECT
            id,
            jsonb_build_object(
                'id', workshop_id,
                'titel', workshop_titel
            ) AS workshop,
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