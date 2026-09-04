/**
 * @file termin-row.tsx
 * @description Eine Zeile für einen Workshop-Termin (Datum + Statusanzeige),
 * verwendet in Workshop-Karte und -Sidebar.
 * @module components/termin-row
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { Termin } from "@/types/termin";

import { formatDateRange } from "@/utils/format-date-range";
import { formatTerminStatus } from "@/utils/format-termin-status";

/** Props für {@link TerminRow}. */
interface TerminRowProps {
  termin: Termin;
}

/**
 * Zeigt einen Termin als kompakte Zeile mit Datum und farbig markiertem Verfügbarkeitsstatus.
 *
 * @param props - Siehe {@link TerminRowProps}
 * @returns Die Termin-Zeile
 */
export default function TerminRow({ termin }: TerminRowProps) {
  const { label, dotColor, textColor, statusTextColor, bgColor, dimmed } = formatTerminStatus(termin.status);
 
  return (
    <div
      className={`flex justify-between items-center text-xs py-2.5 px-3 rounded-md ${bgColor} ${
        dimmed ? "opacity-60" : ""
      }`}
    >
      <span className={`text-xs font-normal ${textColor}`}>{formatDateRange(termin.datumVon, termin.datumBis)}</span>
      <span className={`flex items-center gap-1.5 text-xs font-medium ${statusTextColor}`}>
        <span className={`w-1.5 h-1.5 rounded-[999px] ${dotColor}`}></span>
        {label}
      </span>
    </div>
  );
}