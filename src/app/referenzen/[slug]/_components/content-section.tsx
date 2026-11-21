/**
 * @file content-section.tsx
 * @description Zweispaltiger Textabschnitt der Detailseite: Titel links, Inhalt
 * (Absätze, optional Stichpunkte) rechts.
 * @module app/referenzen/[id]/_components/content-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type ReferenzAbschnitt } from "@/types/referenz";

/** Props für {@link ContentSection}. */
interface ContentSectionProps {
  abschnitt: ReferenzAbschnitt;
  /** Eindeutige id für `aria-labelledby`. */
  id: string;
}

/**
 * Ein Abschnitt (z. B. "Ausgangslage") im zweispaltigen Layout.
 *
 * @param props - Siehe {@link ContentSectionProps}
 * @returns Der Abschnitt
 */
export default function ContentSection({ abschnitt, id }: ContentSectionProps) {
  return (
    <section aria-labelledby={id} className="grid grid-cols-1 gap-3 py-7 sm:grid-cols-[140px_1fr] sm:gap-8">
      <h2 id={id} className="text-[16px] font-bold tracking-[-0.3px] text-foreground">
        {abschnitt.titel}
      </h2>

      <div className="max-w-3xl">
        {abschnitt.absaetze?.map((absatz) => (
          <p key={absatz} className="mb-3 text-[15px] leading-[1.6] text-foreground last:mb-0">
            {absatz}
          </p>
        ))}

        {abschnitt.aufzaehlung && abschnitt.aufzaehlung.length > 0 && (
          <ul className="mt-3 space-y-2">
            {abschnitt.aufzaehlung.map((punkt) => (
              <li key={punkt} className="flex items-start gap-3 text-[14px] leading-normal text-foreground">
                <span aria-hidden="true" className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-700" />
                {punkt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
