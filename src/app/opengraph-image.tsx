/**
 * @file opengraph-image.tsx
 * @description Standard-Vorschaubild (og:image) für alle Seiten ohne eigenes Bild,
 * z. B. beim Teilen der Startseite auf LinkedIn.
 * @module app/opengraph-image
 * @author Manuel Kübler
 */

import { ImageResponse } from "next/og";

import { OG_IMAGE_SIZE, OgImageLayout } from "./_components/og-image-layout";

export const alt = "Manuel Kübler – Software-Entwicklung, SAP Business One und Workshops";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

/**
 * Erzeugt das Standard-Vorschaubild (wird zur Build-Zeit statisch generiert).
 *
 * @returns Das PNG als {@link ImageResponse}
 */
export default function Image() {
    return new ImageResponse(
        (
            <OgImageLayout
                kicker="Entwicklung · Beratung · Workshops"
                title="Hochqualitative Software-Entwicklung"
                subtitle="Web- und App-Entwicklung, .NET und SAP Business One – von der Konzeption bis zur praxisnahen Schulung."
                facts={["Remote", "Inhouse"]}
            />
        ),
        size,
    );
}