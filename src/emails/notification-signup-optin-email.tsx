import { Link, Section, Text } from "react-email";

import type { SendNotificationSignupOptInEmailData } from "@/schemas/notification-signup.schema";

import Button from "./components/button";
import Heading from "./components/heading";
import Layout from "./components/layout";
import { Table } from "./components/table";


export default function NotificationSignupOptInEmail(props: SendNotificationSignupOptInEmailData) {
    return (
        <Layout>
            
            <Heading kicker="Workshop-Benachrichtigung · Double Opt-In">
                Ein Klick fehlt noch.
            </Heading>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    Hallo {props.vorname},
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    vielen Dank für deine Anmeldung zur Benachrichtigung über neue Termine. Damit ich dich tatsächlich informieren darf, bestätige bitte kurz deine E-Mail-Adresse:
                </Text>

            </Section>
            
            <Table>
                <Table.Row label="workshop" value={props.workshop.titel} />
            </Table>

            <Section className="px-8 pb-2 pt-6 text-center">
                
                <Button
                    href={props.confirmationLink}
                >
                    Anmeldung bestätigen
                </Button>

            </Section>

            <Section className="px-8 pb-4 text-center">
                <Text className="m-0 font-sans text-[12.5px] text-muted">{props.expiresInDay} Tage gültig · ohne Klick keine Benachrichtigungen</Text>
            </Section>

            <Section className="px-8 pb-2">
                <Text className="m-0 font-sans text-[12.5px] leading-normal text-muted">
                    Falls der Button nicht funktioniert, kopiere bitte folgende URL in deinen Browser:
                </Text>
                <div className="mt-1.5 break-all rounded-md border border-border bg-surface px-3 py-2.5 font-mono text-[11px] leading-normal text-foreground">
                    <Link href={props.confirmationLink} className="text-foreground">
                        {props.confirmationLink}
                    </Link>
                </div>
            </Section>

            <Table heading="Was du wissen solltest">
                <Table.Row 
                    title="Bestätigung erforderlich." 
                    value={
                        <>
                            Ohne Klick auf den Bestätigungs-Link wird deine Anmeldung <strong>nicht aktiviert</strong> — du
                            erhältst dann auch keine Benachrichtigungen über neue Termine.
                        </>
                    }
                />
                <Table.Row 
                    title="Gültigkeitsdauer." 
                    value={
                        <>
                            Der Link verfällt automatisch nach <strong>{props.expiresInDay} Tagen</strong>. Bestätigst du bis dahin
                            nicht, wird die Anmeldung ohne weitere Aktion verworfen.
                        </>
                    }
                />
                <Table.Row 
                    title="Versehentlich angemeldet?" 
                    value="Ignoriere diese E-Mail einfach — es passiert dann nichts weiter, und es werden keine Daten gespeichert."
                />
            </Table>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    Ich freue mich, dich bald zu einem neuen Termin begrüßen zu dürfen.
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    Mit freundlichen Grüßen,<br /><br />Manuel Kübler
                </Text>

            </Section>

        </Layout>
    );
}

NotificationSignupOptInEmail.PreviewProps = {
    vorname: "Manuel",
    workshop: {
        titel: "Beispiel-Workshop"
    },
    confirmationLink: "https://www.softwaredesign-solution.de/notifications/confirm/1234567890abcdef",
    expiresInDay: 3,
};