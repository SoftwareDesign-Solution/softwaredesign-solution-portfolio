import { ActionStatusContent } from "@/types/action-status-content";

interface notificationSignupSuccessMessageProps {
    workshopTitle: string;
    vorname: string;
    //nachname: string;
    email: string;
    ref: string;
    status: string;
}

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

interface notificationSignupErrorMessageProps {
    vorname: string;
}

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