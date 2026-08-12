"use client";

import { useFormContext } from "react-hook-form";
import { BookingFormData } from "@/schemas/forms/booking.schema";
import SectionHeading from "../section-heading";
import TextField from "../text-field";
import Button from "@/components/ui/button";

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
    } = useFormContext<BookingFormData>();

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

                {/*}
                <button
                    type="button"
                    onClick={() => stepParticipants(-1)}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-lg font-semibold text-neutral-700 transition bg-surface hover:bg-neutral-100"
                >
                    -
                </button>
                */}

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
                
                {/*
                <button
                    type="button"
                    onClick={() => stepParticipants(1)}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-lg font-semibold text-neutral-700 transition bg-surface hover:bg-neutral-100"
                >
                    +
                </button>
                */}

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