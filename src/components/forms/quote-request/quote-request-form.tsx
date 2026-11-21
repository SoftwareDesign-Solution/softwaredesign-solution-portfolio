/**
 * @file quote-request-form.tsx
 * @description Mehrstufiges Formular zur Anforderung eines unverbindlichen
 * Angebots für einen Workshop, auch ohne festen Termin möglich.
 * @module components/forms/quote-request/quote-request-form
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

 
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { TurnstileRef } from "nextjs-turnstile";
import { useRef } from "react";
import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";

import { createQuoteRequest } from "@/app/actions/create-quote-request";
import { type CreateQuoteRequestData, createQuoteRequestFormSchema, type QuoteRequestFormData } from "@/schemas/quote-request.schema";
import { WorkshopFormProps } from "@/types/workshop-props";
import { zaehleThemen } from "@/utils/themen-auswahl";

import MobileSubmitBar from "../shared/mobile-submit-bar";
import AppointmentSelectionSection from "../shared/sections/appointment-selection-section";
import BillingAddressSection from "../shared/sections/billing-address-section";
import CompanyAddressSection from "../shared/sections/company-address-section";
import ConsentSection from "../shared/sections/consent-section";
import ContactPersonSection from "../shared/sections/contact-person-section";
import ExtrasSection from "../shared/sections/extras-section";
import ParticipantStepperSection from "../shared/sections/participant-stepper-section";
import SummarySection from "../shared/sections/summary-section";
import TurnstileWidgetSection from "../shared/sections/turnstile-widget-section";
import SubmitFooter from "../shared/submit-footer";
import { getQuoteRequestFormDefaultValues } from "./quote-request-form-default-values";
import { quoteRequestErrorMessage, quoteRequestSuccessMessage } from "./quote-request-form-status-messages";
import TopicSelectionSection from "./sections/topics-selection-section";

/** Reihenfolge der nummerierten Abschnitte; „themen“ nur bei Termin nach Absprache. */
type SectionKey = "termin" | "themen" | "teilnehmer" | "firma" | "ansprechpartner" | "rechnung" | "weiteres";

/**
 * Mehrstufiges Formular zur Anforderung eines unverbindlichen Angebots für einen
 * Workshop. Ruft bei erfolgreichem Absenden die Server Action {@link createQuoteRequest}
 * auf (Double-Opt-In per E-Mail) und zeigt das Erfolgs-/Fehler-Status-Modal an.
 * Die Termin-Pflicht im Validierungsschema hängt davon ab, ob der Workshop
 * überhaupt Termine hat (`hasAppointments`).
 *
 * @param props - Siehe {@link WorkshopFormProps}
 * @returns Das Angebotsanfrage-Formular
 */
