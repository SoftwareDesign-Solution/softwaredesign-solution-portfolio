/**
 * @file create-notification-signup.ts
 * @description Server Action zur Anmeldung für Workshop-Benachrichtigungen
 * (Double-Opt-In). Validiert die Eingaben, speichert die Anmeldung mit
 * Bestätigungs-/Abmelde-Token und versendet die Opt-In-E-Mail.
 * @module app/actions/create-notification-signup
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use server";

import { db } from "@/lib/db";
import getClientIp from "@/lib/get-client-ip";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
    type CreateNotificationSignupData,
    createNotificationSignupSchema,
    sendNotificationSignupOptInEmailSchema,
} from "@/schemas/notification-signup.schema";
import { sendNotificationSignupOptInEmail } from "@/services/emails/send-notification-signup-optin-email";
import { generateSecureToken } from "@/utils/generate-secure-token";

// Gültigkeitsdauer des Bestätigungslinks in der Opt-In-E-Mail
const CONFIRMATION_EXPIRATION_DAYS = 3;

/** Minimal-Projektion eines Workshops, wie sie für die Anmeldung benötigt wird. */
interface ActiveWorkshop {
    id: number;
    titel: string;
}

/** Parameter für {@link insertNotificationSignup}. */
interface InsertNotificationSignupOptions {
    confirmationToken: string;
    ipAddress: string | null;
    notificationSignupData:
        CreateNotificationSignupData;
    unsubscribeToken: string;
    workshop: ActiveWorkshop;
}

/** Parameter für {@link sendOptInEmailSafely}. */
interface SendOptInEmailOptions {
    confirmationToken: string;
    notificationSignupData:
        CreateNotificationSignupData;
    notificationSignupId: string;
    workshop: ActiveWorkshop;
}

/** Ergebnis von {@link createNotificationSignup}. */
export interface CreateNotificationSignupResult {
    /** Ob die Opt-In-Bestätigungs-E-Mail erfolgreich versendet werden konnte. */
    confirmationEmailSent: boolean;
    /** ID des angelegten Anmeldedatensatzes. */
    notificationSignupId: string;
}

/**
 * Server Action für die Workshop-Benachrichtigungs-Anmeldung (Double-Opt-In).
 * Validiert die Eingaben, prüft Turnstile, speichert die Anmeldung mit
 * Bestätigungs-/Abmelde-Token und versendet die Opt-In-E-Mail.
 *
 * Ein Fehler beim E-Mail-Versand führt NICHT zu einem geworfenen Error, da der
 * Anmeldedatensatz zu diesem Zeitpunkt bereits gespeichert ist — stattdessen
 * wird `confirmationEmailSent: false` zurückgegeben.
 *
 * @param data - Die vom Client übermittelten und gegen {@link createNotificationSignupSchema}
 *               zu validierenden Anmeldedaten (Workshop, Name, E-Mail, Turnstile-Token)
 * @returns Ein {@link CreateNotificationSignupResult} mit der angelegten `notificationSignupId`
 *          und dem Status des E-Mail-Versands
 * @throws Error bei ungültigen Eingaben, fehlgeschlagener Turnstile-Prüfung,
 *         nicht verfügbarem Workshop oder einem Fehler beim Speichern in der DB
 */
export async function createNotificationSignup(
    data: CreateNotificationSignupData,
): Promise<CreateNotificationSignupResult> {

    // Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist
    const validationResult =
        createNotificationSignupSchema.safeParse(
            data,
        );

    if (!validationResult.success) {
        console.error(
            "Invalid notification signup data.",
            validationResult.error.flatten(),
        );

        throw new Error(
            "Die eingegebenen Registrierungsdaten sind ungültig.",
        );
    }

    const notificationSignupData =
        validationResult.data;

    // Bot-/Spam-Schutz: ohne gültiges Turnstile-Token keine Verarbeitung
    const isHuman = await verifyTurnstileToken(
        notificationSignupData.turnstile.token,
    );

    if (!isHuman) {
        throw new Error(
            "Die Sicherheitsabfrage ist fehlgeschlagen.",
        );
    }

    const workshop = await getActiveWorkshop(
        notificationSignupData.workshop.id,
    );

    if (!workshop) {
        throw new Error(
            "Der ausgewählte Workshop ist nicht verfügbar.",
        );
    }

    const ipAddress = await getClientIpSafely();
    const confirmationToken = generateSecureToken();
    const unsubscribeToken = generateSecureToken();

    const notificationSignupId =
        await insertNotificationSignup({
            confirmationToken,
            ipAddress,
            notificationSignupData,
            unsubscribeToken,
            workshop,
        });

    const confirmationEmailSent =
        await sendOptInEmailSafely({
            confirmationToken,
            notificationSignupData,
            notificationSignupId,
            workshop,
        });

    return {
        confirmationEmailSent,
        notificationSignupId,
    };
}

