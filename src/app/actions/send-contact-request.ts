"use server";

import { verifyTurnstileToken } from "@/lib/turnstile";
import {
    type SendContactRequestData,
    sendContactRequestEmailSchema,
    sendContactRequestSchema,
} from "@/schemas/contact-request.schema";
import { sendContactRequestEmail } from "@/services/emails/send-contact-request-email";

export type SendContactRequestResult =
    | {
          success: true;
      }
    | {
          success: false;
          error: string;
      };

export async function sendContactRequest(
    data: SendContactRequestData,
): Promise<SendContactRequestResult> {
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