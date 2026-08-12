import { z } from "zod";
import { turnstileSchema } from "./shared/turnstile-schema";

export const notificationSignupFormSchema = z.object({
    vorname: z.string().min(1, { message: "Bitte geben Sie Ihren Vornamen ein." }),
    nachname: z.string().min(1, { message: "Bitte geben Sie Ihren Nachnamen ein." }),
    email: z.email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),

    // Turnstile token
    turnstile: turnstileSchema,
    
});

export const notificationSignupSchema = notificationSignupFormSchema.extend({
    
    // Additional fields for the notification signup schema
    workshop: z.object({
        id: z.number(),
        titel: z.string(),
    }),

});

export type NotificationSignupFormData = z.infer<typeof notificationSignupFormSchema>;
export type NotificationSignupData = z.infer<typeof notificationSignupSchema>;