import { type ContactRequestFormData } from "@/schemas/contact-request.schema";

export function getContactRequestFormDefaultValues():
    ContactRequestFormData {
    return {
        acceptDataProcessing: false,

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

        bereitsKunde: false,
        nachricht: "",
        source: "None",

        turnstile: {
            token: "",
        },

        webseite: "",
    };
}
