/**
 * @file og-image-layout.tsx
 * @description Gemeinsames Layout der generierten Open-Graph-Bilder (1200×630) für
 * Startseite und Workshop-Detailseiten.
 * @module app/_components/og-image-layout
 * @author Manuel Kübler
 */

/** Maße der Open-Graph-Bilder (von Facebook, LinkedIn und X empfohlen). */
export const OG_IMAGE_SIZE = { height: 630, width: 1200 };

/** Props für {@link OgImageLayout}. */
interface OgImageLayoutProps {
    /** Kleiner Vorspann über der Überschrift, z. B. "Workshop". */
    kicker: string;
    /** Große Überschrift. */
    title: string;
    /** Optionaler Untertitel unter der Überschrift. */
    subtitle?: string;
    /** Optionale Fakten in der Fußzeile, z. B. Dauer und Format. */
    facts?: string[];
}

/**
 * Layout für `ImageResponse`. Farben sind bewusst als Hex-Werte gesetzt, da Satori
 * (die Render-Engine von `next/og`) keine Tailwind-Klassen und keine CSS-Variablen kennt;
 * sie entsprechen den Tokens `primary-700`, `foreground`, `surface` und `muted`.
 *
 * @param props - Siehe {@link OgImageLayoutProps}
 * @returns Das JSX für das Open-Graph-Bild
 */
export function OgImageLayout({ kicker, title, subtitle, facts = [] }: OgImageLayoutProps) {
    return (
        <div
            style={{
                background: "#f2f2f2",
                color: "#2b2b2b",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                padding: "72px 80px",
                width: "100%",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                    style={{
                        color: "#1565a5",
                        display: "flex",
                        fontSize: 26,
                        fontWeight: 600,
                        letterSpacing: 3,
                        marginBottom: 28,
                        textTransform: "uppercase",
                    }}
                >
                    {kicker}
                </div>
                <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 80, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
                    {title}
                </div>
                {subtitle && (
                    <div style={{ color: "#5f5f5f", display: "flex", fontSize: 32, lineHeight: 1.4, marginTop: 28, maxWidth: 1000 }}>
                        {subtitle}
                    </div>
                )}
            </div>

            <div style={{ alignItems: "center", borderTop: "2px solid #d4d4d4", display: "flex", justifyContent: "space-between", paddingTop: 28 }}>
                <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>
                    Manuel Kübler · SoftwareDesign-Solution
                </div>
                <div style={{ color: "#1565a5", display: "flex", fontSize: 26, gap: 24 }}>
                    {facts.map((fakt) => (
                        <span key={fakt}>{fakt}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}