// src/app/design-system/page.tsx

interface Swatch {
  name: string;
  varName: string;
  hex: string;
  className: string;
  /** Für dunkle Swatches heller Text, sonst dunkler */
  light?: boolean;
}

const PRIMARY_SWATCHES: Swatch[] = [
  { name: "50", varName: "--color-primary-50", hex: "#eff4f9", className: "bg-primary-50" },
  { name: "100", varName: "--color-primary-100", hex: "#dce8f2", className: "bg-primary-100" },
  { name: "200", varName: "--color-primary-200", hex: "#b9d1e4", className: "bg-primary-200" },
  { name: "300", varName: "--color-primary-300", hex: "#96bad7", className: "bg-primary-300" },
  { name: "400", varName: "--color-primary-400", hex: "#6ea0c7", className: "bg-primary-400" },
  { name: "500", varName: "--color-primary-500", hex: "#4484b7", className: "bg-primary-500", light: true },
  { name: "600", varName: "--color-primary-600", hex: "#2871ac", className: "bg-primary-600", light: true },
  { name: "700", varName: "--color-primary-700", hex: "#1565a5", className: "bg-primary-700", light: true },
  { name: "800", varName: "--color-primary-800", hex: "#11528a", className: "bg-primary-800", light: true },
  { name: "900", varName: "--color-primary-900", hex: "#0d406e", className: "bg-primary-900", light: true },
  { name: "950", varName: "--color-primary-950", hex: "#093055", className: "bg-primary-950", light: true },
];

const NEUTRAL_SWATCHES: Swatch[] = [
  { name: "surface", varName: "--color-surface", hex: "#f2f2f2", className: "bg-surface" },
  { name: "foreground", varName: "--color-foreground", hex: "#2b2b2b", className: "bg-foreground", light: true },
  { name: "muted", varName: "--color-muted", hex: "#7a7a7a", className: "bg-muted", light: true },
  { name: "border", varName: "--color-border", hex: "#e5e5e5", className: "bg-border" },
  { name: "border-strong", varName: "--color-border-strong", hex: "#d0d0d0", className: "bg-border-strong" },
];

const ERROR_SWATCHES: Swatch[] = [
  { name: "50", varName: "--color-error-50", hex: "#fdecec", className: "bg-error-50" },
  { name: "500", varName: "--color-error-500", hex: "#e0473f", className: "bg-error-500", light: true },
  { name: "600", varName: "--color-error-600", hex: "#c8362e", className: "bg-error-600", light: true },
  { name: "700", varName: "--color-error-700", hex: "#a92920", className: "bg-error-700", light: true },
];

const SUCCESS_SWATCHES: Swatch[] = [
  { name: "50", varName: "--color-success-50", hex: "#e9f6ee", className: "bg-success-50" },
  { name: "500", varName: "--color-success-500", hex: "#2f9e5b", className: "bg-success-500", light: true },
  { name: "600", varName: "--color-success-600", hex: "#24824a", className: "bg-success-600", light: true },
  { name: "700", varName: "--color-success-700", hex: "#1b653a", className: "bg-success-700", light: true },
];

const WARNING_SWATCHES: Swatch[] = [
  { name: "50", varName: "--color-warning-50", hex: "#faf1e0", className: "bg-warning-50" },
  { name: "500", varName: "--color-warning-500", hex: "#c68a2e", className: "bg-warning-500", light: true },
  { name: "600", varName: "--color-warning-600", hex: "#9c6c1f", className: "bg-warning-600", light: true },
  { name: "700", varName: "--color-warning-700", hex: "#7d5619", className: "bg-warning-700", light: true },
];

