import { Section, Text } from "react-email";
import type { SendNotificationSignupConfirmedEmailData } from "@/schemas/notification-signup.schema";
import Heading from "./components/heading";
import Layout from "./components/layout";
import { Table } from "./components/table";

/*
interface NotificationSignupConfirmedEmailProps {
    vorname: string;
    workshopTitel: string;
    unsubscribeLink: string;
};
*/

export default function NotificationSignupConfirmedEmail(props: SendNotificationSignupConfirmedEmailData) {
    return (
        <Layout
            unsubscribeLink={{
                href: props.unsubscribeLink,
                title: props.workshop.titel,
            }}
        >

            <Heading kicker="Workshop-Benachrichtigung · Bestätigt" kickerVariant="success">
                Anmeldung aktiv.
            </Heading>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    Hallo {props.vorname},
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    deine E-Mail-Adresse ist bestätigt — die Benachrichtigung für neue Termine ist ab sofort aktiv. Sobald ein neuer Termin online geht, informiere ich dich automatisch.
                </Text>

            </Section>

            <Table>
                <Table.Row label="workshop" value={props.workshop.titel} />
            </Table>

            <Section className="px-8 pt-5 pb-2">

                <Text className="m-0 mb-3.5 font-sans text-[15px] leading-[1.6] text-foreground">
                    Du musst jetzt nichts weiter tun.
                </Text>

                <Text className="m-0 font-sans text-[15px] leading-[1.6] text-foreground">
                    Mit freundlichen Grüßen,<br /><br />Manuel Kübler
                </Text>

            </Section>

        </Layout>
    );
};

NotificationSignupConfirmedEmail.PreviewProps = {
    vorname: "Manuel",
    workshop: {
        titel: "Beispiel-Workshop"
    },
    unsubscribeLink: "https://www.softwaredesign-solution.de/notifications/unsubscribe/1234567890abcdef"
};