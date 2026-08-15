import { unsubscribeNotificationSignup } from "@/app/actions/unsubscribe-notification-signup";

interface NotificationUnsubscribePageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        token?: string;
    }>;
}

export default async function NotificationUnsubscribePage({
    params,
    searchParams,
}: NotificationUnsubscribePageProps) {

    const { id } = await params;
    const { token } = await searchParams;

    const result = await unsubscribeNotificationSignup({ id, token: token ?? '' });

    if (result?.status === 'invalid-or-expired') {
        return (
            <article>
                <section className="pt-16 px-6 pb-24 max-w-190 mx-auto">

                    <div className="mb-3.5">
                        <div className="text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 mb-2.5">
                            Workshop-Benachrichtigung
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-[-1.2px] leading-[1.08] text-foreground">
                        Nicht gefunden
                    </h1>

                    <p className="text-xl leading-[1.55] text-foreground max-w-205 mt-4">
                        Diese Workshop-Benachrichtigung wurde nicht gefunden oder der Link ist ungültig.
                    </p>

                </section>

            </article>
        )
    }

    const unsubscribeData = result?.data;

    return (
        <article>

            <section className="pt-16 px-6 pb-24 max-w-190 mx-auto">

                <div className="mb-3.5">
                    <div className="text-xs tracking-[1.5px] uppercase font-semibold text-muted mb-2.5">
                        Workshop-Benachrichtigung
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-[-1.2px] leading-[1.08] text-foreground">
                    Abmeldung bestätigt
                </h1>

                <p className="text-xl leading-[1.55] text-foreground max-w-205 mt-4">
                    Sie erhalten künftig keine Benachrichtigungen mehr über neue Termine zum Workshop <strong>{unsubscribeData?.workshopTitel}</strong>.
                </p>

                <div className="mt-10 py-5.5 px-5.5 bg-surface rounded-lg">

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Vorname</span>
                        <span className="font-mono text-[13.5px]">{unsubscribeData?.vorname}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Nachname</span>
                        <span className="font-mono text-[13.5px]">{unsubscribeData?.nachname}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>E-Mail</span>
                        <span className="font-mono text-[13.5px]">{unsubscribeData?.email}</span>
                    </div>

                </div>

                <div className="mt-6 py-3.5 px-4.5 bg-success-50 rounded-md text-sm text-success-600 leading-[1.55] border-l-3 border-success-500">
                    Abmeldung erfolgreich — Sie werden für diesen Workshop nicht mehr benachrichtigt.
                </div>

            </section>

        </article>
    );
}