"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

import ActionStatusModal from "@/components/modals/action-status-modal";
import BookingModal from "@/components/modals/booking-modal";
import NotificationSignupModal from "@/components/modals/notification-signup-modal";
import QuoteRequestModal from "@/components/modals/quote-request-modal";
import { ActionStatusContent } from "@/types/action-status-content";
import { Workshop } from "@/types/workshop";


type ModalType = "booking" | "notification-signup" | "quote-request" | null;

interface ModalContextValue {
    showActionStatus: (content: ActionStatusContent) => void;
    openBookingModal: (workshop: Workshop) => void;
    openNotificationSignupModal: (workshop: Workshop) => void;
    openQuoteRequestModal: (workshop: Workshop) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
    
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [activeWorkshop, setActiveWorkshop] = useState<Workshop | null>(null);

    // Ein einziger, generischer State — der Provider weiß nicht, welches Formular ihn befüllt hat.
    const [actionStatus, setActionStatus] = useState<ActionStatusContent | null>(null);

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

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModals must be used within a ModalProvider");
    }
    return context;
};
