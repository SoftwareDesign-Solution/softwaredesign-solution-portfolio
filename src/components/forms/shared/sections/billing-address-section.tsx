import { AddressFormData } from "@/schemas/forms/shared/address.schema";
import { useFormContext, useWatch } from "react-hook-form";
import SectionHeading from "../section-heading";
import AddressFields from "../address-fields";

type BillingAddressFormData = {
    abweichendeRechnungsadresse: boolean;
    rechnungsadresse?: AddressFormData;
};

interface BillingAddressSectionProps {
    num: string;
}
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