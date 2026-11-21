/**
 * @file bilder-raster.tsx
 * @description Screenshot-Raster der Detailseite: Vorschaubilder mit
 * Bildunterschrift, optional nach Kategorie gruppiert. Ein Klick navigiert zur
 * Bild-Route, die (Soft-Navigation) als Modal abgefangen wird.
 * @module app/referenzen/[id]/_components/bilder-raster
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Image from "next/image";
import Link from "next/link";

import { type ReferenzBild } from "@/types/referenz";

/** Props für {@link BilderRaster}. */
interface BilderRasterProps {
  projektId: string;
  bilder: ReferenzBild[];
}

/**
 * Gruppiert Bilder nach `kategorie`. Bilder ohne Kategorie landen unter `""`.
 * Die Map behält die Reihenfolge des ersten Auftretens.
 *
 * @param bilder - Die zu gruppierenden Bilder
 * @returns Map Kategorie → Bilder
 */
function gruppiereNachKategorie(bilder: ReferenzBild[]) {
  const gruppen = new Map<string, ReferenzBild[]>();

  for (const bild of bilder) {
    const schluessel = bild.kategorie ?? "";
    gruppen.set(schluessel, [...(gruppen.get(schluessel) ?? []), bild]);
  }

  return gruppen;
}

/**
 * Raster mit allen Screenshots eines Projekts.
 *
 * @param props - Siehe {@link BilderRasterProps}
 * @returns Der Screenshot-Bereich
 */
export default function BilderRaster({ projektId, bilder }: BilderRasterProps) {
  const gruppen = gruppiereNachKategorie(bilder);
  const hatKategorien = Array.from(gruppen.keys()).some((k) => k !== "");

  return (
    <section aria-labelledby="screenshots-titel" className="pt-4">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 id="screenshots-titel" className="text-[18px] font-bold tracking-[-0.45px] text-foreground">
          Screenshots
        </h2>
        <span className="font-mono text-[11px] text-primary-700">
          {bilder.length} {bilder.length === 1 ? "Bild" : "Bilder"}
        </span>
      </div>

      <div className="space-y-8">
        {Array.from(gruppen.entries()).map(([kategorie, bilderInGruppe]) => (
          <div key={kategorie || "ohne-kategorie"}>
            {hatKategorien && kategorie && (
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.5px] text-muted">{kategorie}</h3>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {bilderInGruppe.map((bild) => {
                const index = bilder.indexOf(bild);

                return (
                  <figure key={bild.src}>
                    <Link
                      href={`/referenzen/${projektId}/bild/${index}`}
                      scroll={false}
                      className="group relative block aspect-video overflow-hidden rounded-lg border border-border bg-surface transition-shadow duration-200 hover:shadow-lg"
                    >
                      <Image
                        src={bild.src}
                        alt={bild.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 552px"
                        className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    </Link>

                    {bild.bildunterschrift && (
                      <figcaption className="mt-2 text-[12px] leading-[1.4] text-muted">
                        {bild.bildunterschrift}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
