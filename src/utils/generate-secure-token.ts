/**
 * @file generate-secure-token.ts
 * @description Erzeugt kryptographisch sichere Zufalls-Tokens für Bestätigungs-
 * und Abmelde-Links (Double-Opt-In).
 * @module utils/generate-secure-token
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { randomBytes } from "node:crypto";

/**
 * Erzeugt ein kryptographisch sicheres, URL-sicheres Zufalls-Token
 * (256 Bit Entropie), z.B. für Bestätigungs-/Abmelde-Links.
 *
 * @returns Ein base64url-kodiertes Zufalls-Token
 */
export function generateSecureToken(): string {
  return randomBytes(32).toString("base64url");
}
