interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: { value: string; label: string }[];
}

export default function SelectField({ className, options, ...props }: SelectFieldProps) {
    return (
        <select
            className={`w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 ${className}`}
            {...props}
        >
            {options?.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};