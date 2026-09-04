/**
 * @file send-quote-request-confirmation-email.tsx
 * @description Versendet die interne Benachrichtigungs-E-Mail, nachdem eine
 * Angebotsanfrage per Double-Opt-In bestätigt wurde, über Resend.
 * @module services/emails/send-quote-request-confirmation-email
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import QuoteRequestNotificationEmail from '@/emails/quote-request-notification-email';
import { resend } from '@/lib/resend';
import { type SendQuoteRequestEmailData } from '@/schemas/quote-request.schema';
import { formatDate } from '@/utils/format-date';

/**
 * Benachrichtigt das Team intern per E-Mail über eine bestätigte Angebotsanfrage.
 *
 * @param props - Die bestätigten Angebotsanfrage-Daten (Workshop, ggf. Termin, Kontakt)
 * @returns Die Resend-ID der versendeten E-Mail, oder ein leerer String bei Fehlschlag
 */
export async function sendQuoteRequestConfirmationEmail(props: SendQuoteRequestEmailData): Promise<string> {

    // Nicht jeder Workshop hat feste Termine — Betreff entsprechend anpassen
    const terminLabel = props.termin
        ? ` (${formatDate(props.termin.datumVon)} - ${formatDate(props.termin.datumBis)})`
        : " (ohne festen Termin)";

    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: process.env.EMAIL_TO_ADDRESS as string,
        //subject: `Neue Angebotsanfrage · ${props.workshop.titel} (${formatDate(props.termin!.datumVon)} - ${formatDate(props.termin!.datumBis)})`,
        subject: `Neue Angebotsanfrage · ${props.workshop.titel}${terminLabel}`,
        react: <QuoteRequestNotificationEmail {...props} />
    });

    return response.data?.id || "";

}