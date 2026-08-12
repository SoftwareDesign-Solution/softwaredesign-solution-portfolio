import { z } from "zod";
import { addressSchema } from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { turnstileSchema } from "./shared/turnstile-schema";

export const contactRequestFormSchema = z.object({

    // Unternehmensdaten
    adresse: addressSchema,
    webseite: z.string().optional(),
    bereitsKunde: z.boolean().optional(),

    // Persönliche Daten
    ansprechpartner: contactPersonSchema,

    // Beschreibung
    nachricht: z.string().min(1, "Bitte geben Sie eine Beschreibung an.").max(4000, "Die Beschreibung darf maximal 4000 Zeichen lang sein."),

    source: z.string().optional(),

    acceptDataProcessing: z.boolean().refine((value) => value === true, "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu."),

    // Turnstile token
    turnstile: turnstileSchema,

});

export type ContactRequestFormData = z.infer<typeof contactRequestFormSchema>;