import { useFormContext, useWatch } from "react-hook-form";
import { formatPrice } from "@/utils/format-price";
import { formatDateRange } from "@/utils/format-date-range";
import { Workshop } from "@/types/workshop";

interface SummarySectionProps {
    title: string;
    workshop: Workshop;
};

export default function SummarySection({ title, workshop }: SummarySectionProps) {

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

    const participantCountLabel = Math.min(Math.max(Number(participantCount) || 1, 1), 20);
    const selectedDateLabel = selectedDate ? formatDateRange(selectedDate.datumVon, selectedDate.datumBis) : "Kein Termin ausgewählt";
    const subtotal = Number(workshop.preis) * participantCountLabel;
    const vat = Math.round(subtotal * 0.19);
    const total = subtotal + vat;
    
    return (
        <div className="mt-5 rounded-[10px] bg-surface px-6 py-5.5">
        
            <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
                {title}
            </div>
            
            {/* Workshop Titel, Dauer, Preis, Teilnehmeranzahl */}
            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                <span>{workshop.titel} · {workshop.dauer}</span>
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