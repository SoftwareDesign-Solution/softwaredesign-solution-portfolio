/**
 * @file notification-signup-modal.tsx
 * @description Modal-Wrapper um das Formular für die Workshop-Benachrichtigungs-Anmeldung.
 * @module components/modals/notification-signup-modal
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { WorkshopModalProps } from "@/types/workshop-props";

import NotificationSignupForm from "../forms/notification-signup/notification-signup-form";
import Modal from "./modal";

/**
 * Modal-Wrapper um das {@link NotificationSignupForm} für die Workshop-Benachrichtigungs-Anmeldung.
 *
 * @param props - Siehe {@link WorkshopModalProps}
 * @returns Das Benachrichtigungs-Modal
 */
export default function NotificationSignupModal({ open, onClose, workshop, onSuccess, onError } : WorkshopModalProps) {
    return (
        <Modal open={open} onClose={onClose} title={`Benachrichtigung · ${workshop.titel}`} maxWidth="max-w-[520px]" zIndex={8888}>
            <NotificationSignupForm workshop={workshop} onClose={onClose} onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
};