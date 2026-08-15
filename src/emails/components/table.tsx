import { Section, Text } from "react-email";
import * as React from "react";

type TableVariant = "framed" | "numbered" | "list";

interface TableRowProps {
  /** Kurzes Label in der linken Spalte, z. B. "workshop" (`variant="framed"`, Standard ohne `heading`). Wird sonst ignoriert. */
  label?: string;
  /** Fett hervorgehobener Titel vor dem Fließtext, z. B. "Bestätigung erforderlich." (`variant="numbered"`). Wird sonst ignoriert. */
  title?: string;
  /** Inhalt der Zeile – je nach `variant` der Wert, der Fließtext hinter dem Titel, oder der alleinige Zeileninhalt (`variant="list"`). */
  value: React.ReactNode;
  /** Wird ausschließlich von `<Table>` gesetzt – nicht manuell übergeben. */
  _index?: number;
  _isLast?: boolean;
  _variant?: TableVariant;
  height?: number | string;
}

function TableRow({ label, title, value, _index = 0, _isLast = false, _variant = "framed" }: TableRowProps) {
  if (_variant === "numbered") {
    return (
      <tr>
        {/* width zusätzlich zum className als natives HTML-Attribut: Outlook Desktop
            (Word-Rendering-Engine) respektiert CSS-width auf <td> nicht zuverlässig,
            das klassische width-Attribut aber schon. */}
        <td
          width={1}
          style={{ padding: "11px 12px 11px 0" }}
          className="w-[1%] whitespace-nowrap align-top font-mono text-xs font-semibold text-muted"
        >
          {String(_index + 1).padStart(2, "0")}
        </td>
        <td style={{ padding: "11px 0" }} className="align-top font-sans text-sm leading-[1.6] text-muted">
          {title ? <strong className="text-foreground">{title}</strong> : null} {value}
        </td>
      </tr>
    );
  }

  const borderClass = _isLast ? "" : "border-b border-border";

  if (_variant === "list") {
    // Zwei Zellen statt einer mit Margin-Abstand: Outlook Desktop ignoriert
    // margin auf inline-Elementen (<span>) – die Nummer würde ohne Abstand am
    // Namen kleben. Padding steht hier als style-Shorthand (nicht als
    // Tailwind-px/py-className): react-email/Tailwind übersetzt Utility-
    // Klassen in einzelne Longhand-Deklarationen (padding-top/-right/-bottom/
    // -left), die Outlook Desktop auf <td> unzuverlässig rendert – die
    // klassische Padding-Shorthand ("18px 16px") wird dagegen zuverlässig
    // übernommen.
    return (
      <tr>
        <td
          width={1}
          style={{ padding: "15px 0 15px 16px" }}
          className={`w-[1%] whitespace-nowrap bg-surface font-mono text-xs text-muted ${borderClass}`}
        >
          {String(_index + 1).padStart(2, "0")}
        </td>
        <td
          style={{ padding: "15px 16px 15px 8px" }}
          className={`bg-surface font-sans text-sm text-foreground ${borderClass}`}
        >
          {value}
        </td>
      </tr>
    );
  }

  // variant === "framed"
  return (
    <tr>
      <td
        width={130}
        style={{ padding: "18px 16px" }}
        className={`w-32.5 bg-surface align-top font-sans text-[11px] font-semibold uppercase tracking-[1px] text-muted ${borderClass}`}
      >
        {label}
      </td>
      <td
        style={{ padding: "18px 16px" }}
        className={`align-top font-sans text-sm font-semibold text-foreground ${borderClass}`}
      >
        {value}
      </td>
    </tr>
  );
}

