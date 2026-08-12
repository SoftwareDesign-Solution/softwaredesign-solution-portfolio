import type { AddressFormData } from "@/schemas/forms/shared/address.schema";
import { useFormContext } from "react-hook-form";
import SectionHeading from "../section-heading";
import TextField from "../text-field";
import Label from "../label";
import AddressFields from "../address-fields";

type CompanyAddressFormData = {
    adresse?: AddressFormData;
    webseite?: string;
};

interface CompanyAddressSectionProps {
    num: string;
}

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