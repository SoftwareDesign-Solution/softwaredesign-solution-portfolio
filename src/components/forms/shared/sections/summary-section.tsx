/**
 * @file summary-section.tsx
 * @description Live-Preisberechnung am Ende des Buchungs-/Angebots-Formulars.
 * @module components/forms/shared/sections/summary-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

//import { useFormContext, useWatch } from "react-hook-form";

import { Workshop } from "@/types/workshop";
//import { formatDateRange } from "@/utils/format-date-range";
import { formatDay } from "@/utils/format-day";
import { formatPrice } from "@/utils/format-price";

import { usePriceSummary } from "../use-price-summary";

interface SummarySectionDiscount {
  amount: number;
  label: string;
}

/** Props für {@link SummarySection}. */
interface SummarySectionProps {
    /** Überschrift der Zusammenfassungs-Box (z.B. "Ihre Buchung" oder "Ihre Anfrage"). */
    title: string;
    /** Kürzere Überschrift unterhalb von md (z.B. "Voraussichtliche Summe"). Fällt auf `title` zurück. */
    mobileTitle?: string;
    workshop: Workshop;

    /**
     * Text, wenn (noch) kein Termin ausgewählt ist. Standardmäßig
     * "Kein Termin ausgewählt" (Buchung braucht immer ein festes Datum) —
     * die Angebotsanfrage übergibt hier "Nach Absprache", weil dort auch
     * ganz ohne Termin angefragt werden kann.
     */
    noTerminLabel?: string;

    discount?: SummarySectionDiscount;
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
export default function SummarySection({ title, mobileTitle, workshop, noTerminLabel = "Kein Termin ausgewählt", discount }: SummarySectionProps) {

    const {
        discountAmount,
        participantCountLabel,
        selectedDateLabel,
        subtotal,
        total,
        vat,
    } = usePriceSummary(workshop, noTerminLabel, discount);

    /*
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
    const rabattAmount = discount ? discount.amount : 0;
    const selectedDateLabel = selectedDate ? formatDateRange(selectedDate.datumVon, selectedDate.datumBis) : noTerminLabel;
    const discountAmount = discount?.amount ?? 0;
    const subtotal = Math.max(Number(workshop.preis) * participantCountLabel - rabattAmount, 0);
    const vat = subtotal * 0.19;
    const total = subtotal + vat;
    */

    // Mobil: Bezeichnung links fix, Wert rechtsbündig und umbrechbar
    const rowMobile = "max-md:gap-3";
    const labelMobile = "max-md:shrink-0";
    const valueMobile = "max-md:min-w-0 max-md:text-right max-md:break-words";
    
    return (
        <div className="mt-5 rounded-[10px] bg-surface px-6 py-5.5 max-md:px-4 max-md:py-4.5">
        
            <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
                {mobileTitle ? (
                    <>
                        <span className="max-md:hidden">{title}</span>
                        <span className="md:hidden">{mobileTitle}</span>
                    </>
                ) : (
                    title
                )}
            </div>
            
            {/* Workshop Titel, Dauer, Preis, Teilnehmeranzahl */}
            {/* Mobil zweizeilig: Name · Dauer, darunter Preis × Anzahl */}
            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground max-md:flex-col max-md:items-start max-md:gap-0.5">
                <span>{workshop.titel} · {formatDay(workshop.dauer ?? 3)}</span>
                <span className="font-mono text-[13.5px] max-md:text-[12.5px] max-md:text-muted">
                    {formatPrice(workshop.preis)}{" "}
                    <span className="max-md:hidden">x</span>
                    <span className="md:hidden">×</span>
                    {" "}{participantCountLabel}
                </span>
            </div>

            {/* Ausgewählter Termin */}
            <div className={`flex items-baseline justify-between py-1.5 text-[14px] text-foreground ${rowMobile}`}>
                <span className={labelMobile}>Termin</span>
                <span className={`font-mono text-[13.5px] ${valueMobile}`}>{selectedDateLabel}</span>
            </div>

            {discount && discountAmount > 0 && (
                <div className={`flex items-baseline justify-between py-1.5 text-[14px] text-success-600 ${rowMobile}`}>
                    <span className="max-md:min-w-0">Gutschein · {discount.label}</span>
                    <span className="font-mono text-[13.5px] max-md:shrink-0 max-md:text-right">− {formatPrice(discountAmount)}</span>
                </div>
            )}
            
            {/* Zwischensumme */}
            <div className={`flex items-baseline justify-between py-1.5 text-[14px] text-foreground ${rowMobile}`}>
                <span className={labelMobile}>Zwischensumme</span>
                <span className={`font-mono text-[13.5px] ${valueMobile}`}>{formatPrice(subtotal)}</span>
            </div>
            
            {/* Umsatzsteuer */}
            <div className={`flex items-baseline justify-between py-1.5 text-[14px] text-muted ${rowMobile}`}>
                <span className={labelMobile}>USt. 19%</span>
                <span className={`font-mono text-[13.5px] ${valueMobile}`}>{formatPrice(vat)}</span>
            </div>

            <div className="my-3 h-px bg-border" />
            
            {/* Gesamtsumme */}
            <div className={`flex items-baseline justify-between py-1.5 text-[14px] text-foreground ${rowMobile}`}>
                <strong className={`font-bold ${labelMobile}`}>Gesamtsumme</strong>
                <strong className={`font-mono text-[17px] font-bold ${valueMobile}`}>{formatPrice(total)}</strong>
            </div>

        </div>
    );
}