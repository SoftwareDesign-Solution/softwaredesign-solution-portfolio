"use client";

import { SubmitHandler, useForm, useWatch, FormProvider } from "react-hook-form";
import Link from "next/link";
import type { Workshop } from "@/types/workshop";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteRequestData, type QuoteRequestFormData, quoteRequestFormSchema } from "@/schemas/forms/quote-request.schema";
import { useState } from "react";
import ContactPersonSection from "../shared/sections/contact-person-section";
import CompanyAddressSection from "../shared/sections/company-address-section";
import ParticipantStepperSection from "../shared/sections/participant-stepper-section";
import AppointmentSelectionSection from "../shared/sections/appointment-selection-section";
import BillingAddressSection from "../shared/sections/billing-address-section";
import ConsentSection from "../shared/sections/consent-section";
import SummarySection from "../shared/sections/summary-section";
import ExtrasSection from "../shared/sections/extras-section";
import SubmitFooter from "../shared/submit-footer";

export default function QuoteRequestForm() {

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

    const methods = useForm<QuoteRequestFormData>({
        resolver: zodResolver(quoteRequestFormSchema),
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
            abweichendeRechnungsadresse: false,
            /*
            rechnungsadresse: {
                firma: "",
                strasse: "",
                plz: "",
                ort: "",
            },
            */
            notizen: "",
            consent: false,
        },
    });

    const { control, handleSubmit } = methods;

    const [formData, setFormData] = useState<QuoteRequestData | null>(null);

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

    const onSubmit: SubmitHandler<QuoteRequestFormData> = (data) => {
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

                <form onSubmit={handleSubmit(onSubmit)}>

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
                        <SummarySection title="Voraussichtliche Angebotssumme" workshop={workshop} />

                        {/* Consent */}
                        <ConsentSection>
                            Ich bin mit der Verarbeitung meiner Daten gemäß{" "}
                            <Link href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary-700 no-underline">
                                Datenschutzerklärung
                            </Link>{" "}
                            einverstanden.
                        </ConsentSection>

                        {/* Submit Footer */}
                        <SubmitFooter
                            hint="Unverbindlich anfordern · Angebot kommt per E-Mail"
                            buttonLabel="Angebot anfordern"
                        />
                        
                    </div>

                    <div className="mt-8 rounded-lg border border-border bg-surface p-4 text-[13px] text-foreground">
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(formData, null, 2)}
                        </pre>
                    </div>

                </form>

            </FormProvider>
        </>
    );
};