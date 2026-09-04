/**
 * @file workshops-section.tsx
 * @description "Workshops"-Sektion der Startseite: Überschrift, Inhouse-CTA und die Workshop-Liste.
 * @module app/_components/sections/workshops-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";

import SectionHeader from "../section-header";
import WorkshopList from "./workshop-list";


/**
 * "Workshops"-Sektion der Startseite: Überschrift, Inhouse-CTA-Link und die {@link WorkshopList}.
 *
 * @returns Die Workshops-Sektion
 */
export default function WorkshopsSection() {
    return (
        <section id="workshops" className="py-16 px-6 md:py-28 md:px-12 scroll-mt-18">

            <SectionHeader 
                title="Workshops"
                action={
                    <Link href="/anfrage" className="py-2 px-3.5 border border-solid border-gray-200 rounded-sm text-sm bg-gray-100">
                        Inhouse anfragen
                    </Link>
                }
            >
                Wissen, Praxisbezug, Remote
            </SectionHeader>

            <WorkshopList />
            
        </section>
    )
};