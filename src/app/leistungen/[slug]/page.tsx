/**
 * @file page.tsx
 * @description Leistungsseite unter /leistungen/[slug]: Landingpage je Schwerpunkt mit
 * Leistungsumfang, Technologien, Referenzen, passenden Workshops, Vorgehen und FAQ.
 * @module app/leistungen/[slug]/page
 * @author Manuel Kübler
 */

import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkshops } from "@/app/actions/get-workshops";
import JsonLd from "@/components/json-ld";
import { findLeistung, LEISTUNGEN, STANDARD_VORGEHEN } from "@/data/leistungen";
import { baseOpenGraph } from "@/lib/site";
import { buildLeistungGraph } from "@/lib/structured-data";
import { formatDay } from "@/utils/format-day";

import Abschnitt from "./_components/abschnitt";
import FaqListe from "./_components/faq-liste";
import KontaktBand from "./_components/kontakt-band";
import LeistungHero from "./_components/leistung-hero";
import PfeilIcon from "./_components/pfeil-icon";
import ProjektListe from "./_components/projekt-liste";

// Nur die in data/leistungen.ts gepflegten Slugs, alles andere ist 404
export const dynamicParams = false;

// Passende Workshops kommen aus der DB: stündlich neu erzeugen
export const revalidate = 3600;

/** Props für {@link LeistungPage}. */
interface LeistungPageProps {
  params: Promise<{
    /** URL-Slug der Leistung. */
    slug: string;
  }>;
}

/**
 * Erzeugt alle Leistungsseiten zur Build-Zeit.
 *
 * @returns Die Slugs aus {@link LEISTUNGEN}
 */
export function generateStaticParams() {
  return LEISTUNGEN.map((leistung) => ({ slug: leistung.slug }));
}

/**
 * Metadaten der Leistungsseite: eigener Titel, Beschreibung, Canonical und Open Graph.
 *
 * @param props - Siehe {@link LeistungPageProps}
 * @returns Die Metadaten
 */
export async function generateMetadata({ params }: LeistungPageProps): Promise<Metadata> {
  const { slug } = await params;
  const leistung = findLeistung(slug);

  if (!leistung) {
    return { robots: { index: false } };
  }

  const url = `/leistungen/${leistung.slug}`;

  return {
    title: leistung.metaTitel,
    description: leistung.metaBeschreibung,
    alternates: { canonical: url },
    openGraph: { ...baseOpenGraph, title: leistung.metaTitel, description: leistung.metaBeschreibung, url },
  };
}

/**
 * Lädt die aktiven Workshops zu den angegebenen Slugs in deren Reihenfolge
 * (bei `"alle"` sämtliche aktiven Workshops). Ein DB-Fehler blendet den Abschnitt aus,
 * statt die Seite zu zerstören.
 *
 * @param slugs - Workshop-Slugs der Leistung oder `"alle"`
 * @returns Die gefundenen Workshops
 */
async function ladePassendeWorkshops(slugs: string[] | "alle") {
  if (slugs.length === 0) {
    return [];
  }

  try {
    const workshops = await getWorkshops();
    if (slugs === "alle") {
      return workshops;
    }
    return slugs
      .map((slug) => workshops.find((workshop) => workshop.slug === slug))
      .filter((workshop) => workshop !== undefined);
  } catch (error) {
    console.error("leistungen: failed to load workshops", error);
    return [];
  }
}

/**
 * Leistungsseite.
 *
 * @param props - Siehe {@link LeistungPageProps}
 * @returns Die Seite
 */
