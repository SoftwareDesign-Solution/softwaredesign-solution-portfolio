import { verifyTurnstile, TurnstileError } from "nextjs-turnstile";

export async function verifyTurnstileToken(token: string): Promise<boolean> {
    try {
        return await verifyTurnstile(token, {
            secretKey: process.env.TURNSTILE_SECRET_KEY!,
        });
    } catch (error) {
        if (error instanceof TurnstileError) {
            throw new Error(`Turnstile verification failed: ${error.message}`);
        }
        throw error;
    }
}