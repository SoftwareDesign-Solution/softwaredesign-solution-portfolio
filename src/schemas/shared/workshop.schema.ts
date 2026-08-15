import { z } from "zod";

export const workshopSchema = z.object({
    id: z.number(),
    titel: z.string(),
});