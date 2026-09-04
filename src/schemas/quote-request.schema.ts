/**
 * @file quote-request.schema.ts
 * @description Zod-Schemas für die unverbindliche Angebotsanfrage: Formulareingaben
 * (inkl. bedingter Termin-Pflicht, falls der Workshop Termine hat), Server-Action-
 * Eingaben sowie die Daten für Opt-In- und Benachrichtigungs-E-Mails.
 * @module schemas/quote-request
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

import {
    addressSchema,
    optionalAddressSchema,
} from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { terminSchema } from "./shared/termin.schema";
import { turnstileSchema } from "./shared/turnstile-schema";
import { workshopSchema } from "./shared/workshop.schema";

/** Minimal-Shape, das {@link validateBillingAddress} für die Rechnungsadress-Prüfung benötigt. */
type BillingAddressData = {
    abweichendeRechnungsadresse: boolean;
    rechnungsadresse?: unknown;
};

/** Zustimmung zur Datenschutzerklärung: muss `true` sein, sonst Validierungsfehler. */
const consentSchema = z
    .boolean()
    .refine((value) => value, {
        message:
            "Bitte bestätigen Sie die Datenschutzerklärung.",
    });

/** Teilnehmeranzahl: positive Ganzzahl. */
const participantCountSchema = z
    .number()
    .int("Die Teilnehmeranzahl muss eine ganze Zahl sein.")
    .positive(
        "Bitte geben Sie die Teilnehmeranzahl an.",
    );

/** Anrede für die Opt-In-E-Mail (z.B. "Sehr geehrte Frau Mustermann"). */
const salutationSchema = z
    .string()
    .trim()
    .min(1, {
        message: "Bitte geben Sie eine Anrede ein.",
    });

/** Link, über den die Angebotsanfrage per Double-Opt-In bestätigt wird. */
const confirmationLinkSchema = z.url({
    message:
        "Bitte geben Sie einen gültigen Bestätigungslink ein.",
});

/** Kernfelder der Angebotsanfrage, unabhängig von Formular/Server-Action/E-Mail-Kontext */
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

    // nullable, da bei Workshops ohne Termine keine Auswahl möglich ist
    // (Pflicht wird bedingt über validateAppointmentSelection geprüft)
    termin: terminSchema.nullable(),

    webseite: z
        .string()
        .trim()
        .optional(),
};

/**
 * Sicherheitsfelder, die nur bei der eigentlichen Formular-/Server-Action-Validierung
 * benötigt werden, nicht aber beim Versand der E-Mails
 */
const verificationFields = {
    consent: consentSchema,
    turnstile: turnstileSchema,
};

/** Basisfelder einer Angebotsanfrage: Workshop, Termin, Teilnehmerzahl, Adressen. */
export const quoteRequestBaseSchema = z.object({
    workshop: workshopSchema,
    ...quoteRequestFields,
});

/** Validierung der Daten nach Bestätigung der Angebotsanfrage (Opt-In-Klick). */
export const quoteRequestConfirmedSchema =
    quoteRequestBaseSchema.extend({
        rechnungsadresse: optionalAddressSchema
            .partial()
            .nullable()
            .optional(),
    });

/**
 * Erzeugt das Zod-Schema für die Formulareingaben im Frontend (ohne `workshop`,
 * kommt aus dem Seitenkontext). Die Termin-Pflicht ist bedingt: nur wenn der
 * Workshop überhaupt Termine anbietet, muss auch einer ausgewählt sein.
 *
 * @param hasTermine - Ob der angefragte Workshop mindestens einen Termin hat
 * @returns Ein Zod-Schema mit Termin- und Rechnungsadress-Validierung
 */
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

/** Validierung der Daten, die die Server Action beim Anlegen der Angebotsanfrage erhält. */
export const createQuoteRequestSchema = z
    .object({
        workshop: workshopSchema,
        ...quoteRequestFields,
        ...verificationFields,
    })
    .superRefine(validateBillingAddress);

/**
 * Validierung der Daten für den Versand der Opt-In-E-Mail. `webseite` und `nachricht`
 * werden hier nicht benötigt, dafür eine passende Anrede sowie der Bestätigungslink.
 */
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

/** Validierung der Daten für den Versand der internen Benachrichtigungs-E-Mail. */
export const sendQuoteRequestEmailSchema =
    quoteRequestConfirmedSchema;

// TypeScript-Typen, aus den obigen Schemas abgeleitet
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