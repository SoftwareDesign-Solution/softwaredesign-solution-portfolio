/**
 * @file workshop-browser.tsx
 * @description Client-Komponente, die den Tag-Filter und das Workshop-Grid verbindet.
 * @module app/_components/sections/workshop-browser
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

import { useState } from "react";

import type { getWorkshops } from "@/app/actions/get-workshops";

import WorkshopCard from "./workshop-card/workshop-card";
import WorkshopTagFilter from "./workshop-tag-filter";

type Workshop = Awaited<ReturnType<typeof getWorkshops>>[number];

interface WorkshopBrowserProps {
    workshops: Workshop[];
}

/**
 * Hält den aktiven Tag und rendert die passenden Workshops.
 *
 * @param props.workshops - Alle aktiven Workshops
 * @returns Tag-Filter und Workshop-Grid
 */
export default function WorkshopBrowser({ workshops }: WorkshopBrowserProps) {

    const [activeTag, setActiveTag] = useState<string | null>(null);

    const tagNames = [...new Set(workshops.flatMap((workshop) => workshop.tag ? [workshop.tag] : []))];

    const tags = tagNames.map((name) => ({
        name,
        count: workshops.filter((workshop) => workshop.tag === name).length,
    }));

    const visibleWorkshops = activeTag
        ? workshops.filter((workshop) => workshop.tag === activeTag)
        : workshops;

    return (
        <>
            <WorkshopTagFilter
                tags={tags}
                totalCount={workshops.length}
                activeTag={activeTag}
                onFilterChange={setActiveTag}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {visibleWorkshops.map((workshop, index, array) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} position={index + 1} total={array.length} />
                ))}

            </div>
        </>
    );
}