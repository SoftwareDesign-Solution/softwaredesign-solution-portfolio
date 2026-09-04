/**
 * @file stat-item.tsx
 * @description Kleine Label/Wert-Kennzahl im Workshop-Header (z.B. Dauer, Format, Sprache).
 * @module app/workshops/[slug]/_components/stat-item
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Props für {@link StatItem}. */
interface StatItemProps {
  label?: string;
  value?: string;
}

/**
 * Kleine Label/Wert-Kennzahl (z.B. "Dauer: 3 Tage") im Workshop-Header.
 *
 * @param props - Siehe {@link StatItemProps}
 * @returns Die Kennzahl
 */
export default function StatItem({ label, value }: StatItemProps) {
  return (
    <div>
      <div className="text-xs text-muted uppercase tracking-[1px] font-medium mb-0.5">
        {label}
      </div>
      <div className="text-base font-bold text-foreground">{value}</div>
    </div>
  );
}