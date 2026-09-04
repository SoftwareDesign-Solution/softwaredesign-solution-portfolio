/**
 * @file turnstile.ts
 * @description Serverseitige Verifizierung von Cloudflare-Turnstile-Tokens (Spam-/Bot-Schutz).
 * @module lib/turnstile
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { TurnstileError, verifyTurnstile } from "nextjs-turnstile";


/**
 * Prüft ein Cloudflare-Turnstile-Token serverseitig (Spam-/Bot-Schutz für Formulare).
 *
 * @param token - Das vom Turnstile-Widget im Client erzeugte Token
 * @returns `true`, wenn das Token gültig ist
 * @throws Error mit einer sprechenden Meldung, falls die Turnstile-Verifizierung selbst fehlschlägt
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
    try {
        return await verifyTurnstile(token);
    } catch (error) {
        if (error instanceof TurnstileError) {
            throw new Error(`Turnstile verification failed: ${error.message}`);
        }
        // Unerwarteter Fehler (z.B. Netzwerkproblem) -> unverändert weiterreichen
        throw error;
    }
}
