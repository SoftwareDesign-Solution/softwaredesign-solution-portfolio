import { z } from "zod";

import { addressSchema } from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { turnstileSchema } from "./shared/turnstile-schema";

const MAX_MESSAGE_LENGTH = 4_000;
const MIN_MESSAGE_LENGTH = 20;

const websiteSchema = z
    .string()
    .trim()
    .optional();

const messageSchema = z
    .string()
    .trim()
    .min(
        MIN_MESSAGE_LENGTH,
        `Die Beschreibung muss mindestens ${MIN_MESSAGE_LENGTH} Zeichen enthalten.`,
    )
    .max(
        MAX_MESSAGE_LENGTH,
        `Die Beschreibung darf maximal ${MAX_MESSAGE_LENGTH} Zeichen lang sein.`,
    );

const sourceSchema = z
    .string()
    .trim()
    .optional();

const dataProcessingConsentSchema = z
    .boolean()
    .refine((value) => value, {
        message:
            "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.",
    });

const contactRequestFields = {
    adresse: addressSchema,

    ansprechpartner:
        contactPersonSchema,

    bereitsKunde:
        z.boolean(),

    nachricht:
        messageSchema,

    source:
        sourceSchema,

    webseite:
        websiteSchema,
};

const verificationFields = {
    acceptDataProcessing:
        dataProcessingConsentSchema,

    turnstile:
        turnstileSchema,
};

const contactRequestBaseSchema = z.object({
    ...contactRequestFields,
});

export const contactRequestFormSchema = z.object({
    ...contactRequestFields,
    ...verificationFields,
});

export const sendContactRequestSchema = z.object({
    ...contactRequestFields,
    ...verificationFields,
});

export const sendContactRequestEmailSchema =
    contactRequestBaseSchema;

export type ContactRequestFormData = z.output<
    typeof contactRequestFormSchema
>;

export type SendContactRequestData = z.output<
    typeof sendContactRequestSchema
>;

export type SendContactRequestEmailData = z.output<
    typeof sendContactRequestEmailSchema
>;