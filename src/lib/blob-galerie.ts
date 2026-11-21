/**
 * @file blob-galerie.ts
 * @description Lädt Bilder für eine Referenz-Detailseite dynamisch aus dem
 * Vercel-Blob-Store, statt sie statisch in referenzen.ts zu pflegen.
 * @module lib/blob-galerie
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { list } from "@vercel/blob";

import { type ReferenzBild } from "@/types/referenz";

/**
 * Leitet aus einem Blob-Pfad einen lesbaren Text ab:
 * "referenzen/x/03-route-guard.png" → "Route guard".
 *
 * @param pfad - Blob-Pfad oder Ordnername
 * @returns Der lesbare Text
 */
function pfadZuText(pfad: string): string {
  const name = pfad.split("/").pop() ?? pfad;

  return name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_]/, "")
    .replace(/[-_]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

/**
 * Lädt alle Bilder unterhalb eines Prefixes aus dem Vercel-Blob-Store und
 * übersetzt sie in {@link ReferenzBild}. Ein Unterordner direkt nach dem Prefix
 * gilt als Kategorie; ihr Anzeigename kommt aus `kategorien`, sonst aus dem
 * Ordnernamen.
 *
 * @param prefix - Der Blob-Prefix, z. B. "referenzen/travel-planner-schulungsprojekt/" (mit "/" am Ende)
 * @param kategorien - Mapping Ordnername → Anzeigename (optional)
 * @returns Die gefundenen Bilder, nach Pfad sortiert
 */
export async function ladeBilderAusBlob(
  prefix: string,
  kategorien: Record<string, string> = {},
): Promise<ReferenzBild[]> {
  const { blobs } = await list({ prefix });

  return blobs
    .filter((blob) => /\.(png|jpe?g|webp|avif|gif)$/i.test(blob.pathname))
    // nach pathname, nicht nach URL: Blob-URLs können einen zufälligen Suffix tragen
    .sort((a, b) => a.pathname.localeCompare(b.pathname))
    .map((blob) => {
      const segmente = blob.pathname.slice(prefix.length).split("/");
      const ordner = segmente.length > 1 ? segmente[0] : undefined;
      const text = pfadZuText(blob.pathname);

      return {
        src: blob.url,
        alt: text,
        bildunterschrift: text,
        kategorie: ordner ? (kategorien[ordner] ?? pfadZuText(ordner)) : undefined,
      };
    });
}
