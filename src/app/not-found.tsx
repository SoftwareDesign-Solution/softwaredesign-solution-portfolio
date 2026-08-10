import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-12 pt-30 pb-35 text-center">
      <div className="mx-auto max-w-180">
        <div className="mb-6 font-mono text-xs uppercase tracking-[1.5px] text-primary-700">
          {"//"} Error 404
        </div>

        <div className="mb-2 text-[200px] font-extrabold leading-[0.9] tracking-[-8px] text-foreground">
          404
        </div>

        <h1 className="mt-6 mb-4 text-[40px] font-bold leading-[1.1] tracking-[-1.2px] text-foreground">
          Diese Seite existiert nicht<span className="text-primary-700">.</span>
        </h1>

        <p className="mx-auto mb-9 max-w-120 text-[17px] leading-[1.55] text-muted">
          Der Link ist defekt, die Seite wurde verschoben — oder es war einfach ein Tippfehler. Kein
          Problem.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-primary-700 px-7 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-white shadow-[0_6px_18px_rgba(21,101,165,0.35)] transition hover:bg-primary-800"
          >
            Zur Startseite
          </Link>
          <Link
            href="/anfrage"
            className="rounded-full border-[1.5px] border-border px-7 py-3.5 text-[15px] font-semibold text-foreground transition hover:bg-surface"
          >
            Defekten Link melden
          </Link>
        </div>

        <div className="mx-auto mt-20 max-w-130 rounded border-l-[3px] border-primary-700 bg-surface px-8 py-7 text-left">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[1.5px] text-muted">
            {"//"} Quick-Links
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <Link href="/#workshops" className="text-foreground no-underline">
              → Workshops
            </Link>
            <Link href="/#leistungen" className="text-foreground no-underline">
              → Leistungen
            </Link>
            <Link href="/#kontakt" className="text-foreground no-underline">
              → Kontakt
            </Link>
            <Link href="/anfrage" className="text-foreground no-underline">
              → Anfrage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}