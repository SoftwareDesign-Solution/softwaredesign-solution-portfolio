import Link from "next/link";
import { type TurnstileRef } from "nextjs-turnstile";
import { type RefObject } from "react";
import { useFormContext } from "react-hook-form";

import Button from "@/components/ui/button";
import { type ContactRequestFormData } from "@/schemas/contact-request.schema";

import ErrorMessage from "../../shared/error-message";
import Label from "../../shared/label";
import TurnstileWidgetSection from "../../shared/sections/turnstile-widget-section";
import SelectField from "../../shared/select-field";

const sourceOptions = [
    {
        label: "Nicht angegeben",
        value: "None",
    },
    {
        label: "Konferenz",
        value: "Conference",
    },
    {
        label: "Meetup",
        value: "Meetup",
    },
    {
        label: "Persönliche Empfehlung",
        value: "PersonalRecommendation",
    },
    {
        label: "LinkedIn",
        value: "LinkedIn",
    },
];

interface RequestSubmitSectionProps {
    turnstileRef: RefObject<TurnstileRef | null>;
}

export default function RequestSubmitSection({
    turnstileRef,
}: RequestSubmitSectionProps) {
    const {
        formState: {
            errors,
            isSubmitting,
        },
        register,
    } = useFormContext<ContactRequestFormData>();

    return (
        <section className="col-span-1 mt-2 rounded-lg border border-border bg-white px-10 py-7 shadow-sm md:col-span-2">
            <div className="mb-4.5">
                <Label className="text-muted">
                    Wie sind Sie auf mich aufmerksam
                    geworden?{" "}
                    <span className="text-error-700">*</span>
                </Label>

                <SelectField
                    options={sourceOptions}
                    {...register("source")}
                />

                {errors.source?.message && (
                    <ErrorMessage
                        message={errors.source.message}
                    />
                )}
            </div>

            <label className="flex cursor-pointer select-none items-start gap-2.5 text-[13.5px] leading-[1.55] text-foreground">
                <input
                    className="mt-0.5 h-4 w-4 accent-primary-700"
                    type="checkbox"
                    {...register("acceptDataProcessing")}
                />

                <span>
                    Ich erkläre mich damit einverstanden, dass
                    die obenstehenden Daten zur Bearbeitung
                    meiner Anfrage gespeichert werden. Hinweise
                    zur Datenverarbeitung finden sich in der{" "}
                    <Link
                        className="border-b border-primary-700 text-primary-700 no-underline"
                        href="/datenschutz"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Datenschutzerklärung
                    </Link>
                    .
                </span>
            </label>

            {errors.acceptDataProcessing?.message && (
                <ErrorMessage
                    message={
                        errors.acceptDataProcessing.message
                    }
                />
            )}

            <TurnstileWidgetSection
                turnstileRef={turnstileRef}
            />

            <div className="mt-6 flex justify-center">
                <Button
                    isSubmitting={isSubmitting}
                    size="sm"
                    type="submit"
                    variant="primary"
                >
                    Anfrage absenden
                </Button>
            </div>
        </section>
    );
}