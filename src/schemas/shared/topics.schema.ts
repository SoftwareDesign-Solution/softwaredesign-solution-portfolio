/**
 * @file topics.schema.ts
 * @description Zod-Schemas für die Themenauswahl der Angebotsanfrage: Formularfelder
 * (abgewählte Themen als Positionen, Wunschthemen) und die gespeicherte Momentaufnahme.
 * @module schemas/shared/topics
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

/** Position eines Themas in der Agenda: [Tag-Index, Thema-Index], jeweils ab 0. */
export const topicsPositionSchema = z.tuple([
    z.number().int().min(0),
    z.number().int().min(0),
]);

/**
 * Formularfelder der Themenauswahl. Es werden nur die Positionen der abgewählten
 * Themen übertragen, die Titel ermittelt der Server aus der Agenda in der Datenbank.
 */
export const topicsFormFields = {
    themenAbgewaehlt: z
        .array(topicsPositionSchema)
        .max(200),

    wunschthemen: z
        .string()
        .trim()
        .max(1000, "Bitte fassen Sie Ihre Wunschthemen etwas kürzer.")
        .optional(),
};

/** Momentaufnahme der Themenauswahl, wie sie in `angebotsanfrage.themen` gespeichert wird. */
export const topicsAuswahlSchema = z.object({
    angepasst: z.boolean(),
    gesamt: z.number().int(),
    gewaehlt: z.number().int(),
    tage: z.array(
        z.object({
            themen: z.array(
                z.object({
                    gewaehlt: z.boolean(),
                    titel: z.string(),
                }),
            ),
            titel: z.string(),
        }),
    ),
    wunschthemen: z.string().nullable(),
});

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type TopicsPosition = z.infer<typeof topicsPositionSchema>;
export type TopicsAuswahl = z.infer<typeof topicsAuswahlSchema>;