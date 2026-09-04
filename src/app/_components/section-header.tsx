/**
 * @file section-header.tsx
 * @description Wiederverwendbarer Sektions-Titel für die Startseite (Kicker + große Überschrift).
 * @module app/_components/section-header
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ReactNode } from "react";

interface SectionHeaderProps {
    /** Kleiner, farbig hervorgehobener Vorspann über der eigentlichen Überschrift. */
    title: string;
    /** Der Haupt-Überschriftentext (als h2 gerendert). */
    children: ReactNode;
    /** Optionales Element (z.B. Button/Link), das rechtsbündig neben der Überschrift angezeigt wird. */
    action?: ReactNode;
};

/**
 * Wiederverwendbarer Sektions-Titel für die Startseite (Kicker + große Überschrift + optionale Aktion).
 *
 * @param props - Siehe {@link SectionHeaderProps}
 * @returns Den Sektions-Titel
 */
export default function SectionHeader({ title, children, action }: SectionHeaderProps) {
    return (
        <div className="flex justify-between items-end mb-14">
            <div>
                <div className="text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 mb-3.5">
                    {title}
                </div>
                <h2 className="text-5xl tracking-[-1.8px] leading-[1.01] font-semibold text-foreground">
                    {children}
                </h2>
            </div>
            {action && <div className="flex gap-2.5">{action}</div>}
        </div>
    );
};