/**
 * @file quote-request-form-status-messages.tsx
 * @description Erfolgs-/Fehler-Inhalte für das {@link ActionStatusModal} nach der Angebotsanfrage.
 * @module components/forms/quote-request/quote-request-form-status-messages
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ActionStatusContent } from "@/types/action-status-content";
import { formatDateRange, isSameDay } from "@/utils/format-date-range";

/** Props für {@link quoteRequestSuccessMessage}. */
interface QuoteRequestSuccessMessageProps {
    vorname: string;
    email: string;
    titel: string;
    /** `null`/`undefined`, wenn die Anfrage ohne festen Termin gestellt wurde. */
    datumVon?: string | null;
    datumBis?: string | null;
}

/**
 * Erfolgs-Inhalt für das Status-Modal: weist auf die noch ausstehende Double-Opt-In-Bestätigung
 * per E-Mail hin. Nennt den angefragten Termin nur, wenn einer ausgewählt wurde.
 *
 * @param props - Siehe {@link QuoteRequestSuccessMessageProps}
 * @returns Der {@link ActionStatusContent} für das Erfolgs-Modal
 */
export function quoteRequestSuccessMessage(props: QuoteRequestSuccessMessageProps): ActionStatusContent {

    const hasTermin = Boolean(props.datumVon && props.datumBis);

    return {
            variant: "success",
            kicker: "Angebotsanfrage eingegangen",
            heading: () => `Fast geschafft, ${props.vorname}`,
            body: () => (
                <>
                    Ich habe Ihnen eine Bestätigungsmail an <strong>{props.email}</strong> geschickt.
                    Bitte klicken Sie auf den Link in der Mail — danach erstelle ich Ihr unverbindliches Angebot für <strong>{props.titel}</strong>{" "}
                    {hasTermin ? (
                        <>
                            {isSameDay(props.datumVon!, props.datumBis!) ? "am" : "vom"} <strong>{formatDateRange(props.datumVon!, props.datumBis!)}</strong>{" "}
                        </>
                    ) : null}
                    und sende es
                    Ihnen in Kürze per E-Mail zu.
                </>
            ),
            maxWidth: "max-w-130",
        };

        {/*
            body: () => (
                <>
                    Ich habe Ihnen eine Bestätigungsmail an <strong>{props.email}</strong> geschickt.
                    Bitte klicken Sie auf den Link in der Mail — danach erstelle ich Ihr unverbindliches Angebot für <strong>{props.titel}</strong> {isSameDay(props.datumVon, props.datumBis) ? "am" : "vom"} <strong>{formatDateRange(props.datumVon, props.datumBis)}</strong> und sende es
                    Ihnen in Kürze per E-Mail zu.
                </>
            ),
            */}
};

/** Props für {@link quoteRequestErrorMessage}. */
interface QuoteRequestErrorMessageProps {
    vorname: string;
    titel: string;
}

/**
 * Fehler-Inhalt für das Status-Modal, wenn die Angebotsanfrage nicht gespeichert werden konnte.
 *
 * @param props - Siehe {@link QuoteRequestErrorMessageProps}
 * @returns Der {@link ActionStatusContent} für das Fehler-Modal
 */
export function quoteRequestErrorMessage(props: QuoteRequestErrorMessageProps): ActionStatusContent {
    return {
        variant: "error",
        kicker: "Angebotsanfrage nicht übermittelt",
        heading: () => `Kurze Unterbrechung, ${props.vorname}`,
        body: () => (
            <>
                Ihre Angebotsanfrage für <strong>{props.titel}</strong> konnte leider nicht gespeichert  werden. Bitte versuchen Sie es erneut oder kontaktieren Sie mich unter <strong>mail@softwaredesign-solution.de</strong>.
            </>
        ),
        maxWidth: "max-w-130",
    };
};