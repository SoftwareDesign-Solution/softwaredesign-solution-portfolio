import { confirmQuoteRequest } from "@/app/actions/confirm-quote-request";
import {
    formatDateRange,
    isSameDay,
} from "@/utils/format-date-range";

import ConfirmationDetails from "../../../_components/confirmation-details";
import ConfirmationStatus from "../../../_components/confirmation-status";

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
    const [{ id }, { token }] = await Promise.all([
        params,
        searchParams,
    ]);

    if (!token) {
        return <InvalidOfferRequestConfirmation />;
    }

    const result = await confirmQuoteRequest({
        id,
        token,
    });

    if (!result || result.status === "invalid-or-expired") {
        return <InvalidOfferRequestConfirmation />;
    }

    if (!result.data) {
        return <InvalidOfferRequestConfirmation />;
    }

    const { data } = result;

    const company =
        data.rechnungsadresse?.firma ??
        data.adresse.firma ??
        "";

    const contactName = [
        data.ansprechpartner?.vorname,
        data.ansprechpartner?.nachname,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <ConfirmationStatus
            description={
                <OfferRequestDescription
                    termin={data.termin}
                    workshopTitle={data.workshop.titel}
                />
            }
            eyebrow="Angebotsanfrage"
            title="Anfrage bestätigt"
        >
            <ConfirmationDetails
                items={[
                    {
                        label: "Firma",
                        value: company,
                    },
                    {
                        label: "Ansprechpartner",
                        value: contactName,
                    },
                    {
                        label: "E-Mail",
                        value:
                            data.ansprechpartner?.email ?? "",
                    },
                    {
                        label: "Teilnehmer",
                        value: data.teilnehmerzahl,
                    },
                ]}
            />

            <div className="mt-6 rounded-md border-l-3 border-success-500 bg-success-50 px-4.5 py-3.5 text-sm leading-[1.55] text-muted">
                Anfrage bestätigt — Ihr Angebot wird erstellt und
                Ihnen in Kürze per E-Mail zugesendet.
            </div>
        </ConfirmationStatus>
    );
}

interface OfferRequestDescriptionProps {
    termin?: {
        datumBis: string;
        datumVon: string;
    } | null;
    workshopTitle: string;
}

function OfferRequestDescription({
    termin,
    workshopTitle,
}: OfferRequestDescriptionProps) {
    return (
        <>
            Sie haben ein unverbindliches Angebot für den Workshop{" "}
            <strong>{workshopTitle}</strong>
            {termin && (
                <>
                    {" "}
                    {isSameDay(
                        termin.datumVon,
                        termin.datumBis,
                    )
                        ? "am"
                        : "vom"}{" "}
                    <strong>
                        {formatDateRange(
                            termin.datumVon,
                            termin.datumBis,
                        )}
                    </strong>
                </>
            )}{" "}
            angefordert.
        </>
    );
}

function InvalidOfferRequestConfirmation() {
    return (
        <ConfirmationStatus
            description="Diese Angebotsanfrage wurde nicht gefunden oder der Link ist ungültig."
            eyebrow="Angebotsanfrage"
            title="Nicht gefunden"
        />
    );
}