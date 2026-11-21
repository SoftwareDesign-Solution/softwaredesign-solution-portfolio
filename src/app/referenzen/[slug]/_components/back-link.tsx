/**
 * @file back-link.tsx
 * @description Rücksprung-Link "← Alle Referenzen" über der Detailseite.
 * @module app/referenzen/[id]/_components/back-link
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";

/**
 * Link zurück zur Referenzen-Übersicht.
 *
 * @returns Der Rücksprung-Link
 */
export default function BackLink() {
  return (
    <Link
      href="/referenzen"
      className="mb-8 inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-foreground"
    >
      <span aria-hidden="true">←</span>
      Alle Referenzen
    </Link>
  );
}