export default function QuoteRequestForm({ 
    workshop, 
    onClose, 
    onSuccess, 
    onError 
}: WorkshopFormProps) {

    const hasAppointments = Boolean(workshop.termine && workshop.termine.length > 0);

    const agenda = workshop.agenda ?? [];

    const methods = useForm<QuoteRequestFormData>({
        defaultValues: getQuoteRequestFormDefaultValues(),
        resolver: zodResolver(
            createQuoteRequestFormSchema(
                hasAppointments,
            ),
        ),
    });

    const { control, handleSubmit, setValue } = methods;

    const [terminNachAbsprache, themenAbgewaehlt] = useWatch({
        control,
        name: ["terminNachAbsprache", "themenAbgewaehlt"],
    });

    // Themen nur ohne festen Termin und nur, wenn der Workshop eine Agenda hat
    const flexibleDate = !hasAppointments || terminNachAbsprache;
    const showTopics = flexibleDate && agenda.length > 0;
    const themenumfang = showTopics ? zaehleThemen(agenda, themenAbgewaehlt ?? []) : undefined;

    // Laufende Nummern, damit ohne Themen-Abschnitt keine Lücke entsteht (01, 02, 03 …)
    const sections: SectionKey[] = [
        "termin",
        ...(showTopics ? (["themen"] as const) : []),
        "teilnehmer",
        "firma",
        "ansprechpartner",
        "rechnung",
        "weiteres",
    ];
    const num = (key: SectionKey) => String(sections.indexOf(key) + 1).padStart(2, "0");

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);

    // Nach einem fehlgeschlagenen Versuch muss die Sicherheitsabfrage neu gelöst werden,
    // da das zuvor erzeugte Token bereits verbraucht sein könnte
    const resetTurnstile = () => {
        turnstileRef.current?.reset();
        setValue("turnstile.token", "");
    };

    /**
     * Zeigt das Fehler-Status-Modal an und setzt Turnstile zurück, damit ein
     * erneuter Versuch möglich ist.
     *
     * @param data - Die zuletzt abgesendeten Anfragedaten
     */
    function handleQuoteRequestError(
        data: CreateQuoteRequestData,
    ): void {
        onError(
            quoteRequestErrorMessage({
                titel: data.workshop.titel,
                vorname: data.ansprechpartner.vorname,
            }),
        );

        resetTurnstile();
    }

    /**
     * react-hook-form Submit-Handler: reichert die Formulardaten um die
     * Workshop-Referenz an, ruft die Server Action auf und zeigt je nach
     * Ergebnis das Erfolgs- oder Fehler-Modal.
     *
     * @param formData - Die validierten Formulardaten
     */
    const handleQuoteRequestSubmit: SubmitHandler<
        QuoteRequestFormData
    > = async (formData) => {
        const quoteRequestData =
            createQuoteRequestData(workshop, formData);

        try {
            const result = await createQuoteRequest(
                quoteRequestData,
            );

            if (!result) {
                handleQuoteRequestError(quoteRequestData);
                return;
            }

            onSuccess(
                quoteRequestSuccessMessage({
                    datumBis:
                        quoteRequestData.termin?.datumBis ??
                        null,
                    datumVon:
                        quoteRequestData.termin?.datumVon ??
                        null,
                    email:
                        quoteRequestData.ansprechpartner.email,
                    titel: quoteRequestData.workshop.titel,
                    vorname:
                        quoteRequestData.ansprechpartner
                            .vorname,
                }),
            );

            onClose?.();
        } catch (error: unknown) {
            console.error(
                "Unexpected error while creating quote request.",
                error,
            );

            handleQuoteRequestError(quoteRequestData);
        }
    };

    return (
        <>
            <FormProvider {...methods}>

                <form className="mobile-form" onSubmit={handleSubmit(handleQuoteRequestSubmit)} noValidate>

                    <div className="px-9 pb-9 pt-7 max-md:px-5 max-md:pb-6 max-md:pt-6">

                        {/* 01 Termin */}
                        <AppointmentSelectionSection 
                            num={num("termin")} 
                            termine={workshop.termine} 
                            allowFlexibleDate 
                            flexibleDateDescription={
                                agenda.length > 0
                                    ? "Remote oder Inhouse · Themen individuell zusammenstellbar"
                                    : undefined
                            }
                        />

                        {/* Themen (nur bei Termin nach Absprache) */}
                        {showTopics && (
                            <TopicSelectionSection num={num("themen")} agenda={agenda} />
                        )}

                        {/* 02 Teilnehmeranzahl */}
                        <ParticipantStepperSection num={num("teilnehmer")} />

                        {/* 03 Firma & Adresse */}
                        <CompanyAddressSection num={num("firma")} />
                        
                        {/* 04 Ansprechpartner */}
                        <ContactPersonSection num={num("ansprechpartner")} />

                        {/* 05 Rechnungsadresse */}
                        <BillingAddressSection num={num("rechnung")} />
                        
                        {/* 06 Weiteres */}
                        <ExtrasSection num={num("weiteres")} />
                        
                        {/* Zusammenfassung */}
                        <SummarySection
                            title="Voraussichtliche Angebotssumme"
                            workshop={workshop}
                            noTerminLabel={flexibleDate ? "Nach Absprache" : undefined}
                            themenumfang={themenumfang}
                        />

                        {/* Consent */}
                        <ConsentSection>
                            Ich bin mit der Verarbeitung meiner Daten gemäß{" "}
                            <Link href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary-700 no-underline">
                                Datenschutzerklärung
                            </Link>{" "}
                            einverstanden.
                        </ConsentSection>

                        {/* Turnstile */}
                        <TurnstileWidgetSection turnstileRef={turnstileRef} />

                        {/* Submit Footer */}
                        <SubmitFooter
                            hint="Unverbindlich anfordern · Angebot kommt per E-Mail"
                            buttonLabel="Angebot anfordern"
                            className="max-md:hidden"
                        />
                        
                    </div>

                    {/* Feste Fußleiste mit Gesamtsumme (nur mobil) — muss letztes Kind im <form> bleiben */}
                    <MobileSubmitBar 
                        workshop={workshop} 
                        buttonLabel="Angebot anfordern" 
                        totalLabel={themenumfang?.angepasst ? "Gesamt (vorläufig)" : undefined}
                    />

                </form>

            </FormProvider>
        </>
    );
};

/**
 * Reichert die Formulardaten um die Workshop-Referenz an, die die Server Action
 * zusätzlich zu den Formularfeldern benötigt.
 *
 * @param workshop - Der Workshop, für den das Angebot angefragt wird
 * @param formData - Die validierten Formulardaten
 * @returns Die vollständigen Daten für die Server Action {@link createQuoteRequest}
 */
function createQuoteRequestData(
    workshop: WorkshopFormProps["workshop"],
    formData: QuoteRequestFormData,
): CreateQuoteRequestData {
    return {
        ...formData,
        workshop: {
            id: workshop.id,
            titel: workshop.titel,
        },
    };
}