import { Section, Text } from "react-email"

import type { SendContactRequestEmailData } from "@/schemas/contact-request.schema";

import Heading from "./components/heading";
import Layout from "./components/layout";
import { Table } from "./components/table";


export default function ContactRequestEmail(props: SendContactRequestEmailData) {
    return (
        <Layout>

            <Heading kicker="Kontaktformular · Neue Anfrage">
                Neue Kontaktanfrage.
            </Heading>

            <Table>
                <Table.Row label="Firma" value={props.adresse.firma} />
                <Table.Row label="Vorname" value={props.ansprechpartner.vorname} />
                <Table.Row label="Nachname" value={props.ansprechpartner.nachname} />
                <Table.Row label="E-Mail" value={props.ansprechpartner.email} />
                <Table.Row label="Telefon" value={props.ansprechpartner.telefon ?? "Keine Angabe"} />
                <Table.Row label="Bereits Kunde?" value={props.bereitsKunde ? "Ja" : "Nein"} />
                <Table.Row label="Straße" value={props.adresse.strasse} />
                <Table.Row label="PLZ" value={props.adresse.plz} />
                <Table.Row label="Ort" value={props.adresse.ort} />
                <Table.Row label="Webseite" value={props.webseite ?? "Keine Angabe"} />
                <Table.Row label="Anrede" value={props.ansprechpartner.anrede} />
                <Table.Row label="Quelle" value={props.source ?? "Keine Angabe"} />
            </Table>
            
            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 font-sans font-bold text-[15px] leading-[1.6] text-foreground">
                    Nachricht:
                </Text>

                <Text className="m-0 mb-4 font-sans text-[15px] leading-[1.6] text-foreground">
                    {props.nachricht}
                </Text>

            </Section>
            
        </Layout>
    )
};

ContactRequestEmail.PreviewProps = {
    adresse: {
        firma: "Beispiel GmbH",
        strasse: "Musterstraße 1",
        plz: "12345",
        ort: "Musterstadt",
    },
    webseite: "https://www.beispiel.de",
    bereitsKunde: true,
    ansprechpartner: {
        anrede: "Herr",
        vorname: "Max",
        nachname: "Mustermann",
        email: "max.mustermann@domain.com",
        telefon: "+49 123 456789",
    },
    nachricht: "Sehr geehrter Herr Mustermann,\n\nvielen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen melden.\n\nMit freundlichen Grüßen,\nIhr Team",
    source: "Website Kontaktformular",
};