/**
 * @file leistung-hero.tsx
 * @description Kopfbereich der Leistungsseite: Breadcrumb, Kicker, H1, Einleitung,
 * Schaltflächen und Faktenblock.
 * @module app/leistungen/[slug]/_components/leistung-hero
 * @author Manuel Kübler
 */

import Link from "next/link";

import type { Leistung } from "@/types/leistung";

import Kicker from "./kicker";
import PfeilIcon from "./pfeil-icon";

/** Props für {@link LeistungHero}. */
interface LeistungHeroProps {
  leistung: Leistung;
}

/**
 * Kopfbereich mit H1 (Haupt-Keyword) und Eckdaten.
 *
 * @param props - Siehe {@link LeistungHeroProps}
 * @returns Der Kopfbereich
 */
export default function LeistungHero({ leistung }: LeistungHeroProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-7 text-xs text-muted">
        <Link href="/" className="transition hover:text-primary-700">Start</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/#leistungen" className="transition hover:text-primary-700">Leistungen</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page" className="font-medium text-foreground">{leistung.titel}</span>
      </nav>

      <header className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="max-w-160">
          <Kicker>{leistung.kicker}</Kicker>

          <h1 className="mb-4 text-[40px] font-bold leading-11 tracking-[-1px] text-foreground">
            {leistung.ueberschrift}
          </h1>

          <p className="mb-7 text-lg leading-[1.55] text-muted">{leistung.einleitung}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/anfrage"
              className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
            >
              {leistung.ctaText}
              <PfeilIcon />
            </Link>
            <Link
              href="/referenzen"
              className="inline-flex items-center rounded-sm bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-border"
            >
              Referenzen ansehen
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5.5 rounded-xl border border-border bg-white p-6 shadow-sm lg:grid-cols-1">
          {leistung.fakten.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted">{label}</dt>
              <dd className="mt-1.5 text-[15px] font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </header>
    </>
  );
}
