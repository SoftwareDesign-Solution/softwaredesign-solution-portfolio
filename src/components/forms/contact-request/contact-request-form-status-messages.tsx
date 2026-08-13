import { ActionStatusContent } from "@/types/action-status-content";

interface ContactRequestSuccessMessageProps {
    vorname: string;
    email: string;
}

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

interface ContactRequestErrorMessageProps {
    vorname: string;
}

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