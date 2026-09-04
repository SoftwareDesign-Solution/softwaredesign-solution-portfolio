/**
 * @file breadcrumbs.tsx
 * @description Breadcrumb-Navigation für die Workshop-Detailseite.
 * @module app/workshops/[slug]/_components/breadcrumbs
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";

/** Ein Eintrag im Breadcrumb-Pfad. Ein leerer `href` macht den Eintrag zum aktuellen (nicht verlinkten) Seitentitel. */
interface BreadcrumbItem {
  label: string;
  href: string;
}

/** Props für {@link Breadcrumbs}. */
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb-Navigation; der letzte Eintrag wird immer unverlinkt als aktuelle Seite dargestellt.
 *
 * @param props - Siehe {@link BreadcrumbsProps}
 * @returns Die Breadcrumb-Navigation
 */
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