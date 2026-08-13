import { confirmNotificationSignup } from "@/app/actions/confirm-notification-signup";

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

    const { id } = await params;
    const { token } = await searchParams;

    const result = await confirmNotificationSignup({ id, token: token ?? '' });
    
    if (result?.status === 'invalid-or-expired') {
        return (
            <article>
                <section className="pt-16 px-6 pb-24 max-w-190 mx-auto">

                    <div className="mb-3.5">
                        <div className="text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 mb-2.5">
                            Workshop-Benachrichtigung
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-[-1.2px] leading-[1.08]">
                        Nicht gefunden
                    </h1>

                    <p className="text-xl leading-[1.55] text-foreground max-w-205 mt-4">
                        Diese Workshop-Benachrichtigung wurde nicht gefunden oder der Link ist ungültig.
                    </p>

                </section>

            </article>
        )
    }

    const confirmationData = result?.data;

    return (
        <article>
            
            <section className="pt-16 px-6 pb-24 max-w-190 mx-auto">

                <div className="mb-3.5">
                    <div className="text-xs tracking-[1.5px] uppercase font-semibold text-gray-500 mb-2.5">
                        Workshop-Benachrichtigung
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-[-1.2px] leading-[1.08]">
                    Anmeldung bestätigen
                </h1>

                <p className="text-xl leading-[1.55] text-gray-700 max-w-205 mt-4">
                    Sie haben sich für Benachrichtigungen über neue Termine zum Workshop <strong>{confirmationData?.workshopTitel}</strong> registriert.
                </p>

                <div className="mt-10 py-5.5 px-5.5 bg-gray-100 rounded-lg">
                    
                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-gray-500">
                        <span>Vorname</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.vorname}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-gray-500">
                        <span>Nachname</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.nachname}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-gray-500">
                        <span>E-Mail</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.email}</span>
                    </div>

                </div>

                <div className="mt-6 py-3.5 px-4.5 bg-lime-200/50 rounded-md text-sm text-gray-500 leading-[1.55] border-l-3 border-lime-400">
                    Anmeldung bestätigt — Sie werden benachrichtigt, sobald ein neuer Termin angelegt wird.
                </div>

            </section>

        </article>
    );
}