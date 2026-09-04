/**
 * @file booking-form-default-values.ts
 * @description Initialwerte für das react-hook-form-Buchungsformular.
 * @module components/forms/booking/booking-form-default-values
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type BookingFormInput } from "@/schemas/booking.schema";

/**
 * Liefert die leeren Initialwerte für das Buchungsformular (react-hook-form `defaultValues`).
 *
 * @returns Die Default-Werte für {@link BookingFormInput}
 */
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