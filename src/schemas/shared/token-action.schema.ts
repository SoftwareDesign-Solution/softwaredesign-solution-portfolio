/**
 * @file token-action.schema.ts
 * @description Gemeinsames Zod-Schema für alle token-basierten Aktionen
 * (Double-Opt-In-Bestätigung, Abmeldung) über ID + Token aus einem E-Mail-Link.
 * @module schemas/shared/token-action
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

/** Validiert ID und Token, wie sie aus dem Query-Parameter eines E-Mail-Links kommen. */
export const tokenActionSchema = z.object({
    id: z.uuid(),
    token: z
        .string()
        .trim()
        .min(1),
});

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type TokenActionData = z.output<
    typeof tokenActionSchema
>;