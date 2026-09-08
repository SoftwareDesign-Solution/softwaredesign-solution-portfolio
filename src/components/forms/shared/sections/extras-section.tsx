/**
 * @file extras-section.tsx
 * @description Formular-Abschnitt für optionale Zusatzangaben: Gutscheincode
 * (optional) und Anmerkungen.
 * @module components/forms/shared/sections/extras-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import Button from "@/components/ui/button";

import ErrorMessage from "../error-message";
import Label from "../label";
import SectionHeading from "../section-heading";
import TextField from "../text-field";

interface VoucherCheckResult {
  valid: boolean;
  message: string;
}

/** Props für {@link ExtrasSection}. */
interface ExtrasSectionProps {
    /** Abschnittsnummer für die {@link SectionHeading}-Anzeige. */
    num: string;
    /** Zeigt zusätzlich ein Gutscheincode-Feld an (nur bei der Buchung relevant). */
    showVoucherCode?: boolean;

    onRedeemVoucher?: (code: string) => Promise<VoucherCheckResult>;
}

/**
 * Formular-Abschnitt für optionale Zusatzangaben: Gutscheincode (optional) und Anmerkungen.
 *
 * @param props - Siehe {@link ExtrasSectionProps}
 * @returns Den Formular-Abschnitt
 */
export default function ExtrasSection({ 
    num, 
    showVoucherCode = false,
    onRedeemVoucher
}: ExtrasSectionProps) {
    
    const { 
        control,
        register,
        formState: { errors },
    } = useFormContext();

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState<string | null>(null);

    const code = useWatch({
        name: "gutscheinCode",
        control
    });
 
    const handleRedeem = async () => {
        if (!code || !onRedeemVoucher) return;
        setStatus("loading");
        const result = await onRedeemVoucher(code);
        setStatus(result.valid ? "success" : "error");
        setMessage(result.message);
    };

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
                                {...register("gutscheinCode", {
                                    onChange: () => {
                                        setStatus("idle");
                                        setMessage(null);
                                    },
                                })}
                            />

                            {/* Einlösen */}
                            <Button 
                                type="button" 
                                variant="dark" 
                                className="px-4.5 py-2.5 text-[13.5px]"
                                onClick={handleRedeem}
                                disabled={status === "loading" || !code}
                            >
                                {status === "loading" ? "Prüfe …" : "Einlösen"}
                            </Button>

                        </div>

                        {errors.gutscheinCode && (
                            <ErrorMessage message={String(errors.gutscheinCode.message)} />
                        )}

                        {status === "error" && message && (
                            <ErrorMessage message={message} />
                        )}

                        {status === "success" && message && (
                            <p className="mt-2 text-[12.5px] text-success-600">{message}</p>
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