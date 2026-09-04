/**
 * @file format-day.ts
 * @description Formatiert Tagesangaben mit korrekter deutscher Singular-/Pluralform.
 * @module utils/format-day
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/**
 * Formatiert eine Anzahl Tage mit korrekter Singular-/Pluralform (z.B. "1 Tag" / "3 Tage").
 *
 * @param days - Anzahl der Tage
 * @returns Die formatierte Tagesangabe
 */
export function formatDay(days: number): string {
    return `${days} ${days === 1 ? "Tag" : "Tage"}`;
};