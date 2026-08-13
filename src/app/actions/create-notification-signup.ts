"use server";

import { db } from "@/lib/db";
import getClientIp from "@/lib/get-client-ip";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { NotificationSignupData, notificationSignupSchema } from "@/schemas/forms/notification-signup.schema";

export interface CreateNotificationSignupResult {
    notificationSignupId: string;
    confirmationEmailSent: boolean;
}

export async function createNotificationSignup(data: NotificationSignupData): Promise<CreateNotificationSignupResult> {
    
    // 1. Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist.
    const validationResult = notificationSignupSchema.safeParse(data);

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


    let notificationSignupId: string;

    // 3. DB-Insert + E-Mail-Versand — in try/catch, aber OHNE redirect() darin!
    //    redirect() wirft intern einen speziellen Error (NEXT_REDIRECT), der sonst
    //    versehentlich vom catch-Block abgefangen würde.
    try {

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

        const [notificationSignup] = await db`
            INSERT INTO workshop_benachrichtigung (
                workshop_id, workshop_titel, vorname, nachname, email, ip_adresse, confirmation_expires_at
            )
            VALUES (
                ${workshop.workshop_id},
                ${workshop.workshop_titel},
                ${notificationSignupData.vorname},
                ${notificationSignupData.nachname},
                ${notificationSignupData.email},
                ${ipAddress}, -- TODO: IP-Adresse aus Request-Context ermitteln,
                now() + interval '24 hours'
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

        // Buchungsbestätigung per E-Mail versenden

        return {
            notificationSignupId,
            confirmationEmailSent: true,
        };

    } catch (error) {
        
        return {
            notificationSignupId,
            confirmationEmailSent: false,
        };

    }

}