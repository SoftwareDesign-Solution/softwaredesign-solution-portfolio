import { z } from "zod";

export const turnstileSchema = z.object({
  token: z.string().min(1, "Bitte Sicherheitsabfrage bestätigen"),
});

export type TurnstileFormData = z.infer<typeof turnstileSchema>;