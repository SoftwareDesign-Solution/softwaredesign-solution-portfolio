import { z } from "zod";

export const contactPersonSchema = z.object({
    anrede: z.enum(["Frau", "Herr", "Divers", "Keine Angabe"], {
        error: "Pflichtfeld",
    }),
    vorname: z.string().trim().min(1, "Pflichtfeld"),
    nachname: z.string().trim().min(1, "Pflichtfeld"),
    email: z.string().trim().email("Ungültige E-Mail-Adresse"), // Bitte gültige E-Mail.
    telefon: z.string().trim().optional(),
});

export type ContactPersonFormData = z.infer<typeof contactPersonSchema>;