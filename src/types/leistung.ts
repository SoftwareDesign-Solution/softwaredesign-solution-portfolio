/**
 * @file leistung.ts
 * @description Typen für die Leistungsseiten unter /leistungen/[slug].
 * @module types/leistung
 * @author Manuel Kübler
 */

/**
 * Slugs aller Leistungsseiten. Als Union-Typ, damit Zuordnungen in `data/referenzen.ts`
 * (`leistungen`, `hervorgehoben`) schon beim Build auf Tippfehler geprüft werden.
 */
export type LeistungSlug =
  | "dotnet-app-entwicklung"
  | "it-schulungen-inhouse"
  | "sap-business-one-entwicklung"
  | "webentwicklung";

/** Ein Eckdatum im Faktenblock neben der Einleitung, z. B. "Erfahrung: seit 2013". */
export interface LeistungFakt {
  label: string;
  value: string;
}

/** Ein Leistungsbaustein (Karte im Abschnitt "Leistungsumfang"). */
export interface LeistungBaustein {
  titel: string;
  beschreibung: string;
}

/** Ein Schritt im Abschnitt "Vorgehen". */
export interface LeistungSchritt {
  titel: string;
  beschreibung: string;
}

/** Eine Frage im FAQ-Abschnitt. */
export interface LeistungFrage {
  frage: string;
  antwort: string;
}

/** Eine Leistungsseite mit allen redaktionellen Inhalten. */
export interface Leistung {
  /** URL-Slug unter /leistungen/, enthält das Haupt-Keyword. */
  slug: LeistungSlug;
  /** Kurzname für Breadcrumb, Querverweise und Startseiten-Kachel. */
  titel: string;
  /** `<title>` der Seite (max. ~60 Zeichen, Keyword vorn). */
  metaTitel: string;
  /** Meta-Description (max. ~155 Zeichen). */
  metaBeschreibung: string;
  /** schema.org `serviceType`, z. B. "SAP Business One Entwicklung". */
  serviceTyp: string;
  /** Kicker über der H1. */
  kicker: string;
  /** H1 der Seite, enthält das Haupt-Keyword. */
  ueberschrift: string;
  /** Einleitung unter der H1. */
  einleitung: string;
  /** Beschriftung der Haupt-Schaltfläche. */
  ctaText: string;
  fakten: LeistungFakt[];
  /** Überschrift des Abschnitts "Leistungsumfang". */
  bausteineTitel: string;
  bausteine: LeistungBaustein[];
  technologien: string[];
  /**
   * Slugs aktiver Workshops (Tabelle `workshop`); inaktive oder fehlende werden ausgeblendet.
   * `"alle"` zeigt jeden aktiven Workshop, damit neue Workshops ohne Codeänderung erscheinen.
   */
  workshopSlugs: string[] | "alle";
  /** Eigene Schritte; ohne Angabe gilt das Standard-Vorgehen. */
  vorgehen?: LeistungSchritt[];
  faq: LeistungFrage[];
}
