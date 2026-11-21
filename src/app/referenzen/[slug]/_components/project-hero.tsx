/**
 * @file project-hero.tsx
 * @description Kopfbereich der Detailseite: Kunden-Kicker, Titel, Beschreibung
 * und Call-to-Action.
 * @module app/referenzen/[id]/_components/project-hero
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";

/** Props für {@link ProjectHero}. */
interface ProjectHeroProps {
  kunde: string;
  titel: string;
  beschreibung: string;
}

/**
 * Kopfbereich der Referenz-Detailseite.
 *
 * @param props - Siehe {@link ProjectHeroProps}
 * @returns Der Hero-Bereich
 */
export default function ProjectHero({ kunde, titel, beschreibung }: ProjectHeroProps) {
  return (
    <header className="mb-8">
      <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
        <span className="h-2 w-2 rounded-full bg-primary-700" />
        {kunde}
      </div>

      <h1 className="mb-3 text-[40px] font-bold leading-[1.1] tracking-[-1px] text-foreground">{titel}</h1>

      <p className="mb-6 max-w-160 text-[15px] leading-[1.6] text-muted">{beschreibung}</p>

      <Link
        href="/#kontakt"
        className="inline-flex items-center gap-2 rounded-sm bg-primary-700 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-primary-800"
      >
        Ähnliches Projekt anfragen
        <span aria-hidden="true">→</span>
      </Link>
    </header>
  );
}
