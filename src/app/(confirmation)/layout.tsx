import { type ReactNode } from "react";

interface ConfirmationLayoutProps {
    children: ReactNode;
}

export default function ConfirmationLayout({
    children,
}: ConfirmationLayoutProps) {
    return (
        <div className="mx-auto max-w-190 px-6 pb-24 pt-16">
            {children}
        </div>
    );
}