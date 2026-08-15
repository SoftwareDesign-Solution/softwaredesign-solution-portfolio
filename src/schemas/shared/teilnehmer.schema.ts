import z from "zod";

export const teilnehmerSchema = z.object({
    vorname: z.string().min(1, "Bitte geben Sie den Vornamen an."),
    nachname: z.string().min(1, "Bitte geben Sie den Nachnamen an."),
    email: z.string().email("Ungültige E-Mail-Adresse"),
});

export type TeilnehmerFormData = z.infer<typeof teilnehmerSchema>;