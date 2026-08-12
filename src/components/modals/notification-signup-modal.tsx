import { WorkshopModalProps } from "@/types/workshop-props";
import Modal from "./modal";
import NotificationSignupForm from "../forms/notification-signup/notification-signup-form";

export default function NotificationSignupModal({ open, onClose, workshop, onSuccess, onError } : WorkshopModalProps) {
    return (
        <Modal open={open} onClose={onClose} title={`Benachrichtigung · ${workshop.titel}`} maxWidth="max-w-[520px]" zIndex={8888}>
            <NotificationSignupForm workshop={workshop} onClose={onClose} onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
};