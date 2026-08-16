import { TurnstileError, verifyTurnstile } from "nextjs-turnstile";


export async function verifyTurnstileToken(token: string): Promise<boolean> {
    try {
        return await verifyTurnstile(token);
    } catch (error) {
        if (error instanceof TurnstileError) {
            throw new Error(`Turnstile verification failed: ${error.message}`);
        }
        throw error;
    }
}