interface TableProps {
  /**
   * Überschrift über der Tabelle. Bei `variant="numbered"` (Standard sobald
   * `heading` gesetzt ist) z. B. "Was du wissen solltest", bei
   * `variant="list"` z. B. `` `Teilnehmer (${participants.length})` ``.
   * Bei `variant="framed"` ungenutzt.
   */
  heading?: string;
  /**
   * - `"framed"` (Standard ohne `heading`) – gerahmte Key/Value-Box, zwei
   *   Spalten (`Table.Row label value`). Ehemals `DetailsTable`.
   * - `"numbered"` (Standard sobald `heading` gesetzt ist) – Überschrift +
   *   Trennstrich, zwei Spalten mit `01`/`02`-Nummerierung
   *   (`Table.Row title value`), kein Rahmen. Ehemals `InfoList`.
   * - `"list"` – gerahmte, `surface`-hinterlegte Box wie `"framed"`, aber
   *   eine Spalte pro Zeile mit `01`/`02`-Nummerierung vor dem Inhalt
   *   (`Table.Row value`). Ehemals `ParticipantList`.
   */
  variant?: TableVariant;
  /** Ausschließlich `<Table.Row>`-Elemente. `null`/`false` (bedingtes Rendern) sind erlaubt und werden ignoriert. */
  children: React.ReactNode;
}

function TableBase({ heading, variant = heading ? "numbered" : "framed", children }: TableProps) {
  const rows = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<TableRowProps>[];

  const table = (
    <table
      role="presentation"
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      border={0}
      className={variant === "numbered" ? "w-full" : "w-full border-separate rounded-lg border border-border"}
    >
      <tbody>
        {rows.map((row, index) =>
          React.cloneElement(row, {
            _index: index,
            _isLast: index === rows.length - 1,
            _variant: variant,
          }),
        )}
      </tbody>
    </table>
  );

  if (variant === "numbered") {
    return (
      <Section className="px-8 pt-6">
        <div className="border-t border-border pt-5">
          {heading ? (
            <Text className="m-0 pb-3 font-sans text-xs font-semibold uppercase tracking-[1.5px] text-muted">
              {heading}
            </Text>
          ) : null}
          {table}
        </div>
      </Section>
    );
  }

  if (variant === "list") {
    return (
      <Section className="px-8 py-2">
        {heading ? (
          <Text className="m-0 mb-2 font-sans text-[11px] font-semibold uppercase tracking-[1px] text-muted">
            {heading}
          </Text>
        ) : null}
        {table}
      </Section>
    );
  }

  // variant === "framed"
  return <Section className="px-8 pb-2 pt-4">{table}</Section>;
}

/**
 * Gerahmte Key/Value-Tabelle (ehemals `DetailsTable`), nummerierte
 * Hinweisliste (ehemals `InfoList`) und gerahmte Teilnehmerliste (ehemals
 * `ParticipantList`) sind zu einer Compound Component zusammengefasst – alle
 * drei waren strukturell dieselbe `Section > table > tbody > tr`-Tabelle und
 * unterschieden sich nur durch Rahmen-Box vs. Überschrift+Nummerierung sowie
 * ein oder zwei Spalten pro Zeile (siehe `variant`).
 *
 * Border zwischen Zeilen wird bewusst pro Zeile berechnet (nicht per
 * `:last-child`-Selector), da Outlook Desktop (Word-Rendering-Engine) keine
 * CSS-Pseudoklassen unterstützt.
 *
 * @example Gerahmte Key/Value-Tabelle (ehemals `DetailsTable`)
 * ```tsx
 * <Table>
 *   <Table.Row label="workshop" value={workshopTitle} />
 *   <Table.Row label="termin" value={terminDate} />
 *   {totalPrice ? <Table.Row label="gesamtpreis" value={totalPrice} /> : null}
 * </Table>
 * ```
 *
 * @example Nummerierte Hinweisliste (ehemals `InfoList`)
 * ```tsx
 * <Table heading="Was du wissen solltest">
 *   <Table.Row title="Bestätigung erforderlich." value="Ohne Klick …" />
 *   <Table.Row title="Gültigkeitsdauer." value={<>Der Link verfällt nach <strong>3 Tagen</strong>.</>} />
 * </Table>
 * ```
 *
 * @example Gerahmte Teilnehmerliste (ehemals `ParticipantList`, siehe auch `ParticipantList.tsx`)
 * ```tsx
 * <Table variant="list" heading={`Teilnehmer (${participants.length})`}>
 *   {participants.map((name, index) => (
 *     <Table.Row key={index} value={name} />
 *   ))}
 * </Table>
 * ```
 */
export const Table = Object.assign(TableBase, { Row: TableRow });