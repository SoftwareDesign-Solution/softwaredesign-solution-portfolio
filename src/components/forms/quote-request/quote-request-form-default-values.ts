import { type QuoteRequestFormData } from "@/schemas/quote-request.schema";

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