/**
 * @file page.tsx
 * @description Seite /notifications/[id]/confirm: bestätigt serverseitig die
 * Workshop-Benachrichtigungs-Anmeldung (Double-Opt-In) und zeigt das Ergebnis an.
 * @module app/(confirmation)/notifications/[id]/confirm/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { confirmNotificationSignup } from "@/app/actions/confirm-notification-signup";

import ConfirmationDetails from "../../../_components/confirmation-details";
import ConfirmationStatus from "../../../_components/confirmation-status";

/** Props für {@link NotificationConfirmationPage}. */
interface NotificationConfirmationPageProps {
    params: Promise<{
        /** ID der Benachrichtigungs-Anmeldung aus der URL. */
        id: string;
    }>;
    searchParams: Promise<{
        /** Bestätigungs-Token aus dem Query-Parameter des E-Mail-Links. */
        token?: string;
    }>;
}

/**
 * Bestätigt serverseitig die Workshop-Benachrichtigungs-Anmeldung (Double-Opt-In)
 * über {@link confirmNotificationSignup} und zeigt das Ergebnis an.
 *
 * @param props - Siehe {@link NotificationConfirmationPageProps}
 * @returns Die Bestätigungsseite (Erfolg oder "nicht gefunden")
 */
export default async function NotificationConfirmationPage({
    params,
    searchParams,
}: NotificationConfirmationPageProps) {
    const [{ id }, { token }] = await Promise.all([
        params,
        searchParams,
    ]);

    if (!token) {
        return <InvalidNotificationConfirmation />;
    }

    const result = await confirmNotificationSignup({
        id,
        token,
    });

    if (!result || result.status === "invalid-or-expired") {
        return <InvalidNotificationConfirmation />;
    }

    if (!result.data) {
        return <InvalidNotificationConfirmation />;
    }
    
    const { email, nachname, vorname, workshop } = result.data;

    return (
        <ConfirmationStatus
            description={
                <>
                    Sie haben sich für Benachrichtigungen über neue
                    Termine zum Workshop{" "}
                    <strong>{workshop.titel}</strong>{" "}
                    registriert.
                </>
            }
            eyebrow="Workshop-Benachrichtigung"
            title="Anmeldung bestätigt"
        >
            <ConfirmationDetails
                items={[
                    {
                        label: "Vorname",
                        value: vorname,
                    },
                    {
                        label: "Nachname",
                        value: nachname,
                    },
                    {
                        label: "E-Mail",
                        value: email,
                    },
                ]}
            />

            <div className="mt-6 rounded-md border-l-3 border-success-500 bg-success-50 px-4.5 py-3.5 text-sm leading-[1.55] text-success-600">
                Anmeldung bestätigt — Sie werden benachrichtigt,
                sobald ein neuer Termin angelegt wird.
            </div>
        </ConfirmationStatus>
    );
}

/**
 * Fallback-Ansicht für ungültige, abgelaufene oder fehlende Bestätigungslinks.
 *
 * @returns Die "nicht gefunden"-Ansicht
 */
function InvalidNotificationConfirmation() {
    return (
        <ConfirmationStatus
            description="Diese Workshop-Benachrichtigung wurde nicht gefunden oder der Link ist ungültig."
            eyebrow="Workshop-Benachrichtigung"
            title="Nicht gefunden"
        />
    );
}