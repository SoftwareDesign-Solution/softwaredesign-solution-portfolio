/**
 * @file workshop-details.tsx
 * @description Hauptinhalt der Workshop-Detailseite: Beschreibung, Agenda,
 * Zielgruppe/Voraussetzungen, Lernziele und Trainer-Profil.
 * @module app/workshops/[slug]/_components/workshop-details
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import SectionHeader from "@/components/section-header";
import { Workshop } from "@/types/workshop";

/**
 * Hauptinhalt der Workshop-Detailseite: Beschreibung, Agenda, Zielgruppe/Voraussetzungen,
 * Lernziele und Trainer-Profil. Erwartet, dass Agenda/Zielgruppe/Voraussetzungen/Lernziele
 * bereits befüllt sind (non-null assertions), da diese Felder in der Praxis stets gesetzt werden.
 *
 * @param workshop - Der anzuzeigende Workshop
 * @returns Den Hauptinhalt der Detailseite
 */
export default function WorkshopDetails(workshop: Workshop) {
    return (
        <section>

            {/* Beschreibung */}
            <section className="mb-20">
                
                <SectionHeader title="Beschreibung" size="sm">Über den Workshop</SectionHeader>

                {/* HTML kommt aus einem redaktionell gepflegten Rich-Text-Feld der DB, nicht von Nutzereingaben */}
                <div 
                    id="description" 
                    className="text-base max-w-3xl wrap-anywhere hyphens-auto text-foreground"
                    dangerouslySetInnerHTML={{
                        __html: workshop.beschreibung ?? "",
                    }}
                    >
                </div>

            </section>


            {/* Agenda */}
            <section className="mb-20">

                <SectionHeader title="Agenda" size="sm">Tagesablauf</SectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {workshop.agenda!.map((item, index) => (
                        <div key={index} className="border border-solid border-border rounded-lg p-5 shadow-md">

                            <div className="text-xs tracking-[1.5px] font-semibold uppercase text-muted mb-1.5">
                                Tag {index + 1}
                            </div>

                            <h3 className="text-2xl font-bold mb-4.5 text-foreground">{item.titel}</h3>

                            <ul className="m-0 p-0 list-none">

                                {item.inhalte!.map((punkt: string, punktIndex: number) => (
                                    <li key={punktIndex} className="flex gap-2 text-sm p-0 pt-2 pb-2 text-foreground">
                                        <span className="text-xs mt-0.5 text-muted">{String(punktIndex + 1).padStart(2, "0")}</span>
                                        {punkt}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    ))}

                </div>
            </section>


            {/* Zielgruppe / Voraussetzungen */}
            <section className="mb-20">

                <SectionHeader title="Zielgruppe" size="sm">Für wen ist der Workshop geeignet?</SectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    <div className="bg-surface rounded-lg p-5">
                        <h3 className="text-lg font-bold mb-4 text-foreground">Zielgruppe</h3>
                        <ul className="m-0 p-0 list-none">

                            {workshop.zielgruppe!.map((ziel, index) => (
                                <li key={index} className="flex gap-2 text-sm p-0 pt-2 pb-2 text-foreground">
                                    <span className="text-sm font-bold text-success-600">✓</span>
                                    {ziel}
                                </li>
                            ))}

                        </ul>
                    </div>

                    <div className="bg-surface rounded-lg p-5">
                        <h3 className="text-lg font-bold mb-4 text-foreground">Voraussetzungen</h3>
                        <ul className="m-0 p-0 list-none">
                            
                            {workshop.voraussetzungen!.map((voraussetzung, index) => (
                                <li key={index} className="flex gap-2 text-sm p-0 pt-2 pb-2 text-foreground">
                                    <span className="text-sm font-bold text-success-600">✓</span>
                                    {voraussetzung}
                                </li>
                            ))}
                            
                        </ul>
                    </div>
                </div>

            </section>


            {/* Lernziele */}
            <section className="mb-20">
                
                <SectionHeader title="Lernziele" size="sm">Was Sie mitnehmen</SectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 grid-flow-row">

                    {workshop.lernziele!.map((ziel, index) => (
                        <div key={index} className="flex gap-4 py-5 px-6 items-start border border-solid border-border rounded-lg shadow-md">
                            <div className="text-xs tracking-[0.5px] mt-0.5 text-muted">{String(index + 1).padStart(2, "0")}</div>
                            <div className="text-sm font-medium text-foreground">{ziel}</div>
                        </div>
                    ))}
                    
                </div>

            </section>


            {/* Referent */}
            <section className="mb-20">
                
                <SectionHeader title="Referent" size="sm">Über den Trainer</SectionHeader>
                
                <div className="border border-solid border-border rounded-lg py-8 px-9">

                    <div className="flex gap-7 items-center mb-6">

                        {/* Image */}

                        <div className="min-w-0">
                            <h3 className="text-2xl font-bold mb-1.5 wrap-anywhere text-foreground">
                                {workshop.trainer?.name}
                            </h3>
                            <div className="text-sm text-muted uppercase tracking-[1.2px] font-semibold wrap-anywhere">
                                {workshop.trainer?.titel}
                            </div>
                        </div>

                    </div>

                    <p className="text-sm leading-[1.65] max-w-180 whitespace-pre-line wrap-anywhere hyphens-auto text-foreground">
                        {workshop.trainer?.bio}
                    </p>
                    
                </div>
                
            </section>

        </section>
    );
};