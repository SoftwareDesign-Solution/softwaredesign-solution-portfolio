interface StatItemProps {
  label?: string;
  value?: string;
}

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