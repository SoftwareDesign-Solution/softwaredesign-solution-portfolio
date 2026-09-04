/**
 * @file billing-address-section.tsx
 * @description Formular-Abschnitt für die Rechnungsadresse; zeigt Adressfelder
 * nur bei aktivierter "abweichende Rechnungsadresse"-Checkbox.
 * @module components/forms/shared/sections/billing-address-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext, useWatch } from "react-hook-form";

import { AddressFormData } from "@/schemas/shared/address.schema";

import AddressFields from "../address-fields";
import SectionHeading from "../section-heading";

/** Minimal-Shape, das react-hook-form für diese Sektion benötigt. */
type BillingAddressFormData = {
    abweichendeRechnungsadresse: boolean;
    rechnungsadresse?: AddressFormData;
};

/** Props für {@link BillingAddressSection}. */
interface BillingAddressSectionProps {
    /** Abschnittsnummer für die {@link SectionHeading}-Anzeige. */
    num: string;
}

/**
 * Formular-Abschnitt für die Rechnungsadresse: zeigt die Adressfelder nur an,
 * wenn die Checkbox "Abweichende Rechnungsadresse verwenden" aktiviert ist.
 *
 * @param props - Siehe {@link BillingAddressSectionProps}
 * @returns Den Formular-Abschnitt
 */
export default function BillingAddressSection({
    num 
}: BillingAddressSectionProps) {

    const {
        control,
        register,
    } = useFormContext<BillingAddressFormData>();

    const altBillingAddress = useWatch({
        control,
        name: "abweichendeRechnungsadresse",
        defaultValue: false,
    });

    return (
        <section className="mb-8">
        
            <SectionHeading num={num} title="Rechnungsadresse" />

            <label className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-[1.55] text-foreground">
                <input 
                    type="checkbox" 
                    className="mt-0.5 h-4 w-4 accent-primary-700"
                    {...register("abweichendeRechnungsadresse")}
                />
                <span>Abweichende Rechnungsadresse verwenden</span>
            </label>
            
            {altBillingAddress && <AddressFields name="rechnungsadresse" /> }
            
        </section>
    );
};