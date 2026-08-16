import { Body, Container, Head, Html, Link, Section, Tailwind, Text } from "react-email";

import { config } from "../lib/tailwind.config";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
    children: React.ReactNode;
    unsubscribeLink?: {
        href: string;
        title: string;
    } | null;
}

export default function Layout({ children, unsubscribeLink }: LayoutProps) {
    return (
        <Tailwind config={config}>

            <Html lang="de">

                <Head />

                <Body className="m-0 bg-surface p-8">

                    <Container className="w-150 max-w-150 overflow-hidden rounded-xl border border-border bg-white shadow-sm">

                        <Header />

                        {children}

                        <Footer />

                        {unsubscribeLink && (
                            <Section className="px-8 pb-7 pt-4 text-center">
                                <Text className="m-0 font-sans text-xs leading-[1.6] text-muted">
                                    Du erhältst diese E-Mail, weil du dich für {unsubscribeLink?.title} angemeldet hast.{" "}
                                    <Link href={unsubscribeLink?.href} className="text-primary-700 underline underline-offset-2">
                                        Abmelden
                                    </Link>
                                </Text>
                            </Section>
                        )}
                        
                    </Container>

                </Body>

            </Html>

        </Tailwind>
    );
};