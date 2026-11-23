/**
 * @file projekt-liste.tsx
 * @description Hervorgehobene Referenz-Projekte einer Leistung aus `data/referenzen.ts`.
 * @module app/leistungen/[slug]/_components/projekt-liste
 * @author Manuel Kübler
 */

import Link from "next/link";

import type { LeistungSlug } from "@/types/leistung";

import { findReferenzenFuerLeistung, hatDetailseite } from "@/data/referenzen";

import PfeilIcon from "./pfeil-icon";

/** Props für {@link ProjektListe}. */
interface ProjektListeProps {
  /** Slug der Leistung, deren Projekte gezeigt werden. */
  leistung: LeistungSlug;
}

/**
 * Liste der Referenz-Projekte mit Kunde, Beschreibung und Technologien.
 * Projekte mit eigener Detailseite sind verlinkt.
 *
 * @param props - Siehe {@link ProjektListeProps}
 * @returns Die Projektliste
 */
export default function ProjektListe({ leistung }: ProjektListeProps) {
  const treffer = findReferenzenFuerLeistung(leistung);

  return (
    <>
      <ul className="border-b border-border">
        {treffer.map(({ kunde, projekt }) => (
          <li key={projekt.slug} className="grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-border py-4 md:grid-cols-2">
            <div>
              <div className="text-[15px] font-semibold text-foreground">
                {hatDetailseite(projekt) ? (
                  <Link href={`/referenzen/${projekt.slug}`} className="hover:text-primary-700 hover:underline">
                    {projekt.titel}
                  </Link>
                ) : (
                  projekt.titel
                )}
              </div>
              <div className="mt-0.5 text-[12.5px] text-muted">
                {kunde.id === "eigene-projekte" ? "Eigenentwicklung" : kunde.name}
              </div>
            </div>
            <div>
              <p className="text-[14.5px] leading-[1.55] text-foreground">{projekt.beschreibung}</p>
              {projekt.stack && projekt.stack.length > 0 && (
                <div className="mt-1.5 font-mono text-xs text-primary-700">{projekt.stack.slice(0, 5).join(" · ")}</div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <Link href="/referenzen" className="mt-4.5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-600">
        Alle Referenzen
        <PfeilIcon />
      </Link>
    </>
  );
}
