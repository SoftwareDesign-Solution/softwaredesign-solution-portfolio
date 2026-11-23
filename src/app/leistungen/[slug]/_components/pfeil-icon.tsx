/**
 * @file pfeil-icon.tsx
 * @description Pfeil-Icon (24er viewBox, Linie 1.8) für Schaltflächen und Links der Leistungsseite.
 * @module app/leistungen/[slug]/_components/pfeil-icon
 * @author Manuel Kübler
 */

/**
 * Dekoratives Pfeil-Icon in `currentColor`.
 *
 * @returns Das SVG
 */
export default function PfeilIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
