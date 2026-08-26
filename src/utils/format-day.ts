export function formatDay(days: number): string {
    return `${days} ${days === 1 ? "Tag" : "Tage"}`;
};