/**
 * @file confirmation-status.tsx
 * @description Gemeinsames Kopf-Layout (Kicker, Titel, Beschreibung) für alle
 * Bestätigungsseiten (Double-Opt-In-Bestätigung, Abmeldung).
 * @module app/(confirmation)/_components/confirmation-status
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type ReactNode } from "react";

/** Props für {@link ConfirmationStatus}. */
interface ConfirmationStatusProps {
    /** Zusätzlicher Inhalt unterhalb der Beschreibung, z.B. eine {@link ConfirmationDetails}-Liste. */
    children?: ReactNode;
    description: ReactNode;
    /** Kurzer, farbig hervorgehobener Vorspann über der Überschrift. */
    eyebrow: string;
    title: string;
}

/**
 * Einheitlicher Kopfbereich für Bestätigungsseiten: Kicker, Titel, Beschreibungstext
 * und optionaler zusätzlicher Inhalt (z.B. Detailliste).
 *
 * @param props - Siehe {@link ConfirmationStatusProps}
 * @returns Den Bestätigungs-Kopfbereich
 */
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