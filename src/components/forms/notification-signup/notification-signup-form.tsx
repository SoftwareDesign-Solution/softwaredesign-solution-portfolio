"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NotificationSignupData, NotificationSignupFormData, notificationSignupFormSchema } from "@/schemas/forms/notification-signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Workshop } from "@/types/workshop";
import Label from "../shared/label";
import TextField from "../shared/text-field";
import ErrorMessage from "../shared/error-message";
import Button from "@/components/ui/button";
import { WorkshopFormProps } from "@/types/workshop-props";
import TurnstileWidgetSection from "../shared/sections/turnstile-widget-section";
import { TurnstileRef } from "nextjs-turnstile";

export default function NotificationSignupForm({ 
    workshop, 
    onClose, 
    onSuccess, 
    onError 
}: WorkshopFormProps) {

    const methods = useForm<NotificationSignupFormData>({
        resolver: zodResolver(notificationSignupFormSchema),
        defaultValues: {
            vorname: "",
            nachname: "",
            email: "",
            turnstile: {
                token: "",
            },
        },
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = methods;

    const [formData, setFormData] = useState<NotificationSignupData | null>(null);

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);
    
    const onSubmit: SubmitHandler<NotificationSignupFormData> = (data) => {
        //console.log(methods.formState.errors);
        //console.log("Booking submitted:", { workshop: 'Test', ...data });
        //alert("Booking submitted: " + JSON.stringify({ workshop: 'Test', ...data }, null, 2));

        setFormData({
            workshop: {
                id: workshop.id,
                titel: workshop.titel
            },
            ...data});
        //console.log("Form data:", data);
        //alert("Form data: " + JSON.stringify(data, null, 2));
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="pt-7 px-7 pb-7">

                    <p className="mb-5.5 text-[14px] leading-[1.55] text-neutral-500">
                        Trag dich kurz ein und wir informieren dich per E-Mail, sobald ein neuer Termin zum Workshop &quot;{workshop.titel}&quot; verfügbar ist.
                    </p>

                    <div className="mb-4 grid grid-cols-2 gap-x-3.5">

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

                    {/*
                    <div className="mt-5.5 flex justify-end gap-2.5">

                        <button
                            type="button"
                            className="rounded-md border border-neutral-200 bg-white px-4.5 py-3 text-[14px] font-medium text-neutral-800 transition hover:bg-neutral-50"
                        >
                            Abbrechen
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`rounded-md px-6 py-3 text-[14.5px] font-semibold text-white transition ${
                                isSubmitting
                                    ? "cursor-not-allowed bg-primary-700/50"
                                    : "cursor-pointer bg-primary-700 hover:bg-primary-700/90"
                                }
                            `}
                            >
                                {isSubmitting ? "Wird gesendet …" : "Bestätigen"}
                        </button>

                    </div>
                    */}

                    <TurnstileWidgetSection turnstileRef={turnstileRef} />

                    <div className="mt-5.5 flex justify-end gap-2.5">

                        <Button type="button" variant="secondary" size="xs">Abbrechen</Button>
                        
                        <Button type="submit" variant="primary" size="sm" isSubmitting={isSubmitting}>
                            Bestätigen
                        </Button>

                    </div>

                    <div className="mt-4.5 text-[11.5px] leading-[1.55] text-muted">
                        Wir nutzen deine Daten ausschließlich, um dich bei neuen Terminen zu benachrichtigen.
                        Nach Klick auf &quot;Bestätigen&quot; senden wir dir eine Mail mit Bestätigungs-Link
                        (Double-Opt-In). Abmeldung jederzeit über den Link in jeder Benachrichtigung.
                    </div>

                    <div className="mt-4.5 text-muted text-[13px]">
                        
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(formData, null, 2)}
                        </pre>

                    </div>

                </div>
            </form>
        </FormProvider>
    );
};