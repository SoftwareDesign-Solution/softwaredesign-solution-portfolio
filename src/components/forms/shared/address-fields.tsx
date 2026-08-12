import { useFormContext, useFormState } from "react-hook-form";
import type { AddressFormData } from "@/schemas/forms/shared/address.schema";
import Label from "./label";
import TextField from "./text-field";
import ErrorMessage from "./error-message";


type AddressFieldName =
    | "adresse"
    | "rechnungsadresse"; 

type FormWithAddresses = {
    adresse?: AddressFormData;
    rechnungsadresse?: AddressFormData;
};

type AddressFieldsProps = {
    name: AddressFieldName;
};

export default function AddressFields({
    name,
}: AddressFieldsProps) {
    const {
        register,
        control,
        //formState: { errors },
    } = useFormContext<FormWithAddresses>();

    const { errors } = useFormState({ control });

    const addressErrors = errors[name];

    return (
        <div className="mt-4 grid grid-cols-3 gap-x-3.5">
        
            <div className="col-span-3 mb-4">

                {/* Label.tsx */}
                <Label>Firmenname (Rechnung)</Label>

                {/* Firma */}
                <TextField
                    {...register(`${name}.firma`, { required: "Bitte geben Sie den Firmennamen an." })}
                />
                
                {/* ErrorMessage.tsx */}
                {addressErrors?.firma && (
                    <ErrorMessage message={addressErrors.firma.message} />
                )}

            </div>

            <div className="col-span-3 mb-4">

                {/* Label.tsx */}
                <Label>Straße (inkl. Hausnummer)</Label>

                {/* Straße */}
                <TextField
                    {...register(`${name}.strasse`, { required: "Bitte geben Sie die Straße an." })}
                />

                {/* ErrorMessage.tsx */}
                {addressErrors?.strasse && (
                    <ErrorMessage message={addressErrors.strasse.message} />
                )}

            </div>

            <div className="col-span-1 mb-4">

                {/* Label.tsx */}
                <Label>PLZ</Label>

                {/* PLZ */}
                <TextField
                    {...register(`${name}.plz`, { required: "Bitte geben Sie die PLZ an." })}
                />

                {/* ErrorMessage.tsx */}
                {addressErrors?.plz && (
                    <ErrorMessage message={addressErrors.plz.message} />
                )}

            </div>

            <div className="col-span-2 mb-4">
                
                {/* Label.tsx */}
                <Label>Ort</Label>

                {/* Ort */}
                <TextField
                    {...register(`${name}.ort`, { required: "Bitte geben Sie den Ort an." })}
                />

                {/* ErrorMessage.tsx */}
                {addressErrors?.ort && (
                    <ErrorMessage message={addressErrors.ort.message} />
                )}
                
            </div>

        </div>
    )
};