function SwatchGrid({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div className="mb-10">
      <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[1.5px] text-muted">{title}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {swatches.map((s) => (
          <div key={s.varName} className="overflow-hidden rounded-lg border border-border">
            <div className={`flex h-20 items-end p-3 ${s.className} ${s.light ? "text-white" : "text-foreground"}`}>
              <span className="text-[13px] font-semibold">{s.name}</span>
            </div>
            <div className="bg-white px-3 py-2">
              <div className="font-mono text-[11px] text-foreground">{s.hex}</div>
              <div className="truncate font-mono text-[10.5px] text-muted">{s.varName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ERROR_BRIGHT_SWATCHES: Swatch[] = [
  { name: "50", varName: "error-bright-50", hex: "#fef2f2", className: "" },
  { name: "500", varName: "error-bright-500", hex: "#ef4444", className: "", light: true },
  { name: "600", varName: "error-bright-600", hex: "#dc2626", className: "", light: true },
  { name: "700", varName: "error-bright-700", hex: "#b91c1c", className: "", light: true },
];

const SUCCESS_BRIGHT_SWATCHES: Swatch[] = [
  { name: "50", varName: "success-bright-50", hex: "#ecfdf5", className: "" },
  { name: "500", varName: "success-bright-500", hex: "#22c55e", className: "", light: true },
  { name: "600", varName: "success-bright-600", hex: "#16a34a", className: "", light: true },
  { name: "700", varName: "success-bright-700", hex: "#15803d", className: "", light: true },
];

function InlineSwatchGrid({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div>
      <h4 className="mb-3 text-[12px] font-semibold uppercase tracking-[1.5px] text-muted">{title}</h4>
      <div className="grid grid-cols-4 gap-3">
        {swatches.map((s) => (
          <div key={s.varName} className="overflow-hidden rounded-lg border border-border">
            <div
              className={`flex h-16 items-end p-3 ${s.light ? "text-white" : "text-foreground"}`}
              style={{ backgroundColor: s.hex }}
            >
              <span className="text-[13px] font-semibold">{s.name}</span>
            </div>
            <div className="bg-white px-3 py-2">
              <div className="font-mono text-[11px] text-foreground">{s.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3.5 border-b border-border pb-4">
      <div className="min-w-7 font-mono text-[13px] text-muted">{num}</div>
      <h2 className="text-[24px] font-bold tracking-tight text-foreground">{title}</h2>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <article className="min-h-screen bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-16">
          <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
            <span className="h-2 w-2 rounded-full bg-primary-700" />
            Design System
          </div>
          <h1 className="mb-3 text-[40px] font-bold leading-[1.1] tracking-[-1px] text-foreground">
            Farbpalette &amp; Verwendung
          </h1>
          <p className="max-w-160 text-[15px] leading-[1.6] text-muted">
            Übersicht aller Theme-Farben mit ihrer vorgesehenen Verwendung — Typografie, Buttons,
            Cards, Formulare, Status-Meldungen.
          </p>
        </div>

        {/* 01 — Farbwerte */}
        <section className="mb-16">
          <SectionHeading num="01" title="Farbwerte" />
          <SwatchGrid title="Primary" swatches={PRIMARY_SWATCHES} />
          <SwatchGrid title="Neutrale Farben" swatches={NEUTRAL_SWATCHES} />
          <SwatchGrid title="Error" swatches={ERROR_SWATCHES} />
          <SwatchGrid title="Success" swatches={SUCCESS_SWATCHES} />
          <SwatchGrid title="Warning" swatches={WARNING_SWATCHES} />
        </section>

        {/* 02 — Typografie */}
        <section className="mb-16">
          <SectionHeading num="02" title="Typografie" />
          <div className="mb-6 rounded-xl border border-border bg-white p-8">
            <h1 className="mb-2 text-[36px] font-bold leading-[1.1] tracking-[-1px] text-foreground">
              Heading 1 · text-foreground
            </h1>
            <h2 className="mb-2 text-[26px] font-bold leading-[1.15] tracking-[-0.5px] text-foreground">
              Heading 2 · text-foreground
            </h2>
            <h3 className="mb-4 text-[18px] font-bold text-foreground">Heading 3 · text-foreground</h3>
            <p className="mb-2 max-w-140 text-[15px] leading-[1.6] text-foreground">
              Fließtext in <span className="font-semibold">text-foreground</span> — für Haupt-Content,
              Formular-Labels-Werte und alles, was gut lesbar sein muss.
            </p>
            <p className="mb-4 max-w-140 text-[13.5px] leading-[1.6] text-muted">
              Sekundärtext in <span className="font-semibold">text-muted</span> — für Hinweise,
              Meta-Infos, Platzhalter, Beschreibungen unter Überschriften.
            </p>
            <a href="#" className="text-[14px] font-medium text-primary-700 underline underline-offset-2 hover:text-primary-800">
              Link-Text · text-primary-700
            </a>
          </div>

          {/* Info-Textblock mit Akzent-Rand */}
          <div className="rounded-xl border border-border bg-white p-8">
            <h4 className="mb-3 text-[12px] font-semibold uppercase tracking-[1.5px] text-muted">
              Info-Textblock · bg-surface / border-l-primary-700
            </h4>
            <div className="max-w-90 rounded-md border-l-[3px] border-primary-700 bg-surface px-6 py-5 text-[15px] leading-[1.7] text-foreground">
              Muster GmbH
              <br />
              Musterstraße 1
              <br />
              12345 Musterstadt
              <br />
              Deutschland
            </div>
          </div>
        </section>

        {/* 03 — Buttons */}
        <section className="mb-16">
          <SectionHeading num="03" title="Buttons" />
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-white p-8">
            <button className="rounded-md bg-primary-700 px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-primary-800">
              Primär · bg-primary-700
            </button>
            <button className="rounded-md border border-primary-700 bg-white px-6 py-3 text-[14px] font-semibold text-primary-700 transition hover:bg-primary-50">
              Primär Outline · border/text-primary-700
            </button>
            <button className="rounded-md border border-border bg-white px-6 py-3 text-[14px] font-medium text-foreground transition hover:bg-surface">
              Sekundär · border-border
            </button>
            <button className="rounded-md border-2 border-dotted border-border-strong px-6 py-3 text-[14px] font-medium text-muted transition hover:border-primary-700 hover:text-primary-700">
              + Hinzufügen · border-dotted
            </button>
            <button className="cursor-not-allowed rounded-md bg-primary-700/50 px-6 py-3 text-[14px] font-semibold text-white">
              Deaktiviert · primary-700/50
            </button>
            <button className="rounded-md bg-error-600 px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-error-700">
              Destruktiv · bg-error-600
            </button>
            <button className="rounded-md bg-success-600 px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-success-700">
              Erfolg · bg-success-600
            </button>
            <a
              href="#"
              className="inline-block rounded-md border border-border bg-surface px-3.5 py-2 text-[13px] text-foreground no-underline transition hover:bg-border/40"
            >
              Link-Button · bg-surface
            </a>
            <button className="rounded-md bg-foreground px-4.5 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-foreground/90">
              Dunkel · bg-foreground
            </button>
            <button
              disabled
              className="cursor-not-allowed rounded-md bg-foreground px-4.5 py-2.5 text-[13.5px] font-semibold text-white opacity-50"
            >
              Dunkel deaktiviert · opacity-50
            </button>
          </div>

          {/* Hover-Zustand statisch nebeneinander, da :hover sich nicht ohne Maus zeigt */}
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-white p-8">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">Normal</span>
              <button className="rounded-md bg-primary-700 px-6 py-3 text-[14px] font-semibold text-white">
                bg-primary-700
              </button>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">
                Hover (statisch, tatsächlich via hover:bg-primary-800)
              </span>
              <button className="rounded-md bg-primary-800 px-6 py-3 text-[14px] font-semibold text-white">
                bg-primary-800
              </button>
            </div>
          </div>
        </section>

        {/* 04 — Status & Badges */}
        <section className="mb-16">
          <SectionHeading num="04" title="Status &amp; Badges" />
          <div className="grid gap-4 rounded-xl border border-border bg-white p-8 sm:grid-cols-2">
            <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-success-600">
              <span className="h-1.75 w-1.75 rounded-full bg-success-500" />
              Verfügbar · success-500 / success-600
            </div>
            <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-muted">
              <span className="h-1.75 w-1.75 rounded-full bg-muted" />
              Ausgebucht · muted
            </div>
            <span className="inline-flex w-fit items-center rounded-full bg-primary-100 px-3 py-1 text-[12px] font-semibold text-primary-800">
              Badge · primary-100 / primary-800
            </span>
            <span className="inline-flex w-fit items-center rounded-full bg-error-50 px-3 py-1 text-[12px] font-semibold text-error-600">
              Badge · error-50 / error-600
            </span>

            {/* Ecken-Tag */}
            <div>
              <div className="relative inline-block rounded-lg border border-border px-8 py-6">
                <div className="absolute -top-2.5 right-4 rounded-md bg-primary-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1px] text-white">
                  KI
                </div>
                <span className="text-[13px] text-muted">Ecken-Tag · bg-primary-700</span>
              </div>
            </div>

            {/* Meta-Pill */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1 text-[11px] text-muted">
                1 Tag
              </span>
              <span className="ml-2 text-[12px] text-muted">Meta-Pill · bg-surface</span>
            </div>
          </div>

          {/* Termin-Zeile (alle Zustände) */}
          <div className="mt-4 rounded-xl border border-border bg-white p-8">
            <h4 className="mb-3 text-[12px] font-semibold uppercase tracking-[1.5px] text-muted">
              Termin-Zeile · Zustände
            </h4>
            <div className="flex max-w-105 flex-col gap-2">
              <div className="flex items-center justify-between rounded-md bg-success-50 px-3 py-2">
                <span className="font-mono text-[11.5px] text-foreground">bg-success-50</span>
                <span className="text-[11px] font-semibold text-success-600">Verfügbar</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-warning-50 px-3 py-2">
                <span className="font-mono text-[11.5px] text-foreground">bg-warning-50</span>
                <span className="text-[11px] font-semibold text-warning-600">Restplätze</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-surface px-3 py-2 opacity-60">
                <span className="font-mono text-[11.5px] text-foreground">bg-surface · opacity-60</span>
                <span className="text-[11px] font-semibold text-muted">Ausgebucht</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-surface px-3 py-2.5">
                <span className="font-mono text-[11.5px] text-foreground">bg-surface</span>
                <span className="text-[11px] font-medium text-muted">in Planung</span>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Meldungen */}
        <section className="mb-16">
          <SectionHeading num="05" title="Meldungen" />
          <div className="flex flex-col gap-4">
            <div className="rounded-md border border-success-500/30 bg-success-50 px-5 py-4 text-[13.5px] text-success-600">
              <strong className="font-semibold">Erfolg:</strong> Ihre Buchung ist eingegangen. ·
              bg-success-50 / text-success-600
            </div>
            <div className="rounded-md border border-error-500/30 bg-error-50 px-5 py-4 text-[13.5px] text-error-600">
              <strong className="font-semibold">Fehler:</strong> Der Gutscheincode ist ungültig. ·
              bg-error-50 / text-error-600
            </div>
          </div>
        </section>

        {/* 06 — Formularfelder */}
        <section className="mb-16">
          <SectionHeading num="06" title="Formularfelder" />
          <div className="mb-4 grid gap-6 rounded-xl border border-border bg-white p-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-foreground">Standard</label>
              <input
                placeholder="border-border"
                className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
              />
              <p className="mt-1.5 text-[12px] text-muted">Klick rein zum Testen</p>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-foreground">
                Fokus (statisch)
              </label>
              {/* Fokus-Zustand hier fest über Klassen gesetzt (nicht :focus), damit er ohne Klick sichtbar ist */}
              <input
                placeholder="border-primary-700"
                readOnly
                className="w-full rounded-md border border-primary-700 bg-white px-3 py-2.5 text-[14px] text-foreground outline-none ring-2 ring-primary-100"
              />
              <p className="mt-1.5 text-[12px] text-muted">
                So sieht &quot;Standard&quot; beim Reinklicken aus · border-primary-700 + ring-primary-100
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-foreground">Fehler</label>
              <input
                placeholder="border-error-500"
                className="w-full rounded-md border border-error-500 bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:ring-2 focus:ring-error-50"
              />
              <p className="mt-1.5 text-[12px] text-error-600">Pflichtfeld · text-error-600</p>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-foreground">Erfolg</label>
              <input
                placeholder="border-success-500"
                className="w-full rounded-md border border-success-500 bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:ring-2 focus:ring-success-50"
              />
              <p className="mt-1.5 text-[12px] text-success-600">Verfügbar · text-success-600</p>
            </div>
          </div>

          {/* Termin-Auswahl (ausgewählter Zustand) */}
          <div className="rounded-xl border border-border bg-white p-8">
            <h4 className="mb-3 text-[12px] font-semibold uppercase tracking-[1.5px] text-muted">
              Termin-Auswahl (ausgewählt) · border-primary-700 / bg-primary-50
            </h4>
            <label className="grid max-w-105 cursor-pointer grid-cols-[24px_1fr_auto] items-center gap-3.5 rounded-lg border-[1.5px] border-primary-700 bg-primary-50 px-4 py-3.5">
              <span className="relative h-4.5 w-4.5 rounded-full border-2 border-primary-700 bg-white">
                <span className="absolute inset-0.75 rounded-full bg-primary-700" />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-foreground">01. Sept. 2026</div>
                <div className="text-[12.5px] text-muted">Remote · Zoom</div>
              </div>
              <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-success-600">
                <span className="h-1.75 w-1.75 rounded-full bg-success-500" />
                Verfügbar
              </div>
              <input type="radio" name="ds-example-date" className="sr-only" readOnly checked />
            </label>
          </div>
        </section>

        {/* 07 — Cards */}
        <section className="mb-16">
          <SectionHeading num="07" title="Cards" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <div className="bg-surface px-6 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
                  Workshop
                </div>
              </div>
              <div className="px-6 py-5">
                <h3 className="mb-1.5 text-[18px] font-bold text-foreground">Softwarearchitektur</h3>
                <p className="mb-4 text-[13.5px] leading-[1.55] text-muted">
                  21. – 23. Sept. 2026 · Remote · Zoom
                </p>
                <button className="rounded-md bg-primary-700 px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-primary-800">
                  Jetzt buchen
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <div className="px-6 py-5">
                <div className="mb-3 flex items-center gap-1.5 text-[12.5px] font-medium text-success-600">
                  <span className="h-1.75 w-1.75 rounded-full bg-success-500" />
                  Verfügbar
                </div>
                <h3 className="mb-1.5 text-[18px] font-bold text-foreground">Anforderungen mit KI</h3>
                <p className="mb-4 text-[13.5px] leading-[1.55] text-muted">
                  01. Sept. 2026 · 1 Tag · 999&nbsp;€ / Person
                </p>
                <button className="w-full rounded-md border border-border bg-white px-5 py-2.5 text-[13.5px] font-medium text-foreground transition hover:bg-surface">
                  Details ansehen
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 08 — Vergleich: aktuell (gedeckt) vs. heller/gesättigter */}
        <section>
          <SectionHeading num="08" title="Vergleich: aktuell vs. heller" />
          <p className="mb-6 max-w-160 text-[13.5px] leading-[1.6] text-muted">
            Aktuell sind Error/Success bewusst entsättigt, an das gedeckte Primary-Blau angeglichen.
            Zum Vergleich hier die hellere/gesättigtere Alternative (angelehnt an Tailwinds
            Standard-Rot/-Grün) — noch nicht Teil des @theme, nur zur Gegenüberstellung.
          </p>

          <div className="mb-8 grid gap-8 rounded-xl border border-border bg-white p-8 sm:grid-cols-2">
            <InlineSwatchGrid title="Error · aktuell" swatches={ERROR_SWATCHES} />
            <InlineSwatchGrid title="Error · heller" swatches={ERROR_BRIGHT_SWATCHES} />
            <InlineSwatchGrid title="Success · aktuell" swatches={SUCCESS_SWATCHES} />
            <InlineSwatchGrid title="Success · heller" swatches={SUCCESS_BRIGHT_SWATCHES} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-6">
              <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-[1.5px] text-muted">
                Im Einsatz · aktuell
              </h4>
              <div className="mb-3 rounded-md border border-error-500/30 bg-error-50 px-5 py-4 text-[13.5px] text-error-600">
                <strong className="font-semibold">Fehler:</strong> Der Gutscheincode ist ungültig.
              </div>
              <div className="mb-3 rounded-md border border-success-500/30 bg-success-50 px-5 py-4 text-[13.5px] text-success-600">
                <strong className="font-semibold">Erfolg:</strong> Ihre Buchung ist eingegangen.
              </div>
              <div className="flex gap-3">
                <button className="rounded-md bg-error-600 px-5 py-2.5 text-[13.5px] font-semibold text-white">
                  Löschen
                </button>
                <button className="rounded-md bg-success-600 px-5 py-2.5 text-[13.5px] font-semibold text-white">
                  Bestätigen
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-white p-6">
              <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-[1.5px] text-muted">
                Im Einsatz · heller
              </h4>
              <div
                className="mb-3 rounded-md border px-5 py-4 text-[13.5px]"
                style={{ backgroundColor: "#fef2f2", borderColor: "#ef444440", color: "#dc2626" }}
              >
                <strong className="font-semibold">Fehler:</strong> Der Gutscheincode ist ungültig.
              </div>
              <div
                className="mb-3 rounded-md border px-5 py-4 text-[13.5px]"
                style={{ backgroundColor: "#ecfdf5", borderColor: "#22c55e40", color: "#16a34a" }}
              >
                <strong className="font-semibold">Erfolg:</strong> Ihre Buchung ist eingegangen.
              </div>
              <div className="flex gap-3">
                <button
                  className="rounded-md px-5 py-2.5 text-[13.5px] font-semibold text-white"
                  style={{ backgroundColor: "#dc2626" }}
                >
                  Löschen
                </button>
                <button
                  className="rounded-md px-5 py-2.5 text-[13.5px] font-semibold text-white"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  Bestätigen
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}