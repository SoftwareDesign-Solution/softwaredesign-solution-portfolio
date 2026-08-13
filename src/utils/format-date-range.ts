import { formatDate } from "@/utils/format-date";

/** Gibt nur den Tag zurück (z.B. "21."), ohne Monat/Jahr. */
function formatDayOnly(date: string): string {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit" }).format(new Date(date)) + ".";
}
 
/**
 * Formatiert einen Zeitraum für die Termin-Anzeige:
 * - datumVon === datumBis (eintägiger Workshop) → nur "01. Sept. 2026"
 * - datumVon !== datumBis (mehrtägiger Workshop) → "21.–23. Sept. 2026"
 *   (datumVon nur als Tag, datumBis vollständig — Monat/Jahr müssen ja nicht doppelt stehen)
 */
export function formatDateRange(datumVon: string, datumBis: string): string {
  const isSameDay = new Date(datumVon).toDateString() === new Date(datumBis).toDateString();
 
  if (isSameDay) {
    return formatDate(datumVon);
  }
 
  return `${formatDayOnly(datumVon)}–${formatDate(datumBis)}`;
}

export function isSameDay(datumVon: string, datumBis: string): boolean {
  return new Date(datumVon).toDateString() === new Date(datumBis).toDateString();
}