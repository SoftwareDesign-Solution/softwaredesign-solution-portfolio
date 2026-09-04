/**
 * @file page.tsx
 * @description Startseite: One-Pager aus Hero-, Schwerpunkte-, Leistungen-,
 * Workshops- und Kontakt-Sektion.
 * @module app/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import HeroSection from "./_components/sections/hero-section";
import KontaktSection from "./_components/sections/kontakt-section";
import LeistungenSection from "./_components/sections/leistungen-section";
import SchwerpunkteSection from "./_components/sections/schwerpunkte-section";
import WorkshopsSection from "./_components/sections/workshops-section";

// Immer dynamisch rendern, da die Workshop-Liste live aus der DB kommt (kein Static Caching)
export const dynamic = "force-dynamic";

/**
 * Startseite: reiht die einzelnen One-Pager-Sektionen (Hero, Schwerpunkte, Leistungen, Workshops, Kontakt) aneinander.
 *
 * @returns Die Startseite
 */
export default function Home() {
  return (
    <article>

      <HeroSection />

      <SchwerpunkteSection />

      <LeistungenSection />

      <WorkshopsSection />

      <KontaktSection />

    </article>
  );
}
