/**
 * @file section-header.tsx
 * @description Wiederverwendbarer Sektions-Titel mit zwei Größenvarianten (Startseite/Unterabschnitte).
 * @module components/section-header
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ReactNode } from "react";

/** Props für {@link SectionHeader}. */
interface SectionHeaderProps {
  /** Kleiner, farbig hervorgehobener Vorspann über der eigentlichen Überschrift. */
  title: string;
  /** Der Haupt-Überschriftentext (als h2 gerendert). */
  children: ReactNode;
  /** Optionales Element (z.B. Button/Link), das rechtsbündig neben der Überschrift angezeigt wird. */
  action?: ReactNode;
  /** "lg" = Homepage-Sections (Standard), "sm" = Unterabschnitte auf Detailseiten (z.B. WorkshopDetails) */
  size?: "lg" | "sm";
}

/**
 * Wiederverwendbarer Sektions-Titel mit zwei Größenvarianten. Im Gegensatz zu
 * `app/_components/section-header.tsx` (nur "lg") unterstützt diese Version
 * auch die kleinere "sm"-Variante für Unterabschnitte auf Detailseiten.
 *
 * @param props - Siehe {@link SectionHeaderProps}
 * @returns Den Sektions-Titel
 */
export default function SectionHeader({ title, children, action, size = "lg" }: SectionHeaderProps) {
  const isSmall = size === "sm";

  return (
    <div
      className={`flex flex-col justify-between items-start gap-5 md:flex-row md:items-end md:gap-0 ${
        isSmall ? "mb-7" : "mb-14"
      }`}
    >
      <div>
        <div
          className={`text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 ${
            isSmall ? "mb-2.5" : "mb-3.5"
          }`}
        >
          {title}
        </div>
        <h2
          className={
            isSmall
              ? "text-4xl font-bold m-0 wrap-anywhere hyphens-auto text-foreground"
              : "text-5xl tracking-[-1.8px] leading-[1.01] font-semibold text-foreground"
          }
        >
          {children}
        </h2>
      </div>
      {action && <div className="flex gap-2.5">{action}</div>}
    </div>
  );
};