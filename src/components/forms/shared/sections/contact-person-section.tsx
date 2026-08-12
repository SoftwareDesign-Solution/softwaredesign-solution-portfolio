import { useFormContext } from "react-hook-form";
import { ContactPersonFormData } from "@/schemas/forms/shared/contact-person.schema";
import Label from "../label";
import SectionHeading from "../section-heading";
import SelectField from "../select-field";
import ErrorMessage from "../error-message";
import TextField from "../text-field";

type FormWithContactPerson = {
    ansprechpartner: ContactPersonFormData;
};

interface ContactPersonSectionProps {
    num: string;
}

export default function ContactPersonSection({
    num
}: ContactPersonSectionProps) {

    const {
        register,
        formState: { errors },
    } = useFormContext<FormWithContactPerson>();
    
    return (
        <section className="mb-8">
        
            <SectionHeading num={num} title="Ansprechpartner" />

            <div className="grid grid-cols-12 gap-x-3.5">

                <div className="col-span-6 md:col-span-3 mb-4">

                    {/* Label.tsx */}
                    <Label>Anrede</Label>

                    {/* Anrede */}
                    <SelectField
                        options={[
                            { value: "Frau", label: "Frau" },
                            { value: "Herr", label: "Herr" },
                            { value: "Divers", label: "Divers" },
                            { value: "Keine Angabe", label: "Keine Angabe" },
                        ]}
                        {...register("ansprechpartner.anrede", { required: "Bitte wählen Sie eine Anrede aus." })}
                    />
                    
                    {/* ErrorMessage.tsx */}
                    {errors.ansprechpartner?.anrede && (
                        <ErrorMessage message={errors.ansprechpartner.anrede.message} />
                    )}

                </div>

                <div className="col-span-12 md:col-span-4 mb-4">

                    {/* Label.tsx */}
                    <Label>Vorname</Label>

                    {/* Vorname */}
                    <TextField
                        {...register("ansprechpartner.vorname", { required: "Bitte geben Sie den Vornamen an." })}
                    />
                    
                    {/* ErrorMessage.tsx */}
                    {errors.ansprechpartner?.vorname && (
                        <ErrorMessage message={errors.ansprechpartner.vorname.message} />
                    )}

                </div>

                <div className="col-span-12 md:col-span-5 mb-4">

                    {/* Label.tsx */}
                    <Label>Nachname</Label>

                    {/* Nachname */}
                    <TextField
                        {...register("ansprechpartner.nachname", { required: "Bitte geben Sie den Nachnamen an." })}
                    />
                    
                    {/* ErrorMessage.tsx */}
                    {errors.ansprechpartner?.nachname && (
                        <ErrorMessage message={errors.ansprechpartner.nachname.message} />
                    )}

                </div>

                <div className="col-span-12 md:col-span-7 mb-4">

                    {/* Label.tsx */}
                    <Label>E-Mail</Label>

                    {/* E-Mail */}
                    <TextField
                        type="email"
                        {...register("ansprechpartner.email", { required: "Bitte geben Sie die E-Mail-Adresse an." })}
                    />
                    
                    {/* ErrorMessage.tsx */}
                    {errors.ansprechpartner?.email && (
                        <ErrorMessage message={errors.ansprechpartner.email.message} />
                    )}

                </div>

                <div className="col-span-12 md:col-span-5 mb-4">

                    <Label>Telefon</Label>

                    {/* Telefon */}
                    <TextField
                        {...register("ansprechpartner.telefon", { required: "Bitte geben Sie die Telefonnummer an." })}
                    />
                    
                    {/* ErrorMessage.tsx */}
                    {errors.ansprechpartner?.telefon && (
                        <ErrorMessage message={errors.ansprechpartner.telefon.message} />
                    )}

                </div>

            </div>
            
        </section>
    );
}