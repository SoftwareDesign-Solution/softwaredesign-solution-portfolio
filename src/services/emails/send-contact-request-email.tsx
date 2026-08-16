import "server-only";

import type { SendContactRequestEmailData } from "@/schemas/contact-request.schema";

import ContactRequestEmail from "@/emails/contact-request-email";
import { resend } from "@/lib/resend";


export async function sendContactRequestEmail(data: SendContactRequestEmailData): Promise<string> {

    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: process.env.EMAIL_TO_ADDRESS as string,
        subject: `Neue Kontaktanfrage von ${data.ansprechpartner.vorname} ${data.ansprechpartner.nachname}`,
        react: <ContactRequestEmail {...data} />
    });
    return response.data?.id || "";
}