/**
 * @file contact-request-form-default-values.ts
 * @description Initialwerte für das react-hook-form-Kontaktformular.
 * @module components/forms/contact-request/contact-request-form-default-values
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type ContactRequestFormData } from "@/schemas/contact-request.schema";

/**
 * Liefert die leeren Initialwerte für das allgemeine Kontaktformular (react-hook-form `defaultValues`).
 *
 * @returns Die Default-Werte für {@link ContactRequestFormData}
 */
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
