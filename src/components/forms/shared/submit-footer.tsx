/**
 * @file submit-footer.tsx
 * @description Formular-Fußzeile mit Hinweistext und Submit-Button; Button ist
 * deaktiviert ohne Datenschutz-Zustimmung.
 * @module components/forms/shared/submit-footer
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext, useWatch } from "react-hook-form";

import Button from "@/components/ui/button";

/** Minimal-Shape, das react-hook-form für den Zugriff auf das `consent`-Feld benötigt. */
type SubmitFooterFormData = {
    consent: boolean;
};

/** Props für {@link SubmitFooter}. */
type SubmitFooterProps = {
    /** Kurzer Hinweistext links neben dem Submit-Button (z.B. Stornobedingungen). */
    hint: string;
    /** Beschriftung des Submit-Buttons. */
    buttonLabel: string;
};

/**
 * Formular-Fußzeile mit Hinweistext und Submit-Button. Der Button ist deaktiviert,
 * solange die Datenschutz-Zustimmung (`consent`) nicht erteilt wurde oder das
 * Formular bereits abgesendet wird.
 *
 * @param props - Siehe {@link SubmitFooterProps}
 * @returns Die Formular-Fußzeile
 */
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

    // Ohne Zustimmung darf gar nicht abgesendet werden; während des Sendens erneuten Klick verhindern
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