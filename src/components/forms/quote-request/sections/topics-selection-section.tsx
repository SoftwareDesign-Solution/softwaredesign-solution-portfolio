/**
 * @file topic-selection-section.tsx
 * @description Themenauswahl der Angebotsanfrage: Agenda-Themen pro Tag ab- und
 * anwählen, dazu ein Freitextfeld für Wunschthemen. Nur bei „Termin nach Absprache“.
 * @module components/forms/quote-request/sections/topic-selection-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Controller, useFormContext, useFormState } from "react-hook-form";

import { type TopicsPosition } from "@/schemas/shared/topics.schema";
import { Agenda } from "@/types/agenda";
import { themenSchluessel, zaehleThemen } from "@/utils/themen-auswahl";

import ErrorMessage from "../../shared/error-message";
import Label from "../../shared/label";
import SectionHeading from "../../shared/section-heading";

/** Minimal-Shape, das react-hook-form für diese Sektion benötigt. */
type TopicSelectionFormData = {
    themenAbgewaehlt: TopicsPosition[];
    wunschthemen?: string;
};

/** Props für {@link TopicSelectionSection}. */
interface TopicSelectionSectionProps {
    /** Abschnittsnummer für die {@link SectionHeading}-Anzeige. */
    num: string;
    /** Agenda des Workshops; jeder Block entspricht einem Tag. */
    agenda: Agenda[];
}

