interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
    message: string | undefined;
}

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