/**
 * @file Badge.tsx
 * @description Kleines, dezentes Info-Badge (z.B. Dauer, Sprache, Branche).
 * @module components/ui/Badge
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Props für {@link Badge}. */
interface BadgeProps {
    children: React.ReactNode;
    /** Zusätzliche Klassen, z.B. `shrink-0` im Flex-Kontext. */
    className?: string;
}

/**
 * Kleines, dezentes Info-Badge für Kurzinfos in Karten-Headern
 * (z.B. Workshop-Dauer/-Sprache, Kunden-Branche).
 *
 * @param props - Siehe {@link BadgeProps}
 * @returns Das Badge
 */
export default function Badge({
    children,
    className = "",
}: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-sm bg-surface px-2.5 py-1 text-xs text-muted ${className}`}
        >
            {children}
        </span>
    );
}