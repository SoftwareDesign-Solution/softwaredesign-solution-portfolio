/**
 * @file page.tsx
 * @description Seite /referenzen: Übersicht der Kunden-Referenzen inkl. der bei
 * ihnen umgesetzten Projekte, gruppiert nach Kunde.
 * @module app/referenzen/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { Metadata } from "next";

import type { ReferenzKunde, ReferenzProjektEintrag } from "@/types/referenz";

import Badge from "@/components/ui/badge";
import { REFERENZEN } from "@/data/referenzen";

export const metadata: Metadata = {
  title: `Referenzen - ${process.env.APP_TITLE}`
};

/**
 * Eine einzelne Projektzeile innerhalb einer {@link KundenKarte}: Jahr (falls
 * vorhanden), Titel, Beschreibung und Tech-Stack.
 *
 * @param props.projekt - Das anzuzeigende Projekt
 * @param props.istErstes - Ob dies die erste Zeile der Karte ist (dann kein oberer Trennstrich)
 * @returns Die Projektzeile
 */
function ProjektZeile({
  projekt,
  istErstes,
}: {
  projekt: ReferenzProjektEintrag;
  istErstes: boolean;
}) {
  return (
    <div className={`flex gap-3.5 py-3.5 ${istErstes ? "" : "border-t border-border"}`}>
      {projekt.jahr && (
        <div className="mt-0.5 w-16 shrink-0 font-mono text-[11px] text-primary-700">{projekt.jahr}</div>
      )}
      <div>
        <div className="mb-1 text-[14.5px] font-semibold text-foreground">{projekt.titel}</div>
        <p className="text-[13px] leading-normal text-muted">{projekt.beschreibung}</p>
        {projekt.stack && projekt.stack.length > 0 && (
          <p className="mt-1.5 font-mono text-[11px] text-primary-700">{projekt.stack.join(" · ")}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Karte für einen einzelnen Kunden: Name, Ort, Branche-Badge sowie die Liste
 * aller bei ihm umgesetzten Projekte inklusive Zeitraum-Fußzeile.
 *
 * @param props.kunde - Der anzuzeigende Kunde inkl. seiner Projekte
 * @returns Die Kunden-Karte
 */
function KundenKarte({ kunde }: { kunde: ReferenzKunde }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="px-6 py-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[18px] font-bold tracking-tight text-foreground">{kunde.name}</h3>
            {kunde.ort && <p className="mt-0.5 text-[12.5px] text-muted">{kunde.ort}</p>}
          </div>
          {/*}
          <span className="shrink-0 rounded-md bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
            {kunde.branche}
          </span>
          */}
          <Badge className="shrink-0">{kunde.branche}</Badge>
        </div>

        <div>
          {kunde.projekte.map((projekt, i) => (
            <ProjektZeile key={projekt.id} projekt={projekt} istErstes={i === 0} />
          ))}
        </div>

        <div className="mt-3.5 border-t border-dashed border-border pt-3.5 text-[12px] text-muted">
          {kunde.projekte.length} {kunde.projekte.length === 1 ? "Projekt" : "Projekte"} · {kunde.zeitraum}
        </div>
      </div>
    </div>
  );
}

/**
 * Seite /referenzen: zeigt alle Kunden-Referenzen aus {@link REFERENZEN} als
 * Kartenliste, jeweils mit den bei diesem Kunden umgesetzten Projekten.
 *
 * @returns Die Referenzen-Seite
 */
export default function ReferenzenPage() {
  return (
    <article className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            Referenzen
          </div>
          <h1 className="mb-3 text-[40px] font-bold leading-[1.1] tracking-[-1px] text-foreground">
            Projekte, die tragen.
          </h1>
          <p className="max-w-160 text-[15px] leading-[1.6] text-muted">
            Eine Auswahl an Kunden, mit denen ich über mehrere Projekte hinweg zusammengearbeitet habe.
          </p>
        </div>

        <div className="grid gap-6">
          {REFERENZEN.map((kunde) => (
            <KundenKarte key={kunde.id} kunde={kunde} />
          ))}
        </div>
      </div>
    </article>
  );
}