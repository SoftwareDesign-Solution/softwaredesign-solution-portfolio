import { useFormContext } from "react-hook-form";

import type { AddressFormData } from "@/schemas/shared/address.schema";

import AddressFields from "../address-fields";
import Label from "../label";
import SectionHeading from "../section-heading";
import TextField from "../text-field";


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