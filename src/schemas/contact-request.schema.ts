/**
 * @file contact-request.schema.ts
 * @description Zod-Schemas für das allgemeine Kontaktformular (/anfrage-Seite):
 * Formulareingaben, Server-Action-Eingaben sowie die Daten für die interne
 * Benachrichtigungs-E-Mail.
 * @module schemas/contact-request
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

import { addressSchema } from "./shared/address.schema";
import { contactPersonSchema } from "./shared/contact-person.schema";
import { turnstileSchema } from "./shared/turnstile-schema";

const MAX_MESSAGE_LENGTH = 4_000;
const MIN_MESSAGE_LENGTH = 20;

/** Webseite des Anfragenden: frei, optional. */
const websiteSchema = z
    .string()
    .trim()
    .optional();

/** Freitext-Nachricht: Pflichtfeld mit Mindest-/Maximallänge. */
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

/** Herkunftsquelle der Anfrage (z.B. "Google", "Empfehlung"): frei, optional. */
const sourceSchema = z
    .string()
    .trim()
    .optional();

/** Zustimmung zur Datenverarbeitung: muss `true` sein, sonst Validierungsfehler. */
const dataProcessingConsentSchema = z
    .boolean()
    .refine((value) => value, {
        message:
            "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.",
    });

/** Kernfelder der Kontaktanfrage, unabhängig von Formular/E-Mail-Kontext */
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

/**
 * Sicherheitsfelder, die nur bei der eigentlichen Formular-/Server-Action-Validierung
 * benötigt werden, nicht aber beim Versand der internen Benachrichtigungs-E-Mail
 */
const verificationFields = {
    acceptDataProcessing:
        dataProcessingConsentSchema,

    turnstile:
        turnstileSchema,
};

/** Basisfelder einer Kontaktanfrage (Firma, Ansprechpartner, Nachricht). */
const contactRequestBaseSchema = z.object({
    ...contactRequestFields,
});

/** Validierung der Formulareingaben im Frontend inkl. Datenschutz-Zustimmung und Turnstile. */
export const contactRequestFormSchema = z.object({
    ...contactRequestFields,
    ...verificationFields,
});

/** Validierung der Daten, die die Server Action beim Absenden erhält (identisch zum Formular-Schema). */
export const sendContactRequestSchema = z.object({
    ...contactRequestFields,
    ...verificationFields,
});

/** Validierung der Daten für den Versand der internen Benachrichtigungs-E-Mail (ohne Zustimmung/Turnstile). */
export const sendContactRequestEmailSchema =
    contactRequestBaseSchema;

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type ContactRequestFormData = z.output<
    typeof contactRequestFormSchema
>;

export type SendContactRequestData = z.output<
    typeof sendContactRequestSchema
>;

export type SendContactRequestEmailData = z.output<
    typeof sendContactRequestEmailSchema
>;