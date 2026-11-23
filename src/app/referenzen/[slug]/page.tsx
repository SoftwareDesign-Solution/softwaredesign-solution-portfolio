/**
 * @file page.tsx
 * @description Seite /referenzen/[id]: Detailansicht eines Referenz-Projekts mit
 * Faktenzeile, Technologien, Textabschnitten und Screenshots. Existiert nur für
 * Projekte mit `bilder` oder `bilderPrefix`.
 * @module app/referenzen/[id]/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  findBenachbarteDetailProjekte,
  findReferenzProjektMitKunde,
  getReferenzProjektIdsMitBildern,
  hatDetailseite,
} from "@/data/referenzen";
import { ladeBilderFuerProjekt } from "@/lib/referenz-bilder";
import { baseOpenGraph } from "@/lib/site";

import BackLink from "./_components/back-link";
import BilderRaster from "./_components/bilder-raster";
import ContentSection from "./_components/content-section";
import FactList, { type Fakt } from "./_components/fact-list";
import ProjectHero from "./_components/project-hero";
import ProjectNav from "./_components/project-nav";
import TechStack from "./_components/tech-stack";

/** Props für {@link ReferenzDetailPage} und {@link generateMetadata}. */
interface ReferenzDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Erzeugt zur Build-Zeit die statischen Pfade für alle Projekte mit Detailseite.
 *
 * @returns Die Liste der zu prerendernden Projekt-ids
 */
export function generateStaticParams() {
  return getReferenzProjektIdsMitBildern().map((slug) => ({ slug }));
}

/**
 * Erzeugt die Seiten-Metadaten anhand des gefundenen Projekts.
 *
 * @param props - Siehe {@link ReferenzDetailPageProps}
 * @returns Die Metadaten dieser Detailseite
 */
export async function generateMetadata({ params }: ReferenzDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treffer = findReferenzProjektMitKunde(slug);

  if (!treffer) {
    return {};
  }

  const title = `${treffer.projekt.titel} - ${process.env.APP_TITLE}`;
  const description = treffer.projekt.beschreibung;
  const url = `/referenzen/${treffer.projekt.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...baseOpenGraph, title, description, url },
  };
}

/**
 * Seite /referenzen/[id]. Projekte ohne Detailseite liefern 404.
 *
 * @param props - Siehe {@link ReferenzDetailPageProps}
 * @returns Die Detailseite
 */
export default async function ReferenzDetailPage({ params }: ReferenzDetailPageProps) {
  const { slug } = await params;
  const treffer = findReferenzProjektMitKunde(slug);

  if (!treffer || !hatDetailseite(treffer.projekt)) {
    notFound();
  }

  const { kunde, projekt } = treffer;
  const bilder = await ladeBilderFuerProjekt(projekt);
  const { vorheriges, naechstes } = findBenachbarteDetailProjekte(projekt.slug);

  const fakten: Fakt[] = [
    { label: "Kunde", value: kunde.name },
    { label: "Branche", value: kunde.branche },
    { label: "Zeitraum", value: projekt.jahr ?? kunde.zeitraum },
    ...(projekt.rolle ? [{ label: "Rolle", value: projekt.rolle }] : []),
  ];

  return (
    <article className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <BackLink />

        <ProjectHero kunde={kunde.name} titel={projekt.titel} beschreibung={projekt.beschreibung} />

        <FactList fakten={fakten} />

        {projekt.stack && projekt.stack.length > 0 && <TechStack stack={projekt.stack} />}

        {projekt.abschnitte && projekt.abschnitte.length > 0 && (
          <div className="divide-y divide-border border-t border-border">
            {projekt.abschnitte.map((abschnitt, i) => (
              <ContentSection key={abschnitt.titel} abschnitt={abschnitt} id={`abschnitt-${i}`} />
            ))}
          </div>
        )}

        {bilder.length > 0 && <BilderRaster projektId={projekt.slug} bilder={bilder} />}

        <ProjectNav vorheriges={vorheriges} naechstes={naechstes} />
      </div>
    </article>
  );
}