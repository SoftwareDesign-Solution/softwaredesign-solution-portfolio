/**
 * @file booking-form-status-messages.tsx
 * @description Erfolgs-/Fehler-Inhalte für das {@link ActionStatusModal} nach dem
 * Absenden der Buchung.
 * @module components/forms/booking/booking-form-status-messages
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ActionStatusContent } from "@/types/action-status-content";
import { formatDateRange, isSameDay } from "@/utils/format-date-range";

/** Props für {@link bookingSuccessMessage}. */
interface bookingSuccessMessageProps {
    vorname: string;
    email: string;
    titel: string;
    datumVon: string;
    datumBis: string;
    ref: string;
    teilnehmerzahl: number;
}

/**
 * Erfolgs-Inhalt für das Status-Modal nach erfolgreicher Buchung.
 *
 * @param props - Siehe {@link bookingSuccessMessageProps}
 * @returns Der {@link ActionStatusContent} für das Erfolgs-Modal
 */
export function bookingSuccessMessage(props: bookingSuccessMessageProps): ActionStatusContent {
    return {
        variant: "success",
        kicker: "Buchung eingegangen",
        heading: () => `Danke, ${props.vorname}`,
        body: () => (
            <>
                Ihre Buchung für <strong>{props.titel}</strong> {isSameDay(props.datumVon, props.datumBis) ? "am" : "vom"} <strong>{formatDateRange(props.datumVon, props.datumBis)}</strong> ist bei mir eingegangen.
                Sie erhalten in Kürze eine Bestätigungsmail an <strong>{props.email}</strong>.
                Die Rechnung schicke ich Ihnen nach dem Workshop per E-Mail zu, Zahlungsziel 14 Tage.
            </>
        ),
        meta: [
            { label: "ref", value: props.ref },
            { label: "status", value: "pending" },
            { label: "seats", value: props.teilnehmerzahl.toString() },
        ],
        maxWidth: "max-w-130",
    };
};

/** Props für {@link bookingErrorMessage}. */
interface bookingErrorMessageProps {
    vorname: string;
    titel: string;
}

/**
 * Fehler-Inhalt für das Status-Modal, wenn die Buchung nicht gespeichert werden konnte.
 *
 * @param props - Siehe {@link bookingErrorMessageProps}
 * @returns Der {@link ActionStatusContent} für das Fehler-Modal
 */
export function bookingErrorMessage(props: bookingErrorMessageProps): ActionStatusContent {
    return {
        variant: "error",
        kicker: "Buchung nicht abgeschlossen",
        heading: () => `Kurze Unterbrechung, ${props.vorname}`,
        body: () => (
            <>
                Ihre Buchung für <strong>{props.titel}</strong> konnte leider nicht verarbeitet werden. Es wurde noch keine Reservierung ausgelöst. Bitte versuchen Sie es erneut oder kontaktieren Sie mich unter <strong>mail@softwaredesign-solution.de</strong>.
            </>
        ),
        maxWidth: "max-w-130",
    };
};