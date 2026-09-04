import { confirmNotificationSignup } from "@/app/actions/confirm-notification-signup";

import ConfirmationDetails from "../../../_components/confirmation-details";
import ConfirmationStatus from "../../../_components/confirmation-status";

interface NotificationConfirmationPageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        token?: string;
    }>;
}

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

function InvalidNotificationConfirmation() {
    return (
        <ConfirmationStatus
            description="Diese Workshop-Benachrichtigung wurde nicht gefunden oder der Link ist ungültig."
            eyebrow="Workshop-Benachrichtigung"
            title="Nicht gefunden"
        />
    );
}