import { confirmQuoteRequest } from "@/app/actions/confirm-quote-request";
import { formatDateRange, isSameDay } from "@/utils/format-date-range";

interface OfferRequestConfirmationPageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        token?: string;
    }>;
}
export default async function OfferRequestConfirmationPage({
    params,
    searchParams,
}: OfferRequestConfirmationPageProps) {

    const { id } = await params;
    const { token } = await searchParams;

    /*
    let confirmationData: Awaited<ReturnType<typeof getQuoteRequestConfirmation>> = null;
    try {
        confirmationData = await getQuoteRequestConfirmation({ id, token: token ?? '' });
    } catch (error) {
        console.error('Fehler beim Abrufen der Angebotsanfrage-Bestätigung:', error);
    }
    */

    // http://localhost:3000/offers-request/56809ea2-1103-4a15-97d0-955b5be15e52/confirm?token=38c8903b-fb0c-4dc8-bdb9-2e84a22dacb6

    const result = await confirmQuoteRequest({ id, token: token ?? '' });

    if (result?.status === 'invalid-or-expired') {
        return (
            <article>
                <section className="pt-16 px-6 pb-24 max-w-190 mx-auto">

                    <div className="mb-3.5">
                        <div className="text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 mb-2.5">
                            Angebots-Anfrage
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-[-1.2px] leading-[1.08]">
                        Nicht gefunden
                    </h1>

                    <p className="text-xl leading-[1.55] text-foreground max-w-205 mt-4">
                        Diese Angebots-Anfrage wurde nicht gefunden oder der Link ist ungültig.
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
                    <div className="text-xs tracking-[1.5px] uppercase font-semibold text-success-600 mb-2.5">
                        Angebots-Anfrage
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-[-1.2px] leading-[1.08]">
                    Anfrage bestätigen
                </h1>

                <p className="text-xl leading-[1.55] text-foreground max-w-205 mt-4">
                    Sie haben ein unverbindliches Angebot für den Workshop <strong>{confirmationData?.workshopTitel}</strong> 
                    {isSameDay(String(confirmationData?.datumVon), String(confirmationData?.datumBis)) ? 'am' : 'vom'} <strong>{formatDateRange(String(confirmationData?.datumVon), String(confirmationData?.datumBis))}</strong> angefordert.
                </p>

                <div className="mt-10 py-5.5 px-5.5 bg-surface rounded-lg">
                    
                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Firma</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.firma}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Ansprechpartner</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.vorname} {confirmationData?.nachname}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>E-Mail</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.email}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Teilnehmer</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.teilnehmerzahl}</span>
                    </div>

                </div>

                <div className="mt-6 py-3.5 px-4.5 bg-success-50 rounded-md text-sm text-muted leading-[1.55] border-l-3 border-success-500">
                    Anmeldung bestätigt — Sie werden benachrichtigt, sobald ein neuer Termin angelegt wird.
                </div>

            </section>

        </article>
    );
}
