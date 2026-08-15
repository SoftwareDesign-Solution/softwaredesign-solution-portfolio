import { Section, Text } from "react-email";
import Heading from "./components/heading";
import Layout from "./components/layout";
import { Table } from "./components/table";
import { formatDateRange } from "@/utils/format-date-range";
import { formatPrice } from "@/utils/format-price";
import ParticipantList from "./components/participant-list";
import { ReactNode } from "react";
import { SendBookingConfirmationEMailData } from "@/schemas/booking.schema";
//import { BookingConfirmationEmailProps } from "@/schemas/emails/booking-confirmation-email.schema";

/*
export interface BookingConfirmationEmailProps {
    salutation: string;
    workshopTitel: string;
    datumVon: string;
    datumBis: string;
    firma: string;
    rechnungsadresse: {
        firma: string;
        strasse: string;
        plz: string;
        ort: string;
    } | null;
    gesamtpreis: number;
    teilnehmer: {
        vorname: string;
        nachname: string;
    }[];
}
*/

export default function BookingConfirmationEmail(props: SendBookingConfirmationEMailData) {

    const rechnungsAdresseString: ReactNode = (
        <>
            {(props.abweichendeRechnungsadresse && props.rechnungsadresse) ? (
                <>
                    {props.rechnungsadresse.firma}<br />
                    {props.rechnungsadresse.strasse}<br />
                    {props.rechnungsadresse.plz} {props.rechnungsadresse.ort}
                </>
            ) : (
                <>
                    {props.adresse.firma}<br />
                    {props.adresse.strasse}<br />
                    {props.adresse.plz} {props.adresse.ort}
                </>
            )}
        </>
    );

    return (
        <Layout>

            <Heading kicker="Workshop-Buchung · Bestätigung" kickerVariant="success">
                Vielen Dank für deine Buchung.
            </Heading>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    {props.salutation},
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    vielen Dank für Ihre Buchung. Ich freue mich, Sie zum folgenden Workshop begrüßen zu dürfen — nachfolgend noch einmal alle Details im Überblick:
                </Text>

            </Section>

            <Table>

                <Table.Row label="Workshop" value={props.workshop.titel} />
                <Table.Row label="Termin" value={formatDateRange(props.termin!.datumVon, props.termin!.datumBis)} />
                <Table.Row label="Firma" value={props.abweichendeRechnungsadresse ? props.rechnungsadresse?.firma : props.adresse.firma} />
                <Table.Row label="Rechnungsadresse" value={rechnungsAdresseString} />
                <Table.Row label="Preis" value={formatPrice(props.gesamtpreis)} />
            </Table>

            <ParticipantList participants={props.teilnehmer} />

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    Bei Rückfragen antworten Sie einfach auf diese E-Mail — ich melde mich zeitnah bei Ihnen.
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    Mit freundlichen Grüßen,<br /><br />Manuel Kübler
                </Text>

            </Section>

        </Layout>
    );
}

BookingConfirmationEmail.PreviewProps = {
    salutation: "Hallo Manuel",
    workshopTitel: "Beispiel-Workshop",
    termin: {
        datumVon: "2024-07-01",
        datumBis: "2024-07-02",
    },
    firma: "SoftwareDesign-Solution",
    rechnungsadresse: {
        firma: "SoftwareDesign-Solution",
        strasse: "Steinbergstr. 2",
        plz: "72202",
        ort: "Nagold",
    },
    gesamtpreis: 99.00,
    teilnehmer: [
        {
            vorname: "Manuel",
            nachname: "Kübler",
        }
    ]
};