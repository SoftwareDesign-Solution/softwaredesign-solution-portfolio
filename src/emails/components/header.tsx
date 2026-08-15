import { Section, Img } from "react-email";

export default function Header() {
    return (
        <Section className="border-b border-border px-8 pb-5 pt-6">
            <Img
                className="center mx-auto block"
                src="http://localhost:3000/assets/softwaredesign-solution.png"
                alt="Softwaredesign Solution"
                width="176"
                height="56"
            />
        </Section>
    );
};