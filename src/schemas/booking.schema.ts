import { z } from "zod";
import { workshopSchema } from "./shared/workshop.schema";
import { terminSchema } from "./shared/termin.schema";
import { turnstileSchema } from "./shared/turnstile-schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { addressSchema, optionalAddressSchema } from "./shared/address.schema";
import { teilnehmerSchema } from "./shared/teilnehmer.schema";


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

// Base schema for workshop booking
const bookingBaseSchema = z.object({

    // Workshop
    workshop: workshopSchema,

    // Termin
    termin: terminSchema
        .nullable()
        .refine((termin): boolean => termin !== null, "Bitte wählen Sie einen Termin aus"),

    // Teilnehmeranzahl
    teilnehmerzahl: z.number().min(1, "Bitte geben Sie die Teilnehmeranzahl an"),

    // Adresse
    adresse: addressSchema,

    // Webseite
    webseite: z.string().trim().optional(),

    // Ansprechpartner
    ansprechpartner: contactPersonSchema,

    // Teilnehmerliste
    teilnehmer: z.array(
        teilnehmerSchema
    ),

    // Rechnungsadresse
    abweichendeRechnungsadresse: z.boolean().optional(),
    rechnungsadresse: optionalAddressSchema.partial().optional(),

    // Weiteres
    gutscheinCode: z.string().trim().optional(),
    nachricht: z.string().trim().optional(),

});


// Form data schema for workshop booking
export const bookingFormSchema = bookingBaseSchema
    .omit({
        workshop: true
    })
    .extend({

        // Consent
        consent: z.literal(true, { message: "Bitte bestätigen Sie die Datenschutzerklärung." }),

        // Turnstile token
        turnstile: turnstileSchema,

    })
    .superRefine(validateBillingAddress);


// Server Action data schema for workshop booking
export const createBookingSchema = bookingBaseSchema
    .extend({

        // Consent
        consent: z.literal(true, { message: "Bitte bestätigen Sie die Datenschutzerklärung." }),

        // Turnstile token
        turnstile: turnstileSchema,

    })
    .superRefine(validateBillingAddress);


// E-Mail data schema for workshop booking
export const sendBookingConfirmationEmailSchema = bookingBaseSchema.extend({

    // Anrede
    salutation: z.string().trim().optional(),
    
    // Gesamtpreis
    gesamtpreis: z.number().min(0, "Der Gesamtpreis muss eine positive Zahl sein."),

});


// TypeScript types for the schemas
export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type CreateBookingData = z.infer<typeof createBookingSchema>;
export type SendBookingConfirmationEmailData = z.infer<typeof sendBookingConfirmationEmailSchema>;