/** Positionen sortiert nach Tag und Thema, damit Formularwert und Mail stabil bleiben. */
function toSortedPositions(keys: Iterable<string>): TopicsPosition[] {
    return [...keys]
        .map((key) => key.split("-").map(Number) as TopicsPosition)
        .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/** Desktop: alle Tage offen. Mobil: alle zugeklappt, damit die Liste nicht zu lang wird. */
function initialOpenDays(agenda: Agenda[]): Set<number> {
    const isDesktop =
        typeof window === "undefined" ||
        window.matchMedia("(min-width: 48rem)").matches;

    return isDesktop ? new Set(agenda.map((_, index) => index)) : new Set();
}

/**
 * Themenauswahl als aufklappbare Liste pro Agenda-Tag. Standardmäßig sind alle
 * Themen ausgewählt; im Formular werden nur die abgewählten Positionen gehalten
 * (`themenAbgewaehlt`). Am Desktop sitzt der Haken für den ganzen Tag in der
 * Kopfzeile, mobil steht er erst im aufgeklappten Tag.
 *
 * @param props - Siehe {@link TopicSelectionSectionProps}
 * @returns Den Formular-Abschnitt
 */
export default function TopicSelectionSection({
    num,
    agenda,
}: TopicSelectionSectionProps) {

    const id = useId();

    const {
        control,
        register,
    } = useFormContext<TopicSelectionFormData>();

    const { errors } = useFormState({ control });

    // Auf-/Zugeklappt gehört nicht ins Formular, nur in die Ansicht
    const [openDays, setOpenDays] = useState<Set<number>>(() => initialOpenDays(agenda));

    const toggleDay = (day: number) =>
        setOpenDays((previous) => {
            const next = new Set(previous);

            if (next.has(day)) {
                next.delete(day);
            } else {
                next.add(day);
            }

            return next;
        });

    return (
        <section className="mb-8" aria-labelledby={`${id}-heading`}>

            <Controller
                name="themenAbgewaehlt"
                control={control}
                render={({ field }) => {

                    const deselected = new Set(
                        (field.value ?? []).map(([day, topic]) => themenSchluessel(day, topic)),
                    );

                    const { gesamt, gewaehlt } = zaehleThemen(agenda, field.value ?? []);

                    const commit = (next: Set<string>) => field.onChange(toSortedPositions(next));

                    const toggleTopic = (day: number, topic: number) => {
                        const next = new Set(deselected);
                        const key = themenSchluessel(day, topic);

                        if (next.has(key)) {
                            next.delete(key);
                        } else {
                            next.add(key);
                        }

                        commit(next);
                    };

                    const toggleWholeDay = (day: number, allSelected: boolean) => {
                        const next = new Set(deselected);

                        agenda[day].inhalte.forEach((_, topic) => {
                            if (allSelected) {
                                next.add(themenSchluessel(day, topic));
                            } else {
                                next.delete(themenSchluessel(day, topic));
                            }
                        });

                        commit(next);
                    };

                    const setAll = (selected: boolean) =>
                        commit(
                            selected
                                ? new Set()
                                : new Set(
                                      agenda.flatMap((day, dayIndex) =>
                                          day.inhalte.map((_, topic) => themenSchluessel(dayIndex, topic)),
                                      ),
                                  ),
                        );

                    return (
                        <>
                            <div className="flex items-start justify-between gap-4">

                                <div id={`${id}-heading`} className="min-w-0">
                                    <SectionHeading num={num} title="Themen" />
                                </div>

                                {/* Mobil: nur der Zähler */}
                                <span className="mt-1 shrink-0 font-mono text-[12px] text-primary-700 md:hidden" aria-live="polite">
                                    {gewaehlt}/{gesamt} gewählt
                                </span>

                                {/* Desktop: alle an/aus */}
                                <div className="flex shrink-0 gap-1 max-md:hidden">
                                    <button
                                        type="button"
                                        onClick={() => setAll(true)}
                                        className="h-8 rounded-sm px-2.5 text-[13px] font-semibold text-primary-700 transition-colors hover:text-primary-600"
                                    >
                                        Alle auswählen
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAll(false)}
                                        className="h-8 rounded-sm px-2.5 text-[13px] font-semibold text-primary-700 transition-colors hover:text-primary-600"
                                    >
                                        Alle abwählen
                                    </button>
                                </div>

                            </div>

                            <p className="-mt-1.5 mb-3.5 text-[13px] leading-relaxed text-muted">
                                Was kann Ihr Team schon? Wählen Sie ab, was Sie nicht brauchen — ich passe
                                Inhalt, Dauer und Preis im Angebot an.
                            </p>

                            <div className="grid gap-2.5 max-md:gap-2">
                                {agenda.map((day, dayIndex) => {

                                    const selectedCount = day.inhalte.filter(
                                        (_, topic) => !deselected.has(themenSchluessel(dayIndex, topic)),
                                    ).length;

                                    const allSelected = selectedCount === day.inhalte.length;
                                    const isOpen = openDays.has(dayIndex);
                                    const panelId = `${id}-day-${dayIndex}`;

                                    return (
                                        <div key={dayIndex} className="overflow-hidden rounded-lg border border-border">

                                            <div className={`flex items-center gap-3 ${selectedCount === 0 ? "bg-surface" : "bg-white"}`}>

                                                {/* Desktop: Haken für den ganzen Tag direkt in der Kopfzeile */}
                                                <label className="flex min-h-12.5 flex-1 cursor-pointer items-center gap-3.5 py-1 pl-4 max-md:hidden">
                                                    <DayCheckbox
                                                        selected={selectedCount}
                                                        total={day.inhalte.length}
                                                        onChange={() => toggleWholeDay(dayIndex, allSelected)}
                                                    />
                                                    <span className="flex items-baseline gap-3">
                                                        <span className="font-mono text-[11px] text-primary-700">TAG {dayIndex + 1}</span>
                                                        <span className="text-[14.5px] font-semibold text-foreground">{day.titel}</span>
                                                    </span>
                                                </label>

                                                {/* Mobil: die ganze Zeile klappt auf */}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleDay(dayIndex)}
                                                    aria-expanded={isOpen}
                                                    aria-controls={panelId}
                                                    className="flex min-h-14 flex-1 items-center gap-3 py-2 pl-3.5 pr-3 text-left md:hidden"
                                                >
                                                    <span className="flex min-w-0 flex-1 flex-col">
                                                        <span className="font-mono text-[11px] text-primary-700">
                                                            TAG {dayIndex + 1} · {selectedCount}/{day.inhalte.length}
                                                        </span>
                                                        <span className="text-[14.5px] font-semibold leading-5 text-foreground">{day.titel}</span>
                                                    </span>
                                                    <Chevron open={isOpen} />
                                                </button>

                                                <span className="whitespace-nowrap font-mono text-[11.5px] text-primary-700 max-md:hidden">
                                                    {selectedCount}/{day.inhalte.length}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => toggleDay(dayIndex)}
                                                    aria-expanded={isOpen}
                                                    aria-controls={panelId}
                                                    aria-label={`Tag ${dayIndex + 1} ein- oder ausklappen`}
                                                    className="mr-1.5 flex h-11 w-11 items-center justify-center rounded-md text-foreground max-md:hidden"
                                                >
                                                    <Chevron open={isOpen} />
                                                </button>

                                            </div>

                                            {isOpen && (
                                                <div id={panelId} className="border-t border-border py-1.5 max-md:py-1">

                                                    <label className="flex min-h-11 cursor-pointer items-center gap-3 border-b border-dashed border-border px-3.5 md:hidden">
                                                        <DayCheckbox
                                                            selected={selectedCount}
                                                            total={day.inhalte.length}
                                                            onChange={() => toggleWholeDay(dayIndex, allSelected)}
                                                        />
                                                        <span className="text-[13px] font-semibold text-primary-700">Ganzen Tag auswählen</span>
                                                    </label>

                                                    <div className="grid grid-cols-2 gap-x-4 max-md:grid-cols-1">
                                                        {day.inhalte.map((topic, topicIndex) => {

                                                            const selected = !deselected.has(themenSchluessel(dayIndex, topicIndex));

                                                            return (
                                                                <label
                                                                    key={topicIndex}
                                                                    className="flex min-h-10 cursor-pointer items-center gap-3 py-1 pl-11.5 pr-4 max-md:min-h-11 max-md:px-3.5"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selected}
                                                                        onChange={() => toggleTopic(dayIndex, topicIndex)}
                                                                        onBlur={field.onBlur}
                                                                        className="h-3.75 w-3.75 shrink-0 accent-primary-700 max-md:h-4.5 max-md:w-4.5"
                                                                    />
                                                                    <span className={`text-[13.5px] leading-4.75 max-md:text-[14px] ${selected ? "text-foreground" : "text-muted line-through"}`}>
                                                                        {topic}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>

                                                </div>
                                            )}

                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    );
                }}
            />

            <div className="mt-4.5">

                <Label htmlFor={`${id}-wunschthemen`}>Zusätzliche Wunschthemen (optional)</Label>

                <textarea
                    id={`${id}-wunschthemen`}
                    rows={2}
                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 resize-y mobile-form:text-[16px]"
                    placeholder="z. B. React Query, Testing mit Playwright, eigene Codebasis als Übungsprojekt …"
                    aria-invalid={errors.wunschthemen ? true : undefined}
                    {...register("wunschthemen")}
                />

                {errors.wunschthemen && (
                    <ErrorMessage message={errors.wunschthemen.message} />
                )}

            </div>

        </section>
    );
}

/** Checkbox für einen ganzen Tag; zeigt einen Strich, wenn nur ein Teil gewählt ist. */
function DayCheckbox({
    selected,
    total,
    onChange,
}: {
    selected: number;
    total: number;
    onChange: () => void;
}) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = selected > 0 && selected < total;
        }
    }, [selected, total]);

    return (
        <input
            ref={ref}
            type="checkbox"
            checked={selected === total}
            onChange={onChange}
            className="h-4 w-4 shrink-0 accent-primary-700 max-md:h-4.5 max-md:w-4.5"
        />
    );
}

/** Pfeil zum Auf- und Zuklappen eines Tages. */
function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-150 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}
