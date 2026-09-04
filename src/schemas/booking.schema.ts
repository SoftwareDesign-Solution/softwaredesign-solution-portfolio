/**
 * @file booking.schema.ts
 * @description Zod-Schemas für die verbindliche Workshop-Buchung: Formulareingaben,
 * Server-Action-Eingaben sowie die Daten für die Buchungsbestätigungs-E-Mail.
 * Rechnungsadress-Validierung wird über {@link billingAddressSchema} beigemischt.
 * @module schemas/booking
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

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

/** Zustimmung zur Datenschutzerklärung: muss `true` sein, sonst Validierungsfehler. */
const consentSchema = z
    .boolean()
    .refine((value) => value, {
        message:
            "Bitte bestätigen Sie die Datenschutzerklärung.",
    });

/** Termin-Auswahl: `null` (nichts ausgewählt) wird als Validierungsfehler abgelehnt. */
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

/** Teilnehmeranzahl: positive Ganzzahl. */
const participantCountSchema = z
    .number()
    .int(
        "Die Teilnehmeranzahl muss eine ganze Zahl sein.",
    )
    .positive(
        "Bitte geben Sie die Teilnehmeranzahl an.",
    );

/** Gesamtpreis der Buchung: darf nicht negativ sein. */
const totalPriceSchema = z
    .number()
    .nonnegative(
        "Der Gesamtpreis darf nicht negativ sein.",
    );

/** Kernfelder der Buchung, unabhängig von Formular/Server-Action/E-Mail-Kontext */
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

/**
 * Sicherheitsfelder, die nur bei der eigentlichen Formular-/Server-Action-Validierung
 * benötigt werden, nicht aber beim Versand der Bestätigungs-E-Mail
 */
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

/**
 * Validierung der Formulareingaben im Frontend (ohne `workshop`, kommt aus dem
 * Seitenkontext), inkl. bedingter Rechnungsadress-Prüfung über {@link billingAddressSchema}.
 */
export const bookingFormSchema =
    bookingFormBaseSchema.and(
        billingAddressSchema,
    );

/** Validierung der Daten, die die Server Action beim Anlegen der Buchung erhält. */
export const createBookingSchema =
    createBookingBaseSchema.and(
        billingAddressSchema,
    );

/** Validierung der Daten für den Versand der Buchungsbestätigungs-E-Mail (inkl. berechnetem Gesamtpreis). */
export const sendBookingConfirmationEmailSchema =
    bookingConfirmationEmailBaseSchema.and(
        billingAddressSchema,
    );

// TypeScript-Typen, aus den obigen Schemas abgeleitet
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