 /* eslint-disable react-hooks/refs */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { TurnstileRef } from "nextjs-turnstile";
import { useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { createBooking } from "@/app/actions/create-booking";
import { type BookingFormData, bookingFormSchema, type CreateBookingData } from "@/schemas/booking.schema";
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
import { bookingErrorMessage, bookingSuccessMessage } from "./booking-form-status-messages";


export default function BookingForm({ 
    workshop, 
    onClose, 
    onSuccess, 
    onError 
}: WorkshopFormProps) {

    const methods = useForm<BookingFormData>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            termin: null,
            teilnehmerzahl: 1,
            adresse: {
                firma: "",
                strasse: "",
                plz: "",
                ort: "",
            },
            webseite: "",
            ansprechpartner: {
                anrede: "Keine Angabe",
                vorname: "",
                nachname: "",
                email: "",
                telefon: "",
            },
            teilnehmer: [
                {
                    vorname: "",
                    nachname: "",
                    email: "",
                },
            ],
            abweichendeRechnungsadresse: false,
            gutscheinCode: "",
            nachricht: "",
            turnstile: {
                token: "",
            },
        },
    });

    const { handleSubmit } = methods;

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);

    const resetTurnstile = () => {
        turnstileRef.current?.reset();
        methods.setValue("turnstile.token", "");
    };

    const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
        
        const bookingData: CreateBookingData = {
            workshop: {
                id: workshop.id,
                titel: workshop.titel,
            },
            ...data,
        };

        try {
            
            const result = await createBooking(bookingData);

            if (result.bookingId) {

                const shortReference = result.bookingId.split("-")[0];

                onSuccess(bookingSuccessMessage({
                    titel: workshop.titel,
                    ref: String(shortReference),
                    vorname: bookingData.ansprechpartner.vorname,
                    email: bookingData.ansprechpartner.email,
                    teilnehmerzahl: bookingData.teilnehmer.length,
                    datumVon: String(bookingData.termin?.datumVon),
                    datumBis: String(bookingData.termin?.datumBis),
                }));

                onClose?.();

            }
        } catch (error) {
            
            console.error("Fehler beim Absenden der Buchung:", error);

            onError(bookingErrorMessage({
                titel: workshop.titel,
                vorname: bookingData.ansprechpartner.vorname,
            }));

            resetTurnstile();

        }
       
    };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="px-9 pb-9" noValidate>

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