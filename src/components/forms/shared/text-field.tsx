/**
 * @file text-field.tsx
 * @description Einheitliches Text-Eingabefeld für Formulare.
 * @module components/forms/shared/text-field
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/**
 * Einheitliches Text-Eingabefeld für Formulare.
 *
 * @param props - Native `<input>`-Attribute plus `className`
 * @returns Das Eingabefeld
 */
export default function TextField({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 ${className ?? ""}`}
            {...props}
        />
    );
};