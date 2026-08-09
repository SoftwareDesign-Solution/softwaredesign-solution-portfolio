export const formatPrice = (price: number): string => {
    return Number(price).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};