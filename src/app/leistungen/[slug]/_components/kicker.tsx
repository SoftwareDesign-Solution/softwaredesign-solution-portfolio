/**
 * @file kicker.tsx
 * @description Kleiner Vorspann (Punkt + Großbuchstaben) über Überschriften der Leistungsseite.
 * @module app/leistungen/[slug]/_components/kicker
 * @author Manuel Kübler
 */

import type { ReactNode } from "react";

/** Props für {@link Kicker}. */
interface KickerProps {
  children: ReactNode;
  /** Helle Variante für dunkle Flächen (Kontakt-Band). */
  hell?: boolean;
}

/**
 * Kicker im Stil der Referenz-Detailseite.
 *
 * @param props - Siehe {@link KickerProps}
 * @returns Der Kicker
 */
export default function Kicker({ children, hell = false }: KickerProps) {
  const farbe = hell ? "text-primary-100" : "text-primary-700";
  const punkt = hell ? "bg-primary-100" : "bg-primary-700";

  return (
    <div className={`mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] ${farbe}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${punkt}`} />
      {children}
    </div>
  );
}
