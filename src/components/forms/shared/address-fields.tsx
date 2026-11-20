/**
 * @file address-fields.tsx
 * @description Wiederverwendbares Adress-Feldset (Firma, Straße, PLZ, Ort) für react-hook-form.
 * @module components/forms/shared/address-fields
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext, useFormState } from "react-hook-form";

import type { AddressFormData } from "@/schemas/shared/address.schema";

import ErrorMessage from "./error-message";
import Label from "./label";
import TextField from "./text-field";

/** Welcher Adress-Objektpfad im Formular befüllt wird. */
type AddressFieldName =
    | "adresse"
    | "rechnungsadresse"; 

/** Minimal-Shape, das react-hook-form für den generischen Zugriff auf `name` benötigt. */
type FormWithAddresses = {
    adresse?: AddressFormData;
    rechnungsadresse?: AddressFormData;
};

/** Props für {@link AddressFields}. */
type AddressFieldsProps = {
    /** Formularfeld-Präfix, unter dem die Adressfelder registriert werden (z.B. "adresse" oder "rechnungsadresse"). */
    name: AddressFieldName;
};

/**
 * Wiederverwendbares Adress-Feldset (Firma, Straße, PLZ, Ort) für react-hook-form.
 * Liest über `useFormContext` das umgebende Formular aus, daher muss ein
 * `FormProvider` (z.B. via react-hook-forms `<FormProvider>`) im Baum vorhanden sein.
 *
 * @param props - Siehe {@link AddressFieldsProps}
 * @returns Das Adress-Feldset
 */
export default function AddressFields({
    name,
}: AddressFieldsProps) {
    const {
        register,
        control,
    } = useFormContext<FormWithAddresses>();

    const { errors } = useFormState({ control });

    const addressErrors = errors[name];

    // Rechnungsadresse als eigener Autofill-Bereich, damit der Browser sie nicht mit der Firmenadresse vermischt
    const autoCompleteSection = name === "rechnungsadresse" ? "billing " : "";

    return (
        // mobile-form: zweispaltig mit fester PLZ-Spalte (112px), Ort nimmt den Rest
        <div className="mt-4 grid grid-cols-3 gap-x-3.5 mobile-form:grid-cols-[112px_minmax(0,1fr)] mobile-form:gap-x-2.5">
        
            <div className="col-span-3 mb-4 mobile-form:col-span-2">

                <Label>Firmenname</Label>

                {/* Firma */}
                <TextField
                    autoComplete={`${autoCompleteSection}organization`}
                    {...register(`${name}.firma`, { required: "Bitte geben Sie den Firmennamen an." })}
                />
                
                {addressErrors?.firma && (
                    <ErrorMessage message={addressErrors.firma.message} />
                )}

            </div>

            <div className="col-span-3 mb-4 mobile-form:col-span-2">

                <Label>Straße (inkl. Hausnummer)</Label>

                {/* Straße */}
                <TextField
                    autoComplete={`${autoCompleteSection}street-address`}
                    {...register(`${name}.strasse`, { required: "Bitte geben Sie die Straße an." })}
                />

                {addressErrors?.strasse && (
                    <ErrorMessage message={addressErrors.strasse.message} />
                )}

            </div>

            <div className="col-span-1 mb-4">

                <Label>PLZ</Label>

                {/* PLZ */}
                <TextField
                    inputMode="numeric"
                    autoComplete={`${autoCompleteSection}postal-code`}
                    {...register(`${name}.plz`, { required: "Bitte geben Sie die PLZ an." })}
                />

                {addressErrors?.plz && (
                    <ErrorMessage message={addressErrors.plz.message} />
                )}

            </div>

            <div className="col-span-2 mb-4 mobile-form:col-span-1">
                
                <Label>Ort</Label>

                {/* Ort */}
                <TextField
                    autoComplete={`${autoCompleteSection}address-level2`}
                    {...register(`${name}.ort`, { required: "Bitte geben Sie den Ort an." })}
                />

                {addressErrors?.ort && (
                    <ErrorMessage message={addressErrors.ort.message} />
                )}
                
            </div>

        </div>
    )
};