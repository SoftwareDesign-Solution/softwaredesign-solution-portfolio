"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-12 pt-30 pb-35 text-center">
      <div className="mx-auto max-w-180">
        <div className="mb-6 font-mono text-xs uppercase tracking-[1.5px] text-primary-700">
          {"//"} Error 500
        </div>

        <div className="mb-2 text-[200px] font-extrabold leading-[0.9] tracking-[-8px] text-foreground">
          500
        </div>

        <h1 className="mt-6 mb-4 text-[40px] font-bold leading-[1.1] tracking-[-1.2px] text-foreground">
          Da ist etwas schiefgelaufen<span className="text-primary-700">.</span>
        </h1>

        <p className="mx-auto mb-9 max-w-120 text-[17px] leading-[1.55] text-muted">
          Auf meiner Seite ist ein unerwarteter Fehler aufgetreten. Das liegt nicht an Ihnen — bitte
          versuchen Sie es gleich noch einmal.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-primary-700 px-7 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-white shadow-[0_6px_18px_rgba(21,101,165,0.35)] transition hover:bg-primary-800"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="rounded-full border-[1.5px] border-border px-7 py-3.5 text-[15px] font-semibold text-foreground transition hover:bg-surface"
          >
            Zur Startseite
          </Link>
        </div>

        <div className="mx-auto mt-20 max-w-130 rounded border-l-[3px] border-primary-700 bg-surface px-8 py-7 text-left">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[1.5px] text-muted">
            {"//"} Weiterhin Probleme?
          </div>
          <p className="text-[14px] leading-[1.6] text-foreground">
            Tritt der Fehler wiederholt auf, melden Sie sich gerne über die{" "}
            <Link href="/anfrage" className="text-primary-700 no-underline border-b border-primary-700">
              Anfrage-Seite
            </Link>
            {error.digest && (
              <>
                {" "}
                — die Fehler-ID{" "}
                <code className="font-mono text-[12px] text-muted">{error.digest}</code> hilft mir bei
                der Suche.
              </>
            )}
            .
          </p>
        </div>
      </div>
    </div>
  );
}