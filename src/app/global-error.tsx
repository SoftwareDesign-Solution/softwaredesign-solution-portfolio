"use client";

import Link from "next/link";

import "./globals.css";

//import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Fängt Fehler ab, die im Root-Layout selbst passieren (sehr selten, aber möglich —
 * z.B. wenn ein Provider im Layout crasht). Da das Root-Layout dann nicht mehr aktiv
 * ist, muss diese Komponente <html>/<body> selbst rendern und darf sich NICHT auf
 * Provider aus dem Layout verlassen (kein ActionStatusProvider/ModalProvider etc.).
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {

  /*
  useEffect(() => {
    console.error(error);
  }, [error]);
  */

  return (
    <html lang="de">
      <body>
        <div className="px-12 pt-30 pb-35 text-center">
          <div className="mx-auto max-w-180">
            <div className="mb-6 font-mono text-xs uppercase tracking-[1.5px] text-primary-700">
              {"//"} Kritischer Fehler
            </div>

            <div className="mb-2 text-[200px] font-extrabold leading-[0.9] tracking-[-8px] text-foreground">
              5<span className="text-primary-700">0</span>0
            </div>

            <h1 className="mt-6 mb-4 text-[40px] font-bold leading-[1.1] tracking-[-1.2px] text-foreground">
              Da ist grundlegend etwas schiefgelaufen<span className="text-primary-700">.</span>
            </h1>

            <p className="mx-auto mb-9 max-w-120 text-[17px] leading-[1.55] text-muted">
              Die Anwendung konnte nicht geladen werden. Bitte laden Sie die Seite neu — sollte das
              Problem bestehen bleiben, versuchen Sie es in ein paar Minuten erneut.
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

            {error.digest && (
              <p className="mt-10 text-[12px] text-muted">
                Fehler-ID: <code className="font-mono">{error.digest}</code>
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}