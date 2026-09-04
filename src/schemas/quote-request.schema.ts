import { z } from "zod";

import {
    addressSchema,
    optionalAddressSchema,
} from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { terminSchema } from "./shared/termin.schema";
import { turnstileSchema } from "./shared/turnstile-schema";
import { workshopSchema } from "./shared/workshop.schema";

type BillingAddressData = {
    abweichendeRechnungsadresse: boolean;
    rechnungsadresse?: unknown;
};

const consentSchema = z
    .boolean()
    .refine((value) => value, {
        message:
            "Bitte bestätigen Sie die Datenschutzerklärung.",
    });

const participantCountSchema = z
    .number()
    .int("Die Teilnehmeranzahl muss eine ganze Zahl sein.")
    .positive(
        "Bitte geben Sie die Teilnehmeranzahl an.",
    );

const salutationSchema = z
    .string()
    .trim()
    .min(1, {
        message: "Bitte geben Sie eine Anrede ein.",
    });

const confirmationLinkSchema = z.url({
    message:
        "Bitte geben Sie einen gültigen Bestätigungslink ein.",
});

const quoteRequestFields = {
    abweichendeRechnungsadresse: z.boolean(),

    adresse: addressSchema,

    ansprechpartner: contactPersonSchema,

    nachricht: z
        .string()
        .trim()
        .optional(),

    rechnungsadresse: optionalAddressSchema
        .partial()
        .optional(),

    teilnehmerzahl: participantCountSchema,

    termin: terminSchema.nullable(),

    webseite: z
        .string()
        .trim()
        .optional(),
};

const verificationFields = {
    consent: consentSchema,
    turnstile: turnstileSchema,
};

export const quoteRequestBaseSchema = z.object({
    workshop: workshopSchema,
    ...quoteRequestFields,
});

export const quoteRequestConfirmedSchema =
    quoteRequestBaseSchema.extend({
        rechnungsadresse: optionalAddressSchema
            .partial()
            .nullable()
            .optional(),
    });

export function createQuoteRequestFormSchema(
    hasTermine: boolean,
) {
    return z
        .object({
            ...quoteRequestFields,
            ...verificationFields,
        })
        .superRefine((data, ctx) => {
            validateBillingAddress(data, ctx);
            validateAppointmentSelection(
                data,
                ctx,
                hasTermine,
            );
        });
}

export const createQuoteRequestSchema = z
    .object({
        workshop: workshopSchema,
        ...quoteRequestFields,
        ...verificationFields,
    })
    .superRefine(validateBillingAddress);

export const sendQuoteRequestOptInEmailSchema =
    quoteRequestBaseSchema
        .omit({
            nachricht: true,
            webseite: true,
        })
        .extend({
            confirmationLink:
                confirmationLinkSchema,

            salutation:
                salutationSchema,
        });

export const sendQuoteRequestEmailSchema =
    quoteRequestConfirmedSchema;

export type QuoteRequestFormInput = z.input<
    ReturnType<typeof createQuoteRequestFormSchema>
>;

export type QuoteRequestFormData = z.output<
    ReturnType<typeof createQuoteRequestFormSchema>
>;

export type CreateQuoteRequestData = z.output<
    typeof createQuoteRequestSchema
>;

export type SendQuoteRequestOptInEmailData =
    z.output<
        typeof sendQuoteRequestOptInEmailSchema
    >;

export type SendQuoteRequestEmailData = z.output<
    typeof sendQuoteRequestEmailSchema
>;

export type QuoteRequestConfirmedData = z.output<
    typeof quoteRequestConfirmedSchema
>;

function validateBillingAddress(
    data: BillingAddressData,
    ctx: z.RefinementCtx,
): void {
    if (!data.abweichendeRechnungsadresse) {
        return;
    }

    const result = addressSchema.safeParse(
        data.rechnungsadresse,
    );

    if (result.success) {
        return;
    }

    for (const issue of result.error.issues) {
        ctx.addIssue({
            ...issue,
            path: [
                "rechnungsadresse",
                ...issue.path,
            ],
        });
    }
}

function validateAppointmentSelection(
    data: {
        termin: z.output<typeof terminSchema> | null;
    },
    ctx: z.RefinementCtx,
    hasTermine: boolean,
): void {
    if (!hasTermine || data.termin !== null) {
        return;
    }

    ctx.addIssue({
        code: "custom",
        message: "Bitte wählen Sie einen Termin aus.",
        path: ["termin"],
    });
}