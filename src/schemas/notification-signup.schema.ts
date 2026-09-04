/**
 * @file notification-signup.schema.ts
 * @description Zod-Schemas für die Workshop-Benachrichtigungs-Anmeldung (Double-Opt-In):
 * Formulareingaben, Server-Action-Eingaben sowie die Daten für Opt-In- und
 * Bestätigungs-E-Mails.
 * @module schemas/notification-signup
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

import { turnstileSchema } from "./shared/turnstile-schema";
import { workshopSchema } from "./shared/workshop.schema";

/** Vorname: Pflichtfeld, wird getrimmt. */
const firstNameSchema = z
    .string()
    .trim()
    .min(1, {
        message:
            "Bitte geben Sie Ihren Vornamen ein.",
    });

/** Nachname: Pflichtfeld, wird getrimmt. */
const lastNameSchema = z
    .string()
    .trim()
    .min(1, {
        message:
            "Bitte geben Sie Ihren Nachnamen ein.",
    });

/** E-Mail-Adresse: wird getrimmt und als gültige E-Mail validiert. */
const emailSchema = z
    .string()
    .trim()
    .pipe(
        z.email({
            message:
                "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        }),
    );

/** Gültigkeitsdauer des Bestätigungslinks in Tagen (positive Ganzzahl). */
const expirationDaysSchema = z
    .number()
    .int()
    .positive({
        message:
            "Die Anzahl der Tage muss eine positive ganze Zahl sein.",
    });

/** Link, über den der Nutzer die Anmeldung bestätigt. */
const confirmationLinkSchema = z.url({
    message:
        "Bitte geben Sie einen gültigen Bestätigungslink ein.",
});

/** Link, über den der Nutzer die Benachrichtigung wieder abbestellen kann. */
const unsubscribeLinkSchema = z.url({
    message:
        "Bitte geben Sie einen gültigen Abmeldelink ein.",
});

/** Kernfelder, die in (fast) jeder Variante des Schemas vorkommen */
const notificationSignupFields = {
    email: emailSchema,
    nachname: lastNameSchema,
    vorname: firstNameSchema,
};

/**
 * Sicherheitsfelder, die nur bei der eigentlichen Formular-/Server-Action-Validierung
 * benötigt werden, nicht aber beim Versand der E-Mails
 */
const verificationFields = {
    turnstile: turnstileSchema,
};

/** Basisfelder für die Workshop-Benachrichtigungs-Anmeldung, ohne Turnstile. */
export const notificationSignupBaseSchema = z.object({
    workshop: workshopSchema,
    ...notificationSignupFields,
});

/**
 * Validierung der Formulareingaben im Frontend. `workshop` wird hier weggelassen,
 * da es im Formular nicht vom Nutzer eingegeben, sondern aus dem Kontext (Seite) übernommen wird.
 */
export const notificationSignupFormSchema = z.object({
    ...notificationSignupFields,
    ...verificationFields,
});

/** Validierung der Daten, die die Server Action zum Anlegen einer Anmeldung erhält. */
export const createNotificationSignupSchema = z.object({
    workshop: workshopSchema,
    ...notificationSignupFields,
    ...verificationFields,
});

/** Validierung der Daten für den Versand der Opt-In-Bestätigungs-E-Mail. */
export const sendNotificationSignupOptInEmailSchema =
    notificationSignupBaseSchema.extend({
        confirmationLink:
            confirmationLinkSchema,

        expiresInDays:
            expirationDaysSchema,
    });

/** Validierung der Daten für den Versand der Bestätigungs-E-Mail nach erfolgreichem Opt-In. */
export const sendNotificationSignupConfirmedEmailSchema =
    notificationSignupBaseSchema.extend({
        unsubscribeLink:
            unsubscribeLinkSchema,
    });

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type NotificationSignupFormData = z.output<
    typeof notificationSignupFormSchema
>;

export type CreateNotificationSignupData = z.output<
    typeof createNotificationSignupSchema
>;

export type SendNotificationSignupOptInEmailData =
    z.output<
        typeof sendNotificationSignupOptInEmailSchema
    >;

export type SendNotificationSignupConfirmedEmailData =
    z.output<
        typeof sendNotificationSignupConfirmedEmailSchema
    >;