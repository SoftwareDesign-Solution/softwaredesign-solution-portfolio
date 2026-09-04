/**
 * @file error-message.tsx
 * @description Einheitliche Validierungsfehler-Meldung unter einem Formularfeld.
 * @module components/forms/shared/error-message
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Props für {@link ErrorMessage}. */
interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    message: string | undefined;
}

/**
 * Einheitliche Validierungsfehler-Meldung unter einem Formularfeld (rot).
 *
 * @param props - Siehe {@link ErrorMessageProps}
 * @returns Die Fehlermeldung, oder ein leeres `<p>`, falls `message` `undefined` ist
 */
export default function ErrorMessage({ message, className, ...props }: ErrorMessageProps) {
    return (
        <p
            className={`mt-2 text-[12.5px] text-error-600 ${className}`}
            role="alert"
            {...props}
        >
            {message}
        </p>
    );
};