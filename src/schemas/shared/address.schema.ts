/**
 * @file address.schema.ts
 * @description Zod-Schemas für Adressfelder (Firmenadresse, optionale Rechnungsadresse)
 * inkl. der bedingten Validierung "abweichende Rechnungsadresse".
 * @module schemas/shared/address
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { z } from "zod";

/** Adressfelder ohne Pflicht-Validierung (z.B. wenn eine abweichende Rechnungsadresse optional ist). */
export const optionalAddressSchema = z.object({
    firma: z.string(),
    strasse: z.string(),
    plz: z.string(),
    ort: z.string(),
});

/** Adressfelder mit Pflichtfeld-Validierung und deutschen Fehlermeldungen. */
export const addressSchema = optionalAddressSchema.extend({
    firma: z.string().min(1, "Bitte geben Sie den Firmennamen ein."),
    strasse: z.string().min(1, "Bitte geben Sie die Straße ein."),
    plz: z.string().min(1, "Bitte geben Sie die Postleitzahl ein."),
    ort: z.string().min(1, "Bitte geben Sie den Ort ein."),
});

/**
 * Bedingte Validierung der Rechnungsadresse: ist `abweichendeRechnungsadresse` auf
 * `false`, bleibt `rechnungsadresse` optional/unvalidiert; ist sie auf `true`, muss
 * `rechnungsadresse` vollständig gültig sein (siehe {@link addressSchema}).
 */
export const billingAddressSchema = z.discriminatedUnion(
    "abweichendeRechnungsadresse",
    [
        z.object({
            abweichendeRechnungsadresse:
                z.literal(false),

            rechnungsadresse:
                optionalAddressSchema
                    .partial()
                    .optional(),
        }),

        z.object({
            abweichendeRechnungsadresse:
                z.literal(true),

            rechnungsadresse:
                addressSchema,
        }),
    ],
);

// TypeScript-Typen, aus den obigen Schemas abgeleitet
export type AddressFormData = z.infer<typeof addressSchema>;
export type OptionalAddressFormData = z.infer<typeof optionalAddressSchema>;