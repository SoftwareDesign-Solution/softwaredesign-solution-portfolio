/**
 * @file teilnehmer.schema.ts
 * @description Zod-Schema für einen einzelnen Workshop-Teilnehmer bei der Buchung.
 * @module schemas/shared/teilnehmer
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import z from "zod";

/** Validierung für einen einzelnen Workshop-Teilnehmer bei der Buchung. */
export const teilnehmerSchema = z.object({
    vorname: z.string().min(1, "Bitte geben Sie den Vornamen an."),
    nachname: z.string().min(1, "Bitte geben Sie den Nachnamen an."),
    email: z.string().email("Ungültige E-Mail-Adresse"),
});

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type TeilnehmerFormData = z.infer<typeof teilnehmerSchema>;