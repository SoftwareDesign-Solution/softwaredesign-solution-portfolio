/**
 * @file label.tsx
 * @description Einheitliches Label für Formularfelder.
 * @module components/forms/shared/label
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/**
 * Einheitliches Label für Formularfelder.
 *
 * @param props - Native `<label>`-Attribute plus `children` und `className`
 * @returns Das Label
 */
export default function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className={`mb-1.5 block text-[13px] font-medium text-foreground ${className}`}
            {...props}
        >
            {children}
        </label>
    );
};