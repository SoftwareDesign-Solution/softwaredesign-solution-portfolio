import Button from "@/components/ui/button";
import { useFormContext, useWatch } from "react-hook-form";

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

            {/*}
            <button
                type="submit"
                disabled={disabled}
                className={`rounded-md px-7.5 py-3.5 text-[15px] font-semibold tracking-wide text-white transition ${
                    disabled
                        ? "cursor-not-allowed bg-primary-700/50"
                        : "cursor-pointer bg-primary-700 hover:bg-primary-700/90"
                }`}
            >
                {isSubmitting ? "Wird gesendet …" : buttonLabel}
            </button>
            */}

            <Button type="submit" variant="primary" size="lg" isSubmitting={isSubmitting} disabled={disabled}>
                {buttonLabel}
            </Button>
            
        </div>
    );
};