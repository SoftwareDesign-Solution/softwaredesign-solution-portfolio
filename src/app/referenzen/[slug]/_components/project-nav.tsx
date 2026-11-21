/**
 * @file project-nav.tsx
 * @description Navigation am Seitenende zum vorherigen und nächsten Referenz-Projekt.
 * @module app/referenzen/[slug]/_components/project-nav
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";

/** Ziel eines Navigationslinks. */
interface NavZiel {
  slug: string;
  titel: string;
}

/** Props für {@link ProjectNav}. */
interface ProjectNavProps {
  vorheriges?: NavZiel;
  naechstes?: NavZiel;
}

/**
 * Zwei Karten "Vorheriges Projekt" / "Nächstes Projekt". Fehlt eine Seite,
 * bleibt die Spalte leer, damit die andere Karte an ihrer Position bleibt.
 *
 * @param props - Siehe {@link ProjectNavProps}
 * @returns Die Navigation, oder `null`, wenn es keine Nachbarn gibt
 */
export default function ProjectNav({ vorheriges, naechstes }: ProjectNavProps) {
  if (!vorheriges && !naechstes) {
    return null;
  }

  const karte =
    "block rounded-lg border border-border bg-white px-4 py-3 transition-shadow hover:shadow-md";
  const kicker = "mb-1 block text-[10px] font-semibold uppercase tracking-[1.5px] text-muted";

  return (
    <nav aria-label="Weitere Referenzen" className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
      {vorheriges ? (
        <Link href={`/referenzen/${vorheriges.slug}`} className={karte}>
          <span className={kicker}>Vorheriges Projekt</span>
          <span className="text-[13px] font-semibold text-foreground">← {vorheriges.titel}</span>
        </Link>
      ) : (
        <span />
      )}

      {naechstes ? (
        <Link href={`/referenzen/${naechstes.slug}`} className={`${karte} sm:text-right`}>
          <span className={kicker}>Nächstes Projekt</span>
          <span className="text-[13px] font-semibold text-foreground">{naechstes.titel} →</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
