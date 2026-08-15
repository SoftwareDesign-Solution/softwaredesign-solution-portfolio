import { Section, Text } from "react-email";
import Heading from "./components/heading";
import Layout from "./components/layout";
import { Table } from "./components/table";
import { formatDateRange } from "@/utils/format-date-range";
import Button from "./components/button";
import { type SendQuoteRequestOptinEmailData } from "@/schemas/quote-request.schema";

/*
interface QuoteRequestOptinEmailProps {
    salutation: string;
    workshopTitel: string;
    termin: {
        datumVon: string;
        datumBis: string;
    }
    firma: string;
    teilnehmerzahl: number;
    confirmationLink: string;
};
*/

export default function QuoteRequestOptinEmail(props: SendQuoteRequestOptinEmailData) {
    return (
        <Layout>

            <Heading kicker="Angebot · Anfrage bestätigen">
                Ein Klick fehlt noch.
            </Heading>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    {props.salutation},
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    vielen Dank für Ihr Interesse am Workshop <strong>{props.workshop.titel}</strong>. Bitte bestätigen Sie Ihre Anfrage über den Button unten — direkt danach erstelle ich Ihr unverbindliches Angebot und sende es Ihnen per E-Mail zu.
                </Text>

            </Section>

            <Table>
                <Table.Row label="Workshop" value={props.workshop.titel} />
                <Table.Row label="Termin" value={formatDateRange(props.termin!.datumVon, props.termin!.datumBis)} />
                <Table.Row label="Teilnehmerzahl" value={props.teilnehmerzahl} />
                <Table.Row label="Firma" value={props.abweichendeRechnungsadresse ? props.rechnungsadresse!.firma : props.adresse.firma} />
            </Table>

            <Section className="px-8 pb-2 pt-6 text-center">
                            
                <Button
                    href={props.confirmationLink}
                >
                    Anmeldung bestätigen
                </Button>

            </Section>

            <Section className="px-8 pb-4 text-center">
                <Text className="m-0 font-sans text-[12.5px] text-muted">unverbindlich · ohne Bestätigung passiert nichts</Text>
            </Section>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    Sollten Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail einfach ignorieren.
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    Mit freundlichen Grüßen,<br /><br />Manuel Kübler
                </Text>

            </Section>

        </Layout>
    );
};

QuoteRequestOptinEmail.PreviewProps = {
    salutation: "Sehr geehrte Frau Mustermann",
    workshop: {
        id: 1,
        titel: "Beispiel-Workshop",
    },
    termin: {
        datumVon: "2024-01-01",
        datumBis: "2024-01-02",
    },
    abweichendeRechnungsadresse: false,
    adresse: {
        firma: "Beispiel GmbH",
        strasse: "Musterstraße 1",
        plz: "12345",
        ort: "Musterstadt",
    },
    teilnehmerzahl: 5,
    confirmationLink: "https://www.softwaredesign-solution.de/offer-requests/confirm/1234567890abcdef",
};