import Link from "next/link";

export default function WorkshopNotFound() {
  return (
    <div className="px-12 pt-25 pb-30 text-center">
      <div className="mx-auto max-w-180">
        <div className="mb-6 font-mono text-xs uppercase tracking-[1.5px] text-primary-700">
          {"//"} Thema im Workshop-Angebot nicht gefunden
        </div>

        <h1 className="mb-4 text-[40px] font-bold leading-[1.1] tracking-[-1.2px] text-foreground">
          Diesen Workshop gibt es (noch) nicht<span className="text-primary-700">.</span>
        </h1>

        <p className="mx-auto mb-9 max-w-120 text-[17px] leading-[1.55] text-muted">
          Gerne nehme ich das Thema in mein Portfolio auf — verwenden Sie hierzu einfach das
          Anfrage-Formular und schreiben Sie mir, welchen Workshop Sie sich wünschen.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/anfrage"
            className="rounded-full bg-primary-700 px-7 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-white shadow-[0_6px_18px_rgba(21,101,165,0.35)] transition hover:bg-primary-800"
          >
            Workshop-Thema vorschlagen
          </Link>
          <Link
            href="/#workshops"
            className="rounded-full border-[1.5px] border-border px-7 py-3.5 text-[15px] font-semibold text-foreground transition hover:bg-surface"
          >
            Alle Workshops ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}