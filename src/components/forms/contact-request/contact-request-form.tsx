/* eslint-disable react-hooks/refs */
"use client";

import { useRef, useState } from "react";
import { SubmitHandler, useForm, useWatch, FormProvider } from "react-hook-form";
import { type ContactRequestFormData, contactRequestFormSchema } from "@/schemas/forms/contact-request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddressFields from "../shared/address-fields";
import Label from "../shared/label";
import TextField from "../shared/text-field";
import SelectField from "../shared/select-field";
import ErrorMessage from "../shared/error-message";
import Link from "next/dist/client/link";
import TurnstileWidgetSection from "../shared/sections/turnstile-widget-section";
import { TurnstileRef } from "nextjs-turnstile";
import { sendContactRequest } from "@/app/actions/send-contact-request";
import { contactRequestErrorMessage, contactRequestSuccessMessage } from "./contact-request-form-status-messages";
import { useModal } from "@/providers/modal-provider";

export default function ContactRequestForm() {

    const { showActionStatus } = useModal();

    const methods = useForm<ContactRequestFormData>({
        resolver: zodResolver(contactRequestFormSchema),
        defaultValues: {
            adresse: {
                firma: "",
                strasse: "",
                plz: "",
                ort: "",
            },
            webseite: "",
            bereitsKunde: false,
            ansprechpartner: {
                anrede: "Keine Angabe",
                vorname: "",
                nachname: "",
                email: "",
                telefon: "",
            },
            nachricht: "",
            turnstile: {
                token: "",
            },
        },
    });

    const { formState, handleSubmit, register } = methods;

    const [formData, setFormData] = useState<ContactRequestFormData | null>(null);

    const messageLength = useWatch({
        control: methods.control,
        name: "nachricht",
        defaultValue: "",
    })?.length ?? 0;

    // Datenschutzerklärung & Sicherheitsabfrage (Turnstile)
    const turnstileRef = useRef<TurnstileRef>(null);

    const resetTurnstile = () => {
        turnstileRef.current?.reset();
        methods.setValue("turnstile.token", "");
    };
    
    const onSubmit: SubmitHandler<ContactRequestFormData> = async (data) => {
        //console.log(methods.formState.errors);
        //console.log("Booking submitted:", { workshop: 'Test', ...data });
        //alert("Booking submitted: " + JSON.stringify({ workshop: 'Test', ...data }, null, 2));

        setFormData({...data});
        //console.log("Form data:", data);
        //alert("Form data: " + JSON.stringify(data, null, 2));

        try {

            await sendContactRequest(data);

            showActionStatus(contactRequestSuccessMessage({
                vorname: data.ansprechpartner.vorname,
                email: data.ansprechpartner.email,
            }));

            methods.reset();
            resetTurnstile();
            
        } catch (error) {
            
            showActionStatus(contactRequestErrorMessage({
                vorname: data.ansprechpartner.vorname,
            }));

            /*
             * Das bereits geprüfte Turnstile-Token ist nur einmal
             * verwendbar. Für einen erneuten Versuch zurücksetzen.
             */
            resetTurnstile();

        }
            
    };
      
    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Unternehmensdaten */}
                        <div className="rounded-lg border border-border bg-white px-10 py-9 shadow-sm">

                            <h2 className="mb-2 text-xl md:text-3xl font-bold leading-[1.1] tracking-[-0.8px] text-foreground">
                                Unternehmensdaten
                            </h2>

                            <p className="mb-7 text-[13.5px] leading-[1.55] text-muted">
                                Die folgenden Daten werden für den Schriftwechsel (Angebote, Rechnungen, Verschwiegenheitsvereinbarungen etc.) benötigt.
                            </p>

                            <AddressFields name="adresse" />

                            <div className="mb-4">
                            
                                {/* Label.tsx */}
                                <Label>Webseite (optional)</Label>
                
                                {/* Webseite */}
                                <TextField
                                    {...register("webseite")}
                                />
                
                            </div>

                            <label className="flex cursor-pointer select-none items-start gap-2.5 text-[13.5px] leading-[1.55] text-foreground">
                                <input type="checkbox" className="mt-0.5 h-4 w-4" {...register("bereitsKunde")} />
                                <span>Sind Sie bereits Kunde bei mir?</span>
                            </label>

                        </div>

                        {/* Persönliche Daten */}
                        <div className="rounded-lg border border-border bg-white px-10 py-9 shadow-sm">

                            <h2 className="mb-2 text-xl md:text-3xl font-bold leading-[1.1] tracking-[-0.8px] text-foreground">
                                Persönliche Daten
                            </h2>
                            <p className="mb-7 text-[13.5px] leading-[1.55] text-muted">
                                Die folgenden Daten werden benötigt, um Sie bezüglich der Anfrage und einer Terminvereinbarung zu einem Vorgespräch zu kontaktieren.
                            </p>

                            <div className="grid grid-cols-1 gap-x-3.5">
                            
                                <div className="mb-4">
                
                                    {/* Label.tsx */}
                                    <Label>Anrede</Label>
                
                                    {/* Anrede */}
                                    <SelectField
                                        options={[
                                            { value: "Frau", label: "Frau" },
                                            { value: "Herr", label: "Herr" },
                                            { value: "Divers", label: "Divers" },
                                            { value: "Keine Angabe", label: "Keine Angabe" },
                                        ]}
                                        {...register("ansprechpartner.anrede", { required: "Bitte wählen Sie eine Anrede aus." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.ansprechpartner?.anrede && (
                                        <ErrorMessage message={formState.errors.ansprechpartner.anrede.message} />
                                    )}
                
                                </div>
                
                                <div className="mb-4">
                
                                    {/* Label.tsx */}
                                    <Label>Vorname</Label>
                
                                    {/* Vorname */}
                                    <TextField
                                        {...register("ansprechpartner.vorname", { required: "Bitte geben Sie den Vornamen an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.ansprechpartner?.vorname && (
                                        <ErrorMessage message={formState.errors.ansprechpartner.vorname.message} />
                                    )}
                
                                </div>
                
                                <div className="mb-4">
                
                                    {/* Label.tsx */}
                                    <Label>Nachname</Label>
                
                                    {/* Nachname */}
                                    <TextField
                                        {...register("ansprechpartner.nachname", { required: "Bitte geben Sie den Nachnamen an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.ansprechpartner?.nachname && (
                                        <ErrorMessage message={formState.errors.ansprechpartner.nachname.message} />
                                    )}
                
                                </div>
                
                                <div className="mb-4">
                
                                    {/* Label.tsx */}
                                    <Label>E-Mail</Label>
                
                                    {/* E-Mail */}
                                    <TextField
                                        type="email"
                                        {...register("ansprechpartner.email", { required: "Bitte geben Sie die E-Mail-Adresse an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.ansprechpartner?.email && (
                                        <ErrorMessage message={formState.errors.ansprechpartner.email.message} />
                                    )}
                
                                </div>
                
                            </div>

                        </div>

                        {/* Beschreibung */}
                        <div className="mt-2 col-span-2 rounded-lg border border-border bg-white px-10 py-9 shadow-sm">

                            <h2 className="mb-2 text-xl md:text-3xl font-bold leading-[1.1] tracking-[-0.8px] text-foreground">
                                Beschreibung
                            </h2>
                            <p className="mb-7 text-[13.5px] leading-[1.55] text-muted">
                                Beschreiben Sie den Grund Ihrer Anfrage im Folgenden so präzise wie möglich.
                            </p>

                            <textarea
                                className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 min-h-45 resize-y leading-[1.55]"
                                maxLength={4000}
                                {...register("nachricht", {
                                    required: "Pflichtfeld",
                                    minLength: { value: 20, message: "Mindestens 20 Zeichen." },
                                    maxLength: { value: 4000, message: "Maximal 4000 Zeichen." },
                                })}
                            />

                            <div className="mt-2.5 flex items-center justify-between text-[12px] text-neutral-500">
                                <span>
                                    {formState.errors.nachricht ? (
                                        <span className="text-red-600">{formState.errors.nachricht.message}</span>
                                    ) : (
                                        "Mindestens 20 Zeichen."
                                    )}
                                </span>
                                <span className="font-mono">
                                    {messageLength} / 4000
                                </span>
                            </div>

                        </div>

                        {/* Quelle + Einwilligung + Submit */}
                        <div className="mt-2 py-7 col-span-2 rounded-lg border border-border bg-white px-10 shadow-sm">
                            
                            <div className="mb-4.5">
                                <Label className="text-muted">
                                    Wie sind Sie auf mich aufmerksam geworden? <span className="text-error-700">*</span>
                                </Label>
                                <SelectField 
                                    options={[
                                        { value: "None", label: "Nicht angegeben" },
                                        { value: "Magazine", label: "Magazin" },
                                        { value: "Conference", label: "Konferenz" },
                                        { value: "Youtube", label: "YouTube" },
                                        { value: "PersonalRecommendation", label: "Persönliche Empfehlung" },
                                        { value: "SocialMedia", label: "Social Media" },
                                    ]}
                                    {...register("source", { required: "Bitte wählen Sie eine Option aus." })}
                                />

                            </div>

                            <label className="flex cursor-pointer select-none items-start gap-2.5 text-[13.5px] leading-[1.55] text-foreground">

                                <input
                                    type="checkbox"
                                    className="mt-0.5 h-4 w-4 accent-primary-700"
                                    {...register("acceptDataProcessing", { required: true })}
                                />

                                <span>
                                    Ich erkläre mich damit einverstanden, dass die obenstehenden Daten zur Bearbeitung meiner
                                    Anfrage gespeichert werden. Hinweise zur Datenverarbeitung finden sich in der{" "}
                                    <Link
                                        href="/datenschutz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border-b border-primary-700 text-primary-700 no-underline"
                                    >
                                        Datenschutzerklärung
                                    </Link>
                                    .
                                </span>

                            </label>

                            {formState.errors.acceptDataProcessing && (
                                <ErrorMessage message={formState.errors.acceptDataProcessing.message} />
                            )}

                            <TurnstileWidgetSection turnstileRef={turnstileRef} />

                            <div className="mt-6 flex flex-col items-center gap-2.5">

                                <button
                                    type="submit"
                                    disabled={formState.isSubmitting}
                                    className={`rounded-md px-7.5 py-3.5 text-[15px] font-semibold tracking-wide text-white transition ${
                                    formState.isSubmitting
                                        ? "cursor-not-allowed bg-primary-700/50"
                                        : "cursor-pointer bg-primary-700 hover:bg-primary-700/90"
                                    }`}
                                >
                                    {formState.isSubmitting ? "Wird gesendet …" : "Anfrage absenden"}
                                </button>
                            </div>
                        </div>

                    </div>

                </form>
            </FormProvider>
        </>
    );
}