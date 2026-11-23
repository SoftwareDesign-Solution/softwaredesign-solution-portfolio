/**
 * @file page.tsx
 * @description Startseite: One-Pager aus Hero-, Schwerpunkte-, Leistungen-,
 * Workshops- und Kontakt-Sektion.
 * @module app/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { Metadata } from "next";

import JsonLd from "@/components/json-ld";
import { baseOpenGraph, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";
import { buildSiteGraph } from "@/lib/structured-data";

import HeroSection from "./_components/sections/hero-section";
import KontaktSection from "./_components/sections/kontakt-section";
import LeistungenSection from "./_components/sections/leistungen-section";
import SchwerpunkteSection from "./_components/sections/schwerpunkte-section";
import WorkshopsSection from "./_components/sections/workshops-section";

// Immer dynamisch rendern, da die Workshop-Liste live aus der DB kommt (kein Static Caching)
export const dynamic = "force-dynamic";

// Titel und Beschreibung kommen aus dem Root-Layout; hier kanonische URL und og:url der Startseite
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, url: "/" },
};

/**
 * Startseite: reiht die einzelnen One-Pager-Sektionen (Hero, Schwerpunkte, Leistungen, Workshops, Kontakt) aneinander.
 *
 * @returns Die Startseite
 */
export default function Home() {
  return (
    <article>

      {/* Strukturierte Daten: Person, Organisation und Website */}
      <JsonLd data={buildSiteGraph()} />

      <HeroSection />

      <SchwerpunkteSection />

      <LeistungenSection />

      <WorkshopsSection />

      <KontaktSection />

    </article>
  );
}