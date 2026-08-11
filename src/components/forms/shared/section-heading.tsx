interface SectionHeadingProps {
  num: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ num, title, subtitle }: SectionHeadingProps) {

  /*
  <div style="display: flex; align-items: baseline; gap: 14px; margin-bottom: 16px;">
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #7a7a7a; min-width: 24px;">01</div>
    <h3 style="font-size: 18px; font-weight: 700; margin: 0; color: #2b2b2b; letter-spacing: -0.2px;">Termin</h3>
  </div>
   */
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