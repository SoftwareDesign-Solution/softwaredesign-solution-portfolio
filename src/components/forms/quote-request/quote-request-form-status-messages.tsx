import { ActionStatusContent } from "@/types/action-status-content";
import { formatDateRange, isSameDay } from "@/utils/format-date-range";

interface QuoteRequestSuccessMessageProps {
    vorname: string;
    email: string;
    titel: string;
    datumVon?: string | null;
    datumBis?: string | null;
}

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

interface QuoteRequestErrorMessageProps {
    vorname: string;
    titel: string;
}

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