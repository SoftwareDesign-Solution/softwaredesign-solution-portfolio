import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="text-xs mb-5">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index}>
            {item.href && !isLast ? (
              <Link href={item.href} className="text-muted transition hover:text-primary-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">{item.label}</span>
            )}
            {!isLast && <span className="mx-2 text-muted">/</span>}
          </span>
        );
      })}
    </div>
  );
}