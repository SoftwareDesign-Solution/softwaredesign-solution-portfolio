/**
 * @file turnstile-widget-section.tsx
 * @description Bindet das Turnstile-Widget an react-hook-form: schreibt das
 * erfolgreiche Token ins Formular und setzt bei Ablauf einen Validierungsfehler.
 * @module components/forms/shared/sections/turnstile-widget-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { TurnstileRef } from "nextjs-turnstile";

import { RefObject } from "react";
import { useFormContext, useFormState } from "react-hook-form";

import { TurnstileFormData } from "@/schemas/shared/turnstile-schema";

import ErrorMessage from "../error-message";
import TurnstileWidget from "../turnstile-widget";

/** Minimal-Shape, das react-hook-form für den Zugriff auf `turnstile.token` benötigt. */
type FormWithTurnstile = {
    turnstile: TurnstileFormData;
}

/** Props für {@link TurnstileWidgetSection}. */
interface TurnstileWidgetSectionProps {
    /** Ref auf das Turnstile-Widget, damit das Formular es nach dem Absenden zurücksetzen kann. */
    turnstileRef: RefObject<TurnstileRef | null>;
}

/**
 * Bindet das {@link TurnstileWidget} an react-hook-form: schreibt das erfolgreiche
 * Token nach `turnstile.token` und setzt bei Ablauf einen manuellen Validierungsfehler.
 *
 * @param props - Siehe {@link TurnstileWidgetSectionProps}
 * @returns Das Turnstile-Widget inkl. Fehleranzeige
 */
export default function TurnstileWidgetSection({ turnstileRef }: TurnstileWidgetSectionProps) {

    const { 
        control, 
        setValue, 
        setError 
    } = useFormContext<FormWithTurnstile>();

    const { errors } = useFormState({
        control,
        name: "turnstile.token",
    });

    return (
        <div className="mt-6">
            <TurnstileWidget
                ref={turnstileRef}
                onSuccess={(token) => {
                    setValue("turnstile.token", token, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }}
                onExpire={() => {
                    setValue("turnstile.token", "", {
                        shouldDirty: true,
                    });

                    setError("turnstile.token", {
                        type: "manual",
                        message:
                            "Sicherheitsabfrage abgelaufen, bitte erneut bestätigen",
                    });
                }}
            />

            {errors.turnstile?.token && (
                <ErrorMessage message={errors.turnstile?.token?.message} />
            )}
        </div>
    );
}