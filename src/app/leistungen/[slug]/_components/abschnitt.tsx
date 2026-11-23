/**
 * @file abschnitt.tsx
 * @description Rahmen eines Abschnitts der Leistungsseite: Kicker, H2 und Inhalt.
 * @module app/leistungen/[slug]/_components/abschnitt
 * @author Manuel Kübler
 */

import type { ReactNode } from "react";

import Kicker from "./kicker";

/** Props für {@link Abschnitt}. */
interface AbschnittProps {
  /** Eindeutige id, auch für `aria-labelledby`. */
  id: string;
  kicker: string;
  titel: string;
  children: ReactNode;
}

/**
 * Abschnitt mit Kicker und Überschrift (H2) im Stil der Unterseiten.
 *
 * @param props - Siehe {@link AbschnittProps}
 * @returns Der Abschnitt
 */
export default function Abschnitt({ id, kicker, titel, children }: AbschnittProps) {
  return (
    <section aria-labelledby={`${id}-titel`} className="pt-18">
      <div className="mb-7">
        <Kicker>{kicker}</Kicker>
        <h2 id={`${id}-titel`} className="text-[30px] font-bold leading-[1.15] tracking-[-0.8px] text-foreground">
          {titel}
        </h2>
      </div>
      {children}
    </section>
  );
}
