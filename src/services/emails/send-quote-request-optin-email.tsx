/**
 * @file send-quote-request-optin-email.tsx
 * @description Versendet die Double-Opt-In-Bestätigungsmail für eine Angebotsanfrage
 * über Resend.
 * @module services/emails/send-quote-request-optin-email
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import QuoteRequestOptinEmail from '@/emails/quote-request-optin-email';
import { resend } from '@/lib/resend';
import { type SendQuoteRequestOptInEmailData } from '@/schemas/quote-request.schema';

/**
 * Sendet die Double-Opt-In-E-Mail zur Bestätigung der Angebotsanfrage an den Ansprechpartner.
 *
 * @param props - Die Angebotsanfrage-Daten inkl. Bestätigungslink
 * @returns Die Resend-ID der versendeten E-Mail, oder ein leerer String bei Fehlschlag
 */
export async function sendQuoteRequestOptInEmail(props: SendQuoteRequestOptInEmailData): Promise<string> {
    
    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: props.ansprechpartner.email,
        bcc: process.env.EMAIL_BCC_ADDRESS as string,
        replyTo: process.env.EMAIL_REPLY_TO_ADDRESS as string,
        subject: `Ihre Angebotsanfrage · ${props.workshop.titel}`,
        react: <QuoteRequestOptinEmail {...props} />
    });

    return response.data?.id || "";

};