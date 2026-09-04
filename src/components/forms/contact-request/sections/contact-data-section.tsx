import { useFormContext } from "react-hook-form";

import { type ContactRequestFormData } from "@/schemas/contact-request.schema";

import ErrorMessage from "../../shared/error-message";
import Label from "../../shared/label";
import SelectField from "../../shared/select-field";
import TextField from "../../shared/text-field";

const salutationOptions = [
    {
        label: "Frau",
        value: "Frau",
    },
    {
        label: "Herr",
        value: "Herr",
    },
    {
        label: "Divers",
        value: "Divers",
    },
    {
        label: "Keine Angabe",
        value: "Keine Angabe",
    },
];

export default function ContactDataSection() {
    const {
        formState: {
            errors,
        },
        register,
    } = useFormContext<ContactRequestFormData>();

    const contactErrors = errors.ansprechpartner;

    return (
        <section className="rounded-lg border border-border bg-white px-10 py-9 shadow-sm">
            <h2 className="mb-2 text-xl font-bold leading-[1.1] tracking-[-0.8px] text-foreground md:text-3xl">
                Persönliche Daten
            </h2>

            <p className="mb-7 text-[13.5px] leading-[1.55] text-muted">
                Die folgenden Daten werden benötigt, um Sie
                bezüglich Ihrer Anfrage und einer möglichen
                Terminvereinbarung zu kontaktieren.
            </p>

            <div className="mb-4">
                <Label>Anrede</Label>

                <SelectField
                    options={salutationOptions}
                    {...register(
                        "ansprechpartner.anrede",
                    )}
                />

                {contactErrors?.anrede?.message && (
                    <ErrorMessage
                        message={
                            contactErrors.anrede.message
                        }
                    />
                )}
            </div>

            <div className="mb-4">
                <Label>Vorname</Label>

                <TextField
                    {...register(
                        "ansprechpartner.vorname",
                    )}
                />

                {contactErrors?.vorname?.message && (
                    <ErrorMessage
                        message={
                            contactErrors.vorname.message
                        }
                    />
                )}
            </div>

            <div className="mb-4">
                <Label>Nachname</Label>

                <TextField
                    {...register(
                        "ansprechpartner.nachname",
                    )}
                />

                {contactErrors?.nachname?.message && (
                    <ErrorMessage
                        message={
                            contactErrors.nachname.message
                        }
                    />
                )}
            </div>

            <div className="mb-4">
                <Label>E-Mail</Label>

                <TextField
                    type="email"
                    {...register(
                        "ansprechpartner.email",
                    )}
                />

                {contactErrors?.email?.message && (
                    <ErrorMessage
                        message={
                            contactErrors.email.message
                        }
                    />
                )}
            </div>
        </section>
    );
}