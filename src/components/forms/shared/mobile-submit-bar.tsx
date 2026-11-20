/**
 * @file mobile-submit-bar.tsx
 * @description Feste Fußleiste mit Gesamtsumme und Submit-Button, nur unterhalb von md (768px).
 * @module components/forms/shared/mobile-submit-bar
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext, useWatch } from "react-hook-form";

import Button from "@/components/ui/button";
import { Workshop } from "@/types/workshop";
import { formatPrice } from "@/utils/format-price";

import { type PriceSummaryDiscount, usePriceSummary } from "./use-price-summary";

/** Minimal-Shape, das react-hook-form für Zustimmung und Turnstile-Token benötigt. */
type MobileSubmitBarFormData = {
    consent: boolean;
    turnstile: { token: string };
};

/** Props für {@link MobileSubmitBar}. */
interface MobileSubmitBarProps {
    workshop: Workshop;
    /** Beschriftung des Submit-Buttons. */
    buttonLabel: string;
    /** Kleine Beschriftung über der Summe. */
    totalLabel?: string;
    /** Muss zur Preisbox passen, damit beide dieselbe Summe zeigen. */
    discount?: PriceSummaryDiscount;
}

/**
 * Feste Fußleiste am unteren Rand des mobilen Vollbild-Modals: links die Bruttosumme
 * (aus {@link usePriceSummary}, also identisch mit der Preisbox), rechts der Submit-Button.
 * Muss als letztes Kind innerhalb des `<form>` stehen, damit `sticky bottom-0` greift.
 * Ab md ausgeblendet — dort bleibt die {@link SubmitFooter} am Formularende.
 *
 * @param props - Siehe {@link MobileSubmitBarProps}
 * @returns Die mobile Fußleiste
 */
export default function MobileSubmitBar({
    workshop,
    buttonLabel,
    totalLabel = "Gesamt inkl. USt.",
    discount,
}: MobileSubmitBarProps) {
    const {
        control,
        formState: { isSubmitting },
    } = useFormContext<MobileSubmitBarFormData>();

    const { total } = usePriceSummary(workshop, undefined, discount);

    const consent = useWatch({ control, name: "consent", defaultValue: false });
    const turnstileToken = useWatch({ control, name: "turnstile.token", defaultValue: "" });

    // Ohne Zustimmung oder gelöste Sicherheitsabfrage darf nicht abgesendet werden
    const disabled = !consent || !turnstileToken || isSubmitting;

    return (
        <div className="sticky bottom-0 z-10 flex items-center justify-between gap-4 border-t border-border bg-white px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgb(0_0_0/0.06)] md:hidden">

            <div className="min-w-0">
                <div className="text-[12px] text-muted">{totalLabel}</div>
                <div className="font-mono text-[15px] font-bold text-foreground" aria-live="polite">
                    {formatPrice(total)}
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                isSubmitting={isSubmitting}
                disabled={disabled}
                className="h-12! shrink-0 px-5! py-0! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
                {buttonLabel}
            </Button>

        </div>
    );
}
