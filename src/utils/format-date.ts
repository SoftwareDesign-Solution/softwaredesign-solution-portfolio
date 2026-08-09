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