import { useFormContext, useWatch } from "react-hook-form";

import Button from "@/components/ui/button";


type SubmitFooterFormData = {
    consent: boolean;
};

type SubmitFooterProps = {
    hint: string;
    buttonLabel: string;
};

export default function SubmitFooter({
    hint,
    buttonLabel,
}: SubmitFooterProps) {
    const {
        control,
        formState: { isSubmitting },
    } = useFormContext<SubmitFooterFormData>();

    const consent = useWatch({
        control,
        name: "consent",
        defaultValue: false,
    });

    const disabled = !consent || isSubmitting;

    return (
        <div className="mt-5.5 flex items-center justify-between gap-4">
            <div className="text-[13px] leading-relaxed text-muted">
                {hint}
            </div>

            <Button type="submit" variant="primary" size="lg" isSubmitting={isSubmitting} disabled={disabled}>
                {buttonLabel}
            </Button>
            
        </div>
    );
};