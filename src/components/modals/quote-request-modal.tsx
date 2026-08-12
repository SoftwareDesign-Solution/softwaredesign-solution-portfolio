import { WorkshopModalProps } from "@/types/workshop-props";
import QuoteRequestForm from "../forms/quote-request/quote-request-form";
import Modal from "./modal";

export default function QuoteRequestModal({ open, onClose, workshop, onSuccess, onError } : WorkshopModalProps) {
    return (
        <Modal open={open} onClose={onClose} title={`Angebotsanfrage · ${workshop.titel}`} maxWidth="max-w-240" zIndex={8888}>
            <QuoteRequestForm workshop={workshop} onClose={onClose} onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
}