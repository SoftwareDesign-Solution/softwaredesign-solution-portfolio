/**
 * @file send-booking-confirmation-email.tsx
 * @description Versendet die Buchungsbestätigungs-E-Mail nach einer erfolgreichen
 * Workshop-Buchung über Resend.
 * @module services/emails/send-booking-confirmation-email
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import BookingConfirmationEmail from "@/emails/booking-confirmation-email";
import { resend } from "@/lib/resend";
import { SendBookingConfirmationEmailData } from "@/schemas/booking.schema";

/**
 * Versendet die Buchungsbestätigungs-E-Mail an den Ansprechpartner (BCC intern, Reply-To fürs Team).
 *
 * @param booking - Buchungsdaten inkl. Workshop, Termin, Teilnehmer und Gesamtpreis
 * @returns Die Resend-ID der versendeten E-Mail, oder ein leerer String bei Fehlschlag
 */
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