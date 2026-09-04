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

const CONFIRMATION_EXPIRATION_DAYS = 3;

interface ActiveWorkshop {
    id: number;
    titel: string;
}

interface InsertNotificationSignupOptions {
    confirmationToken: string;
    ipAddress: string | null;
    notificationSignupData:
        CreateNotificationSignupData;
    unsubscribeToken: string;
    workshop: ActiveWorkshop;
}

interface SendOptInEmailOptions {
    confirmationToken: string;
    notificationSignupData:
        CreateNotificationSignupData;
    notificationSignupId: string;
    workshop: ActiveWorkshop;
}

export interface CreateNotificationSignupResult {
    confirmationEmailSent: boolean;
    notificationSignupId: string;
}

export async function createNotificationSignup(
    data: CreateNotificationSignupData,
): Promise<CreateNotificationSignupResult> {
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

async function sendOptInEmailSafely({
    confirmationToken,
    notificationSignupData,
    notificationSignupId,
    workshop,
}: SendOptInEmailOptions): Promise<boolean> {
    try {
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