/**
 * @file company-data-section.tsx
 * @description Formular-Abschnitt des Kontaktformulars für Unternehmensdaten
 * (Firmenadresse, Webseite, Bestandskunden-Checkbox).
 * @module components/forms/contact-request/sections/company-data-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext } from "react-hook-form";

import { type ContactRequestFormData } from "@/schemas/contact-request.schema";

import AddressFields from "../../shared/address-fields";
import Label from "../../shared/label";
import TextField from "../../shared/text-field";

/**
 * Formular-Abschnitt des Kontaktformulars für Unternehmensdaten (Firmenadresse,
 * optionale Webseite, Bestandskunden-Checkbox).
 *
 * @returns Den Formular-Abschnitt
 */
export default function CompanyDataSection() {
    const { register } =
        useFormContext<ContactRequestFormData>();

    return (
        <section className="rounded-lg border border-border bg-white px-10 py-9 shadow-sm">
            <h2 className="mb-2 text-xl font-bold leading-[1.1] tracking-[-0.8px] text-foreground md:text-3xl">
                Unternehmensdaten
            </h2>

            <p className="mb-7 text-[13.5px] leading-[1.55] text-muted">
                Die folgenden Daten werden für den
                Schriftwechsel benötigt, beispielsweise für
                Angebote, Rechnungen und
                Verschwiegenheitsvereinbarungen.
            </p>

            <AddressFields name="adresse" />

            <div className="mb-4">
                <Label>Webseite (optional)</Label>

                <TextField
                    type="url"
                    {...register("webseite")}
                />
            </div>

            <label className="flex cursor-pointer select-none items-start gap-2.5 text-[13.5px] leading-[1.55] text-foreground">
                <input
                    className="mt-0.5 h-4 w-4 accent-primary-700"
                    type="checkbox"
                    {...register("bereitsKunde")}
                />

                <span>Sind Sie bereits Kunde bei mir?</span>
            </label>
        </section>
    );
}