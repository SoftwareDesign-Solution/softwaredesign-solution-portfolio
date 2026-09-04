import { z } from "zod";

import { turnstileSchema } from "./shared/turnstile-schema";
import { workshopSchema } from "./shared/workshop.schema";

const firstNameSchema = z
    .string()
    .trim()
    .min(1, {
        message:
            "Bitte geben Sie Ihren Vornamen ein.",
    });

const lastNameSchema = z
    .string()
    .trim()
    .min(1, {
        message:
            "Bitte geben Sie Ihren Nachnamen ein.",
    });

const emailSchema = z
    .string()
    .trim()
    .pipe(
        z.email({
            message:
                "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        }),
    );

const expirationDaysSchema = z
    .number()
    .int()
    .positive({
        message:
            "Die Anzahl der Tage muss eine positive ganze Zahl sein.",
    });

const confirmationLinkSchema = z.url({
    message:
        "Bitte geben Sie einen gültigen Bestätigungslink ein.",
});

const unsubscribeLinkSchema = z.url({
    message:
        "Bitte geben Sie einen gültigen Abmeldelink ein.",
});

const notificationSignupFields = {
    email: emailSchema,
    nachname: lastNameSchema,
    vorname: firstNameSchema,
};

const verificationFields = {
    turnstile: turnstileSchema,
};

export const notificationSignupBaseSchema = z.object({
    workshop: workshopSchema,
    ...notificationSignupFields,
});

export const notificationSignupFormSchema = z.object({
    ...notificationSignupFields,
    ...verificationFields,
});

export const createNotificationSignupSchema = z.object({
    workshop: workshopSchema,
    ...notificationSignupFields,
    ...verificationFields,
});

export const sendNotificationSignupOptInEmailSchema =
    notificationSignupBaseSchema.extend({
        confirmationLink:
            confirmationLinkSchema,

        expiresInDays:
            expirationDaysSchema,
    });

export const sendNotificationSignupConfirmedEmailSchema =
    notificationSignupBaseSchema.extend({
        unsubscribeLink:
            unsubscribeLinkSchema,
    });

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