"use client";

import { useFormContext } from "react-hook-form";

import Button from "@/components/ui/button";

import SectionHeading from "../section-heading";
import TextField from "../text-field";


type TeilnehmerzahlFormData = {
    teilnehmerzahl?: number;
};

interface ParticipantStepperSectionProps {
    num: string;
}

export default function ParticipantStepperSection({
    num
}: ParticipantStepperSectionProps) {

    const {
        formState: { errors },
        getValues,
        register,
        setValue,
    } = useFormContext<TeilnehmerzahlFormData>();

    const stepParticipants = (delta: number) => {
    const current = Math.min(
        Math.max(getValues("teilnehmerzahl") || 1, 1),
        20,
    );

    const next = Math.min(
        Math.max(current + delta, 1),
        20,
    );

    setValue("teilnehmerzahl", next, {
        shouldValidate: true,
        shouldDirty: true,
    });
};

    return (
        <section className="mb-8">
        
            <SectionHeading num={num} title="Teilnehmeranzahl" />

            <div className="flex flex-wrap items-center gap-3.5">

                <Button type="button" variant="muted" size="icon" onClick={() => stepParticipants(-1)}>
                    -
                </Button>

                {/* Teilnehmeranzahl */}
                <TextField
                    type="number"
                    min={1}
                    max={20}
                    step="any"
                    className="w-20! text-center"
                    {...register("teilnehmerzahl", { required: true, min: 1, max: 20, valueAsNumber: true })}
                />
                
                <Button type="button" variant="muted" size="icon" onClick={() => stepParticipants(1)}>
                    +
                </Button>

                <span className="basis-full ml-2 text-[13px] text-muted md:ml-2 md:basis-auto">
                    Max. 20 · für größere Gruppen Inhouse anfragen
                </span>

            </div>

            {errors.teilnehmerzahl && (
                <p className="mt-2 text-[12.5px] text-error-600">
                    {errors.teilnehmerzahl.message}
                </p>
            )}

        </section>
    );
}