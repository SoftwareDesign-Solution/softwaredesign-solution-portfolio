/**
 * @file confirm-notification-signup.ts
 * @description Server Action zur Bestätigung einer Workshop-Benachrichtigungs-
 * Anmeldung (Double-Opt-In) über ID + Bestätigungs-Token aus dem E-Mail-Link.
 * @module app/actions/confirm-notification-signup
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import {
    notificationSignupBaseSchema,
    sendNotificationSignupConfirmedEmailSchema,
} from "@/schemas/notification-signup.schema";
import { sendNotificationSignupConfirmedEmail } from "@/services/emails/send-notification-signup-confirmed-email";

/** Erwartet Anmelde-ID und Bestätigungs-Token aus dem Query-Parameter des Opt-In-Links. */
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

/** Daten der Benachrichtigungs-Anmeldung, die auf der Bestätigungsseite angezeigt werden. */
type NotificationSignupConfirmationData =
    z.output<
        typeof notificationSignupBaseSchema
    >;

    /** Lose typisierte Roh-Zeile aus der DB, bevor sie gegen ein Zod-Schema geparst wird. */
type NotificationSignupDatabaseRow =
    Record<string, unknown>;

/** Ergebnis des Bestätigungsvorgangs für die Anzeige auf der Bestätigungsseite. */
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

/**
 * Bestätigt eine Workshop-Benachrichtigungs-Anmeldung (Double-Opt-In) anhand von
 * ID und Bestätigungs-Token und versendet anschließend die Bestätigungs-E-Mail.
 * Erkennt drei Fälle: erfolgreich bestätigt, bereits zuvor bestätigt,
 * oder Link ungültig/abgelaufen.
 *
 * @param input - ID und Token aus dem Query-Parameter des E-Mail-Links
 * @returns Ein {@link ConfirmNotificationSignupResult} mit dem erkannten Status
 *          und ggf. den Anmeldedaten
 */
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

/**
 * Bestätigt die Anmeldung in der DB — aber nur, wenn sie noch nicht bestätigt
 * und die Gültigkeit noch nicht abgelaufen ist (sonst betrifft das UPDATE keine Zeile).
 *
 * @param id - ID der Benachrichtigungs-Anmeldung
 * @param token - Der zugehörige Bestätigungs-Token
 * @returns Die aktualisierte Zeile bei Erfolg, sonst `null`
 */
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

/**
 * Lädt die Anmeldung unabhängig vom Bestätigungsstatus, um zwischen
 * "bereits bestätigt" und "ungültig/abgelaufen" unterscheiden zu können.
 *
 * @param id - ID der Benachrichtigungs-Anmeldung
 * @param token - Der zugehörige Bestätigungs-Token
 * @returns Die gefundene Zeile oder `null`, falls ID/Token nicht zusammenpassen
 */
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

/**
 * Versendet die Bestätigungs-E-Mail und fängt dabei jeden Fehler ab, statt ihn zu werfen —
 * die Bestätigung selbst wurde bereits in der DB gespeichert und soll dadurch nicht scheitern.
 *
 * @param confirmedRow - Die soeben bestätigte Zeile aus der DB
 */
async function sendConfirmedEmailSafely(
    confirmedRow: NotificationSignupDatabaseRow,
): Promise<void> {
    try {

        // Absolute URL nötig, da der Link per E-Mail versendet wird (kein relativer Request-Kontext)
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

/**
 * Liest die Basis-URL der Anwendung aus der Umgebungsvariable, ohne trailing Slash.
 *
 * @returns Die konfigurierte Basis-URL
 * @throws Error, falls `NEXT_PUBLIC_BASE_URL` nicht gesetzt ist
 */
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