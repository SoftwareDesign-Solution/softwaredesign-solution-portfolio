/**
 * @file workshop-props.ts
 * @description Gemeinsame Props-Typen für alle Workshop-bezogenen Formulare und Modals.
 * @module types/workshop-props
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ActionStatusContent } from "./action-status-content";
import { Workshop } from "./workshop";

/** Gemeinsame Props für Workshop-bezogene Formulare (Buchung, Angebotsanfrage, etc.). */
export interface WorkshopFormProps {
    workshop: Workshop;
    /** Schließt das Formular/Modal ohne Erfolgs-/Fehlermeldung. */
    onClose: () => void;

    /** Wird nach erfolgreichem Absenden mit dem anzuzeigenden Erfolgsinhalt aufgerufen. */
    onSuccess: (content: ActionStatusContent) => void;
    /** Wird bei einem Fehler beim Absenden mit dem anzuzeigenden Fehlerinhalt aufgerufen. */
    onError: (content: ActionStatusContent) => void;
}

/** Props für ein Modal, das ein {@link WorkshopFormProps}-Formular umschließt. */
export interface WorkshopModalProps extends WorkshopFormProps {
    open: boolean;
}
