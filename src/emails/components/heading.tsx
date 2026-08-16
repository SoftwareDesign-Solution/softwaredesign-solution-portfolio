import { ReactNode } from "react";
import { Heading as EmailHeading, Section, Text } from "react-email";


type KickerVariant = "primary" | "success" | "error";

interface HeadingProps {
    kicker: string;
    kickerVariant?: KickerVariant;
    children: ReactNode;
}

const VARIANT_CLASS: Record<KickerVariant, { dot: string; text: string }> = {
  primary: { dot: "bg-primary-700", text: "text-primary-700" },
  success: { dot: "bg-success-600", text: "text-success-600" },
  error: { dot: "bg-error-600", text: "text-error-600" },
};

export default function Heading({ kicker, kickerVariant = "primary", children }: HeadingProps) {

    const { dot, text } = VARIANT_CLASS[kickerVariant];

    return (
        <>
            <Section className="px-8 pb-1 pt-8">
                <Text className="m-0">
                    <span className={`mr-1.75 inline-block h-1.75 w-1.75 rounded-full ${dot}`} />
                    <span className={`font-sans text-xs font-semibold uppercase tracking-[1.5px] ${text}`}>{kicker}</span>
                </Text>
            </Section>
            <Section className="px-8 pt-1.5">
                <EmailHeading as="h1" className="m-0 font-sans text-[26px] font-bold leading-[1.15] tracking-[-0.5px] text-foreground">
                    {children}
                </EmailHeading>
            </Section>
        </>
    )
};