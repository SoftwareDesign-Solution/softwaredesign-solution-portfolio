"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ActionStatusContent } from "@/types/action-status-content";
import ActionStatusModal from "@/components/modals/action-status-modal";
import { Workshop } from "@/types/workshop";

type ModalType = null;

interface ModalContextValue {
    showActionStatus: (content: ActionStatusContent) => void;
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
            }}
        >

            {children}

            {activeWorkshop && (
                <>
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
