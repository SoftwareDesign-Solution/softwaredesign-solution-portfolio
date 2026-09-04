/**
 * @file booking-form.tsx
 * @description Mehrstufiges Buchungsformular für einen Workshop (Termin,
 * Teilnehmer, Adressen, Zusammenfassung, Zustimmung, Turnstile).
 * @module components/forms/booking/booking-form
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/* eslint-disable react-hooks/refs */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { TurnstileRef } from "nextjs-turnstile";
import { useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { createBooking } from "@/app/actions/create-booking";
import { type BookingFormData, BookingFormInput, bookingFormSchema, type CreateBookingData } from "@/schemas/booking.schema";
import { WorkshopFormProps } from "@/types/workshop-props";

import AppointmentSelectionSection from "../shared/sections/appointment-selection-section";
import BillingAddressSection from "../shared/sections/billing-address-section";
import CompanyAddressSection from "../shared/sections/company-address-section";
import ConsentSection from "../shared/sections/consent-section";
import ContactPersonSection from "../shared/sections/contact-person-section";
import ExtrasSection from "../shared/sections/extras-section";
import ParticipantStepperSection from "../shared/sections/participant-stepper-section";
import ParticipantsSection from "../shared/sections/participants-section";
import SummarySection from "../shared/sections/summary-section";
import TurnstileWidgetSection from "../shared/sections/turnstile-widget-section";
import SubmitFooter from "../shared/submit-footer";
import { getBookingFormDefaultValues } from "./booking-form-default-values";
import { bookingErrorMessage, bookingSuccessMessage } from "./booking-form-status-messages";

/**
 * Mehrstufiges Buchungsformular für einen Workshop (Termin, Teilnehmer, Adressen,
 * Zusammenfassung, Zustimmung, Turnstile). Ruft bei erfolgreichem Absenden die
 * Server Action {@link createBooking} auf und zeigt anschließend das Erfolgs-
 * bzw. Fehler-Status-Modal über `onSuccess`/`onError` an.
 *
 * @param props - Siehe {@link WorkshopFormProps}
 * @returns Das Buchungsformular
 */
export default function BookingForm({ 
    workshop, 
    onClose, 
    onSuccess, 
    onError 
}: WorkshopFormProps) {

    const methods = useForm<
        BookingFormInput,
        null,
        BookingFormData
    >({
        defaultValues: getBookingFormDefaultValues(),
        resolver: zodResolver(bookingFormSchema),
    });

    const { handleSubmit, setValue } = methods;

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
     * @param bookingData - Die zuletzt abgesendeten Buchungsdaten
     */
    function handleBookingError(
        bookingData: CreateBookingData,
    ): void {
        onError(
            bookingErrorMessage({
                titel: workshop.titel,
                vorname:
                    bookingData.ansprechpartner.vorname,
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
    const handleBookingSubmit: SubmitHandler<BookingFormData> = async (formData) => {
        
        const bookingData = createBookingData(
            workshop,
            formData,
        );

        try {
            
            const result = await createBooking(bookingData);

            if (!result.bookingId) {
                handleBookingError(bookingData);
                return;
            }

            const bookingReference =
                getShortBookingReference(result.bookingId);

            onSuccess(bookingSuccessMessage({
                titel: workshop.titel,
                ref: bookingReference,
                vorname: bookingData.ansprechpartner.vorname,
                email: bookingData.ansprechpartner.email,
                teilnehmerzahl: bookingData.teilnehmer.length,
                datumVon: String(bookingData.termin?.datumVon),
                datumBis: String(bookingData.termin?.datumBis),
            }));

            onClose?.();
            
        } catch (error) {
            
            console.error("Fehler beim Absenden der Buchung:", error);

            handleBookingError(bookingData);

        }
       
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleBookingSubmit)} className="px-9 pb-9" noValidate>

                    {/* 01 Termin */}
                    <AppointmentSelectionSection num="01" termine={workshop.termine} />

                    {/* 02 Teilnehmeranzahl */}
                    <ParticipantStepperSection num="02" />

                    {/* 03 Firma & Adresse */}
                    <CompanyAddressSection num="03" />
                    
                    {/* 04 Ansprechpartner */}
                    <ContactPersonSection num="04" />
                    
                    {/* 05 Teilnehmer:innen */}
                    <ParticipantsSection num="05" />
                    
                    {/* 06 Rechnungsadresse */}
                    <BillingAddressSection num="06" />
                    
                    {/* 07 Weiteres */}
                    <ExtrasSection num="07" showVoucherCode />
                    
                    {/* Zusammenfassung */}
                    <SummarySection title="Zusammenfassung" workshop={workshop} />

                    {/* Consent */}
                    <ConsentSection>
                        Ich bestätige die{" "}
                        <Link href="/agb" target="_blank" rel="noopener noreferrer" className="text-primary-700 no-underline">
                            AGB
                        </Link>{" "}
                        inkl.{" "}
                        <Link href="/agb#widerruf" target="_blank" rel="noopener noreferrer" className="text-primary-700 no-underline">
                            Widerrufsbelehrung
                        </Link>{" "}
                        und bin mit der Verarbeitung meiner Daten gemäß{" "}
                        <Link href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary-700 no-underline">
                            Datenschutzerklärung
                        </Link>{" "}
                        einverstanden.
                    </ConsentSection>

                    {/* Turnstile */}
                    <TurnstileWidgetSection turnstileRef={turnstileRef} />

                    {/* Submit Footer */}
                    <SubmitFooter
                        hint="Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Sicherheitsabfrage."
                        buttonLabel="Verbindlich buchen"
                    />

                </form>
            </FormProvider>
        </>
    );
}

/**
 * Reichert die Formulardaten um die Workshop-Referenz an, die die Server Action
 * zusätzlich zu den Formularfeldern benötigt.
 *
 * @param workshop - Der Workshop, für den gebucht wird
 * @param formData - Die validierten Formulardaten
 * @returns Die vollständigen Daten für die Server Action {@link createBooking}
 */
function createBookingData(
    workshop: WorkshopFormProps["workshop"],
    formData: BookingFormData,
): CreateBookingData {
    return {
        ...formData,
        workshop: {
            id: workshop.id,
            titel: workshop.titel,
        },
    };
}

/**
 * Kürzt die Buchungs-ID auf den ersten UUID-Abschnitt, für eine kurze,
 * vorzeigbare Referenz im Erfolgs-Modal.
 *
 * @param bookingId - Die vollständige UUID der Buchung
 * @returns Der erste Abschnitt der UUID (vor dem ersten Bindestrich)
 */
function getShortBookingReference(
    bookingId: string,
): string {
    return bookingId.split("-")[0];
}