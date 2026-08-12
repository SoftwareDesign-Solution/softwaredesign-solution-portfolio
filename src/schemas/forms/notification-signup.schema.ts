import { z } from "zod";

export const notificationSignupFormSchema = z.object({
    vorname: z.string().min(1, { message: "Bitte geben Sie Ihren Vornamen ein." }),
    nachname: z.string().min(1, { message: "Bitte geben Sie Ihren Nachnamen ein." }),
    email: z.email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
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