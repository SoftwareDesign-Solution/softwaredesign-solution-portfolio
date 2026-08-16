import type { TurnstileRef } from "nextjs-turnstile";

import { RefObject } from "react";
import { useFormContext, useFormState } from "react-hook-form";

import { TurnstileFormData } from "@/schemas/shared/turnstile-schema";

import ErrorMessage from "../error-message";
import TurnstileWidget from "../turnstile-widget";


type FormWithTurnstile = {
    turnstile: TurnstileFormData;
}

interface TurnstileWidgetSectionProps {
    turnstileRef: RefObject<TurnstileRef | null>;
}

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