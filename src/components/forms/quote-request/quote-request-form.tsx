/* eslint-disable react-hooks/refs */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { TurnstileRef } from "nextjs-turnstile";
import { useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { createQuoteRequest } from "@/app/actions/create-quote-request";
import { type CreateQuoteRequestData, createQuoteRequestFormSchema, type QuoteRequestFormData } from "@/schemas/quote-request.schema";
import { WorkshopFormProps } from "@/types/workshop-props";

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

export default function QuoteRequestForm({ 
    workshop, 
    onClose, 
    onSuccess, 
    onError 
}: WorkshopFormProps) {

    const hasAppointments = Boolean(workshop.termine && workshop.termine.length > 0);

    const methods = useForm<QuoteRequestFormData>({
        defaultValues: getQuoteRequestFormDefaultValues(),
        resolver: zodResolver(
            createQuoteRequestFormSchema(
                hasAppointments,
            ),
        ),
    });

    const { handleSubmit, setValue } = methods;

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);

    const resetTurnstile = () => {
        turnstileRef.current?.reset();
        setValue("turnstile.token", "");
    };

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

                <form onSubmit={handleSubmit(handleQuoteRequestSubmit)} noValidate>

                    <div className="px-9 pb-9 pt-7">

                        {/* 01 Termin */}
                        <AppointmentSelectionSection num="01" termine={workshop.termine} />

                        {/* 02 Teilnehmeranzahl */}
                        <ParticipantStepperSection num="02" />

                        {/* 03 Firma & Adresse */}
                        <CompanyAddressSection num="03" />
                        
                        {/* 04 Ansprechpartner */}
                        <ContactPersonSection num="04" />

                        {/* 05 Rechnungsadresse */}
                        <BillingAddressSection num="05" />
                        
                        {/* 06 Weiteres */}
                        <ExtrasSection num="06" />
                        
                        {/* Zusammenfassung */}
                        <SummarySection title="Voraussichtliche Angebotssumme" workshop={workshop} noTerminLabel={hasAppointments ? undefined : "Nach Absprache"} />

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
                        />
                        
                    </div>

                </form>

            </FormProvider>
        </>
    );
};

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