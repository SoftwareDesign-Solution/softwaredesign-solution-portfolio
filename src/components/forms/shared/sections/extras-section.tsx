/**
 * @file extras-section.tsx
 * @description Formular-Abschnitt für optionale Zusatzangaben: Gutscheincode
 * (optional) und Anmerkungen.
 * @module components/forms/shared/sections/extras-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext } from "react-hook-form";

import Button from "@/components/ui/button";

import ErrorMessage from "../error-message";
import Label from "../label";
import SectionHeading from "../section-heading";
import TextField from "../text-field";

/** Props für {@link ExtrasSection}. */
interface ExtrasSectionProps {
    /** Abschnittsnummer für die {@link SectionHeading}-Anzeige. */
    num: string;
    /** Zeigt zusätzlich ein Gutscheincode-Feld an (nur bei der Buchung relevant). */
    showVoucherCode?: boolean;
}

/**
 * Formular-Abschnitt für optionale Zusatzangaben: Gutscheincode (optional) und Anmerkungen.
 *
 * @param props - Siehe {@link ExtrasSectionProps}
 * @returns Den Formular-Abschnitt
 */
export default function ExtrasSection({ 
    num, 
    showVoucherCode = false
}: ExtrasSectionProps) {
    
    const { 
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <section className="mb-8">
        
            <SectionHeading num={num} title="Weiteres" />

            <div className="grid grid-cols-12 gap-x-3.5">

                {showVoucherCode && (
                    <div className="col-span-12 mb-4">

                        {/* Gutschein-Code Eingabefeld */}
                        <Label>Gutscheincode (optional)</Label>

                        <div className="flex items-stretch gap-2.5">

                            {/* Gutscheincode */}
                            <TextField
                                placeholder="z.B. CODE2026"
                                className="flex-1"
                                {...register("gutscheinCode", { min: 1, required: "Bitte geben Sie den Gutscheincode an." })}
                            />

                            {/* Einlösen */}
                            <Button type="button" variant="dark" className="px-4.5 py-2.5 text-[13.5px]">
                                Einlösen
                            </Button>

                        </div>

                        {errors.gutscheinCode && (
                            <ErrorMessage message={String(errors.gutscheinCode.message)} />
                        )}

                    </div>
                )}

                <div className="col-span-12 mb-4">
                    
                    {/* Label.tsx */}
                    <Label>Anmerkungen (optional)</Label>

                    {/* TextArea.tsx */}
                    <textarea
                        className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 min-h-22.5 resize-y"
                        placeholder="Besondere Wünsche, Ernährung, technische Anforderungen …"
                        {...register("nachricht")}
                    />

                    
                </div>

            </div>
        </section>
    );
};