import { BookingData } from "@/schemas/forms/booking.schema";
import { resend } from "@/lib/resend";
import BookingConfirmationEmail from "@/emails/booking-confirmation-email";
import { CreateEmailResponse } from "resend";
import { SendBookingConfirmationEmailData } from "@/schemas/booking.schema";
//import { BookingConfirmationEmailProps, bookingConfirmationEmailSchema } from "@/schemas/emails/booking-confirmation-email.schema";


export async function sendBookingConfirmationEmail(booking: SendBookingConfirmationEmailData): Promise<string> {
    
    const response = await resend.emails.send({
        from: "workshops@manuel-kuebler.de",
        to: booking.ansprechpartner.email,
        bcc: "mail@softwaredesign-solution.de",
        replyTo: "mail@softwaredesign-solution.de",
        subject: "Buchungsbestätigung für Ihren Workshop",
        react: <BookingConfirmationEmail {...booking} />
    });

    return response.data?.id || "";

}

/*
function toEmailProps(booking: BookingData): BookingConfirmationEmailProps {
  const props = {
    salutation: `Hallo ${booking.ansprechpartner.vorname}`,
    workshopTitel: booking.workshop.titel,
    termin: {
      datumVon: String(booking.termin?.datumVon),
      datumBis: String(booking.termin?.datumBis),
    },
    firma: booking.adresse.firma,
    rechnungsadresse: booking.abweichendeRechnungsadresse
      ? {
          firma: String(booking.rechnungsadresse!.firma),
          strasse: String(booking.rechnungsadresse!.strasse),
          plz: String(booking.rechnungsadresse!.plz),
          ort: String(booking.rechnungsadresse!.ort),
        }
      : {
          firma: booking.adresse.firma,
          strasse: booking.adresse.strasse,
          plz: booking.adresse.plz,
          ort: booking.adresse.ort,
        },
    gesamtpreis: booking.summary.gesamtbetrag,
    teilnehmer: booking.teilnehmer.map((teilnehmer) => ({
      vorname: teilnehmer.vorname,
      nachname: teilnehmer.nachname,
    })),
  };

  return bookingConfirmationEmailSchema.parse(props);
}
*/