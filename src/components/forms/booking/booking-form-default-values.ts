import { type BookingFormInput } from "@/schemas/booking.schema";

export function getBookingFormDefaultValues():
    BookingFormInput {
    return {
        abweichendeRechnungsadresse: false,
        adresse: {
            firma: "",
            ort: "",
            plz: "",
            strasse: "",
        },
        ansprechpartner: {
            anrede: "Keine Angabe",
            email: "",
            nachname: "",
            telefon: "",
            vorname: "",
        },
        gutscheinCode: "",
        nachricht: "",
        teilnehmer: [
            {
                email: "",
                nachname: "",
                vorname: "",
            },
        ],
        teilnehmerzahl: 1,
        termin: null,
        turnstile: {
            token: "",
        },
        webseite: "",
        consent: false,
    };
}