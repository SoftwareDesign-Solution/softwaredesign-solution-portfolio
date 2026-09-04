/**
 * @file send-contact-request-email.tsx
 * @description Versendet die interne Benachrichtigungs-E-Mail bei einer neuen
 * Kontaktanfrage über Resend.
 * @module services/emails/send-contact-request-email
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import "server-only";

import type { SendContactRequestEmailData } from "@/schemas/contact-request.schema";

import ContactRequestEmail from "@/emails/contact-request-email";
import { resend } from "@/lib/resend";

/**
 * Benachrichtigt das Team intern per E-Mail über eine neue Kontaktanfrage.
 *
 * @param data - Die Kontaktanfrage-Daten (Firma, Ansprechpartner, Nachricht)
 * @returns Die Resend-ID der versendeten E-Mail, oder ein leerer String bei Fehlschlag
 */
export async function sendContactRequestEmail(data: SendContactRequestEmailData): Promise<string> {

    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: process.env.EMAIL_TO_ADDRESS as string,
        subject: `Neue Kontaktanfrage von ${data.ansprechpartner.vorname} ${data.ansprechpartner.nachname}`,
        react: <ContactRequestEmail {...data} />
    });
    return response.data?.id || "";
}