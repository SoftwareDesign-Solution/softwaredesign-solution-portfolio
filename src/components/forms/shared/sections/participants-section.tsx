import { useFormContext, useFieldArray, useFormState, useWatch } from "react-hook-form";
import { TeilnehmerFormData } from "@/schemas/shared/teilnehmer.schema";
import SectionHeading from "../section-heading";
import TextField from "../text-field";
import ErrorMessage from "../error-message";
import { useEffect } from "react";

interface ParticipantsSectionProps {
    num: string;
}

export default function ParticipantsSection({
    num
}: ParticipantsSectionProps) {
    
    const { 
        register, 
        control, 
        //formState: { errors } 
    } = useFormContext<{
        teilnehmerzahl: number;
        teilnehmer: TeilnehmerFormData[];
    }>();

    const { errors } = useFormState({ control });

    const participantCount = useWatch({
        control,
        name: "teilnehmerzahl",
        defaultValue: 1
    });
        
    const { fields, append, remove } = useFieldArray({
        control,
        name: "teilnehmer",
    });

    useEffect(() => {
            
        const count = Math.min(Math.max(Number(participantCount) || 1, 1), 20);
        
        if (count > fields.length) {
            
            const toAdd = count - fields.length;

            for (let i = 0; i < toAdd; i++) {
                append({ vorname: "", nachname: "", email: "" });
            }

        } else if (count < fields.length) {
            
            for (let i = fields.length - 1; i >= count; i--) {
                remove(i);
            }
        
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participantCount]);

    return (
        <section className="mb-8">
        
            <SectionHeading num={num} title="Teilnehmer:innen" subtitle={`${fields.length} Teilnehmer im Workshop`} />

            <div className="flex flex-col gap-3">

                {fields.map((field, index) => (

                    <div
                        key={field.id}
                        className="rounded-lg bg-surface px-3.5 py-3"
                    >

                        <div
                            className="grid grid-cols-1 md:grid-cols-[36px_1fr_1fr_1.4fr] items-center gap-2.5 "
                        >

                            <div className="font-mono text-[12px] tracking-wide text-neutral-500">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            {/* Vorname */}
                            <TextField
                                placeholder="Vorname"
                                {...register(`teilnehmer.${index}.vorname` as const)}
                            />

                            {/* Nachname */}
                            <TextField
                                placeholder="Nachname"
                                {...register(`teilnehmer.${index}.nachname` as const, { required: "Bitte geben Sie den Nachnamen an.", validate: (value) => value.trim().length > 0 || "Bitte geben Sie den Nachnamen an.", })}
                            />

                            {/* E-Mail */}
                            <TextField
                                placeholder="E-Mail"
                                {...register(`teilnehmer.${index}.email` as const, { min: 1, required: "Bitte geben Sie die E-Mail an." })}
                            />

                        </div>

                        <div
                            className="grid grid-cols-1 md:grid-cols-[36px_1fr_1fr_1.4fr] items-center gap-2.5 "
                        >
                            <div></div>
                            <div>
                                {errors.teilnehmer?.[index]?.vorname && (
                                    <ErrorMessage message={errors.teilnehmer?.[index]?.vorname?.message} />
                                )}
                            </div>
                            <div>
                                {errors.teilnehmer?.[index]?.nachname && (
                                    <ErrorMessage message={errors.teilnehmer?.[index]?.nachname?.message} />
                                )}
                            </div>

                            <div>
                                {errors.teilnehmer?.[index]?.email && (
                                    <ErrorMessage message={errors.teilnehmer?.[index]?.email?.message} />
                                )}
                            </div>
                        </div>
                        
                    </div>
                ))}

            </div>

        </section>
    );
};