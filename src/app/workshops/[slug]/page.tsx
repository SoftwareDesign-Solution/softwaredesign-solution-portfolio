import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getWorkshop } from "@/app/actions/get-workshop";

import WorkshopDetails from "./_components/workshop-details";
import WorkshopHeader from "./_components/workshop-header";
import WorkshopSidebar from "./_components/workshop-sidebar";

export const dynamic = "force-dynamic";

interface WorkshopDetailsPageProps {
    params: Promise<{
        slug: string;
    }>;
}

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