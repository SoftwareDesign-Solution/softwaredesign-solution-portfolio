 /* eslint-disable react-hooks/refs */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TurnstileRef } from "nextjs-turnstile";
import { useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { createNotificationSignup } from "@/app/actions/create-notification-signup";
import Button from "@/components/ui/button";
import { CreateNotificationSignupData, NotificationSignupFormData, notificationSignupFormSchema } from "@/schemas/notification-signup.schema";
import { WorkshopFormProps } from "@/types/workshop-props";

import ErrorMessage from "../shared/error-message";
import Label from "../shared/label";
import TurnstileWidgetSection from "../shared/sections/turnstile-widget-section";
import TextField from "../shared/text-field";
import { getNotificationSignupFormDefaultValues } from "./notification-signup-form-default-values";
import { notificationSignupErrorMessage, notificationSignupSuccessMessage } from "./notification-signup-form-status-messages";


export default function NotificationSignupForm({ 
    workshop, 
    onClose, 
    onSuccess, 
    onError 
}: WorkshopFormProps) {

    const methods = useForm<NotificationSignupFormData>({
        defaultValues: getNotificationSignupFormDefaultValues(),
        resolver: zodResolver(notificationSignupFormSchema),
    });

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);

    const { 
        formState: { 
            errors, 
            isSubmitting 
        }, 
        handleSubmit, 
        register, 
        setValue 
    } = methods;


    const resetTurnstile = () => {
        turnstileRef.current?.reset();
        setValue("turnstile.token", "");
    };
    
    function handleNotificationSignupError(
        data: CreateNotificationSignupData,
    ): void {
        onError(notificationSignupErrorMessage({
            vorname: data.vorname,
        }));

        resetTurnstile();
    }

    const handleNotificationSignupSubmit: SubmitHandler<NotificationSignupFormData> = async (data) => {
        
        const notificationSignupData: CreateNotificationSignupData = createNotificationSignupData(workshop, data);
        
        try {
            
            const result = await createNotificationSignup(notificationSignupData);

            if (!result.notificationSignupId) {
                handleNotificationSignupError(notificationSignupData);
                return;
            }

            const notificationSignupReference =
                getShortNotificationSignupReference(result.notificationSignupId);

            onSuccess(notificationSignupSuccessMessage({
                workshopTitle: workshop.titel,
                vorname: notificationSignupData.vorname,
                email: notificationSignupData.email,
                ref: notificationSignupReference,
                status: "pending",
            }))

            onClose?.();

        } catch (error) {

            console.error(
                "Unexpected error while creating notification signup.",
                error,
            );

            handleNotificationSignupError(notificationSignupData);

        }

    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleNotificationSignupSubmit)} noValidate>

                <div className="pt-7 px-7 pb-7">

                    <p className="mb-5.5 text-[14px] leading-[1.55] text-neutral-500">
                        Trag dich kurz ein und wir informieren dich per E-Mail, sobald ein neuer Termin zum Workshop &quot;{workshop.titel}&quot; verfügbar ist.
                    </p>

                    <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">

                        <div>
                            <Label>Vorname</Label>
                            <TextField
                                type="text"
                                placeholder="Vorname"
                                {...register("vorname")}
                            />
                            {errors.vorname && <ErrorMessage message={errors.vorname.message} />}
                        </div>

                        <div>
                            <Label>Nachname</Label>
                            <TextField
                                type="text"
                                placeholder="Nachname"
                                {...register("nachname")}
                            />
                            {errors.nachname && <ErrorMessage message={errors.nachname.message} />}
                        </div>

                    </div>

                    <div className="mb-4">

                        <Label>E-Mail-Adresse</Label>
                        <TextField
                            type="email"
                            placeholder="E-Mail-Adresse"
                            {...register("email")}
                        />
                        {errors.email && <ErrorMessage message={errors.email.message} />}

                    </div>

                    <TurnstileWidgetSection turnstileRef={turnstileRef} />

                    <div className="mt-5.5 flex justify-end gap-2.5">

                        <Button type="button" variant="secondary" size="xs" onClick={onClose}>Abbrechen</Button>
                        
                        <Button type="submit" variant="primary" size="sm" isSubmitting={isSubmitting}>
                            Bestätigen
                        </Button>

                    </div>

                    <div className="mt-4.5 text-[11.5px] leading-[1.55] text-muted">
                        Wir nutzen deine Daten ausschließlich, um dich bei neuen Terminen zu benachrichtigen.
                        Nach Klick auf &quot;Bestätigen&quot; senden wir dir eine Mail mit Bestätigungs-Link
                        (Double-Opt-In). Abmeldung jederzeit über den Link in jeder Benachrichtigung.
                    </div>

                </div>
            </form>
        </FormProvider>
    );
};

function createNotificationSignupData(
    workshop: WorkshopFormProps["workshop"],
    formData: NotificationSignupFormData,
): CreateNotificationSignupData {
    return {
        ...formData,
        workshop: {
            id: workshop.id,
            titel: workshop.titel,
        },
    };
}

function getShortNotificationSignupReference(
    notificationSignupId: string,
): string {
    return notificationSignupId.split("-")[0];
}