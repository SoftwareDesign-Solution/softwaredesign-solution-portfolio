/**
 * @file format-date.ts
 * @description Formatiert einzelne Datumswerte im deutschen Anzeigeformat.
 * @module utils/format-date
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/**
 * Formatiert ein Datum im deutschen Format (z.B. "21. Sept. 2026").
 * Entfernt den Punkt nach der Monatsabkürzung, wenn direkt danach die Jahreszahl folgt.
 *
 * @param date - Datum als Date-Objekt oder ISO-String
 * @param options - Optionale Intl.DateTimeFormatOptions, überschreibt das Standardformat
 * @returns Das formatierte Datum als String
 * @throws Error, wenn das übergebene Datum ungültig ist
 */
export const formatDate = (
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }
): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (Number.isNaN(parsedDate.getTime())) {
        throw new Error("Ungültiges Datum");
    }

    return parsedDate
        .toLocaleDateString("de-DE", options)
        .replace(/\.(?=\s\d{4}$)/, "");
}