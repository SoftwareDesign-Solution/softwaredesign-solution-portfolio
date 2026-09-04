/**
 * @file request-description-section.tsx
 * @description Formular-Abschnitt des Kontaktformulars für die freie Nachricht
 * inkl. Live-Zeichenzähler.
 * @module components/forms/contact-request/sections/request-description-section
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import {
    useFormContext,
    useWatch,
} from "react-hook-form";

import { type ContactRequestFormData } from "@/schemas/contact-request.schema";

// Muss mit MAX_MESSAGE_LENGTH aus contact-request.schema.ts übereinstimmen
const MAX_MESSAGE_LENGTH = 4_000;

/**
 * Formular-Abschnitt des Kontaktformulars für die freie Nachricht, inklusive
 * Live-Zeichenzähler und Mindestlängen-Hinweis.
 *
 * @returns Den Formular-Abschnitt
 */
export default function RequestDescriptionSection() {
    const {
        control,
        formState: {
            errors,
        },
        register,
    } = useFormContext<ContactRequestFormData>();

    const message =
        useWatch({
            control,
            name: "nachricht",
        }) ?? "";

    return (
        <section className="col-span-1 mt-2 rounded-lg border border-border bg-white px-10 py-9 shadow-sm md:col-span-2">
            <h2 className="mb-2 text-xl font-bold leading-[1.1] tracking-[-0.8px] text-foreground md:text-3xl">
                Beschreibung
            </h2>

            <p className="mb-7 text-[13.5px] leading-[1.55] text-muted">
                Beschreiben Sie den Grund Ihrer Anfrage im
                Folgenden so präzise wie möglich.
            </p>

            <textarea
                className="min-h-45 w-full resize-y rounded-md border border-border bg-white px-3 py-2.5 text-sm leading-[1.55] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                maxLength={MAX_MESSAGE_LENGTH}
                {...register("nachricht")}
            />

            <div className="mt-2.5 flex items-center justify-between text-xs text-muted">
                <span>
                    {errors.nachricht?.message ? (
                        <span className="text-error-700">
                            {errors.nachricht.message}
                        </span>
                    ) : (
                        "Mindestens 20 Zeichen."
                    )}
                </span>

                <span className="font-mono">
                    {message.length} / {MAX_MESSAGE_LENGTH}
                </span>
            </div>
        </section>
    );
}