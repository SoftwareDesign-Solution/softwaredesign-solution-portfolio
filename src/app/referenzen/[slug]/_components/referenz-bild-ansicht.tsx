/**
 * @file referenz-bild-ansicht.tsx
 * @description Große Einzelansicht eines Bildes mit Vor-/Zurück-Navigation.
 * Wird im Modal (abgefangene Route) und auf der Vollseite verwendet.
 * @module app/referenzen/[id]/_components/referenz-bild-ansicht
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Image from "next/image";
import Link from "next/link";

import { type ReferenzBild } from "@/types/referenz";

/** Props für {@link ReferenzBildAnsicht}. */
interface ReferenzBildAnsichtProps {
  projektId: string;
  bilder: ReferenzBild[];
  /** Index des angezeigten Bildes in `bilder`. */
  index: number;
  /** Im Modal steht die Bildunterschrift im Titelbalken, dort `false`. */
  zeigeCaption?: boolean;
}

/**
 * Bild, optionale Bildunterschrift und Navigation (Zurück / Zähler / Weiter).
 *
 * @param props - Siehe {@link ReferenzBildAnsichtProps}
 * @returns Die Bildansicht
 */
export default function ReferenzBildAnsicht({
  projektId,
  bilder,
  index,
  zeigeCaption = true,
}: ReferenzBildAnsichtProps) {
  const bild = bilder[index];
  const href = (i: number) => `/referenzen/${projektId}/bild/${i}`;

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-surface">
        <Image
          src={bild.src}
          alt={bild.alt}
          fill
          sizes="(max-width: 1100px) 100vw, 1100px"
          className="object-contain"
          priority
        />
      </div>

      {zeigeCaption && bild.bildunterschrift && (
        <figcaption className="mt-3 text-sm text-muted">{bild.bildunterschrift}</figcaption>
      )}

      <nav
        aria-label="Bildnavigation"
        className="mt-5 flex items-center justify-between text-sm font-semibold text-primary-700"
      >
        {index > 0 ? (
          <Link href={href(index - 1)} replace>
            ← Zurück
          </Link>
        ) : (
          <span />
        )}

        <span className="font-normal text-muted">
          {index + 1} / {bilder.length}
        </span>

        {index < bilder.length - 1 ? (
          <Link href={href(index + 1)} replace>
            Weiter →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </figure>
  );
}
