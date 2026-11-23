/**
 * @file faq-liste.tsx
 * @description Häufige Fragen der Leistungsseite als aufklappbare Liste (native `<details>`).
 * @module app/leistungen/[slug]/_components/faq-liste
 * @author Manuel Kübler
 */

import type { LeistungFrage } from "@/types/leistung";

/** Props für {@link FaqListe}. */
interface FaqListeProps {
  fragen: LeistungFrage[];
}

/**
 * FAQ ohne JavaScript: `<details>` ist per Tastatur bedienbar und für Crawler vollständig im HTML.
 * Die erste Frage ist geöffnet.
 *
 * @param props - Siehe {@link FaqListeProps}
 * @returns Die FAQ-Liste
 */
export default function FaqListe({ fragen }: FaqListeProps) {
  return (
    <div className="border-b border-border">
      {fragen.map(({ frage, antwort }, index) => (
        <details key={frage} open={index === 0} className="group border-t border-border py-4.5">
          <summary className="cursor-pointer text-base font-semibold text-foreground marker:text-primary-700">
            {frage}
          </summary>
          <p className="mt-2.5 max-w-180 text-[15px] leading-[1.6] text-foreground">{antwort}</p>
        </details>
      ))}
    </div>
  );
}
