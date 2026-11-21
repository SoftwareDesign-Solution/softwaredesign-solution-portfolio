/**
 * @file referenz-bilder.ts
 * @description Liefert alle Bilder eines Referenz-Projekts: statisch hinterlegte
 * `bilder` plus die per `bilderPrefix` aus dem Vercel-Blob-Store geladenen.
 * @module lib/referenz-bilder
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { cache } from "react";

import { ladeBilderAusBlob } from "@/lib/blob-galerie";
import { type ReferenzBild, type ReferenzProjektEintrag } from "@/types/referenz";

/**
 * Lädt alle Bilder eines Projekts. Per `cache` höchstens einmal pro Request,
 * auch wenn Seite und Modal-Slot sie gleichzeitig brauchen.
 *
 * @param projekt - Das Projekt aus REFERENZEN
 * @returns Statische und Blob-Bilder in dieser Reihenfolge
 */
export const ladeBilderFuerProjekt = cache(
  async (projekt: ReferenzProjektEintrag): Promise<ReferenzBild[]> => [
    ...(projekt.bilder ?? []),
    ...(projekt.bilderPrefix
      ? await ladeBilderAusBlob(projekt.bilderPrefix, projekt.kategorien)
      : []),
  ],
);
