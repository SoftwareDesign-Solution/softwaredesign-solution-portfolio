/**
 * @file send-contact-request.ts
 * @description Server Action für das allgemeine Kontaktformular (/anfrage-Seite):
 * validiert die Eingaben, prüft Turnstile und benachrichtigt das Team per E-Mail.
 * @module app/actions/send-contact-request
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use server";

import { verifyTurnstileToken } from "@/lib/turnstile";
import {
    type SendContactRequestData,
    sendContactRequestEmailSchema,
    sendContactRequestSchema,
} from "@/schemas/contact-request.schema";
import { sendContactRequestEmail } from "@/services/emails/send-contact-request-email";

/** Ergebnis von {@link sendContactRequest}: entweder Erfolg oder eine für den Nutzer verständliche Fehlermeldung. */
export type SendContactRequestResult =
    | {
          success: true;
      }
    | {
          success: false;
          error: string;
      };

/**
 * Server Action für das Kontaktformular: validiert die Eingaben, prüft die
 * Turnstile-Sicherheitsabfrage und benachrichtigt das Team per E-Mail.
 *
 * @param data - Die vom Client übermittelten und gegen {@link sendContactRequestSchema}
 *               zu validierenden Kontaktdaten (Firma, Ansprechpartner, Nachricht, Turnstile-Token)
 * @returns Ein {@link SendContactRequestResult}: `{ success: true }` bei Erfolg,
 *          sonst `{ success: false, error }` mit einer für den Nutzer verständlichen Meldung
 */
export async function sendContactRequest(
    data: SendContactRequestData,
): Promise<SendContactRequestResult> {

    // Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    // da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist
    const validationResult =
        sendContactRequestSchema.safeParse(data);

    if (!validationResult.success) {
        console.error(
            "Invalid contact request data.",
            validationResult.error.flatten(),
        );

        return {
            success: false,
            error:
                "Die eingegebenen Kontaktdaten sind ungültig.",
        };
    }

    const contactRequestData =
        validationResult.data;

    // Bot-/Spam-Schutz: ohne gültiges Turnstile-Token keine Verarbeitung
    const isHuman = await verifyTurnstileToken(
        contactRequestData.turnstile.token,
    );

    if (!isHuman) {
        return {
            success: false,
            error:
                "Die Sicherheitsabfrage ist fehlgeschlagen.",
        };
    }

    try {
        const emailData =
            sendContactRequestEmailSchema.parse(
                contactRequestData,
            );

        await sendContactRequestEmail(emailData);

        return {
            success: true,
        };
    } catch (error: unknown) {
        console.error(
            "Failed to send contact request email.",
            error,
        );

        return {
            success: false,
            error:
                "Ihre Nachricht konnte nicht versendet werden.",
        };
    }
}