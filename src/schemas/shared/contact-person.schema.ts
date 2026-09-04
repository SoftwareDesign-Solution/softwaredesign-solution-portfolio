/**
 * @file contact-person.schema.ts
 * @description Zod-Schema für die Ansprechpartner-Daten in Formularen.
 * @module schemas/shared/contact-person
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

/** Validierung für die Ansprechpartner-Daten in Formularen (Anrede, Name, E-Mail, Telefon). */
export const contactPersonSchema = z.object({
    anrede: z.enum(["Frau", "Herr", "Divers", "Keine Angabe"], {
        error: "Pflichtfeld",
    }),
    vorname: z.string().trim().min(1, "Pflichtfeld"),
    nachname: z.string().trim().min(1, "Pflichtfeld"),
    email: z.string().trim().email("Ungültige E-Mail-Adresse"), // Bitte gültige E-Mail.
    telefon: z.string().trim().optional(),
});

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type ContactPersonFormData = z.infer<typeof contactPersonSchema>;