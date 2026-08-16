import BookingConfirmationEmail from "@/emails/booking-confirmation-email";
import { resend } from "@/lib/resend";
import { SendBookingConfirmationEmailData } from "@/schemas/booking.schema";


export async function sendBookingConfirmationEmail(booking: SendBookingConfirmationEmailData): Promise<string> {
    
    const response = await resend.emails.send({
        from: process.env.EMAIL_FROM_ADDRESS as string,
        to: booking.ansprechpartner.email,
        bcc: process.env.EMAIL_BCC_ADDRESS as string,
        replyTo: process.env.EMAIL_REPLY_TO_ADDRESS as string,
        subject: `Workshop ${booking.workshop.titel} - Buchungsbestätigung`,
        react: <BookingConfirmationEmail {...booking} />
    });

    return response.data?.id || "";

}