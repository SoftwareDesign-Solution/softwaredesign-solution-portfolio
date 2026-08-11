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