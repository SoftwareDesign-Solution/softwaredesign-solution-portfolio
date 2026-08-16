"use server";

import { db } from "@/lib/db";
import getClientIp from "@/lib/get-client-ip";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { CreateNotificationSignupData, createNotificationSignupSchema, sendNotificationSignupOptInEmailSchema } from "@/schemas/notification-signup.schema";
import { sendNotificationSignupOptInEmail } from "@/services/emails/send-notification-signup-optin-email";
import { generateSecureToken } from "@/utils/generate-secure-token";

export interface CreateNotificationSignupResult {
    notificationSignupId: string;
    confirmationEmailSent: boolean;
}

export async function createNotificationSignup(data: CreateNotificationSignupData): Promise<CreateNotificationSignupResult> {
    
    // 1. Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist.
    const validationResult = createNotificationSignupSchema.safeParse(data);

    if (!validationResult.success) {
        console.error(
            "Ungültige Registrierungsdaten",
            validationResult.error.flatten()
        );

        throw new Error(
            "Die eingegebenen Registrierungsdaten sind ungültig."
        );
    }

    const notificationSignupData = validationResult.data;


    // 2. Turnstile-Verifizierung — IMMER zuerst, vor jedem DB-Zugriff.
    const isHuman = await verifyTurnstileToken(
        notificationSignupData.turnstile.token
    );

    if (!isHuman) {
        throw new Error("Sicherheitsabfrage fehlgeschlagen. Bitte bestätigen Sie, dass Sie kein Roboter sind.");
    }

    let ipAddress: string | null = null;

    try {
        ipAddress = (await getClientIp()) ?? null;
    } catch (error) {
        console.error("Fehler beim Ermitteln der Client-IP-Adresse:", error);
    }

    const confirmationToken = generateSecureToken();
    const unsubscribeToken = generateSecureToken();
    
    /*
     * Workshop, Termin und Preis anhand der IDs serverseitig laden.
     * Idealerweise liefert die Abfrage nur aktive und buchbare Termine.
     */
    const [workshop] = await db`
        SELECT
            w.id AS workshop_id,
            w.titel AS workshop_titel
        FROM workshop w
        WHERE w.id = ${notificationSignupData.workshop.id}
            AND w.active = TRUE
        LIMIT 1
    `;

    if (!workshop) {
        throw new Error(
            "Der ausgewählte Workshop ist nicht verfügbar."
        );
    }

    let notificationSignupId: string;

    // 3. DB-Insert + E-Mail-Versand — in try/catch, aber OHNE redirect() darin!
    //    redirect() wirft intern einen speziellen Error (NEXT_REDIRECT), der sonst
    //    versehentlich vom catch-Block abgefangen würde.
    try {

        const [notificationSignup] = await db`
            INSERT INTO workshop_benachrichtigung (
                workshop_id, workshop_titel, vorname, nachname, email, ip_adresse, confirmation_token, confirmation_expires_at, unsubscribe_token
            )
            VALUES (
                ${workshop.workshop_id},
                ${workshop.workshop_titel},
                ${notificationSignupData.vorname},
                ${notificationSignupData.nachname},
                ${notificationSignupData.email},
                ${ipAddress}, -- TODO: IP-Adresse aus Request-Context ermitteln,
                ${confirmationToken},
                now() + interval '3 DAY',
                ${unsubscribeToken}
            )
            RETURNING id;
        `;

        notificationSignupId = String(notificationSignup.id);
       
    } catch (error) {
        throw new Error("Fehler beim Erstellen der Benachrichtigungsanmeldung: " + (error as Error).message);
    }


    /*
     * Ab hier ist die Benachrichtigung definitiv gespeichert.
     *
     * Ein E-Mail-Fehler darf deshalb nicht mehr dazu führen,
     * dass der Client die gesamte Buchung als fehlgeschlagen
     * behandelt.
     */

    try {

        // E-Mail-Daten validieren und ggf. transformieren
        const emailData = sendNotificationSignupOptInEmailSchema.parse({ 
            ...notificationSignupData, 
            expiresInDay: 3,
            confirmationLink: `http://localhost:3000/notifications/${notificationSignupId}/confirm?token=${confirmationToken}`,
        });

        // Benachrichtigung mit Bestätigungslink per E-Mail versenden
        await sendNotificationSignupOptInEmail(emailData);

        return {
            notificationSignupId,
            confirmationEmailSent: true,
        };

    } catch (error) {

        console.error(`Fehler beim Versenden der Bestätigungs-E-Mail: ${(error as Error).message}`);
        
        return {
            notificationSignupId,
            confirmationEmailSent: false,
        };

    }

}
