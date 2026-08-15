import {
    Section,
    Text,
    Link,
} from "react-email";

export default function Footer() {
    return (
        <Section className="border-t border-border px-8 pb-8 pt-5">

            <Text className="m-0 mb-1 font-sans text-sm font-bold text-foreground">
                Manuel Kübler - SoftwareDesign-Solution
            </Text>

            <Text className="m-0 mb-2.5 font-sans text-[13px] text-muted">
                #GernePerDu
            </Text>

            <Text className="m-0 font-sans text-[13px] leading-[1.55] text-muted">
                Steinbergstr. 2, 72202 Nagold
                <br />
                Mobil: +49 (0)176 32125780
                <br />
                Web:{" "}
                <Link
                    href="https://www.softwaredesign-solution.de"
                    className="text-primary-700 underline underline-offset-2"
                >
                    www.SoftwareDesign-Solution.de
                </Link>
                <br />
                E-Mail:{" "}
                <Link
                    href="mailto:mail@softwaredesign-solution.de"
                    className="text-primary-700 underline underline-offset-2"
                >
                    mail@softwaredesign-solution.de
                </Link>
            </Text>

        </Section>
    );
};