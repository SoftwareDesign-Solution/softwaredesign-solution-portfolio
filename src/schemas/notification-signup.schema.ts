import { z } from "zod";
import { turnstileSchema } from "./shared/turnstile-schema";
import { workshopSchema } from "./shared/workshop.schema";


// Base schema for notification signup
export const notificationSignupBaseSchema = z.object({

    // Additional fields for the notification signup schema
    workshop: workshopSchema,

    vorname: z.string().trim().min(1, { message: "Bitte geben Sie Ihren Vornamen ein." }),
    nachname: z.string().trim().min(1, { message: "Bitte geben Sie Ihren Nachnamen ein." }),
    email: z.email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),

});


// Form data schema for notification signup
export const notificationSignupFormSchema = notificationSignupBaseSchema.omit({
    workshop: true
}).extend({
    
    // Turnstile token
    turnstile: turnstileSchema,
    
});


// Server Action data schema for notification signup
export const createNotificationSignupSchema = notificationSignupBaseSchema.extend({
    turnstile: turnstileSchema,
});


// E-Mail data schema for notification signup
export const sendNotificationSignupOptInEmailSchema = notificationSignupBaseSchema.extend({
    
    // Expiration period
    expiresInDay: z.number().int().positive({ message: "Die Anzahl der Tage muss eine positive ganze Zahl sein." }),
    
    // Confirmation link
    confirmationLink: z.url({ message: "Bitte geben Sie einen gültigen Bestätigungslink ein." }),

});

export const sendNotificationSignupConfirmedEmailSchema = z.object({

    // Workshop
    workshop: workshopSchema,

    // Unsubscribe link
    unsubscribeLink: z.url({ message: "Bitte geben Sie einen gültigen Abmeldelink ein." }),

});


// TypeScript types for the schemas
export type NotificationSignupFormData = z.infer<typeof notificationSignupFormSchema>;
export type CreateNotificationSignupData = z.infer<typeof createNotificationSignupSchema>;
export type SendNotificationSignupOptInEmailData = z.infer<typeof sendNotificationSignupOptInEmailSchema>;
export type SendNotificationSignupConfirmedEmailData = z.infer<typeof sendNotificationSignupConfirmedEmailSchema>;