/**
 * @file tech-stack.tsx
 * @description Technologie-Chips der Detailseite mit Überschrift "Technologien".
 * @module app/referenzen/[id]/_components/tech-stack
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Props für {@link TechStack}. */
interface TechStackProps {
  stack: string[];
}

/**
 * Zeigt den Tech-Stack als Chips unter der Überschrift "Technologien".
 *
 * @param props - Siehe {@link TechStackProps}
 * @returns Der Technologie-Bereich
 */
export default function TechStack({ stack }: TechStackProps) {
  return (
    <section aria-labelledby="technologien-titel" className="mb-10">
      <h2
        id="technologien-titel"
        className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-muted"
      >
        Technologien
      </h2>

      <ul className="flex flex-wrap gap-2">
        {stack.map((technologie) => (
          <li
            key={technologie}
            className="rounded-sm border border-primary-200 bg-primary-50 px-2 py-1 font-mono text-[11px] text-primary-700"
          >
            {technologie}
          </li>
        ))}
      </ul>
    </section>
  );
}
