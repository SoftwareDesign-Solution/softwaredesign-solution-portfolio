/**
 * @file kontakt-band.tsx
 * @description Dunkles Kontakt-Band am Ende der Leistungsseite mit Verweis auf /anfrage.
 * @module app/leistungen/[slug]/_components/kontakt-band
 * @author Manuel Kübler
 */

import Link from "next/link";

import Kicker from "./kicker";
import PfeilIcon from "./pfeil-icon";

/** Props für {@link KontaktBand}. */
interface KontaktBandProps {
  /** Beschriftung der Schaltfläche, z. B. "Projekt anfragen". */
  ctaText: string;
}

/**
 * Kontakt-Band auf `primary-950`.
 *
 * @param props - Siehe {@link KontaktBandProps}
 * @returns Das Kontakt-Band
 */
export default function KontaktBand({ ctaText }: KontaktBandProps) {
  return (
    <section aria-labelledby="kontakt-band-titel" className="bg-primary-950 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6">
        <div className="max-w-150">
          <Kicker hell>Kontakt</Kicker>
          <h2 id="kontakt-band-titel" className="mb-2.5 text-[30px] font-bold tracking-[-0.8px]">
            Lassen Sie uns sprechen.
          </h2>
          <p className="text-base leading-[1.55] text-primary-100">
            Schildern Sie kurz Ihr Anliegen — ich melde mich für ein unverbindliches Vorgespräch.
          </p>
        </div>

        <Link
          href="/anfrage"
          className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-primary-950 transition-colors hover:bg-primary-50"
        >
          {ctaText}
          <PfeilIcon />
        </Link>
      </div>
    </section>
  );
}
