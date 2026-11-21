/**
 * @file agenda.schema.ts
 * @description Zod-Schema für die Agenda eines Workshops (Spalte `workshop.agenda`).
 * Entspricht dem Schema der Admin-Anwendung, mit der die Agenda gepflegt wird.
 * @module schemas/shared/agenda
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

/** Liste nicht-leerer Strings mit mindestens einem Element. */
const stringListSchema = z
    .array(
        z.string().trim().min(1),
    )
    .min(1, {
        message: "Bitte mindestens ein Element angeben",
    });

/** Ein Agenda-Block (z.B. ein Tag) mit Titel und Inhalten. */
export const agendaSchema = z.object({
    titel: z
        .string()
        .trim()
        .min(1, {
            message: "Titel ist Pflichtfeld",
        }),

    inhalte: stringListSchema,
});

/** Die komplette Agenda eines Workshops. */
export const agendaListSchema = z.array(agendaSchema);
