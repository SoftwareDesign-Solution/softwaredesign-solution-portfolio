/**
 * @file workshop-tag-filter.tsx
 * @description Badge-Leiste zur Auswahl eines Tags.
 * @module app/_components/sections/workshop-tag-filter
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

export interface TagOption {
    name: string;
    count: number;
}

interface WorkshopTagFilterProps {
    tags: TagOption[];
    totalCount: number;
    activeTag: string | null;
    onFilterChange: (tag: string | null) => void;
}

/**
 * Rendert die Tag-Badges und meldet die Auswahl an die Elternkomponente.
 *
 * @param props.tags - Verfügbare Tags mit Anzahl der Workshops
 * @param props.totalCount - Gesamtzahl für das Badge „Alle“
 * @param props.activeTag - Aktiver Tag, `null` steht für „Alle“
 * @param props.onFilterChange - Wird beim Klick auf ein Badge aufgerufen
 * @returns Die Badge-Leiste
 */
export default function WorkshopTagFilter({ tags, totalCount, activeTag, onFilterChange }: WorkshopTagFilterProps) {

    const options = [{ name: null, count: totalCount }, ...tags];

    return (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Workshops nach Thema filtern">

            {options.map(({ name, count }) => {

                const isActive = activeTag === name;

                return (
                    <button
                        key={name ?? "alle"}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onFilterChange(name)}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 ${
                            isActive
                                ? "border-primary-700 bg-primary-700 text-white hover:border-primary-800 hover:bg-primary-800"
                                : "border-border-strong bg-white text-foreground hover:border-primary-200 hover:bg-primary-50 hover:text-primary-900"
                        }`}
                    >
                        {name ?? "Alle"} <span className="opacity-70">({count})</span>
                    </button>
                );
            })}

        </div>
    );
}