/**
 * @file site.ts
 * @description Zentrale Konstanten für SEO: Basis-URL, Seitenname und
 * Open-Graph-Standardwerte, die von Layout, Seiten, Sitemap und Robots genutzt werden.
 * @module lib/site
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { Metadata } from "next";

/**
 * Öffentliche Basis-URL der Website ohne abschließenden Slash.
 * Nutzt dieselbe Variable wie die Double-Opt-In-Links (`NEXT_PUBLIC_BASE_URL`);
 * fehlt sie, greift die Produktiv-Domain, damit Canonicals nie leer sind.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://softwaredesign-solution.de").replace(/\/$/, "");

/** Markenname, wie er in Titeln und als `og:site_name` erscheint. */
export const SITE_NAME = "SoftwareDesign-Solution";

/** Standard-Titel der Startseite und Fallback für Seiten ohne eigenen Titel (Keywords vorn, max. ~65 Zeichen). */
export const DEFAULT_TITLE = "Manuel Kübler | Software-Entwicklung, SAP Business One & Workshops";

/** Standard-Beschreibung der Startseite und Fallback (max. ~155 Zeichen, sonst kürzt Google). */
export const DEFAULT_DESCRIPTION = "Freelance-Entwickler und IT-Trainer: Web- und App-Entwicklung, .NET, SAP Business One und praxisnahe Workshops – remote oder inhouse im DACH-Raum.";

/**
 * Open-Graph-Grundwerte. Next.js überschreibt `openGraph` auf Seitenebene komplett
 * (kein Deep-Merge) – deshalb spreaden Seiten diese Werte in ihr eigenes `openGraph`-Objekt.
 */
export const baseOpenGraph = {
  locale: "de_DE",
  siteName: SITE_NAME,
  type: "website",
} satisfies Metadata["openGraph"];