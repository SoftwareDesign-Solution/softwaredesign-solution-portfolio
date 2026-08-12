"use client";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { BookingData, bookingFormSchema, type BookingFormData } from "@/schemas/forms/booking.schema";
import { Workshop } from "@/types/workshop";
import { zodResolver } from "@hookform/resolvers/zod";
import AppointmentSelectionSection from "../shared/sections/appointment-selection-section";
import ParticipantStepperSection from "../shared/sections/participant-stepper-section";
import CompanyAddressSection from "../shared/sections/company-address-section";
import ContactPersonSection from "../shared/sections/contact-person-section";
import BillingAddressSection from "../shared/sections/billing-address-section";
import ExtrasSection from "../shared/sections/extras-section";
import ParticipantsSection from "../shared/sections/participants-section";
import SummarySection from "../shared/sections/summary-section";
import ConsentSection from "../shared/sections/consent-section";
import SubmitFooter from "../shared/submit-footer";

export default function BookingForm() {

    const workshop: Workshop = {
        id: 1,
        slug: "beispiel-workshop",
        titel: "Beispiel Workshop",
        preis: 100,
        active: true,
        dauer: "2 Tage",
        termine: [
            {
                id: 1,
                workshop_id: 1,
                datumVon: "2024-07-01",
                datumBis: "2024-07-04",
                format: "Online",
                status: "verfuegbar",
                active: true,
            },
            {
                id: 2,
                workshop_id: 1,
                datumVon: "2024-07-07",
                datumBis: "2024-07-10",
                format: "Online",
                status: "verfuegbar",
                active: true,
            }
        ]
    };
    
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
            /*
            rechnungsadresse: {
                firma: "",
                strasse: "",
                plz: "",
                ort: "",
            },
            */
            gutscheinCode: "",
            notizen: "",
            consent: false,
        },
    });

    const { control, handleSubmit } = methods;

    const [formData, setFormData] = useState<BookingData | null>(null);


    // 02 - Teilnehmeranzahl
    const participantCount = useWatch({
        control,
        name: "teilnehmerzahl",
    });


    // Zusammenfassung
    const participantCountLabel = Math.min(Math.max(Number(participantCount) || 1, 1), 20);
    const subtotal = Number(workshop.preis) * participantCountLabel;
    const vat = Math.round(subtotal * 0.19);
    const total = subtotal + vat;

    const onSubmit: SubmitHandler<BookingFormData> = (data) => {
        //console.log(methods.formState.errors);
        //console.log("Booking submitted:", { workshop: 'Test', ...data });
        //alert("Booking submitted: " + JSON.stringify({ workshop: 'Test', ...data }, null, 2));

        setFormData({
            workshop: {
                id: workshop.id,
                titel: workshop.titel
            },
            ...data,
            summary: {
                preis: Number(workshop.preis),
                teilnehmerzahl: participantCountLabel,
                zwischensumme: subtotal,
                umsatzsteuer: vat,
                gesamtbetrag: total
            }
        });
  };

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="px-9 pb-9">

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
                    
                    

                    {/* Submit Footer */}
                    <SubmitFooter
                        hint="Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Sicherheitsabfrage."
                        buttonLabel="Verbindlich buchen"
                    />

                    <div className="mt-8 rounded-lg border border-border bg-surface p-4 text-[13px] text-foreground">
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(formData, null, 2)}
                        </pre>
                    </div>

                </form>
            </FormProvider>
        </>
    );
}