/**
 * Lädt einen Workshop anhand seiner ID, aber nur wenn er aktiv ist.
 *
 * @param workshopId - Die ID des zu prüfenden Workshops
 * @returns Der Workshop (ID, Titel) oder `null`, falls inaktiv/nicht vorhanden
 */
async function getActiveWorkshop(
    workshopId: number,
): Promise<ActiveWorkshop | null> {
    const [workshop] = await db`
        SELECT
            id,
            titel
        FROM workshop
        WHERE id = ${workshopId}
          AND active = TRUE
        LIMIT 1
    `;

    return workshop
        ? workshop as ActiveWorkshop
        : null;
}

/**
 * Speichert die Anmeldung in der Datenbank inkl. Bestätigungs- und Abmelde-Token.
 *
 * @param options - Siehe {@link InsertNotificationSignupOptions}
 * @returns Die ID des angelegten Anmeldedatensatzes
 * @throws Error, falls das Speichern fehlschlägt
 */
async function insertNotificationSignup({
    confirmationToken,
    ipAddress,
    notificationSignupData,
    unsubscribeToken,
    workshop,
}: InsertNotificationSignupOptions): Promise<string> {
    try {
        const [notificationSignup] = await db`
            INSERT INTO workshop_benachrichtigung (
                workshop_id,
                workshop_titel,
                vorname,
                nachname,
                email,
                ip_adresse,
                confirmation_token,
                confirmation_expires_at,
                unsubscribe_token
            )
            VALUES (
                ${workshop.id},
                ${workshop.titel},
                ${notificationSignupData.vorname},
                ${notificationSignupData.nachname},
                ${notificationSignupData.email},
                ${ipAddress},
                ${confirmationToken},
                NOW() + (
                    ${CONFIRMATION_EXPIRATION_DAYS}
                    * INTERVAL '1 DAY'
                ),
                ${unsubscribeToken}
            )
            RETURNING id
        `;

        if (!notificationSignup) {
            throw new Error(
                "No notification signup row was returned.",
            );
        }

        return String(notificationSignup.id);
    } catch (error: unknown) {
        console.error(
            "Failed to insert notification signup.",
            error,
        );

        throw new Error(
            "Die Benachrichtigungsanmeldung konnte nicht gespeichert werden.",
        );
    }
}

/**
 * Versendet die Opt-In-E-Mail und fängt dabei jeden Fehler ab, statt ihn zu werfen —
 * die Anmeldung selbst wurde bereits gespeichert und soll dadurch nicht scheitern.
 *
 * @param options - Siehe {@link SendOptInEmailOptions}
 * @returns `true`, wenn die E-Mail erfolgreich versendet werden konnte, sonst `false`
 */
async function sendOptInEmailSafely({
    confirmationToken,
    notificationSignupData,
    notificationSignupId,
    workshop,
}: SendOptInEmailOptions): Promise<boolean> {
    try {

        // Absolute URL nötig, da der Link per E-Mail versendet wird (kein relativer Request-Kontext)
        const baseUrl = getBaseUrl();

        const emailData =
            sendNotificationSignupOptInEmailSchema.parse({
                ...notificationSignupData,

                confirmationLink:
                    `${baseUrl}/notifications/` +
                    `${notificationSignupId}/confirm` +
                    `?token=${confirmationToken}`,

                expiresInDays:
                    CONFIRMATION_EXPIRATION_DAYS,

                workshop: {
                    id: workshop.id,
                    titel: workshop.titel,
                },
            });

        await sendNotificationSignupOptInEmail(
            emailData,
        );

        return true;
    } catch (error: unknown) {
        console.error(
            "Notification signup was created, but its opt-in email could not be sent.",
            error,
        );

        return false;
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

/**
 * Ermittelt die Client-IP-Adresse und fängt dabei jeden Fehler ab — die Anmeldung
 * soll auch ohne bekannte IP-Adresse gespeichert werden können.
 *
 * @returns Die Client-IP-Adresse oder `null`, falls nicht ermittelbar
 */
async function getClientIpSafely():
    Promise<string | null> {
    try {
        return (await getClientIp()) ?? null;
    } catch (error: unknown) {
        console.error(
            "Failed to determine client IP address.",
            error,
        );

        return null;
    }
}