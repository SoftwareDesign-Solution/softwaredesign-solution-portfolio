"use client";

import TerminRow from "@/components/termin-row";
import Button from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import { Workshop } from "@/types/workshop";
import { formatPrice } from "@/utils/format-price";


export default function WorkshopSidebar(workshop: Workshop) {

    const nettoPrice = Number(workshop.preis);
    const bruttoPrice = nettoPrice * 1.19; // Assuming a 19% VAT rate

    const { openBookingModal, openNotificationSignupModal, openQuoteRequestModal } = useModal();

    return (
        <aside className="self-start sticky top-24">

          <div className="border border-solid border-border rounded-lg p-5 shadow-md">

            {/* Jetzt buchen */}
            <div className="text-xs text-muted uppercase tracking-[1.5px] font-semibold mb-2.5">
              Jetzt buchen
            </div>

            {/* Preis */}
            <div className="text-3xl font-bold text-foreground">{`${nettoPrice > 0 ? `ab ${formatPrice(nettoPrice)} (netto)` : 'Preis auf Anfrage'}`}</div>
            <div className="text-xs text-muted mt-1 mb-5.5">
              pro Person - zzgl. USt. {`${bruttoPrice > 0 ? `(brutto ${formatPrice(bruttoPrice)})` : ''}`}
            </div>

            {/* Nächste Termine */}
            <div className="text-xs text-muted uppercase tracking-[1px] font-semibold mb-2.5">
              Nächste Termine
            </div>

            {/* Termine Liste */}
            <div className="flex flex-col gap-2 mb-5">

                {workshop.termine && workshop.termine.length > 0 ? (
                    workshop.termine.map((termin, index) => (
                        <TerminRow key={index} termin={termin} />
                    ))
                ) : (
                    <div className="text-[13px] text-muted py-2.5 px-3 bg-surface rounded-md">
                        Aktuell keine Termine geplant.
                    </div>
                )}

            </div>
            
            <div className="flex flex-col gap-2 mb-5">
              
              {/* Platz reservieren */}
              {/*<ActionButton variant="solid" onClick={() => openBookingModal(workshop)}>
                Platz reservieren
              </ActionButton>*/}
              <Button 
                variant="primary" 
                fullWidth 
                disabled={!workshop.termine || workshop.termine.length === 0}
                onClick={() => openBookingModal(workshop)}>
                Platz reservieren
              </Button>

              {/* Angebot anfordern */}
              {/*<ActionButton variant="outline">Angebot anfordern</ActionButton>*/}
              <Button 
                variant="outline" 
                fullWidth 
                disabled={!workshop.termine || workshop.termine.length === 0}
                onClick={() => openQuoteRequestModal(workshop)}>
                Angebot anfordern
              </Button>
 
              {/* Inhouse-Angebot anfordern */}
              {/*<ActionButton variant="outline" href="/anfrage">
                Inhouse-Angebot anfordern
              </ActionButton>*/}
              <Button variant="outline" fullWidth href="/anfrage">
                Inhouse-Angebot anfordern
              </Button>

              {/* Bei neuen Terminen benachrichtigen */}
              {/*<ActionButton variant="dashed">Bei neuen Terminen benachrichtigen</ActionButton>*/}
              <Button variant="dashed" fullWidth onClick={() => openNotificationSignupModal(workshop)}>
                Bei neuen Terminen benachrichtigen
              </Button>
            
            </div>

            {/* Hinweise */}
            <div className="mt-6 pt-5 border-t border-solid border-border text-xs text-muted">
              <div className="mb-1.5">
                <span className="text-success-600">✓</span> Kostenlose Stornierung bis 14 Tage
                vorher
              </div>
              <div className="mb-1.5">
                <span className="text-success-600">✓</span> Rechnung per E-Mail nach dem Workshop,
                Zahlungsziel 14 Tage
              </div>
              <div>
                <span className="text-success-600">✓</span> Bei Absage durch uns: keine Kosten
              </div>
            </div>

          </div>
            
        </aside>
    );
}