/**
 * @file action-status-content.ts
 * @description Typen für den Inhalt des generischen Erfolgs-/Fehler-Modals
 * ({@link ActionStatusModal}), das nach dem Absenden eines Formulars angezeigt wird.
 * @module types/action-status-content
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { ReactNode } from "react";

/** Ein einzelner Meta-Eintrag (Label/Wert-Paar) im Erfolgs-/Fehler-Modal, z.B. "Workshop: React Basics". */
export interface ActionStatusModalMetaItem {
  label: string;
  value: string;
}

/** Ob das Status-Modal einen Erfolg oder einen Fehler darstellt. */
export type ActionStatusVariant = "success" | "error";

/** Kontext, der den render-Funktionen von {@link ActionStatusContent} übergeben wird. */
export interface ActionStatusRenderContext {
  variant: ActionStatusVariant;
  /** Schließt das aktuell geöffnete Modal. */
  close: () => void;
}

/**
 * Beschreibt den Inhalt eines Erfolgs-/Fehler-Modals nach einer Formular-Aktion
 * (z.B. Buchung, Angebotsanfrage). Überschrift und Text werden als Funktionen
 * übergeben, damit sie auf `variant` und `close` reagieren können.
 */
export interface ActionStatusContent {
  variant?: ActionStatusVariant;
  /** Kurzer, farbig hervorgehobener Vorspann über der Überschrift. */
  kicker: string;
  heading: (ctx?: ActionStatusRenderContext) => ReactNode;
  body: (ctx?: ActionStatusRenderContext) => ReactNode;
  meta?: ActionStatusModalMetaItem[];
  zIndex?: number;
  maxWidth?: string;
}
