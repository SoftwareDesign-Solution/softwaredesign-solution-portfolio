import z from "zod";

export const terminSchema = z.object({
    id: z.number(),
    datumVon: z.string(),
    datumBis: z.string(),
});

export type TerminFormData = z.infer<typeof terminSchema>;