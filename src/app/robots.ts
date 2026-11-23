/**
 * @file robots.ts
 * @description Erzeugt /robots.txt: erlaubt das Crawlen der gesamten Seite und verweist auf die Sitemap.
 * @module app/robots
 * @author Manuel Kübler
 */

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Liefert die Regeln für /robots.txt.
 *
 * Interne Seiten (Bestätigungsseiten, Design-System) werden bewusst nicht per `Disallow`
 * gesperrt, sondern per `noindex` aus dem Index gehalten – ein `Disallow` würde Crawler
 * daran hindern, das `noindex` überhaupt zu lesen.
 *
 * @returns Die Robots-Konfiguration
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}