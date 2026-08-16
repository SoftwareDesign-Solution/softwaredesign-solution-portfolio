import QuoteRequestOptinEmail from '@/emails/quote-request-optin-email';
import { resend } from '@/lib/resend';
import { type SendQuoteRequestOptInEmailData } from '@/schemas/quote-request.schema';


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