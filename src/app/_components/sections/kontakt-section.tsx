import Link from "next/link";

export default function KontaktSection() {
    return (
        <section id="kontakt" className="scroll-mt-18 px-6 py-16 md:px-12 md:py-28">
            <div className="rounded-lg bg-foreground px-5 py-9 text-center sm:px-8 sm:py-14 lg:p-20">
                <div className="mb-4.5 text-xs font-semibold uppercase tracking-[1.5px] text-primary-400">
                    Kontakt
                </div>

                <h2 className="mb-6 text-[42px] font-semibold leading-none tracking-[-1.5px] text-white sm:text-[56px] sm:tracking-[-2px] lg:text-[72px] lg:tracking-[-2.5px]">
                    Lassen Sie uns <span className="text-primary-400">sprechen</span>.
                </h2>

                <p className="mx-auto mb-10 max-w-115 text-lg leading-[1.55] text-white/70">
                    Ob Projektanfrage, Workshop oder Feedback — ich freue mich auf Ihre Nachricht.
                </p>

                <Link
                    href="/anfrage"
                    className="inline-flex items-center gap-2.5 rounded-md bg-primary-700 px-8 py-4 text-sm font-semibold text-white transition hover:bg-primary-800"
                >
                    Jetzt Kontakt aufnehmen
                    
                </Link>
            </div>
        </section>
    )
}