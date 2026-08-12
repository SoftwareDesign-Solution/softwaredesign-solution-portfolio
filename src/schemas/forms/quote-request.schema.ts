import { z } from "zod";
import { addressSchema, optionalAddressSchema } from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { terminSchema } from "./shared/termin.schema";
import { turnstileSchema } from "./shared/turnstile-schema";

export const quoteRequestFormSchema = z.object({
    
    // Wprlshop-Termin
    //datum: z.string(),//.min(1, "Bitte wählen Sie einen Termin aus"),
    /*
    termin: z.object({
        id: z.number(),
        datumVon: z.string(),
        datumBis: z.string(),
    }),
    */
   termin: terminSchema
    .nullable()
    .refine((termin): boolean => termin !== null, "Bitte wählen Sie einen Termin aus"),

    // Teilnehmeranzahl
    teilnehmerzahl: z.number().min(1, "Bitte geben Sie die Teilnehmeranzahl an"),

    // Adresse
    adresse: addressSchema,
    webseite: z.string().optional(),

    // Ansprechpartner
    ansprechpartner: contactPersonSchema,

    // Rechnungsadresse
    abweichendeRechnungsadresse: z.boolean().optional(),
    rechnungsadresse: optionalAddressSchema.partial().optional(),
    
    // Weiteres
    notizen: z.string().optional(),

    // Consent
    consent: z.boolean(),

    // Turnstile token
    turnstile: turnstileSchema,

})
.superRefine((data, ctx) => {
    //if (data.hasDifferentBillingAddress && !data.billingAddress) {
    if (data.abweichendeRechnungsadresse) {

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
});

export const quoteRequestSchema = quoteRequestFormSchema.extend({
    
    // Additional fields for the quote request schema
    workshop: z.object({
        id: z.number(),
        titel: z.string(),
    }),

    summary: z.object({
        preis: z.number().nonnegative(),
        teilnehmerzahl: z.number().min(1),
        zwischensumme: z.number().nonnegative(),
        umsatzsteuer: z.number().nonnegative(),
        gesamtbetrag: z.number().nonnegative(),
    })

});

export type QuoteRequestFormData = z.infer<typeof quoteRequestFormSchema>;
export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;