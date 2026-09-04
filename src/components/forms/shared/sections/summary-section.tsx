/**
 * @file summary-section.tsx
 * @description Live-Preisberechnung am Ende des Buchungs-/Angebots-Formulars.
 * @module components/forms/shared/sections/summary-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { useFormContext, useWatch } from "react-hook-form";

import { Workshop } from "@/types/workshop";
import { formatDateRange } from "@/utils/format-date-range";
import { formatDay } from "@/utils/format-day";
import { formatPrice } from "@/utils/format-price";

/** Props für {@link SummarySection}. */
interface SummarySectionProps {
    /** Überschrift der Zusammenfassungs-Box (z.B. "Ihre Buchung" oder "Ihre Anfrage"). */
    title: string;
    workshop: Workshop;

    /**
     * Text, wenn (noch) kein Termin ausgewählt ist. Standardmäßig
     * "Kein Termin ausgewählt" (Buchung braucht immer ein festes Datum) —
     * die Angebotsanfrage übergibt hier "Nach Absprache", weil dort auch
     * ganz ohne Termin angefragt werden kann.
     */
    noTerminLabel?: string;

};

/**
 * Live-Preisberechnung am Ende des Buchungs-/Angebots-Formulars: liest ausgewählten
 * Termin und Teilnehmerzahl aus dem Formularkontext und berechnet Netto-, USt.- und
 * Bruttobetrag. Rein clientseitige Vorschau — der maßgebliche Preis wird serverseitig
 * in der jeweiligen Server Action (z.B. {@link createBooking}) neu berechnet.
 *
 * @param props - Siehe {@link SummarySectionProps}
 * @returns Die Zusammenfassungs-Box
 */
export default function SummarySection({ title, workshop, noTerminLabel = "Kein Termin ausgewählt" }: SummarySectionProps) {

    const { 
        control,
    } = useFormContext();

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
    const selectedDateLabel = selectedDate ? formatDateRange(selectedDate.datumVon, selectedDate.datumBis) : noTerminLabel;
    const subtotal = Number(workshop.preis) * participantCountLabel;
    const vat = subtotal * 0.19;
    const total = subtotal + vat;
    
    return (
        <div className="mt-5 rounded-[10px] bg-surface px-6 py-5.5">
        
            <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
                {title}
            </div>
            
            {/* Workshop Titel, Dauer, Preis, Teilnehmeranzahl */}
            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                <span>{workshop.titel} · {formatDay(workshop.dauer ?? 3)}</span>
                <span className="font-mono text-[13.5px]">
                    {formatPrice(workshop.preis)} x {participantCountLabel}
                </span>
            </div>

            {/* Ausgewählter Termin */}
            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                <span>Termin</span>
                <span className="font-mono text-[13.5px]">{selectedDateLabel}</span>
            </div>
            
            {/* Zwischensumme */}
            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                <span>Zwischensumme</span>
                <span className="font-mono text-[13.5px]">{formatPrice(subtotal)}</span>
            </div>
            
            {/* Umsatzsteuer */}
            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-muted">
                <span>USt. 19%</span>
                <span className="font-mono text-[13.5px]">{formatPrice(vat)}</span>
            </div>

            <div className="my-3 h-px bg-border" />
            
            {/* Gesamtsumme */}
            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                <strong className="font-bold">Gesamtsumme</strong>
                <strong className="font-mono text-[17px] font-bold">{formatPrice(total)}</strong>
            </div>

        </div>
    );
}