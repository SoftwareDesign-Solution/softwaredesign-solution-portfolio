/**
 * @file page.tsx
 * @description Workshop-Detailseite (/workshops/[slug]): lädt den Workshop
 * serverseitig und rendert Header, Detailinhalte und die Buchungs-Sidebar.
 * @module app/workshops/[slug]/page
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getWorkshop } from "@/app/actions/get-workshop";

import WorkshopDetails from "./_components/workshop-details";
import WorkshopHeader from "./_components/workshop-header";
import WorkshopSidebar from "./_components/workshop-sidebar";

// Immer dynamisch rendern, da der Workshop live aus der DB kommt (kein Static Caching)
export const dynamic = "force-dynamic";

/** Props für {@link WorkshopDetailsPage} und {@link generateMetadata}. */
interface WorkshopDetailsPageProps {
    params: Promise<{
        /** URL-Slug des Workshops. */
        slug: string;
    }>;
}

/**
 * Generiert dynamische Meta-Tags (Titel/Beschreibung) anhand des geladenen Workshops.
 *
 * @param props - Siehe {@link WorkshopDetailsPageProps}
 * @returns Die Meta-Tags für diese Workshop-Seite
 */
export async function generateMetadata({ params }: WorkshopDetailsPageProps): Promise<Metadata> {
    const { slug } = await params;

    const workshop = await getWorkshop(slug);

    if (!workshop) {
        return {
            title: "Workshop nicht gefunden - Manuel Kübler | SoftwareDesign-Solution",
            description: "Der angeforderte Workshop wurde nicht gefunden.",
        };
    }

    return {
        title: `Workshop: ${workshop.titel} - Manuel Kübler | SoftwareDesign-Solution`,
        description: `${workshop.titel} mit Manuel Kübler. ${workshop.kurzbeschreibung}. Termine & Buchung.`,
    };
};

/**
 * Workshop-Detailseite (/workshops/[slug]): lädt den Workshop serverseitig und
 * rendert Header, Detailinhalte und die Buchungs-Sidebar. Löst `notFound()` aus,
 * wenn kein aktiver Workshop mit diesem Slug existiert.
 *
 * @param props - Siehe {@link WorkshopDetailsPageProps}
 * @returns Die Workshop-Detailseite
 */
export default async function WorkshopDetailsPage({ params }: WorkshopDetailsPageProps) {

    const { slug } = await params;

    const workshop = await getWorkshop(slug);

    if (!workshop) {
       notFound();
    }

    else
    {
        return (
            <article>
                
                {/* Workshop Header */}
                <WorkshopHeader {...workshop} />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-14 py-4.5 px-6 md:pt-6 md:px-12 md:pb-24">

                    {/* Workshop Details */}
                    <WorkshopDetails {...workshop} />

                    {/* Workshop Sidebar */}
                    <WorkshopSidebar {...workshop} />

                </div>
                
            </article>
        );
    }
}