/**
 * @file workshop.schema.ts
 * @description Zod-Schema für den im Formular referenzierten Workshop.
 * @module schemas/shared/workshop
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

/** Minimalvalidierung des im Formular referenzierten Workshops. */
export const workshopSchema = z.object({
    id: z.number(),
    titel: z.string(),
});