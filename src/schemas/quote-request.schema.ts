import { z } from "zod";

import { addressSchema, optionalAddressSchema } from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { terminSchema } from "./shared/termin.schema";
import { turnstileSchema } from "./shared/turnstile-schema";
import { workshopSchema } from "./shared/workshop.schema";


type BillingAddressData = {
    abweichendeRechnungsadresse?: boolean;
    rechnungsadresse?: unknown;
};

function validateBillingAddress(
    data: BillingAddressData,
    ctx: z.RefinementCtx
) {
    if (!data.abweichendeRechnungsadresse) {
        return;
    }

    const result = addressSchema.safeParse(data.rechnungsadresse);

    if (result.success) {
        return;
    }

    for (const issue of result.error.issues) {
        ctx.addIssue({
            ...issue,
            path: ["rechnungsadresse", ...issue.path],
        });
    }
}


// Base schema for quote request
export const quoteRequestBaseSchema = z.object({

    // Workshop
    workshop: workshopSchema,

    /*
    // Termin
    termin: terminSchema
        .nullable()
        .refine((termin): boolean => termin !== null, "Bitte wählen Sie einen Termin aus"),
    */

    termin: terminSchema.nullable(),

    // Teilnehmeranzahl
    teilnehmerzahl: z.number().min(1, "Bitte geben Sie die Teilnehmeranzahl an"),

    // Adresse
    adresse: addressSchema,

    // Webseite
    webseite: z.string().trim().optional(),

    // Ansprechpartner
    ansprechpartner: contactPersonSchema,

    // Rechnungsadresse
    abweichendeRechnungsadresse: z.boolean().optional(),
    rechnungsadresse: optionalAddressSchema.partial().optional(),

    // Weiteres
    nachricht: z.string().trim().optional(),

});


export const quoteRequestConfirmedSchema = quoteRequestBaseSchema;

/*
// Form data schema for quote request
export const quoteRequestFormSchema = quoteRequestBaseSchema
    .omit({
        workshop: true
    }).extend({

        // Consent
        consent: z.literal(true, { message: "Bitte bestätigen Sie die Datenschutzerklärung." }),

        // Turnstile token
        turnstile: turnstileSchema,

    })
    .superRefine(validateBillingAddress);
*/

// Form data schema for quote request
//
// `hasTermine` steuert, ob ein Termin verpflichtend ausgewählt werden muss:
// Ist der Workshop aktuell ohne Termine, kann das Angebot auch ohne
// Termin-Auswahl angefordert werden (Termin wird dann später abgestimmt).
// Sobald Termine verfügbar sind, bleibt die Auswahl Pflicht.
export function createQuoteRequestFormSchema(hasTermine: boolean) {
    return quoteRequestBaseSchema
        .omit({
            workshop: true
        }).extend({

            // Consent
            consent: z.literal(true, { message: "Bitte bestätigen Sie die Datenschutzerklärung." }),

            // Turnstile token
            turnstile: turnstileSchema,

        })
        .superRefine((data, ctx) => {

            validateBillingAddress(data, ctx);

            if (hasTermine && data.termin === null) {
                ctx.addIssue({
                    code: "custom",
                    path: ["termin"],
                    message: "Bitte wählen Sie einen Termin aus",
                });
            }

        });
}

// Standard-Export für Typinferenz und Stellen ohne Kenntnis der Termin-Verfügbarkeit
// (Struktur ist in beiden Fällen identisch, nur die Pflicht-Prüfung unterscheidet sich zur Laufzeit).
export const quoteRequestFormSchema = createQuoteRequestFormSchema(true);


// Server Action data schema for quote request
export const createQuoteRequestSchema = quoteRequestBaseSchema
    .extend({

        // Consent
        consent: z.literal(true, { message: "Bitte bestätigen Sie die Datenschutzerklärung." }),

        // Turnstile token
        turnstile: turnstileSchema,

    })
    .superRefine(validateBillingAddress);


// E-Mail data schema for quote request
export const sendQuoteRequestOptInEmailSchema = quoteRequestBaseSchema.omit({
    webseite: true,
    nachricht: true,
}).extend({

    // Anrede
    salutation: z.string().trim().min(1, { message: "Bitte geben Sie eine Anrede ein." }),

    // Bestätigungslink
    confirmationLink: z.url({ message: "Bitte geben Sie einen gültigen Bestätigungslink ein." }),

});

export const sendQuoteRequestEmailSchema = quoteRequestBaseSchema;


// TypeScript types for the schemas
export type QuoteRequestFormData = z.infer<typeof quoteRequestFormSchema>;
export type CreateQuoteRequestData = z.infer<typeof createQuoteRequestSchema>;
export type SendQuoteRequestOptInEmailData = z.infer<typeof sendQuoteRequestOptInEmailSchema>;
export type SendQuoteRequestEmailData = z.infer<typeof sendQuoteRequestEmailSchema>;
export type QuoteRequestConfirmedData = z.infer<typeof quoteRequestConfirmedSchema>;