/**
 * @file format-termin-status.ts
 * @description Liefert die visuelle Konfiguration (Farben, Label) für die Anzeige
 * eines Workshop-Termin-Status in Karten, Sidebar und Formularen.
 * @module utils/format-termin-status
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { TerminStatus } from "@/types/termin";

/** Visuelle Konfiguration für einen Termin-Status. */
interface TerminStatusConfig {
  label: string;
  dotColor: string;
  textColor: string; // Farbe des Datums
  statusTextColor: string; // Farbe des Status-Labels
  bgColor: string; // Hintergrund der ganzen Zeile
  /** "Ausgebucht" wirkt dadurch bewusst etwas zurückgenommen, ohne extra Farbe zu brauchen */
  dimmed?: boolean;
}
 
// Statische Zuordnung von Status zu Darstellung; keine DB-/API-Anbindung nötig
const TERMIN_STATUS_CONFIG: Record<TerminStatus, TerminStatusConfig> = {
  ausgebucht: {
    label: "Ausgebucht",
    dotColor: "bg-muted",
    statusTextColor: "text-muted",
    textColor: "text-foreground",
    bgColor: "bg-surface",
    dimmed: true,
  },
  restplaetze: {
    label: "Restplätze",
    dotColor: "bg-warning-500",
    statusTextColor: "text-warning-600",
    textColor: "text-foreground",
    bgColor: "bg-warning-50",
  },
  verfuegbar: {
    label: "Verfügbar",
    dotColor: "bg-success-500",
    statusTextColor: "text-success-600",
    textColor: "text-foreground",
    bgColor: "bg-success-50",
  },
};
 
/**
 * Liefert die visuelle Konfiguration (Farben, Label) für einen Termin-Status.
 *
 * @param status - Der Verfügbarkeitsstatus eines Termins
 * @returns Die zugehörige {@link TerminStatusConfig}
 */
export function formatTerminStatus(status: TerminStatus): TerminStatusConfig {
  return TERMIN_STATUS_CONFIG[status];
}