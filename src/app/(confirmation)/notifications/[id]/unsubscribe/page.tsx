/**
 * @file page.tsx
 * @description Seite /notifications/[id]/unsubscribe: meldet serverseitig die
 * Workshop-Benachrichtigung ab und zeigt das Ergebnis an.
 * @module app/(confirmation)/notifications/[id]/unsubscribe/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { unsubscribeNotificationSignup } from "@/app/actions/unsubscribe-notification-signup";

import ConfirmationDetails from "../../../_components/confirmation-details";
import ConfirmationStatus from "../../../_components/confirmation-status";

/** Props für {@link NotificationUnsubscribePage}. */
interface NotificationUnsubscribePageProps {
    params: Promise<{
        /** ID der Benachrichtigungs-Anmeldung aus der URL. */
        id: string;
    }>;
    searchParams: Promise<{
        /** Abmelde-Token aus dem Query-Parameter des E-Mail-Links. */
        token?: string;
    }>;
}

/**
 * Meldet die Workshop-Benachrichtigung serverseitig über {@link unsubscribeNotificationSignup}
 * ab und zeigt das Ergebnis an.
 *
 * @param props - Siehe {@link NotificationUnsubscribePageProps}
 * @returns Die Abmelde-Bestätigungsseite (Erfolg oder "nicht gefunden")
 */
export default async function NotificationUnsubscribePage({
    params,
    searchParams,
}: NotificationUnsubscribePageProps) {
    const [{ id }, { token }] = await Promise.all([
        params,
        searchParams,
    ]);

    if (!token) {
        return <InvalidNotificationUnsubscribe />;
    }

    const result = await unsubscribeNotificationSignup({
        id,
        token,
    });

    if (!result || result.status === "invalid-or-expired") {
        return <InvalidNotificationUnsubscribe />;
    }

    if (!result.data) {
        return <InvalidNotificationUnsubscribe />;
    }
    
    const { email, nachname, vorname, workshopTitel } = result.data;

    return (
        <ConfirmationStatus
            description={
                <>
                    Sie erhalten künftig keine Benachrichtigungen
                    mehr über neue Termine zum Workshop{" "}
                    <strong>{workshopTitel}</strong>.
                </>
            }
            eyebrow="Workshop-Benachrichtigung"
            title="Abmeldung bestätigt"
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
                Abmeldung erfolgreich — Sie werden für diesen
                Workshop nicht mehr benachrichtigt.
            </div>
        </ConfirmationStatus>
    );
}

/**
 * Fallback-Ansicht für ungültige oder fehlende Abmeldelinks.
 *
 * @returns Die "nicht gefunden"-Ansicht
 */
function InvalidNotificationUnsubscribe() {
    return (
        <ConfirmationStatus
            description="Diese Workshop-Benachrichtigung wurde nicht gefunden oder der Link ist ungültig."
            eyebrow="Workshop-Benachrichtigung"
            title="Nicht gefunden"
        />
    );
}