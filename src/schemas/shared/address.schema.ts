import { z } from "zod";

export const optionalAddressSchema = z.object({
    firma: z.string(),
    strasse: z.string(),
    plz: z.string(),
    ort: z.string(),
});

export const addressSchema = optionalAddressSchema.extend({
    firma: z.string().min(1, "Bitte geben Sie den Firmennamen ein."),
    strasse: z.string().min(1, "Bitte geben Sie die Straße ein."),
    plz: z.string().min(1, "Bitte geben Sie die Postleitzahl ein."),
    ort: z.string().min(1, "Bitte geben Sie den Ort ein."),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type OptionalAddressFormData = z.infer<typeof optionalAddressSchema>;