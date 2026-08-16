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
                    Sie haben ein unverbindliches Angebot für den Workshop <strong>{confirmationData?.workshop.titel}</strong>{" "}
                    {isSameDay(String(confirmationData?.termin!.datumVon), String(confirmationData?.termin!.datumBis)) ? 'am' : 'vom'} <strong>{formatDateRange(String(confirmationData?.termin!.datumVon), String(confirmationData?.termin!.datumBis))}</strong> angefordert.
                </p>

                <div className="mt-10 py-5.5 px-5.5 bg-surface rounded-lg">
                    
                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Firma</span>
                        <span className="font-mono text-[13.5px]">{`${confirmationData?.rechnungsadresse?.firma || confirmationData?.adresse.firma || ''}`}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Ansprechpartner</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.ansprechpartner?.vorname} {confirmationData?.ansprechpartner?.nachname}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>E-Mail</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.ansprechpartner?.email}</span>
                    </div>

                    <div className="flex justify-between items-baseline py-1.5 px-0 text-sm text-muted">
                        <span>Teilnehmer</span>
                        <span className="font-mono text-[13.5px]">{confirmationData?.teilnehmerzahl}</span>
                    </div>

                </div>

                <div className="mt-6 py-3.5 px-4.5 bg-success-50 rounded-md text-sm text-muted leading-[1.55] border-l-3 border-success-500">
                    Anfrage bestätigt — Ihr Angebot wird erstellt und Ihnen in Kürze per E-Mail zugesendet.
                </div>

            </section>

        </article>
    );
}
