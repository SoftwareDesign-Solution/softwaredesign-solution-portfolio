"use server";

import { z } from "zod";

import { db } from "@/lib/db";

const inputSchema = z.object({
    id: z.uuid(),
    token: z
        .string()
        .trim()
        .min(1),
});

const unsubscribeDataSchema = z.object({
    email: z
        .string()
        .trim()
        .pipe(z.email()),

    nachname: z
        .string()
        .trim()
        .min(1),

    vorname: z
        .string()
        .trim()
        .min(1),

    workshopTitel: z
        .string()
        .trim()
        .min(1),
});

type UnsubscribeNotificationSignupInput =
    z.output<typeof inputSchema>;

type NotificationSignupUnsubscribeData =
    z.output<typeof unsubscribeDataSchema>;

type NotificationSignupDatabaseRow =
    Record<string, unknown>;

export type UnsubscribeNotificationSignupResult =
    | {
          data: NotificationSignupUnsubscribeData;
          status:
              | "unsubscribed"
              | "already-unsubscribed";
      }
    | {
          status: "invalid-or-expired";
      };

export async function unsubscribeNotificationSignup(
    input: UnsubscribeNotificationSignupInput,
): Promise<UnsubscribeNotificationSignupResult> {
    const validationResult =
        inputSchema.safeParse(input);

    if (!validationResult.success) {
        return {
            status: "invalid-or-expired",
        };
    }

    const { id, token } = validationResult.data;

    const unsubscribedRow =
        await unsubscribeNotificationSignupInDatabase(
            id,
            token,
        );

    if (unsubscribedRow) {
        const data =
            unsubscribeDataSchema.parse(
                unsubscribedRow,
            );

        return {
            data,
            status: "unsubscribed",
        };
    }

    const existingRow =
        await getExistingNotificationSignup(
            id,
            token,
        );

    if (existingRow?.unsubscribedAt) {
        const data =
            unsubscribeDataSchema.parse(
                existingRow,
            );

        return {
            data,
            status: "already-unsubscribed",
        };
    }

    return {
        status: "invalid-or-expired",
    };
}

async function unsubscribeNotificationSignupInDatabase(
    id: string,
    token: string,
): Promise<NotificationSignupDatabaseRow | null> {
    const [unsubscribedRow] = await db`
        UPDATE workshop_benachrichtigung
        SET unsubscribed_at = NOW()
        WHERE id = ${id}
          AND unsubscribe_token = ${token}
          AND unsubscribed_at IS NULL
        RETURNING
            workshop_titel AS "workshopTitel",
            vorname,
            nachname,
            email,
            unsubscribed_at AS "unsubscribedAt"
    `;

    return unsubscribedRow
        ? unsubscribedRow as
            NotificationSignupDatabaseRow
        : null;
}

async function getExistingNotificationSignup(
    id: string,
    token: string,
): Promise<NotificationSignupDatabaseRow | null> {
    const [existingRow] = await db`
        SELECT
            workshop_titel AS "workshopTitel",
            vorname,
            nachname,
            email,
            unsubscribed_at AS "unsubscribedAt"
        FROM workshop_benachrichtigung
        WHERE id = ${id}
          AND unsubscribe_token = ${token}
        LIMIT 1
    `;

    return existingRow
        ? existingRow as
            NotificationSignupDatabaseRow
        : null;
}