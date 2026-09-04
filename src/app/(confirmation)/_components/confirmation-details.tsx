import { type ReactNode } from "react";

export interface ConfirmationDetailItem {
    label: string;
    value: ReactNode;
}

interface ConfirmationDetailsProps {
    items: ConfirmationDetailItem[];
}

export default function ConfirmationDetails({
    items,
}: ConfirmationDetailsProps) {
    return (
        <dl className="mt-10 rounded-lg bg-surface px-5.5 py-5.5">
            {items.map((item) => (
                <div
                    className="flex flex-col gap-1 py-1.5 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between"
                    key={item.label}
                >
                    <dt>{item.label}</dt>

                    <dd className="break-all font-mono text-[13.5px]">
                        {item.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}