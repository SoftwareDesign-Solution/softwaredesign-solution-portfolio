/**
 * @file workshop-card.tsx
 * @description Karte für einen einzelnen Workshop in der Workshop-Übersicht der Startseite.
 * @module app/_components/sections/workshop-card/workshop-card
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import Link from "next/link";

import { type Workshop } from "@/types/workshop";
import { formatDay } from "@/utils/format-day";
import { formatPrice } from "@/utils/format-price";

import WorkshopCardActions from "./workshop-card-actions";
import WorkshopCardAppointments from "./workshop-card-appointments";

/** Props für {@link WorkshopCard}. */
interface WorkshopCardProps {
    workshop: Workshop;
    /** 1-basierte Position der Karte in der Liste, für die "01 / 06"-Anzeige. */
    position?: number;
    /** Gesamtanzahl der angezeigten Workshops, für die "01 / 06"-Anzeige. */
    total?: number;
}

/**
 * Karte für einen einzelnen Workshop in der Workshop-Übersicht: zeigt Kurzinfos,
 * die nächsten Termine und Buttons für Benachrichtigung/Angebotsanfrage. Die
 * gesamte Karte ist per Overlay-Link klickbar und führt zur Detailseite.
 *
 * @param props - Siehe {@link WorkshopCardProps}
 * @returns Die Workshop-Karte
 */
export default function WorkshopCard({
    workshop,
    position,
    total,
}: WorkshopCardProps) {
    const hasNumbering =
        position !== undefined &&
        total !== undefined;

    const hasPrice =
        workshop.preis !== null &&
        Number(workshop.preis) > 0;

    return (
        <div className="relative flex flex-col rounded-lg border border-border bg-white p-7">
            <Link
                aria-label={`Details zum Workshop „${workshop.titel}“`}
                className="absolute inset-0 z-1 rounded-lg"
                href={`/workshops/${workshop.slug}`}
            />

            <header className="mb-4.5 flex items-center justify-between">
                <div className="text-sm font-medium text-muted">
                    {hasNumbering && (
                        <>
                            <span className="font-bold">
                                {String(position).padStart(2, "0")}
                            </span>
                            {" / "}
                            {String(total).padStart(2, "0")}
                        </>
                    )}
                </div>

                <div className="inline-flex items-center gap-1.5">
                    <WorkshopBadge>
                        {formatDay(workshop.dauer ?? 3)}
                    </WorkshopBadge>

                    <WorkshopBadge>
                        {workshop.sprache}
                    </WorkshopBadge>
                </div>
            </header>

            <h3 className="mb-2.5 text-lg font-semibold leading-[1.2] tracking-[-0.5px] text-foreground">
                {workshop.titel}
            </h3>

            <p className="mb-4.5 text-sm leading-[1.55] text-muted">
                {workshop.kurzbeschreibung}
            </p>

            {workshop.lernziele && workshop.lernziele?.length > 0 && (
                <ul className="mb-5.5 text-sm">
                    {workshop.lernziele.map((lernziel) => (
                        <li
                            className="flex gap-2.5 pt-1 text-foreground"
                            key={lernziel}
                        >
                            <span
                                aria-hidden="true"
                                className="text-sm font-bold text-success-600"
                            >
                                ✓
                            </span>

                            {lernziel}
                        </li>
                    ))}
                </ul>
            )}

            <footer className="mt-auto">
                <WorkshopCardAppointments
                    termine={workshop.termine ?? []}
                />

                <WorkshopCardActions workshop={workshop} />

                <div className="flex items-center justify-between border-t border-dashed border-border pt-4">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.5px] text-muted">
                            ab
                        </div>

                        {hasPrice ? (
                            <div className="text-xl font-bold tracking-[-0.6px] text-foreground">
                                {formatPrice(workshop.preis)}
                            </div>
                        ) : (
                            <div className="text-sm font-normal text-muted">
                                auf Anfrage
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-sm border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground">
                        Details
                        <span aria-hidden="true">→</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/** Props für {@link WorkshopBadge}. */
interface WorkshopBadgeProps {
    children: React.ReactNode;
}

/**
 * Kleines, dezentes Info-Badge im Kartenkopf (z.B. Dauer, Sprache).
 *
 * @param props - Siehe {@link WorkshopBadgeProps}
 * @returns Das Badge
 */
function WorkshopBadge({
    children,
}: WorkshopBadgeProps) {
    return (
        <span className="inline-flex items-center rounded-sm bg-surface px-2.5 py-1 text-sm text-muted">
            {children}
        </span>
    );
}