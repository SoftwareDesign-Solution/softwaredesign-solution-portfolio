import type { WorkshopModalProps } from "../../types/workshop-props";

import BookingForm from "../forms/booking/booking-form";
import Modal from "./modal";


export default function BookingModal({ open, onClose, workshop, onSuccess, onError }: WorkshopModalProps) {
    return (
        <Modal open={open} onClose={onClose} title={`Buchung · ${workshop.titel}`} maxWidth="max-w-240" zIndex={8888}>
            <BookingForm workshop={workshop} onClose={onClose} onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
}