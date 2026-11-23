/**
 * @file opengraph-image.tsx
 * @description Vorschaubild (og:image) je Workshop mit Titel, Kurzbeschreibung,
 * Dauer und Format – live aus der DB.
 * @module app/workshops/[slug]/opengraph-image
 * @author Manuel Kübler
 */

import { ImageResponse } from "next/og";

import { OG_IMAGE_SIZE, OgImageLayout } from "@/app/_components/og-image-layout";
import { getWorkshop } from "@/app/actions/get-workshop";

export const alt = "Workshop von Manuel Kübler";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

/** Props für {@link Image}. */
interface WorkshopOgImageProps {
    params: Promise<{
        /** URL-Slug des Workshops. */
        slug: string;
    }>;
}

/**
 * Erzeugt das Vorschaubild eines Workshops. Existiert der Workshop nicht (mehr),
 * entsteht ein neutrales Bild statt eines Fehlers, damit geteilte Links nicht "kaputt" aussehen.
 *
 * @param props - Siehe {@link WorkshopOgImageProps}
 * @returns Das PNG als {@link ImageResponse}
 */
export default async function Image({ params }: WorkshopOgImageProps) {
    const { slug } = await params;
    const workshop = await getWorkshop(slug);

    const facts = [workshop?.dauer, workshop?.format]
        .filter((fakt) => fakt !== undefined && fakt !== null && fakt !== "")
        .map(String);

    return new ImageResponse(
        (
            <OgImageLayout
                kicker="Workshop"
                title={workshop?.titel ?? "Workshops"}
                subtitle={workshop?.kurzbeschreibung}
                facts={facts}
            />
        ),
        size,
    );
}