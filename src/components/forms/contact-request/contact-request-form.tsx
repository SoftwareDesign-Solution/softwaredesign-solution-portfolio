 /**
 * @file contact-request-form.tsx
 * @description Allgemeines Kontaktformular auf der /anfrage-Seite (nicht
 * workshop-gebunden): Unternehmensdaten, persönliche Daten, freie Beschreibung
 * sowie Herkunftsquelle.
 * @module components/forms/contact-request/contact-request-form
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

 /* eslint-disable react-hooks/refs */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TurnstileRef } from "nextjs-turnstile";
import { useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { sendContactRequest } from "@/app/actions/send-contact-request";
import { useModal } from "@/providers/modal-provider";
import { type ContactRequestFormData, contactRequestFormSchema, type SendContactRequestData } from "@/schemas/contact-request.schema";

import { getContactRequestFormDefaultValues } from "./contact-request-form-default-values";
import { contactRequestErrorMessage, contactRequestSuccessMessage } from "./contact-request-form-status-messages";
import CompanyDataSection from "./sections/company-data-section";
import ContactDataSection from "./sections/contact-data-section";
import RequestDescriptionSection from "./sections/request-description-section";
import RequestSubmitSection from "./sections/request-submit-section";

/**
 * Allgemeines Kontaktformular auf der /anfrage-Seite (nicht workshop-gebunden):
 * Unternehmensdaten, persönliche Daten, freie Beschreibung sowie Herkunftsquelle.
 * Ruft bei erfolgreichem Absenden die Server Action {@link sendContactRequest} auf
 * und zeigt das Ergebnis über den globalen {@link useModal}-Kontext an. Setzt das
 * Formular nach erfolgreichem Absenden zurück, damit eine weitere Anfrage möglich ist.
 *
 * @returns Das Kontaktformular
 */
export default function ContactRequestForm() {

    const { showActionStatus } = useModal();

    const methods = useForm<ContactRequestFormData>({
        defaultValues: getContactRequestFormDefaultValues(),
        resolver: zodResolver(contactRequestFormSchema),
    });

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);

    const { handleSubmit, setValue } = methods;

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
     * @param data - Die zuletzt abgesendeten Kontaktdaten
     */
    function handleContactRequestError(
        data: SendContactRequestData,
    ): void {
        showActionStatus(
            contactRequestErrorMessage({
                vorname:
                    data.ansprechpartner.vorname,
            }),
        );

        resetTurnstile();
    }
    
    /**
     * react-hook-form Submit-Handler: ruft die Server Action auf und zeigt je nach
     * Ergebnis das Erfolgs- oder Fehler-Modal; setzt das Formular bei Erfolg zurück.
     *
     * @param formData - Die validierten Formulardaten
     */
    const handleContactRequestSubmit: SubmitHandler<ContactRequestFormData> = async (formData) => {
        
        const contactRequestData =
            createContactRequestData(formData);

        try {

            const result = await sendContactRequest(contactRequestData);

            if (!result.success) {
                handleContactRequestError(contactRequestData);
                return;
            }

            showActionStatus(contactRequestSuccessMessage({
                vorname: contactRequestData.ansprechpartner.vorname,
                email: contactRequestData.ansprechpartner.email,
            }));

            methods.reset();
            resetTurnstile();
            
        } catch (error) {
            
            console.error(
                "Unexpected error while sending contact request.",
                error,
            );

            handleContactRequestError(
                contactRequestData,
            );

        }
            
    };
      
    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleContactRequestSubmit)} noValidate>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <CompanyDataSection />

                        <ContactDataSection />

                        <RequestDescriptionSection />

                        <RequestSubmitSection
                            turnstileRef={turnstileRef}
                        />

                    </div>

                </form>
            </FormProvider>
        </>
    );
}

/**
 * Wandelt die Formulardaten in die von der Server Action erwarteten Daten um.
 * Da das Kontaktformular (anders als die Workshop-Formulare) keinen zusätzlichen
 * Kontext benötigt, ist dies aktuell eine reine Weiterreichung.
 *
 * @param formData - Die validierten Formulardaten
 * @returns Die Daten für die Server Action {@link sendContactRequest}
 */
function createContactRequestData(
    formData: ContactRequestFormData,
): SendContactRequestData {
    return {
        ...formData,
    };
}