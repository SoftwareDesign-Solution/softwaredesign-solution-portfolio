import { z } from "zod";

import {
    addressSchema,
    billingAddressSchema,
} from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { teilnehmerSchema } from "./shared/teilnehmer.schema";
import { terminSchema } from "./shared/termin.schema";
import { turnstileSchema } from "./shared/turnstile-schema";
import { workshopSchema } from "./shared/workshop.schema";

const consentSchema = z
    .boolean()
    .refine((value) => value, {
        message:
            "Bitte bestätigen Sie die Datenschutzerklärung.",
    });

const bookingAppointmentSchema = terminSchema
    .nullable()
    .transform((termin, ctx) => {
        if (termin === null) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Bitte wählen Sie einen Termin aus.",
            });

            return z.NEVER;
        }

        return termin;
    });

const participantCountSchema = z
    .number()
    .int(
        "Die Teilnehmeranzahl muss eine ganze Zahl sein.",
    )
    .positive(
        "Bitte geben Sie die Teilnehmeranzahl an.",
    );

const totalPriceSchema = z
    .number()
    .nonnegative(
        "Der Gesamtpreis darf nicht negativ sein.",
    );

const bookingFields = {
    adresse: addressSchema,

    ansprechpartner:
        contactPersonSchema,

    gutscheinCode: z
        .string()
        .trim()
        .optional(),

    nachricht: z
        .string()
        .trim()
        .optional(),

    teilnehmer: z
        .array(teilnehmerSchema)
        .min(
            1,
            "Bitte geben Sie mindestens einen Teilnehmer an.",
        ),

    teilnehmerzahl:
        participantCountSchema,

    termin:
        bookingAppointmentSchema,

    webseite: z
        .string()
        .trim()
        .optional(),
};

const verificationFields = {
    consent:
        consentSchema,

    turnstile:
        turnstileSchema,
};

const bookingFormBaseSchema = z.object({
    ...bookingFields,
    ...verificationFields,
});

const createBookingBaseSchema = z.object({
    workshop: workshopSchema,
    ...bookingFields,
    ...verificationFields,
});

const bookingConfirmationEmailBaseSchema =
    z.object({
        workshop: workshopSchema,
        ...bookingFields,

        gesamtpreis:
            totalPriceSchema,

        salutation: z
            .string()
            .trim()
            .optional(),
    });

export const bookingFormSchema =
    bookingFormBaseSchema.and(
        billingAddressSchema,
    );

export const createBookingSchema =
    createBookingBaseSchema.and(
        billingAddressSchema,
    );

export const sendBookingConfirmationEmailSchema =
    bookingConfirmationEmailBaseSchema.and(
        billingAddressSchema,
    );

export type BookingFormInput = z.input<
    typeof bookingFormSchema
>;

export type BookingFormData = z.output<
    typeof bookingFormSchema
>;

export type CreateBookingData = z.output<
    typeof createBookingSchema
>;

export type SendBookingConfirmationEmailData =
    z.output<
        typeof sendBookingConfirmationEmailSchema
    >;