export default async function LeistungPage({ params }: LeistungPageProps) {
  const { slug } = await params;
  const leistung = findLeistung(slug);

  if (!leistung) {
    notFound();
  }

  const workshops = await ladePassendeWorkshops(leistung.workshopSlugs);
  const vorgehen = leistung.vorgehen ?? STANDARD_VORGEHEN;
  const weitere = LEISTUNGEN.filter((andere) => andere.slug !== leistung.slug);

  return (
    <article>

      {/* Strukturierte Daten: Breadcrumb und Service */}
      <JsonLd data={buildLeistungGraph(leistung)} />

      <div className="mx-auto max-w-5xl px-6 pb-18 pt-10">

        <LeistungHero leistung={leistung} />

        {/* Leistungsumfang */}
        <Abschnitt id="leistungsumfang" kicker="Leistungsumfang" titel={leistung.bausteineTitel}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leistung.bausteine.map((baustein) => (
              <div key={baustein.titel} className="rounded-xl border border-border bg-white px-6 py-5.5 shadow-sm">
                <h3 className="mb-2 text-lg font-bold leading-6.75 tracking-[-0.45px] text-foreground">{baustein.titel}</h3>
                <p className="text-[14.5px] leading-[1.6] text-foreground">{baustein.beschreibung}</p>
              </div>
            ))}
          </div>
        </Abschnitt>

        {/* Technologien */}
        <Abschnitt id="technologien" kicker="Technologien" titel="Womit ich arbeite.">
          <ul className="flex flex-wrap gap-2">
            {leistung.technologien.map((technologie) => (
              <li
                key={technologie}
                className="rounded-sm border border-primary-200 bg-primary-50 px-2.5 py-1.25 font-mono text-[12.5px] text-primary-700"
              >
                {technologie}
              </li>
            ))}
          </ul>
        </Abschnitt>

        {/* Referenzen */}
        <Abschnitt id="referenzen" kicker="Referenzen" titel="Projekte, die tragen.">
          <ProjektListe leistung={leistung.slug} />
        </Abschnitt>

        {/* Passende Workshops */}
        {workshops.length > 0 && (
          <Abschnitt id="workshops" kicker="Workshops" titel={workshops.length === 1 ? "Passender Workshop." : "Passende Workshops."}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {workshops.map((workshop) => (
                <Link
                  key={workshop.slug}
                  href={`/workshops/${workshop.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-white px-5 py-4 text-foreground transition-colors hover:border-primary-200"
                >
                  <span>
                    <span className="block text-[15px] font-semibold">{workshop.titel}</span>
                    <span className="mt-0.5 block text-[12.5px] text-muted">
                      {[formatDay(workshop.dauer ?? 3), workshop.format].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <span className="text-primary-700"><PfeilIcon /></span>
                </Link>
              ))}
            </div>
          </Abschnitt>
        )}

        {/* Vorgehen */}
        <Abschnitt id="vorgehen" kicker="Vorgehen" titel="So arbeiten wir zusammen.">
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vorgehen.map((schritt, index) => (
              <li key={schritt.titel} className="border-t-2 border-primary-700 pt-4">
                <div className="font-mono text-[13px] text-primary-700">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="mb-1.5 mt-1.5 text-base font-bold text-foreground">{schritt.titel}</h3>
                <p className="text-sm leading-[1.55] text-foreground">{schritt.beschreibung}</p>
              </li>
            ))}
          </ol>
        </Abschnitt>

        {/* FAQ */}
        <Abschnitt id="faq" kicker="FAQ" titel="Häufige Fragen.">
          <FaqListe fragen={leistung.faq} />
        </Abschnitt>

        {/* Querverweise auf die anderen Leistungsseiten */}
        {weitere.length > 0 && (
          <Abschnitt id="weitere-leistungen" kicker="Weitere Leistungen" titel="Was ich außerdem anbiete.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {weitere.map((andere) => (
                <Link
                  key={andere.slug}
                  href={`/leistungen/${andere.slug}`}
                  className="block rounded-xl border border-border bg-white px-5.5 py-5 transition-colors hover:border-primary-200"
                >
                  <span className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">Leistung</span>
                  <span className="mt-1.5 flex items-center justify-between text-[17px] font-bold text-foreground">
                    {andere.titel}
                    <span className="text-primary-700"><PfeilIcon /></span>
                  </span>
                </Link>
              ))}
            </div>
          </Abschnitt>
        )}

      </div>

      <KontaktBand ctaText={leistung.ctaText} />

    </article>
  );
}
