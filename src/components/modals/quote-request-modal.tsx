/**
 * @file quote-request-modal.tsx
 * @description Modal-Wrapper um das Formular für die Angebotsanfrage.
 * @module components/modals/quote-request-modal
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { WorkshopModalProps } from "@/types/workshop-props";

import QuoteRequestForm from "../forms/quote-request/quote-request-form";
import Modal from "./modal";

/**
 * Modal-Wrapper um das {@link QuoteRequestForm} für die Angebotsanfrage.
 *
 * @param props - Siehe {@link WorkshopModalProps}
 * @returns Das Angebots-Modal
 */
export default function QuoteRequestModal({ open, onClose, workshop, onSuccess, onError } : WorkshopModalProps) {
    return (
        <Modal open={open} onClose={onClose} title={`Angebotsanfrage · ${workshop.titel}`} maxWidth="max-w-240" zIndex={8888}>
            <QuoteRequestForm workshop={workshop} onClose={onClose} onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
}