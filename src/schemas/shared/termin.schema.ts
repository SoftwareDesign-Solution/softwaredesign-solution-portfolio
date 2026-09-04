/**
 * @file termin.schema.ts
 * @description Zod-Schema für einen im Formular ausgewählten Workshop-Termin.
 * @module schemas/shared/termin
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import z from "zod";

/** Minimalvalidierung eines im Formular ausgewählten Workshop-Termins. */
export const terminSchema = z.object({
    id: z.number(),
    datumVon: z.string(),
    datumBis: z.string(),
});

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type TerminFormData = z.infer<typeof terminSchema>;