/**
 * @file notification-signup-form-status-messages.tsx
 * @description Erfolgs-/Fehler-Inhalte für das {@link ActionStatusModal} nach der
 * Workshop-Benachrichtigungs-Anmeldung.
 * @module components/forms/notification-signup/notification-signup-form-status-messages
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ActionStatusContent } from "@/types/action-status-content";

/** Props für {@link notificationSignupSuccessMessage}. */
interface notificationSignupSuccessMessageProps {
    workshopTitle: string;
    vorname: string;
    //nachname: string;
    email: string;
    ref: string;
    status: string;
}

/**
 * Erfolgs-Inhalt für das Status-Modal: weist auf die noch ausstehende Double-Opt-In-Bestätigung per E-Mail hin.
 *
 * @param props - Siehe {@link notificationSignupSuccessMessageProps}
 * @returns Der {@link ActionStatusContent} für das Erfolgs-Modal
 */
export function notificationSignupSuccessMessage(props: notificationSignupSuccessMessageProps): ActionStatusContent {
    return {
        variant: "success",
        kicker: "Benachrichtigungsanmeldung eingegangen",
        heading: () => `Fast geschafft, ${props.vorname}`,
        body: () => (
            <>
                Wir haben dir gerade eine Bestätigungs-Mail an <strong>{props.email}</strong> geschickt. Bitte klicke auf den Bestätigungs-Link in der Mail, um deine Anmeldung für den Workshop <strong>{props.workshopTitle}</strong> abzuschließen.
            </>
        ),
        meta: [
            { label: "Referenz", value: props.ref },
            { label: "Status", value: props.status },
        ],
        maxWidth: "max-w-130",
    };
};

/** Props für {@link notificationSignupErrorMessage}. */
interface notificationSignupErrorMessageProps {
    vorname: string;
}

/**
 * Fehler-Inhalt für das Status-Modal, wenn die Benachrichtigungs-Anmeldung nicht gespeichert werden konnte.
 *
 * @param props - Siehe {@link notificationSignupErrorMessageProps}
 * @returns Der {@link ActionStatusContent} für das Fehler-Modal
 */
export function notificationSignupErrorMessage(props: notificationSignupErrorMessageProps): ActionStatusContent {
    return {
        variant: "error",
        kicker: "Nicht gespeichert",
        heading: () => `Kurze Unterbrechung, ${props.vorname}`,
        body: () =>(
            <>
                Ihre Benachrichtigungsanfrage konnte leider nicht gespeichert werden. Bitte versuchen Sie es erneut oder schreiben Sie mir unter <strong>mail@softwaredesign-solution.de</strong>.
            </>
        ),
        maxWidth: "max-w-130",
    }
};