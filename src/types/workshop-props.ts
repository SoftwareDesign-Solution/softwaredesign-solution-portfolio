import { ActionStatusContent } from "./action-status-content";
import { Workshop } from "./workshop";

export interface WorkshopFormProps {
    workshop: Workshop;
    onClose: () => void;

    onSuccess: (content: ActionStatusContent) => void;
    onError: (content: ActionStatusContent) => void;
}

export interface WorkshopModalProps extends WorkshopFormProps {
    open: boolean;
}