/**
 * @file company-address-section.tsx
 * @description Formular-Abschnitt für Firmenadresse und optionale Webseite.
 * @module components/forms/shared/sections/company-address-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext } from "react-hook-form";

import type { AddressFormData } from "@/schemas/shared/address.schema";

import AddressFields from "../address-fields";
import Label from "../label";
import SectionHeading from "../section-heading";
import TextField from "../text-field";

/** Minimal-Shape, das react-hook-form für diese Sektion benötigt. */
type CompanyAddressFormData = {
    adresse?: AddressFormData;
    webseite?: string;
};

/** Props für {@link CompanyAddressSection}. */
interface CompanyAddressSectionProps {
    /** Abschnittsnummer für die {@link SectionHeading}-Anzeige. */
    num: string;
}

/**
 * Formular-Abschnitt für Firmenadresse und optionale Webseite.
 *
 * @param props - Siehe {@link CompanyAddressSectionProps}
 * @returns Den Formular-Abschnitt
 */
export default function CompanyAddressSection({
    num
}: CompanyAddressSectionProps) {

    const { 
        register 
    } = useFormContext<CompanyAddressFormData>();

    return (
        <section className="mb-8">
        
            <SectionHeading num={num} title="Firma & Adresse" />

            <AddressFields name="adresse" />

            <div className="mb-4">

                {/* Label.tsx */}
                <Label>Webseite (optional)</Label>

                {/* Webseite */}
                <TextField
                    {...register("webseite")}
                />

            </div>

        </section>
    );
}