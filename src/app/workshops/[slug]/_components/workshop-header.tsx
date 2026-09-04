/**
 * @file workshop-header.tsx
 * @description Kopfbereich der Workshop-Detailseite: Breadcrumbs, Titel,
 * Kurzbeschreibung und Eckdaten (Dauer/Format/Sprache).
 * @module app/workshops/[slug]/_components/workshop-header
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { Workshop } from "@/types/workshop";
import { formatDay } from "@/utils/format-day";

import Breadcrumbs from "./breadcrumbs";
import StatItem from "./stat-item";

/**
 * Kopfbereich der Workshop-Detailseite: Breadcrumbs, Titel, Kurzbeschreibung und Eckdaten (Dauer/Format/Sprache).
 *
 * @param workshop - Der anzuzeigende Workshop
 * @returns Den Kopfbereich
 */
export default function WorkshopHeader(workshop: Workshop) {
    return (
        <section className="py-10 md:pt-16 px-6 md:px-12 pb-12">

            {/* Breadcrumbs */}
            <Breadcrumbs items={[ { label: "Start", href: "/" }, { label: "Workshops", href: "/#workshops" }, { label: workshop.titel, href: "" } ]} />

            {/* Titel */}
            <h1 className="text-6xl font-bold text-foreground mb-8">
                {workshop.titel}
            </h1>

            {/* Kurzbeschreibung */}
            <p className="text-xl max-w-3xl m-0 text-muted">
                {workshop.kurzbeschreibung}
            </p>

            {/* Dauer / Format / Sprache */}
            <div className="flex gap-7 mt-8 flex-wrap">
                <StatItem label="Dauer" value={formatDay(workshop.dauer ?? 3)} />
                <StatItem label="Format" value={workshop.format} />
                <StatItem label="Sprache" value={workshop.sprache} />
            </div>

        </section>
    );
}