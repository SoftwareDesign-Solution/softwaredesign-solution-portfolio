/**
 * @file workshop-list.tsx
 * @description Server-Komponente, die alle aktiven Workshops lädt und als Grid rendert.
 * @module app/_components/sections/workshop-list
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { getWorkshops } from "@/app/actions/get-workshops";

import WorkshopCard from "./workshop-card/workshop-card";

/**
 * Server-Komponente: lädt alle aktiven Workshops und rendert sie als Grid aus {@link WorkshopCard}s.
 *
 * @returns Das Workshop-Grid
 */
export default async function WorkshopList() {

    const workshops = await getWorkshops();
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {workshops.map((workshop, index, array) => (
                <WorkshopCard key={workshop.id} workshop={workshop} position={index+1} total={array.length} />
            ))}

        </div>
    )
}