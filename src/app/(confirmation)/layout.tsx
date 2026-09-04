/**
 * @file layout.tsx
 * @description Layout für die Route-Group `(confirmation)`: zentriert und begrenzt
 * die Breite aller Bestätigungsseiten (Notifications, Offer-Requests).
 * @module app/(confirmation)/layout
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type ReactNode } from "react";

/** Props für {@link ConfirmationLayout}. */
interface ConfirmationLayoutProps {
    children: ReactNode;
}

/**
 * Einheitliches, zentriertes Seitenlayout für alle Bestätigungsseiten dieser Route-Group.
 *
 * @param props - Siehe {@link ConfirmationLayoutProps}
 * @returns Das Bestätigungs-Layout
 */
export default function ConfirmationLayout({
    children,
}: ConfirmationLayoutProps) {
    return (
        <div className="mx-auto max-w-190 px-6 pb-24 pt-16">
            {children}
        </div>
    );
}