/**
 * @file contact-request-form-status-messages.tsx
 * @description Erfolgs-/Fehler-Inhalte für das {@link ActionStatusModal} nach dem
 * Absenden der Kontaktanfrage.
 * @module components/forms/contact-request/contact-request-form-status-messages
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ActionStatusContent } from "@/types/action-status-content";

/** Props für {@link contactRequestSuccessMessage}. */
interface ContactRequestSuccessMessageProps {
    vorname: string;
    email: string;
}

/**
 * Erfolgs-Inhalt für das Status-Modal nach erfolgreich übermittelter Kontaktanfrage.
 *
 * @param props - Siehe {@link ContactRequestSuccessMessageProps}
 * @returns Der {@link ActionStatusContent} für das Erfolgs-Modal
 */
export function contactRequestSuccessMessage(props: ContactRequestSuccessMessageProps): ActionStatusContent {
    return {
        variant: "success",
        kicker: "Anfrage eingegangen",
        heading: () => `Danke, ${props.vorname}`,
        body: () => (
            <>
                Ihre Nachricht ist bei mir eingegangen. Ich melde mich in der Regel innerhalb
                von <strong>1–2 Werktagen</strong> bei Ihnen unter <strong>{props.email}</strong>.
            </>
        ),
        maxWidth: "max-w-130",
    };
};

/** Props für {@link contactRequestErrorMessage}. */
interface ContactRequestErrorMessageProps {
    vorname: string;
}

/**
 * Fehler-Inhalt für das Status-Modal, wenn die Kontaktanfrage nicht übermittelt werden konnte.
 *
 * @param props - Siehe {@link ContactRequestErrorMessageProps}
 * @returns Der {@link ActionStatusContent} für das Fehler-Modal
 */
export function contactRequestErrorMessage(props: ContactRequestErrorMessageProps): ActionStatusContent {
    return {
        variant: "error",
        kicker: "Anfrage nicht abgeschlossen",
        heading: () => `Kurze Unterbrechung, ${props.vorname}`,
        body: () => (
            <>
                Ihre Nachricht konnte leider nicht übermittelt werden. Bitte versuchen Sie es
                erneut oder schreiben Sie mir direkt an <strong>mail@softwaredesign-solution.de</strong>.
            </>
        ),
        maxWidth: "max-w-130",
    };
};