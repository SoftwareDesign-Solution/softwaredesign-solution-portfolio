/**
 * @file appointment-selection-section.tsx
 * @description Terminauswahl als Radio-Gruppe (visuell als Kartenliste). Zeigt bei
 * fehlenden Terminen einen Hinweis, dass die Anfrage trotzdem möglich ist.
 * @module components/forms/shared/sections/appointment-selection-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

import { Controller, useFormContext, useFormState, useWatch } from "react-hook-form";

import { TerminFormData } from "@/schemas/shared/termin.schema";
import { Termin } from "@/types/termin";
import { formatDateRange } from "@/utils/format-date-range";
import { formatTerminStatus } from "@/utils/format-termin-status";

import SectionHeading from "../section-heading";

/** Minimal-Shape, das react-hook-form für den Zugriff auf `termin` benötigt. */
type AppointmentSelectionFormData = {
    termin?: TerminFormData | null;
    /** Nur bei `allowFlexibleDate` vorhanden (Angebotsanfrage). */
    terminNachAbsprache?: boolean;
};

/** Props für {@link AppointmentSelectionSection}. */
interface AppointmentSelectionSectionProps {
    /** Abschnittsnummer für die {@link SectionHeading}-Anzeige. */
    num: string;
    /** Zur Auswahl stehende Termine des Workshops; leer/undefined, falls der Workshop (noch) keine Termine hat. */
    termine: Termin[] | undefined;
    /**
     * Zeigt zusätzlich die Karte „Termin nach Absprache“ an (nur Angebotsanfrage).
     * Setzt dann `terminNachAbsprache` im Formular und `termin` auf `null`.
     */
    allowFlexibleDate?: boolean;
    /** Untertitel der Karte „Termin nach Absprache“. */
    flexibleDateDescription?: string;
};

/** Rahmen und Hintergrund einer Termin-Karte, je nach Auswahl- und Verfügbarkeitszustand. */
function cardStateClass(checked: boolean, disabled = false): string {
    if (disabled) {
        return "cursor-not-allowed border-border bg-white opacity-60";
    }

    return checked
        ? "cursor-pointer border-primary-700 bg-primary-50"
        : "cursor-pointer border-border bg-white hover:border-border-strong";
}

/**
 * Terminauswahl als Radio-Gruppe (visuell als Kartenliste). Bereits ausgebuchte
 * oder inaktive Termine werden zwar angezeigt, sind aber nicht auswählbar. Hat
 * der Workshop gar keine Termine, wird stattdessen ein Hinweis angezeigt, dass
 * die Anfrage trotzdem unverbindlich gestellt werden kann.
 *
 * @param props - Siehe {@link AppointmentSelectionSectionProps}
 * @returns Den Formular-Abschnitt
 */
export default function AppointmentSelectionSection({
    num,
    termine,
    allowFlexibleDate = false,
    flexibleDateDescription = "Remote oder Inhouse · Wunschtermin abstimmen",
}: AppointmentSelectionSectionProps) {

    const {
        control,
        setValue,
    } = useFormContext<AppointmentSelectionFormData>();

    const { errors } = useFormState({ control });

    const terminNachAbsprache = useWatch({
        control,
        name: "terminNachAbsprache",
        defaultValue: false,
    }) ?? false;

    const hasTermine = Boolean(termine && termine.length > 0);

    return (
        <section className="mb-8">

            <SectionHeading num={num} title="Termin" />

            {(!termine || termine.length === 0) && (
                <div className="text-[13px] text-muted py-2.5 px-3 bg-surface rounded-md mb-2.5">
                    Aktuell sind keine Termine geplant — Sie können das Angebot trotzdem
                    unverbindlich anfordern, einen passenden Termin stimmen wir anschließend
                    gemeinsam ab.
                </div>
            )}

            <Controller 
                name="termin"
                control={control}
                render={({ field }) => (

                    <div className="grid gap-2.5">

                        {termine && termine.map((termin) => {

                            const checked = !terminNachAbsprache && field.value?.id === termin.id;
                            // Ausgebuchte oder deaktivierte Termine bleiben sichtbar, sind aber nicht auswählbar
                            const disabled = !termin.active || termin.status === "ausgebucht";
                            const status = formatTerminStatus(termin.status);

                            return (
                                <label
                                    key={termin.id}
                                    className={`grid w-full grid-cols-[24px_1fr_auto] items-center gap-3.5 rounded-lg border-[1.5px] px-4 py-3.5 transition-colors ${cardStateClass(checked, disabled)}`}
                                >
                                    
                                    <span className="relative h-4.5 w-4.5 rounded-full border-2 border-primary-700 bg-white">
                                        {checked && (
                                            <span className="absolute inset-0.75 rounded-full bg-primary-700" />
                                        )}
                                    </span>
                                    
                                    <div>
                                        <div className="text-[15px] font-semibold text-foreground">
                                            {formatDateRange(
                                                termin.datumVon, 
                                                termin.datumBis
                                            )}
                                        </div>
                                        <div className="text-[12.5px] text-muted">{termin.format}</div>
                                    </div>
                                    
                                    <div className={`flex items-center gap-1.5 text-[12.5px] font-medium ${status.statusTextColor}`}>
                                        <span className={`h-1.75 w-1.75 rounded-full ${status.dotColor}`} />
                                        {status.label}
                                    </div>

                                    {/*
                                    <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-success-600">
                                        <span className="h-1.75 w-1.75 rounded-full bg-success-500" />
                                        {termin.status}
                                    </div>
                                    */}

                                    <input 
                                        type="radio" 
                                        name={field.name}
                                        className="sr-only" 
                                        readOnly 
                                        checked={checked}
                                        disabled={disabled}
                                        onBlur={field.onBlur}
                                        onChange={() =>  {

                                            if (allowFlexibleDate) {
                                                setValue("terminNachAbsprache", false);
                                            }

                                            field.onChange({
                                                id: termin.id,
                                                datumVon: termin.datumVon,
                                                datumBis: termin.datumBis
                                            })
                                        }}
                                    />

                                </label>
                            )
                        })}

                        {/* Termin nach Absprache — nur sinnvoll, wenn es überhaupt feste Termine gibt */}
                        {allowFlexibleDate && hasTermine && (
                            <label
                                className={`grid w-full grid-cols-[24px_1fr] items-center gap-3.5 rounded-lg border-[1.5px] px-4 py-3.5 transition-colors ${cardStateClass(terminNachAbsprache)}`}
                            >

                                <span className="relative h-4.5 w-4.5 rounded-full border-2 border-primary-700 bg-white">
                                    {terminNachAbsprache && (
                                        <span className="absolute inset-0.75 rounded-full bg-primary-700" />
                                    )}
                                </span>

                                <div>
                                    <div className="text-[15px] font-semibold text-foreground">
                                        Termin nach Absprache
                                    </div>
                                    <div className="text-[12.5px] text-muted">{flexibleDateDescription}</div>
                                </div>

                                <input
                                    type="radio"
                                    name={field.name}
                                    className="sr-only"
                                    readOnly
                                    checked={terminNachAbsprache}
                                    onBlur={field.onBlur}
                                    onChange={() => {
                                        // Zuerst das Flag setzen, damit die erneute Validierung von "termin" schon greift
                                        setValue("terminNachAbsprache", true);
                                        field.onChange(null);
                                    }}
                                />

                            </label>
                        )}
                        
                    </div>

                )}
            />

            {errors.termin && (
                <p className="mt-2 text-[12.5px] text-error-600">
                    {errors.termin.message}
                </p>
            )}
            
        </section>
    );
};