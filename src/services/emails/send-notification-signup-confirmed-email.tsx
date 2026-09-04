/**
 * @file send-notification-signup-confirmed-email.tsx
 * @description Versendet die Bestätigungs-E-Mail nach erfolgreichem Double-Opt-In
 * einer Workshop-Benachrichtigungs-Anmeldung über Resend.
 * @module services/emails/send-notification-signup-confirmed-email
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import NotificationSignupConfirmedEmail from "@/emails/notification-signup-confirmed-email";
import { resend } from "@/lib/resend";
import { SendNotificationSignupConfirmedEmailData } from "@/schemas/notification-signup.schema";

/**
 * Bestätigt dem Nutzer per E-Mail, dass die Workshop-Benachrichtigung aktiv ist.
 *
 * @param props - Anmeldedaten inkl. Workshop und Abmeldelink
 * @returns Die Resend-ID der versendeten E-Mail, oder ein leerer String bei Fehlschlag
 */
export async function sendNotificationSignupConfirmedEmail(props: SendNotificationSignupConfirmedEmailData): Promise<string> {
    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: props.email,
        bcc: process.env.EMAIL_BCC_ADDRESS as string,
        replyTo: process.env.EMAIL_REPLY_TO_ADDRESS as string,
        subject: "Workshop-Benachrichtigung · Anmeldung bestätigt",
        react: <NotificationSignupConfirmedEmail {...props} />
    });
    return response.data?.id || "";
    
};