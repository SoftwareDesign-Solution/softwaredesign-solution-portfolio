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

export default function ContactRequestForm() {

    const { showActionStatus } = useModal();

    const methods = useForm<ContactRequestFormData>({
        defaultValues: getContactRequestFormDefaultValues(),
        resolver: zodResolver(contactRequestFormSchema),
    });

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);

    const { handleSubmit, setValue } = methods;

    const resetTurnstile = () => {
        turnstileRef.current?.reset();
        setValue("turnstile.token", "");
    };

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

function createContactRequestData(
    formData: ContactRequestFormData,
): SendContactRequestData {
    return {
        ...formData,
    };
}