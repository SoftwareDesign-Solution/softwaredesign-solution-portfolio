// schemas/shared/token-action.schema.ts

import { z } from "zod";

export const tokenActionSchema = z.object({
    id: z.uuid(),
    token: z
        .string()
        .trim()
        .min(1),
});

export type TokenActionData = z.output<
    typeof tokenActionSchema
>;