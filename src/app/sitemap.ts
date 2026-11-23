/**
 * @file sitemap.ts
 * @description Erzeugt /sitemap.xml aus den statischen Seiten, allen aktiven Workshops
 * (live aus Neon) und den Referenz-Projekten mit Detailseite.
 * @module app/sitemap
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { MetadataRoute } from "next";

import { getWorkshops } from "@/app/actions/get-workshops";
import { getReferenzProjektIdsMitBildern } from "@/data/referenzen";
import { SITE_URL } from "@/lib/site";

// Stündlich neu erzeugen, damit neue oder deaktivierte Workshops ohne Redeploy in der Sitemap landen
export const revalidate = 3600;

/**
 * Liefert alle indexierbaren URLs der Website.
 *
 * Bestätigungsseiten (`/notifications/…`, `/offer-requests/…`) und `/design-system`
 * fehlen absichtlich – sie sind `noindex`.
 *
 * @returns Die Einträge der Sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const statischeSeiten: MetadataRoute.Sitemap = [
    { changeFrequency: "weekly", priority: 1, url: SITE_URL },
    { changeFrequency: "monthly", priority: 0.8, url: `${SITE_URL}/referenzen` },
    { changeFrequency: "yearly", priority: 0.6, url: `${SITE_URL}/anfrage` },
    { changeFrequency: "yearly", priority: 0.2, url: `${SITE_URL}/impressum` },
    { changeFrequency: "yearly", priority: 0.2, url: `${SITE_URL}/datenschutz` },
    { changeFrequency: "yearly", priority: 0.2, url: `${SITE_URL}/agb` },
  ];

  // Ein DB-Fehler darf die Sitemap nicht komplett zerstören – dann eben nur die statischen Seiten
  let workshopSeiten: MetadataRoute.Sitemap = [];
  try {
    const workshops = await getWorkshops();
    workshopSeiten = workshops.map((workshop) => ({
      changeFrequency: "weekly",
      priority: 0.9,
      url: `${SITE_URL}/workshops/${workshop.slug}`,
    }));
  } catch (error) {
    console.error("sitemap: failed to load workshops", error);
  }

  const referenzSeiten: MetadataRoute.Sitemap = getReferenzProjektIdsMitBildern().map((slug) => ({
    changeFrequency: "yearly",
    priority: 0.5,
    url: `${SITE_URL}/referenzen/${slug}`,
  }));

  return [...statischeSeiten, ...workshopSeiten, ...referenzSeiten];
}