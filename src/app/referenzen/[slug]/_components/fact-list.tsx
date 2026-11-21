/**
 * @file fact-list.tsx
 * @description Faktenzeile der Detailseite (Kunde, Branche, Zeitraum, Rolle) als
 * rahmenlose Label/Wert-Reihe.
 * @module app/referenzen/[id]/_components/fact-list
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Ein einzelner Fakt: Label und Wert. */
export interface Fakt {
  label: string;
  value: string;
}

/** Props für {@link FactList}. */
interface FactListProps {
  fakten: Fakt[];
}

/**
 * Faktenzeile als Definitionsliste (`<dl>`): auf dem Handy zweispaltig, ab `sm`
 * in einer Reihe.
 *
 * @param props - Siehe {@link FactListProps}
 * @returns Die Faktenzeile
 */
export default function FactList({ fakten }: FactListProps) {
  return (
    <dl className="mb-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:auto-cols-fr sm:grid-flow-col">
      {fakten.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted">{label}</dt>
          <dd className="mt-1.5 text-[15px] font-semibold leading-normal text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
