/**
 * @file turnstile-schema.ts
 * @description Zod-Schema zur Validierung des Cloudflare-Turnstile-Tokens im Formular.
 * @module schemas/shared/turnstile-schema
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

/** Validiert, dass ein Cloudflare-Turnstile-Token im Formular vorhanden ist. */
export const turnstileSchema = z.object({
  token: z.string().min(1, "Bitte Sicherheitsabfrage bestätigen"),
});

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type TurnstileFormData = z.infer<typeof turnstileSchema>;