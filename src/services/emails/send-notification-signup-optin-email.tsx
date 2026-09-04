/**
 * @file send-notification-signup-optin-email.tsx
 * @description Versendet die Double-Opt-In-Bestätigungsmail für eine Workshop-
 * Benachrichtigungs-Anmeldung über Resend.
 * @module services/emails/send-notification-signup-optin-email
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { SendNotificationSignupOptInEmailData } from "@/schemas/notification-signup.schema";

import NotificationSignupOptinEmail from "@/emails/notification-signup-optin-email";
import { resend } from "@/lib/resend";

/**
 * Sendet die Double-Opt-In-E-Mail zur Bestätigung der Workshop-Benachrichtigung.
 *
 * @param props - Anmeldedaten inkl. Workshop, Bestätigungslink und Gültigkeitsdauer
 * @returns Die Resend-ID der versendeten E-Mail, oder ein leerer String bei Fehlschlag
 */
export async function sendNotificationSignupOptInEmail(props: SendNotificationSignupOptInEmailData): Promise<string> {
    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: props.email,
        bcc: process.env.EMAIL_BCC_ADDRESS as string,
        replyTo: process.env.EMAIL_REPLY_TO_ADDRESS as string,
        subject: "Workshop-Benachrichtigung · Bitte bestätigen",
        react: <NotificationSignupOptinEmail {...props} />
    });
    return response.data?.id || "";

}