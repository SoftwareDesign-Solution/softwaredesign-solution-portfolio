"use client";

import TerminRow from "@/components/termin-row";
import { useModal } from "@/providers/modal-provider";
import { Termin } from "@/types/termin";
import { Workshop } from "@/types/workshop";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";

interface WorkshopCardProps {
    workshop: Workshop;
    index?: number;
    counter?: number;
}

const MAX_VISIBLE_TERMINE = 3;

export default function WorkshopCard({ workshop, index, counter }: WorkshopCardProps) {

    const { openNotificationSignupModal, openQuoteRequestModal } = useModal(); // This line seems to be incomplete or unnecessary, consider removing it if not used.

    const visibleTermine: Termin[] = workshop.termine ? workshop.termine.slice(0, MAX_VISIBLE_TERMINE): [];
    const remainingCount: number = workshop.termine ? workshop.termine.length - visibleTermine.length : 0;

    return (
        <div className="p-7 border border-solid border-border rounded-lg bg-white relative flex flex-col cursor-pointer">
            
            {/* Link */}
            <Link href={`/workshops/${workshop.slug}`} className="absolute inset-0 z-1 rounded-lg" />
            
            <div className="flex justify-between items-center mb-4.5">

                {/* Nummer */}
                <div className="text-sm text-muted font-medium">
                  {index !== undefined && counter !== undefined && (
                    <>
                      <span className="font-bold">{String(index).padStart(2, "0")}</span> / {String(counter).padStart(2, "0")}
                    </>
                  )}
                </div>

                {/* Dauer / Sprache */}
                <div className="inline-flex items-center gap-1.5">
                  <div className="inline-flex items-center gap-1.5 text-sm text-muted bg-surface py-1 px-2.5 rounded-sm">
                    {workshop.dauer}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm text-muted bg-surface py-1 px-2.5 rounded-sm">
                    {workshop.sprache}
                  </div>
                </div>

            </div>

            {/* Titel */}
            <h3 className="text-lg font-semibold text-foreground tracking-[-0.5px] mb-2.5 leading-[1.2]">
                {workshop.titel}
            </h3>

            {/* Kurzbeschreibung */}
            <p className="text-sm text-muted mb-4.5 leading-[1.55]">
                {workshop.kurzbeschreibung}
            </p>

            {/* Lernziele */}
            <ul className="list-none mb-5.5 text-sm">
                {workshop.lernziele && workshop.lernziele.map((ziel) => (
                    <li key={ziel} className="flex gap-2.5 pt-1 text-foreground">
                        <span className="text-sm font-bold text-success-600">✓</span>
                        {ziel}
                    </li>
                ))}
            </ul>

            {/* Footer WorkshopCard */}
            <div className="mt-auto">

                <div className="text-xs text-muted tracking-[1.5px] uppercase font-semibold mb-2">
                    Termine
                </div>

                {/* Termine */}
                <div className="flex flex-col gap-0.5 mb-4.5">
                    
                    {visibleTermine.length > 0 ? (
                        visibleTermine.map((termin) => (
                            <TerminRow key={termin.id} termin={termin} />
                        ))
                    ) : (
                        <div className="flex justify-between items-center py-2 px-3 bg-surface rounded-md">
                            <span className="text-[12px] text-muted font-medium">Aktuell keine Termine geplant.</span>
                            <span className="text-[11px] text-muted font-semibold">In Planung</span>
                        </div>
                    )}

                    {remainingCount > 0 && (
                        <div className="text-[11px] text-muted italic pt-1.5 px-3">
                            + {remainingCount} weitere Termine verfügbar
                        </div>
                    )}

                </div>

                <button 
                    className="relative z-2 flex items-center gap-2 text-sm text-muted cursor-pointer py-2.5 px-0.5 mb-1"
                    onClick={() => openNotificationSignupModal(workshop)}
                >
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <span className="border-b border-dashed pb-px">Bei neuen Terminen benachrichtigen</span>
                </button>

                <button
                    className="relative z-2 flex items-center gap-2 text-sm text-muted cursor-pointer pb-2.5 px-0.5 mb-1"
                    onClick={() => openQuoteRequestModal(workshop)}
                >
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <path d="M14 2v6h6"></path>
                        <path d="M8 13h8M8 17h5"></path>
                    </svg>
                    <span className="border-b border-dashed pb-px">Angebot anfordern</span>
                </button>

                <div className="flex justify-between items-center pt-4 border-t border-dashed border-border">

                    {/* Preis */}
                    <div>
                        <div className="text-xs text-muted tracking-[0.5px] font-semibold uppercase">ab</div>
                        <div className="text-xl font-bold tracking-[-0.6px] text-foreground">
                            {formatPrice(workshop.preis)} <span className="text-sm text-muted font-normal">€</span>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="py-2 px-3.5 border border-solid border-border rounded-sm text-sm bg-surface text-foreground font-medium flex items-center gap-1.5">
                        Details <span className="inline-block transition-transform">→</span>
                    </div>

                </div>
                
            </div>

        </div>
    )
}