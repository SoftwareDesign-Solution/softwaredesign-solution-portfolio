/**
 * @file referenz.ts
 * @description Typen für die Referenzen-Seite: Kunden mit den bei ihnen
 * umgesetzten Projekten.
 * @module types/referenz
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { LeistungSlug } from "@/types/leistung";

/** Ein einzelnes Bild auf der Projekt-Detailseite, optional einer Kategorie zugeordnet. */
export interface ReferenzBild {
  src: string;
  alt: string;
  /** Optional, wird als Bildunterschrift unter dem Vorschaubild und im Modal gezeigt. */
  bildunterschrift?: string;
  /** Optional, z. B. "Anwendung" oder "E-Mail-Benachrichtigungen". Bilder ohne Kategorie werden ohne Überschrift gruppiert. */
  kategorie?: string;
}

/** Ein Abschnitt im Textteil der Detailseite (z. B. "Ausgangslage", "Lösung", "Ergebnis"). */
export interface ReferenzAbschnitt {
  titel: string;
  /** Fließtext, ein Eintrag pro Absatz. */
  absaetze?: string[];
  /** Optionale Stichpunkte unterhalb der Absätze. */
  aufzaehlung?: string[];
}

/** Ein einzelnes Projekt innerhalb einer Kunden-Referenz. */
export interface ReferenzProjektEintrag {
  slug: string;
  /** Leistungsseiten, zu denen das Projekt fachlich gehört. */
  leistungen?: LeistungSlug[];
  /** Leistungsseiten, auf denen das Projekt als Beispiel gezeigt wird (Teilmenge von `leistungen`). */
  hervorgehoben?: LeistungSlug[];
  titel: string;
  beschreibung: string;
  /** Optional, falls das einzelne Projekt datiert ist (z. B. Schulungen pro Jahrgang). */
  jahr?: string;
  /** Optional, für Projekte mit umfangreichem oder ungewöhnlichem Tech-Stack. */
  stack?: string[];
  /** Optional, falls für dieses Projekt ein öffentliches GitHub-Repository verlinkt werden soll. */
  github?: string;
  /** Optional, eigene Rolle im Projekt, z. B. "Konzeption & Entwicklung" (Faktenzeile der Detailseite). */
  rolle?: string;
  /** Optional, Textabschnitte der Detailseite (Ausgangslage, Lösung, Ergebnis …). */
  abschnitte?: ReferenzAbschnitt[];
  /**
   * Optional. Nur bei `true` bekommt das Projekt eine Detailseite unter
   * /referenzen/[slug] und in der Übersicht einen Link darauf. Ohne den Wert
   * (oder mit `false`) bleibt es bei der Zeile in der Übersicht.
   */
  details?: boolean;
  /** Optional, statische Bilder für die Screenshots der Detailseite (nur mit `details: true` sichtbar). */
  bilder?: ReferenzBild[];
  /**
   * Optional, Alternative oder Ergänzung zu `bilder` (nur mit `details: true` sichtbar): Prefix im Vercel-Blob-Store
   * (z. B. "referenzen/travel-planner-schulungsprojekt/"), unter dem alle Bilder
   * für dieses Projekt liegen. Wird zur Laufzeit per `list({ prefix })` geladen.
   * Der Prefix muss mit "/" enden. Unterordner nach dem Prefix gelten als Kategorie.
   */
  bilderPrefix?: string;
  /**
   * Optional, Zuordnung Blob-Unterordner → lesbarer Kategoriename,
   * z. B. `{ "01-anwendung": "Anwendung" }`. Ordner ohne Eintrag bekommen
   * automatisch einen aus dem Ordnernamen abgeleiteten Namen.
   */
  kategorien?: Record<string, string>;
}

/** Ein Kunde inkl. aller bei ihm umgesetzten Projekte, wie auf der Referenzen-Seite gruppiert dargestellt. */
export interface ReferenzKunde {
  id: string;
  name: string;
  ort: string;
  branche: string;
  /** Dauer der Zusammenarbeit, z. B. "2013–2026 (13 Jahre)". */
  zeitraum: string;
  projekte: ReferenzProjektEintrag[];
}
