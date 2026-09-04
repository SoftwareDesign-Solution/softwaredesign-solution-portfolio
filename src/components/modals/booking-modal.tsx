/**
 * @file booking-modal.tsx
 * @description Modal-Wrapper um das Buchungsformular für die Workshop-Buchung.
 * @module components/modals/booking-modal
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { WorkshopModalProps } from "../../types/workshop-props";

import BookingForm from "../forms/booking/booking-form";
import Modal from "./modal";

/**
 * Modal-Wrapper um das {@link BookingForm} für die Workshop-Buchung.
 *
 * @param props - Siehe {@link WorkshopModalProps}
 * @returns Das Buchungs-Modal
 */
export default function BookingModal({ open, onClose, workshop, onSuccess, onError }: WorkshopModalProps) {
    return (
        <Modal open={open} onClose={onClose} title={`Buchung · ${workshop.titel}`} maxWidth="max-w-240" zIndex={8888}>
            <BookingForm workshop={workshop} onClose={onClose} onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
}