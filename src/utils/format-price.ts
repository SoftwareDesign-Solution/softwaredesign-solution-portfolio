/**
 * @file format-price.ts
 * @description Formatiert Preisangaben als deutschen Euro-Betrag.
 * @module utils/format-price
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/**
 * Formatiert einen Preis als deutschen Euro-Betrag (z.B. "1.234,50 €").
 * `undefined` wird über `Number(undefined)` zu `NaN` und als "NaN €" dargestellt.
 *
 * @param price - Der zu formatierende Preis (netto oder brutto, je nach Aufrufkontext)
 * @returns Der formatierte Preis inkl. Euro-Zeichen
 */
export const formatPrice = (price?: number): string => {
    return Number(price).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};