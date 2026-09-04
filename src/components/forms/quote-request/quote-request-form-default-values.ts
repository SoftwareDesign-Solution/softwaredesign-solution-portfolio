/**
 * @file quote-request-form-default-values.ts
 * @description Initialwerte für das react-hook-form-Angebotsanfrage-Formular.
 * @module components/forms/quote-request/quote-request-form-default-values
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type QuoteRequestFormData } from "@/schemas/quote-request.schema";

/**
 * Liefert die leeren Initialwerte für das Angebotsanfrage-Formular (react-hook-form `defaultValues`).
 * `termin: null` erlaubt das Absenden auch ohne Terminauswahl (bei Workshops ohne Termine).
 *
 * @returns Die Default-Werte für {@link QuoteRequestFormData}
 */
export function getQuoteRequestFormDefaultValues():
    QuoteRequestFormData {
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
        consent: false,
        nachricht: "",
        teilnehmerzahl: 1,
        termin: null,
        turnstile: {
            token: "",
        },
        webseite: "",
    };
}