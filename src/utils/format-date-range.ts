/**
 * @file format-date-range.ts
 * @description Formatiert Termin-Zeiträume (Workshop-Von/Bis-Datum) für die Anzeige
 * in Karten, Sidebar und E-Mails im deutschen Kurzformat.
 * @module utils/format-date-range
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { formatDate } from "@/utils/format-date";

/**
 * Gibt nur den Tag eines Datums zurück, ohne Monat/Jahr.
 *
 * @param date - ISO-Datumsstring
 * @returns Der Tag mit nachgestelltem Punkt, z.B. "21."
 */
function formatDayOnly(date: string): string {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit" }).format(new Date(date)) + ".";
}
 
/**
 * Formatiert einen Zeitraum für die Termin-Anzeige:
 * - datumVon === datumBis (eintägiger Workshop) → nur "01. Sept. 2026"
 * - datumVon !== datumBis (mehrtägiger Workshop) → "21.–23. Sept. 2026"
 *   (datumVon nur als Tag, datumBis vollständig — Monat/Jahr müssen ja nicht doppelt stehen)
 *
 * @param datumVon - Start-Datum des Termins (ISO-String)
 * @param datumBis - End-Datum des Termins (ISO-String)
 * @returns Formatierter, für die Anzeige lesbarer Zeitraum
 */
export function formatDateRange(datumVon: string, datumBis: string): string {
  const isSameDay = new Date(datumVon).toDateString() === new Date(datumBis).toDateString();
 
  if (isSameDay) {
    return formatDate(datumVon);
  }
 
  return `${formatDayOnly(datumVon)}–${formatDate(datumBis)}`;
}

/**
 * Prüft, ob zwei Datums-Strings auf denselben Kalendertag fallen.
 *
 * @param datumVon - Erstes Datum (ISO-String)
 * @param datumBis - Zweites Datum (ISO-String)
 * @returns `true`, wenn beide Daten auf denselben Kalendertag fallen
 */
export function isSameDay(datumVon: string, datumBis: string): boolean {
  return new Date(datumVon).toDateString() === new Date(datumBis).toDateString();
}