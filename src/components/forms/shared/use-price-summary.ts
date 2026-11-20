/**
 * @file use-price-summary.ts
 * @description Gemeinsame Live-Preisberechnung für die Preisbox und die mobile Fußleiste.
 * @module components/forms/shared/use-price-summary
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext, useWatch } from "react-hook-form";

import { Workshop } from "@/types/workshop";
import { formatDateRange } from "@/utils/format-date-range";

/** Optionaler Rabatt (z.B. eingelöster Gutschein bei der Buchung). */
export interface PriceSummaryDiscount {
    amount: number;
    label: string;
}

/**
 * Liest ausgewählten Termin und Teilnehmerzahl aus dem Formularkontext und berechnet
 * Netto-, USt.- und Bruttobetrag. Wird von {@link SummarySection} und
 * {@link MobileSubmitBar} genutzt, damit beide immer dieselbe Summe zeigen.
 * Rein clientseitige Vorschau — der maßgebliche Preis wird serverseitig neu berechnet.
 *
 * @param workshop - Der Workshop mit Einzelpreis
 * @param noTerminLabel - Text, wenn (noch) kein Termin ausgewählt ist
 * @param discount - Optionaler Rabatt
 * @returns Die berechneten Werte für die Anzeige
 */
export function usePriceSummary(
    workshop: Workshop,
    noTerminLabel = "Kein Termin ausgewählt",
    discount?: PriceSummaryDiscount,
) {
    const { control } = useFormContext();

    const selectedDate = useWatch({
        control,
        name: "termin",
    });

    const participantCount = useWatch({
        control,
        name: "teilnehmerzahl",
    });

    // Teilnehmerzahl auf den gültigen Bereich begrenzen, auch bevor das Formularfeld validiert wurde
    const participantCountLabel = Math.min(Math.max(Number(participantCount) || 1, 1), 20);
    const discountAmount = discount?.amount ?? 0;
    const selectedDateLabel = selectedDate ? formatDateRange(selectedDate.datumVon, selectedDate.datumBis) : noTerminLabel;
    const subtotal = Math.max(Number(workshop.preis) * participantCountLabel - discountAmount, 0);
    const vat = subtotal * 0.19;
    const total = subtotal + vat;

    return {
        discountAmount,
        participantCountLabel,
        selectedDateLabel,
        subtotal,
        total,
        vat,
    };
}
