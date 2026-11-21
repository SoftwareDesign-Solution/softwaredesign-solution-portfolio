/**
 * @file page.tsx
 * @description Vollseite /referenzen/[slug]/bild/[index]: erscheint bei direktem
 * Aufruf oder Reload. Bei Klick aus der Detailseite wird die Route stattdessen
 * vom Modal im Slot `@galerie` abgefangen.
 * @module app/referenzen/[slug]/bild/[index]/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";
import { notFound } from "next/navigation";

import { findReferenzProjektMitKunde } from "@/data/referenzen";
import { ladeBilderFuerProjekt } from "@/lib/referenz-bilder";

import ReferenzBildAnsicht from "../../_components/referenz-bild-ansicht";

/** Props für {@link BildPage}. */
interface BildPageProps {
  params: Promise<{ slug: string; index: string }>;
}

/**
 * Vollseite für ein einzelnes Bild eines Referenz-Projekts.
 *
 * @param props - Siehe {@link BildPageProps}
 * @returns Die Bild-Seite
 */
export default async function BildPage({ params }: BildPageProps) {
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

  return (
    <article className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link
          href={`/referenzen/${slug}`}
          className="mb-8 inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          {treffer.projekt.titel}
        </Link>

        <ReferenzBildAnsicht projektId={slug} bilder={bilder} index={i} />
      </div>
    </article>
  );
}
