/**
 * @file referenz.ts
 * @description Typen für die Referenzen-Seite: Kunden mit den bei ihnen
 * umgesetzten Projekten.
 * @module types/referenz
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Ein einzelnes Projekt innerhalb einer Kunden-Referenz. */
export interface ReferenzProjektEintrag {
  id: string;
  titel: string;
  beschreibung: string;
  /** Optional, falls das einzelne Projekt datiert ist (z. B. Schulungen pro Jahrgang). */
  jahr?: string;
  /** Optional, für Projekte mit umfangreichem oder ungewöhnlichem Tech-Stack. */
  stack?: string[];
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