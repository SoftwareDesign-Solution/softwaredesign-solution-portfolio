import { ReactNode } from "react";
import { Button as EmailButton } from "react-email";

interface ButtonProps {
    href: string;
    children: ReactNode;
}

export default function Button({ href, children }: ButtonProps) {
    return (
        <EmailButton
            href={href}
            className="inline-block rounded-md bg-primary-700 px-6.5 py-3.25 font-sans text-sm font-semibold text-white no-underline"
        >
            {children}
        </EmailButton>
    );
}