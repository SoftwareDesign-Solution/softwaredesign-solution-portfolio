"use client";

import { Workshop } from "@/types/workshop";
import { formatPrice } from "@/utils/format-price";
import TerminRow from "@/components/termin-row";

import { useState } from "react";
import Modal from "@/components/modals/modal";
import ActionStatusModal from "@/components/modals/action-status-modal";
import { useModal } from "@/providers/modal-provider";
import Button from "@/components/ui/button";


export default function WorkshopSidebar(workshop: Workshop) {

    const nettoPrice = Number(workshop.preis);
    const bruttoPrice = nettoPrice * 1.19; // Assuming a 19% VAT rate
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { showActionStatus, openBookingModal } = useModal();
    
    const showModal = () => {
      
      showActionStatus({
        variant: "success",
        kicker: "Platz reservieren2",
        heading: () => "Platz reserviert!",
        body: () => "Vielen Dank für Ihre Reservierung. Wir haben Ihnen eine Bestätigung per E-Mail gesendet."
      });

    };

    const closeModal = () => {
      
      

    };

    return (
        <aside className="self-start sticky top-24">

            {/* Jetzt buchen */}
            <div className="text-xs text-muted uppercase tracking-[1.5px] font-semibold mb-2.5">
              Jetzt buchen
            </div>

            {/* Preis */}
            <div className="text-3xl font-bold text-foreground">ab {formatPrice(nettoPrice)} (netto)</div>
            <div className="text-xs text-muted mt-1 mb-5.5">
              pro Person - zzgl. USt. (brutto {formatPrice(bruttoPrice)})
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
              <Button variant="primary" fullWidth onClick={() => openBookingModal(workshop)}>
                Platz reservieren
              </Button>

              {/* Angebot anfordern */}
              {/*<ActionButton variant="outline">Angebot anfordern</ActionButton>*/}
              <Button variant="outline" fullWidth>
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
              <Button variant="dashed" fullWidth>
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
            
            <ActionStatusModal 
              open={isModalOpen} 
              onClose={closeModal} 
              variant="success" 
              kicker="Platz reservieren" 
              heading={() => "Platz reserviert!"} 
              body={() => "Vielen Dank für Ihre Reservierung. Wir haben Ihnen eine Bestätigung per E-Mail gesendet."}
            />
            
        </aside>
    );
}