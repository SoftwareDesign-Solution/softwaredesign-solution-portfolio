/**
 * @file section-heading.tsx
 * @description Nummerierte Abschnittsüberschrift innerhalb eines mehrstufigen Formulars.
 * @module components/forms/shared/section-heading
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Props für {@link SectionHeading}. */
interface SectionHeadingProps {
  num: string;
  title: string;
  subtitle?: string;
}

/**
 * Nummerierte Abschnittsüberschrift innerhalb eines mehrstufigen Formulars.
 *
 * @param props - Siehe {@link SectionHeadingProps}
 * @returns Die Abschnittsüberschrift
 */
export default function SectionHeading({ num, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-3.5 gap-y-1">
      <div className="flex items-baseline gap-3.5">
        <div className="min-w-6 font-mono text-xs text-muted">{num}</div>
        <h3 className="text-[18px] font-bold tracking-tight text-foreground">{title}</h3>
      </div>
      {subtitle && (
        <div className="basis-full text-[13px] text-muted md:basis-auto">
          · {subtitle}
        </div>
      )}
    </div>
  );
}