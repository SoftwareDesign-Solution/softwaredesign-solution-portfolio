/**
 * @file confirmation-details.tsx
 * @description Generische Label/Wert-Detailliste für die Bestätigungsseiten
 * (Benachrichtigungs-Anmeldung, Abmeldung, Angebotsanfrage).
 * @module app/(confirmation)/_components/confirmation-details
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type ReactNode } from "react";

/** Ein einzelner Label/Wert-Eintrag in der Detailliste. */
export interface ConfirmationDetailItem {
    label: string;
    value: ReactNode;
}

/** Props für {@link ConfirmationDetails}. */
interface ConfirmationDetailsProps {
    items: ConfirmationDetailItem[];
}

/**
 * Zeigt eine Liste von Label/Wert-Paaren (z.B. Workshop, Termin, Firma) in einer
 * dezenten Box, wie sie auf allen Bestätigungsseiten verwendet wird.
 *
 * @param props - Siehe {@link ConfirmationDetailsProps}
 * @returns Die Detailliste
 */
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