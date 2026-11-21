import { Section, Text } from "react-email";

import Heading from "@/emails/components/heading";
import Layout from "@/emails/components/layout";
import { type SendQuoteRequestEmailData } from '@/schemas/quote-request.schema';
import { formatDateRange } from "@/utils/format-date-range";
import { formatThemenumfang } from "@/utils/themen-auswahl";

import { Table } from "./components/table";


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
                {/*<Table.Row label="Termin" value={formatDateRange(props.termin!.datumVon, props.termin!.datumBis)} />*/}
                <Table.Row label="Termin" value={props.termin ? formatDateRange(props.termin.datumVon, props.termin.datumBis) : "Nach Absprache"} />
                <Table.Row label="Themen" value={formatThemenumfang(props.themen)} />
                <Table.Row label="Teilnehmerzahl" value={props.teilnehmerzahl} />
                <Table.Row label="Firma" value={props.rechnungsadresse?.firma ? props.rechnungsadresse.firma : props.adresse.firma} />
                <Table.Row label="Name" value={`${props.ansprechpartner?.vorname} ${props.ansprechpartner?.nachname}`} />
                <Table.Row label="E-Mail" value={props.ansprechpartner?.email} />
            </Table>

            {/* Themenauswahl: nur bei angepasstem Umfang die ganze Liste, sonst reicht die Zeile oben */}
            {props.themen?.angepasst && (
                <>
                    {props.themen.tage.map((tag, tagIndex) => (
                        <Table
                            key={tagIndex}
                            variant="list"
                            heading={`Tag ${tagIndex + 1} · ${tag.titel} (${tag.themen.filter((thema) => thema.gewaehlt).length}/${tag.themen.length})`}
                        >
                            {tag.themen.map((thema, themaIndex) => (
                                <Table.Row
                                    key={themaIndex}
                                    value={
                                        thema.gewaehlt
                                            ? `✓ ${thema.titel}`
                                            : <span className="text-muted line-through">✗ {thema.titel}</span>
                                    }
                                />
                            ))}
                        </Table>
                    ))}

                    <Table variant="list" heading="Nicht gewünscht">
                        {props.themen.tage.flatMap((tag, tagIndex) =>
                            tag.themen
                                .filter((thema) => !thema.gewaehlt)
                                .map((thema) => (
                                    <Table.Row
                                        key={`${tagIndex}-${thema.titel}`}
                                        value={`${thema.titel} (Tag ${tagIndex + 1})`}
                                    />
                                )),
                        )}
                    </Table>
                </>
            )}

            {props.themen?.wunschthemen && (
                <Section className="px-8 pt-5 pb-2">

                    <Text className="m-0 font-sans font-bold text-[15px] leading-[1.6] text-foreground">
                        Zusätzliche Wunschthemen:
                    </Text>

                    <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                        {props.themen.wunschthemen}
                    </Text>

                </Section>
            )}

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 font-sans font-bold text-[15px] leading-[1.6] text-foreground">
                    Nachricht:
                </Text>

                <Text className="m-0 mb-4 font-sans text-[15px] leading-[1.6] text-foreground">
                    {props.nachricht || "Keine Nachricht hinterlassen."}
                </Text>

            </Section>

        </Layout>
    );
};

/*
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
    nachricht: "Dies ist eine Beispielnachricht.",
};
*/

QuoteRequestNotificationEmail.PreviewProps = {
    ansprechpartner: {
        anrede: "Herr",
        email: "max.mustermann@example.com",
        nachname: "Mustermann",
        telefon: "",
        vorname: "Max",
    },
    adresse: {
        firma: "Musterfirma GmbH",
        ort: "Iserlohn",
        plz: "58636",
        strasse: "Musterstraße 1",
    },
    termin: null,
    teilnehmerzahl: 6,
    workshop: {
        id: 1,
        titel: "React Fortgeschrittene",
    },
    nachricht: "Unser Team arbeitet seit einem Jahr mit React, Redux ist bekannt.",
    themen: {
        angepasst: true,
        gesamt: 15,
        gewaehlt: 13,
        tage: [
            {
                titel: "State-Management und Architektur",
                themen: [
                    { titel: "Architektur größerer React-Anwendungen", gewaehlt: true },
                    { titel: "Redux Toolkit und Store-Aufbau", gewaehlt: true },
                    { titel: "Slices, Reducer, Actions und Selectors", gewaehlt: true },
                    { titel: "Asynchrone Abläufe mit createAsyncThunk", gewaehlt: true },
                    { titel: "Custom Hooks für State-Zugriff", gewaehlt: true },
                ],
            },
            {
                titel: "APIs, Routing und Anwendungsausbau",
                themen: [
                    { titel: "Asynchrone Datenflüsse mit Redux", gewaehlt: true },
                    { titel: "API-Anbindung und Server State", gewaehlt: true },
                    { titel: "Routing mit React Router", gewaehlt: true },
                    { titel: "Private Routen und Authentifizierung", gewaehlt: false },
                    { titel: "Code-Splitting und Lazy Loading", gewaehlt: true },
                ],
            },
            {
                titel: "Testing, Build und Deployment",
                themen: [
                    { titel: "Unit Tests und Integration Tests", gewaehlt: true },
                    { titel: "End-to-End-Tests und Component-Tests mit Cypress", gewaehlt: false },
                    { titel: "Mocks, Testdaten und Assertions", gewaehlt: true },
                    { titel: "CI-Ausführung von Tests", gewaehlt: true },
                    { titel: "Build, Optimierung und Deployment", gewaehlt: true },
                ],
            },
        ],
        wunschthemen: "React Query, Testing mit Playwright",
    },
};