/**
 * @file page.tsx
 * @description Abgefangene Bild-Route (`(.)bild/[index]`): zeigt das Bild bei
 * Soft-Navigation aus der Detailseite als Modal über der Seite.
 * @module app/referenzen/[slug]/@galerie/(.)bild/[index]/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { notFound } from "next/navigation";

import { findReferenzProjektMitKunde } from "@/data/referenzen";
import { ladeBilderFuerProjekt } from "@/lib/referenz-bilder";

import ReferenzBildAnsicht from "../../../_components/referenz-bild-ansicht";
import BildModal from "../../_components/bild-modal";

/** Props für {@link BildModalPage}. */
interface BildModalPageProps {
  params: Promise<{ slug: string; index: string }>;
}

/**
 * Lädt das Bild und rendert es im Modal.
 *
 * @param props - Siehe {@link BildModalPageProps}
 * @returns Das Modal mit der Bildansicht
 */
export default async function BildModalPage({ params }: BildModalPageProps) {
  const { slug, index } = await params;
  const treffer = findReferenzProjektMitKunde(slug);

  if (!treffer) {
    notFound();
  }

  const bilder = await ladeBilderFuerProjekt(treffer.projekt);
  const i = Number(index);

  if (!Number.isInteger(i) || !bilder[i]) {
    notFound();
  }

  const bild = bilder[i];

  return (
    <BildModal title={bild.bildunterschrift ?? bild.alt}>
      <ReferenzBildAnsicht projektId={slug} bilder={bilder} index={i} zeigeCaption={false} />
    </BildModal>
  );
}
