import QuoteRequestNotificationEmail from '@/emails/quote-request-notification-email';
import { resend } from '@/lib/resend';
import { type SendQuoteRequestEmailData } from '@/schemas/quote-request.schema';
import { formatDate } from '@/utils/format-date';


export async function sendQuoteRequestConfirmationEmail(props: SendQuoteRequestEmailData): Promise<string> {

    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: process.env.EMAIL_TO_ADDRESS as string,
        subject: `Neue Angebotsanfrage · ${props.workshop.titel} (${formatDate(props.termin!.datumVon)} - ${formatDate(props.termin!.datumBis)})`,
        react: <QuoteRequestNotificationEmail {...props} />
    });

    return response.data?.id || "";

}