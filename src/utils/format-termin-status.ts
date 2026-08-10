import { TerminStatus } from "@/types/termin";

interface TerminStatusConfig {
  label: string;
  dotColor: string;
  textColor: string; // Farbe des Datums
  statusTextColor: string; // Farbe des Status-Labels
  bgColor: string; // Hintergrund der ganzen Zeile
  /** "Ausgebucht" wirkt dadurch bewusst etwas zurückgenommen, ohne extra Farbe zu brauchen */
  dimmed?: boolean;
}
 
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
 
export function formatTerminStatus(status: TerminStatus): TerminStatusConfig {
  return TERMIN_STATUS_CONFIG[status];
}