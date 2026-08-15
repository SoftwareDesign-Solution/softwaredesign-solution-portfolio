import { Section, Text } from "react-email";
import Heading from "@/emails/components/heading";
import Layout from "@/emails/components/layout";
import { Table } from "./components/table";
import { formatDateRange } from "@/utils/format-date-range";
import { type SendQuoteRequestEmailData } from '@/schemas/quote-request.schema';

/*
interface QuoteRequestNotificationEmailProps {
    name: string;
    email: string;
    firma: string;
    termin: {
        datumVon: string;
        datumBis: string;
    },
    teilnehmerzahl: number;
    workshopTitel: string;
    nachricht: string;
};
*/

export default function QuoteRequestNotificationEmail(props: SendQuoteRequestEmailData) {
    return (
        <Layout>

            <Heading kicker="Angebot · Bestätigte Anfrage" kickerVariant="success">
                Angebot erstellen.
            </Heading>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    <strong>{`${props.ansprechpartner?.vorname} ${props.ansprechpartner?.nachname}`}</strong> hat die Angebotsanfrage soeben per Double-Opt-In bestätigt. Bitte Angebot erstellen und direkt per E-Mail an die Person senden.
                </Text>

            </Section>

            <Table>
                <Table.Row label="Workshop" value={props.workshop.titel} />
                <Table.Row label="Termin" value={formatDateRange(props.termin!.datumVon, props.termin!.datumBis)} />
                <Table.Row label="Teilnehmerzahl" value={props.teilnehmerzahl} />
                <Table.Row label="Firma" value={props.rechnungsadresse?.firma ? props.rechnungsadresse.firma : props.adresse.firma} />
                <Table.Row label="Name" value={`${props.ansprechpartner?.vorname} ${props.ansprechpartner?.nachname}`} />
                <Table.Row label="E-Mail" value={props.ansprechpartner?.email} />
            </Table>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 font-sans font-bold text-[15px] leading-[1.6] text-foreground">
                    Nachricht:
                </Text>

                <Text className="m-0 mb-4 font-sans text-[15px] leading-[1.6] text-foreground">
                    {props.notizen || "Keine Nachricht hinterlassen."}
                </Text>

            </Section>

        </Layout>
    );
};

QuoteRequestNotificationEmail.PreviewProps = {
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    firma: "Musterfirma GmbH",
    termin: {
        datumVon: "2024-07-01",
        datumBis: "2024-07-02",
    },
    teilnehmerzahl: 10,
    workshop: {
        titel: "Beispiel-Workshop"
    },
    notizen: "Dies ist eine Beispielnachricht."
};