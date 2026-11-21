/**
 * @file layout.tsx
 * @description Layout für /referenzen/[id]: rendert neben der Seite den
 * Parallel-Route-Slot `@galerie`, in dem das Bild-Modal erscheint.
 * @module app/referenzen/[id]/layout
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Props für {@link ReferenzDetailLayout}. */
interface ReferenzDetailLayoutProps {
  children: React.ReactNode;
  /** Slot `@galerie`: leer, außer bei einer abgefangenen Bild-Route. */
  galerie: React.ReactNode;
}

/**
 * Layout der Referenz-Detailseite mit Modal-Slot.
 *
 * @param props - Siehe {@link ReferenzDetailLayoutProps}
 * @returns Seite und Modal-Slot
 */
export default function ReferenzDetailLayout({ children, galerie }: ReferenzDetailLayoutProps) {
  return (
    <>
      {children}
      {galerie}
    </>
  );
}
