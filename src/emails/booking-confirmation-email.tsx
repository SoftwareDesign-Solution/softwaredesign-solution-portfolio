import { ReactNode } from "react";
import { Section, Text } from "react-email";

import { SendBookingConfirmationEmailData } from "@/schemas/booking.schema";
import { formatDateRange } from "@/utils/format-date-range";
import { formatPrice } from "@/utils/format-price";

import Heading from "./components/heading";
import Layout from "./components/layout";
import ParticipantList from "./components/participant-list";
import { Table } from "./components/table";


export default function BookingConfirmationEmail(props: SendBookingConfirmationEmailData) {

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
                    vielen Dank für deine Buchung. Ich freue mich, dich zum folgenden Workshop begrüßen zu dürfen — nachfolgend noch einmal alle Details im Überblick:
                </Text>

            </Section>

            <Table>

                <Table.Row label="Workshop" value={props.workshop.titel} />
                <Table.Row label="Termin" value={formatDateRange(props.termin!.datumVon, props.termin!.datumBis)} />
                <Table.Row label="Firma" value={props.abweichendeRechnungsadresse ? props.rechnungsadresse?.firma : props.adresse.firma} />
                <Table.Row label="Rechnungsadresse" value={rechnungsAdresseString} />
                {/*props.rabatt > 0 && (
                    <Table.Row label="Gutschein" value={`${props.gutscheinCode} (− ${formatPrice(props.rabatt)})`} />
                )*/}
                {/*<Table.Row label="Preis" value={formatPrice(props.gesamtpreis)} />*/}
                {/*
                <Table.Row label="Teilnehmer" value={props.teilnehmerzahl} />
                <Table.Row label="Workshoppreis pro Teilnehmer" value={formatPrice(props.preis)} />
                <Table.Row label="Zwischensumme" value={formatPrice(props.subtotal)} />
                {props.rabatt > 0 && (
                    <Table.Row label="Gutschein" value={`${props.gutscheinCode} (− ${formatPrice(props.rabatt)})`} />
                )}
                <Table.Row label="Gesamtbetrag (netto)" value={formatPrice(props.netto)} />
                <Table.Row label="19 % Umsatzsteuer" value={formatPrice(props.ust)} />
                <Table.Row label="Gesamtbetrag (brutto)" value={formatPrice(props.brutto)} />
                */}
            </Table>
 
            <Table>
                <Table.Row label="Preis pro Teilnehmer" value={formatPrice(props.preis)} emphasis="muted" />
                <Table.Row label="Zwischensumme (netto)" value={formatPrice(props.zwischensumme)} emphasis="muted" />
                {props.rabatt > 0 && (
                    <Table.Row label="Gutschein" value={`${props.gutscheinCode} (− ${formatPrice(props.rabatt)})`} emphasis="success" />
                )}
                <Table.Row label="Gesamtbetrag (Netto)" value={formatPrice(props.zwischensumme - props.rabatt)} emphasis="muted" />
                <Table.Row label="19% Umsatzsteuer" value={formatPrice(props.ust)} emphasis="muted" />
                <Table.Row label="Gesamtbetrag (Brutto)" value={formatPrice(props.gesamtpreis)} emphasis="strong" />
            </Table>

            <ParticipantList participants={props.teilnehmer} />

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    Bei Rückfragen antworte einfach auf diese E-Mail — ich melde mich zeitnah bei dir.
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
    workshop: {
        titel: "Beispiel-Workshop",
    },
    termin: {
        datumVon: "2024-07-01",
        datumBis: "2024-07-02",
    },
    adresse: {
        firma: "SoftwareDesign-Solution",
        strasse: "Steinbergstr. 2",
        plz: "72202",
        ort: "Nagold",
    },
    abweichendeRechnungsadresse: false,
    rechnungsadresse: {
        firma: "SoftwareDesign-Solution",
        strasse: "Steinbergstr. 2",
        plz: "72202",
        ort: "Nagold",
    },
    teilnehmerzahl: 3,
    preis: 1490.00,
    //zwischensumme: 4470.00,
    gutscheinCode: "CODE2026",
    rabatt: 200.00,
    zwischensumme: 4270.00,
    ust: 811.30,
    gesamtpreis: 5081.30,
    teilnehmer: [
        {
            vorname: "Manuel",
            nachname: "Kübler",
        },
        {
            vorname: "Manuel",
            nachname: "Kübler",
        },
        {
            vorname: "Manuel",
            nachname: "Kübler",
        }
    ]
};