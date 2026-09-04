"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import {
    notificationSignupBaseSchema,
    sendNotificationSignupConfirmedEmailSchema,
} from "@/schemas/notification-signup.schema";
import { sendNotificationSignupConfirmedEmail } from "@/services/emails/send-notification-signup-confirmed-email";

const inputSchema = z.object({
    id: z.uuid(),
    token: z
        .string()
        .trim()
        .min(1),
});

type ConfirmNotificationSignupInput = z.output<
    typeof inputSchema
>;

type NotificationSignupConfirmationData =
    z.output<
        typeof notificationSignupBaseSchema
    >;

type NotificationSignupDatabaseRow =
    Record<string, unknown>;

export type ConfirmNotificationSignupResult =
    | {
          data: NotificationSignupConfirmationData;
          status:
              | "confirmed"
              | "already-confirmed";
      }
    | {
          status: "invalid-or-expired";
      };

export async function confirmNotificationSignup(
    input: ConfirmNotificationSignupInput,
): Promise<ConfirmNotificationSignupResult> {
    const validationResult =
        inputSchema.safeParse(input);

    if (!validationResult.success) {
        return {
            status: "invalid-or-expired",
        };
    }

    const { id, token } = validationResult.data;

    const confirmedRow =
        await confirmNotificationSignupInDatabase(
            id,
            token,
        );

    if (confirmedRow) {
        const data =
            notificationSignupBaseSchema.parse(
                confirmedRow,
            );

        await sendConfirmedEmailSafely(
            confirmedRow,
        );

        return {
            data,
            status: "confirmed",
        };
    }

    const existingRow =
        await getExistingNotificationSignup(
            id,
            token,
        );

    if (existingRow?.confirmedAt) {
        const data =
            notificationSignupBaseSchema.parse(
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

async function confirmNotificationSignupInDatabase(
    id: string,
    token: string,
): Promise<NotificationSignupDatabaseRow | null> {
    const [confirmedRow] = await db`
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

            unsubscribe_token AS "unsubscribeToken",

            confirmed_at AS "confirmedAt"
    `;

    return confirmedRow
        ? confirmedRow as
            NotificationSignupDatabaseRow
        : null;
}

async function getExistingNotificationSignup(
    id: string,
    token: string,
): Promise<NotificationSignupDatabaseRow | null> {
    const [existingRow] = await db`
        SELECT
            id,

            jsonb_build_object(
                'id', workshop_id,
                'titel', workshop_titel
            ) AS workshop,

            vorname,
            nachname,
            email,

            confirmed_at AS "confirmedAt"
        FROM workshop_benachrichtigung
        WHERE id = ${id}
          AND confirmation_token = ${token}
        LIMIT 1
    `;

    return existingRow
        ? existingRow as
            NotificationSignupDatabaseRow
        : null;
}

async function sendConfirmedEmailSafely(
    confirmedRow: NotificationSignupDatabaseRow,
): Promise<void> {
    try {
        const baseUrl = getBaseUrl();

        const emailData =
            sendNotificationSignupConfirmedEmailSchema.parse({
                ...confirmedRow,

                unsubscribeLink:
                    `${baseUrl}/notifications/` +
                    `${confirmedRow.id}/unsubscribe` +
                    `?token=${confirmedRow.unsubscribeToken}`,
            });

        await sendNotificationSignupConfirmedEmail(
            emailData,
        );
    } catch (error: unknown) {
        console.error(
            "Notification signup was confirmed, but its confirmation email could not be sent.",
            error,
        );
    }
}

function getBaseUrl(): string {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error(
            "NEXT_PUBLIC_BASE_URL is not configured.",
        );
    }

    return baseUrl.replace(/\/$/, "");
}