/**
 * @file modal-provider.tsx
 * @description Globaler Provider, der die drei Workshop-Formular-Modals sowie
 * das gemeinsame Erfolgs-/Fehler-Modal verwaltet.
 * @module providers/modal-provider
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

import ActionStatusModal from "@/components/modals/action-status-modal";
import BookingModal from "@/components/modals/booking-modal";
import NotificationSignupModal from "@/components/modals/notification-signup-modal";
import QuoteRequestModal from "@/components/modals/quote-request-modal";
import { ActionStatusContent } from "@/types/action-status-content";
import { Workshop } from "@/types/workshop";

/** Welches der Workshop-Modals gerade aktiv ist (`null` = keines). */
type ModalType = "booking" | "notification-signup" | "quote-request" | null;

/** Öffentliche API des Modal-Kontexts, über {@link useModal} in Client-Komponenten nutzbar. */
interface ModalContextValue {
    /** Zeigt ein Erfolgs-/Fehler-Modal mit dem übergebenen Inhalt (z.B. nach einer Formular-Aktion). */
    showActionStatus: (content: ActionStatusContent) => void;
    /** Öffnet das Buchungs-Modal für den angegebenen Workshop. */
    openBookingModal: (workshop: Workshop) => void;
    /** Öffnet das Modal für die Workshop-Benachrichtigungs-Anmeldung. */
    openNotificationSignupModal: (workshop: Workshop) => void;
    /** Öffnet das Modal für die Angebotsanfrage. */
    openQuoteRequestModal: (workshop: Workshop) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

/**
 * Globaler Provider, der die drei Workshop-Formular-Modals (Buchung, Benachrichtigung,
 * Angebotsanfrage) sowie das gemeinsame Erfolgs-/Fehler-Modal verwaltet. Damit muss jede
 * Komponente (z.B. {@link WorkshopSidebar}, {@link WorkshopCard}) nicht selbst Modal-State
 * halten, sondern kann sie über {@link useModal} öffnen.
 *
 * @param props - Enthält `children`, den Rest des React-Baums
 * @returns Den Kontext-Provider inkl. der Modals selbst
 */
export default function ModalProvider({ children }: { children: ReactNode }) {
    
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [activeWorkshop, setActiveWorkshop] = useState<Workshop | null>(null);

    // Ein einziger, generischer State — der Provider weiß nicht, welches Formular ihn befüllt hat.
    const [actionStatus, setActionStatus] = useState<ActionStatusContent | null>(null);

    // Öffnet ein Modal für einen bestimmten Workshop und merkt sich diesen,
    // solange irgendein Workshop-Modal sichtbar sein könnte
    const openModal = (type: ModalType, workshop: Workshop) => {
        setActiveWorkshop(workshop);
        setActiveModal(type);
    };

    const closeModal = () => setActiveModal(null);

    return (
        <ModalContext.Provider
            value={{
                showActionStatus: (content) => setActionStatus(content),
                openBookingModal: (workshop) => openModal("booking", workshop),
                openNotificationSignupModal: (workshop) => openModal("notification-signup", workshop),
                openQuoteRequestModal: (workshop) => openModal("quote-request", workshop),
            }}
        >

            {children}

            {activeWorkshop && (
                <>
                    
                    <BookingModal 
                        workshop={activeWorkshop} 
                        open={activeModal === "booking"} 
                        onClose={closeModal}
                        onSuccess={setActionStatus}
                        onError={setActionStatus}
                    />

                    <NotificationSignupModal 
                        workshop={activeWorkshop} 
                        open={activeModal === "notification-signup"} 
                        onClose={closeModal}
                        onSuccess={setActionStatus}
                        onError={setActionStatus}
                    />

                    <QuoteRequestModal
                        workshop={activeWorkshop}
                        open={activeModal === "quote-request"}
                        onClose={closeModal}
                        onSuccess={setActionStatus}
                        onError={setActionStatus}
                    />

                </>
            )}

            {actionStatus && (
                <ActionStatusModal open onClose={() => setActionStatus(null)} {...actionStatus} />
            )}

        </ModalContext.Provider>
    );

}

/**
 * Hook für den Zugriff auf den {@link ModalProvider}-Kontext.
 *
 * @returns Die {@link ModalContextValue}-API zum Öffnen der Modals
 * @throws Error, wenn außerhalb eines {@link ModalProvider} aufgerufen
 */
export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModals must be used within a ModalProvider");
    }
    return context;
};
