/**
 * @file unsubscribe-notification-signup.ts
 * @description Server Action zur Abmeldung von Workshop-Benachrichtigungen
 * über ID + Abmelde-Token aus dem E-Mail-Link.
 * @module app/actions/unsubscribe-notification-signup
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use server";

import { z } from "zod";

import { db } from "@/lib/db";

/** Erwartet Anmelde-ID und Abmelde-Token aus dem Query-Parameter des Abmeldelinks. */
const inputSchema = z.object({
    id: z.uuid(),
    token: z
        .string()
        .trim()
        .min(1),
});

/** Daten der Benachrichtigungs-Anmeldung, die auf der Abmelde-Ergebnisseite angezeigt werden. */
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

/** Lose typisierte Roh-Zeile aus der DB, bevor sie gegen ein Zod-Schema geparst wird. */
type NotificationSignupDatabaseRow =
    Record<string, unknown>;

/** Ergebnis des Abmeldevorgangs für die Anzeige auf der Bestätigungsseite. */
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

/**
 * Meldet eine Workshop-Benachrichtigung anhand von ID und Abmelde-Token ab.
 * Erkennt drei Fälle: erfolgreich abgemeldet, bereits zuvor abgemeldet,
 * oder Link ungültig/ID+Token passen nicht zusammen.
 *
 * @param input - ID und Token aus dem Query-Parameter des E-Mail-Links
 * @returns Ein {@link UnsubscribeNotificationSignupResult} mit dem erkannten Status
 *          und ggf. den Anmeldedaten
 */
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

/**
 * Meldet die Anmeldung in der DB ab — aber nur, wenn sie noch nicht abgemeldet ist
 * (sonst betrifft das UPDATE keine Zeile).
 *
 * @param id - ID der Benachrichtigungs-Anmeldung
 * @param token - Der zugehörige Abmelde-Token
 * @returns Die aktualisierte Zeile bei Erfolg, sonst `null`
 */
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

/**
 * Lädt die Anmeldung unabhängig vom Abmeldestatus, um zwischen
 * "bereits abgemeldet" und "ungültig" unterscheiden zu können.
 *
 * @param id - ID der Benachrichtigungs-Anmeldung
 * @param token - Der zugehörige Abmelde-Token
 * @returns Die gefundene Zeile oder `null`, falls ID/Token nicht zusammenpassen
 */
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