/**
 * @file json-ld.tsx
 * @description Rendert strukturierte Daten (schema.org) als JSON-LD-Script-Tag.
 * @module components/json-ld
 * @author Manuel Kübler
 */

/** Props für {@link JsonLd}. */
interface JsonLdProps {
    /** Das schema.org-Objekt, z. B. aus `lib/structured-data.ts`. */
    data: Record<string, unknown>;
}

/**
 * Rendert strukturierte Daten als `<script type="application/ld+json">`.
 *
 * `<` wird als `<` maskiert, damit ein `</script>` in redaktionellen Texten
 * (z. B. Workshop-Beschreibung) den Script-Block nicht vorzeitig beenden kann
 * (Empfehlung aus der Next.js-Doku, Guide "JSON-LD").
 *
 * @param props - Siehe {@link JsonLdProps}
 * @returns Das Script-Element
 */
export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}