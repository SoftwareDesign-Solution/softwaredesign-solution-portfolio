import { type ReactNode } from "react";

interface ConfirmationStatusProps {
    children?: ReactNode;
    description: ReactNode;
    eyebrow: string;
    title: string;
}

export default function ConfirmationStatus({
    children,
    description,
    eyebrow,
    title,
}: ConfirmationStatusProps) {
    return (
        <article>
            <div className="mb-2.5 text-xs font-semibold uppercase tracking-[1.5px] text-primary-700">
                {eyebrow}
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-1.2px] text-foreground">
                {title}
            </h1>

            <p className="mt-4 max-w-205 text-xl leading-[1.55] text-foreground">
                {description}
            </p>

            {children}
        </article>
    );
}