"use client";

import { useEffect, useState } from "react";
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { BookingData, bookingFormSchema, type BookingFormData } from "@/schemas/forms/booking.schema";
import { formatDateRange } from "@/utils/format-date-range";
import SectionHeading from "../shared/section-heading";
import { Workshop } from "@/types/workshop";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatPrice } from "@/utils/format-price";
import TextField from "../shared/text-field";
import ErrorMessage from "../shared/error-message";
import SelectField from "../shared/select-field";
import Label from "../shared/label";

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
            contactPerson: {
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

    const { control, formState, handleSubmit, register } = methods;

    const [formData, setFormData] = useState<BookingData | null>(null);


    // 01 - Termin
    const selectedDate = useWatch({
        control,
        name: "termin",
    });


    // 02 - Teilnehmeranzahl
    const participantCount = useWatch({
        control,
        name: "teilnehmerzahl",
    });

    const stepParticipants = (delta: number) => {
        const current = Math.min(Math.max(Number(participantCount) || 1, 1), 20);
        const next = Math.min(Math.max(current + delta, 1), 20);
        methods.setValue("teilnehmerzahl", next, { shouldValidate: true });
    };


    // 05 - Teilnehmer:innen
    const { fields, append, remove } = useFieldArray({ control, name: "teilnehmer" });

    useEffect(() => {
        
        const count = Math.min(Math.max(Number(participantCount) || 1, 1), 20);
        
        if (count > fields.length) {
            
            const toAdd = count - fields.length;

            for (let i = 0; i < toAdd; i++) {
                append({ vorname: "", nachname: "", email: "" });
            }

        } else if (count < fields.length) {
            
            for (let i = fields.length - 1; i >= count; i--) {
                remove(i);
            }
        
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participantCount]);


    // 06 - Rechnungsadresse
    const altBillingAddress = useWatch({
        control,
        name: "abweichendeRechnungsadresse",
    });

    // Zusammenfassung
    const participantCountLabel = Math.min(Math.max(Number(participantCount) || 1, 1), 20);
    const selectedDateLabel = selectedDate ? formatDateRange(selectedDate.datumVon, selectedDate.datumBis) : "Kein Termin ausgewählt";
    const subtotal = Number(workshop.preis) * participantCountLabel;
    const vat = Math.round(subtotal * 0.19);
    const total = subtotal + vat;

    const consent = useWatch({
        control,
        name: "consent",
    });

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
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="px-9 pb-9 pt-7">

                        {/* BEGIN 01 Termin -> appointment-selection.tsx*/}
                        <section className="mb-8">

                            <SectionHeading num="01" title="Termin" />

                            <Controller 
                                name="termin"
                                control={control}
                                render={({ field }) => (

                                    <div className="grid gap-2.5">

                                        {workshop.termine!.map((termin) => {

                                            const checked = field.value?.id === termin.id;
                                            const disabled = !termin.active || termin.status === "ausgebucht";

                                            return (
                                                <label
                                                    key={termin.id}
                                                    className="grid w-full cursor-pointer grid-cols-[24px_1fr_auto] items-center gap-3.5 rounded-lg border-[1.5px] border-primary-700 bg-primary-50 px-4 py-3.5"
                                                >
                                                    
                                                    <span className="relative h-4.5 w-4.5 rounded-full border-2 border-primary-700 bg-white">
                                                        {checked && (
                                                            <span className="absolute inset-0.75 rounded-full bg-primary-700" />
                                                        )}
                                                    </span>
                                                    
                                                    <div>
                                                        <div className="text-[15px] font-semibold text-foreground">
                                                            {formatDateRange(
                                                                termin.datumVon, 
                                                                termin.datumBis
                                                            )}
                                                        </div>
                                                        <div className="text-[12.5px] text-muted">{termin.format}</div>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-success-600">
                                                        <span className="h-1.75 w-1.75 rounded-full bg-success-500" />
                                                            {termin.status}
                                                    </div>
                                                    
                                                    <input 
                                                        type="radio" 
                                                        name={field.name}
                                                        className="sr-only" 
                                                        readOnly 
                                                        checked={checked}
                                                        disabled={disabled}
                                                        onBlur={field.onBlur}
                                                        onChange={() => 
                                                            field.onChange({
                                                                id: termin.id,
                                                                datumVon: termin.datumVon,
                                                                datumBis: termin.datumBis
                                                            })
                                                        }
                                                    />

                                                </label>
                                            )
                                        })}
                                        
                                    </div>

                                )}
                            />

                            {formState.errors.termin && (
                                <p className="mt-2 text-[12.5px] text-error-600">
                                    {formState.errors.termin.message}
                                </p>
                            )}
                            
                        </section>
                        {/* END 01 Termin -> appointment-selection.tsx*/}
                        

                        {/* BEGIN 02 Teilnehmeranzahl -> participant-counter.tsx*/}
                        <section className="mb-8">

                            <SectionHeading num="02" title="Teilnehmeranzahl" />

                            <div className="flex flex-wrap items-center gap-3.5">

                                <button
                                    type="button"
                                    onClick={() => stepParticipants(-1)}
                                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-lg font-semibold text-neutral-700 transition bg-surface hover:bg-neutral-100"
                                >
                                    -
                                </button>

                                {/* Teilnehmeranzahl */}
                                <TextField
                                    type="number"
                                    min={1}
                                    max={20}
                                    step="any"
                                    className="w-20! text-center"
                                    {...register("teilnehmerzahl", { required: true, min: 1, max: 20, valueAsNumber: true })}
                                />
                                
                                <button
                                    type="button"
                                    onClick={() => stepParticipants(1)}
                                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-lg font-semibold text-neutral-700 transition bg-surface hover:bg-neutral-100"
                                >
                                    +
                                </button>

                                <span className="basis-full ml-2 text-[13px] text-muted md:ml-2 md:basis-auto">
                                    Max. 20 · für größere Gruppen Inhouse anfragen
                                </span>

                            </div>

                            {formState.errors.teilnehmerzahl && (
                                <p className="mt-2 text-[12.5px] text-error-600">
                                    {formState.errors.teilnehmerzahl.message}
                                </p>
                            )}

                        </section>
                        {/* END 02 Teilnehmeranzahl -> participant-counter.tsx*/}


                        {/* BEGIN 03 Firma & Adresse -> company-address.tsx -> address-field.tsx*/}
                        <section className="mb-8">

                            <SectionHeading num="03" title="Firma & Adresse" />

                            {/* BEGIN address-fields.tsx */}
                            <div className="mt-4 grid grid-cols-3 gap-x-3.5">

                                <div className="col-span-3 mb-4">

                                    {/* Label.tsx */}
                                    <Label>Firmenname (Rechnung)</Label>

                                    {/* Firma */}
                                    <TextField
                                        {...register("adresse.firma", { required: "Bitte geben Sie den Firmennamen an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.adresse?.firma && (
                                        <ErrorMessage message={formState.errors.adresse.firma.message} />
                                    )}

                                </div>

                                <div className="col-span-3 mb-4">

                                    {/* Label.tsx */}
                                    <Label>Straße (inkl. Hausnummer)</Label>

                                    {/* Straße */}
                                    <TextField
                                        {...register("adresse.strasse", { required: "Bitte geben Sie die Straße an." })}
                                    />

                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.adresse?.strasse && (
                                        <ErrorMessage message={formState.errors.adresse.strasse.message} />
                                    )}

                                </div>

                                <div className="col-span-1 mb-4">

                                    {/* Label.tsx */}
                                    <Label>PLZ</Label>

                                    {/* PLZ */}
                                    <TextField
                                        {...register("adresse.plz", { required: "Bitte geben Sie die PLZ an." })}
                                    />

                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.adresse?.plz && (
                                        <ErrorMessage message={formState.errors.adresse.plz.message} />
                                    )}

                                </div>

                                <div className="col-span-2 mb-4">
                                    
                                    {/* Label.tsx */}
                                    <Label>Ort</Label>

                                    {/* Ort */}
                                    <TextField
                                        {...register("adresse.ort", { required: "Bitte geben Sie den Ort an." })}
                                    />

                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.adresse?.ort && (
                                        <ErrorMessage message={formState.errors.adresse.ort.message} />
                                    )}
                                    
                                </div>

                            </div>
                            {/* END address-fields.tsx */}

                            <div className="mb-4">

                                {/* Label.tsx */}
                                <Label>Webseite (optional)</Label>

                                {/* Webseite */}
                                <TextField
                                    {...register("webseite")}
                                />

                            </div>

                        </section>
                        {/* END 03 Firma & Adresse -> company-address.tsx -> address-field.tsx*/}


                        {/* BEGIN 04 Ansprechperson -> contact-person.tsx */}
                        <section className="mb-8">

                            <SectionHeading num="04" title="Ansprechpartner" />

                            <div className="grid grid-cols-12 gap-x-3.5">

                                <div className="col-span-6 md:col-span-3 mb-4">

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
                                        {...register("contactPerson.anrede", { required: "Bitte wählen Sie eine Anrede aus." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.contactPerson?.anrede && (
                                        <ErrorMessage message={formState.errors.contactPerson.anrede.message} />
                                    )}

                                </div>

                                <div className="col-span-12 md:col-span-4 mb-4">

                                    {/* Label.tsx */}
                                    <Label>Vorname</Label>

                                    {/* Vorname */}
                                    <TextField
                                        {...register("contactPerson.vorname", { required: "Bitte geben Sie den Vornamen an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.contactPerson?.vorname && (
                                        <ErrorMessage message={formState.errors.contactPerson.vorname.message} />
                                    )}

                                </div>

                                <div className="col-span-12 md:col-span-5 mb-4">

                                    {/* Label.tsx */}
                                    <Label>Nachname</Label>

                                    {/* Nachname */}
                                    <TextField
                                        {...register("contactPerson.nachname", { required: "Bitte geben Sie den Nachnamen an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.contactPerson?.nachname && (
                                        <ErrorMessage message={formState.errors.contactPerson.nachname.message} />
                                    )}

                                </div>

                                <div className="col-span-12 md:col-span-7 mb-4">

                                    {/* Label.tsx */}
                                    <Label>E-Mail</Label>

                                    {/* E-Mail */}
                                    <TextField
                                        type="email"
                                        {...register("contactPerson.email", { required: "Bitte geben Sie die E-Mail-Adresse an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.contactPerson?.email && (
                                        <ErrorMessage message={formState.errors.contactPerson.email.message} />
                                    )}

                                </div>

                                <div className="col-span-12 md:col-span-5 mb-4">

                                    <Label>Telefon</Label>

                                    {/* Telefon */}
                                    <TextField
                                        {...register("contactPerson.telefon", { required: "Bitte geben Sie die Telefonnummer an." })}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.contactPerson?.telefon && (
                                        <ErrorMessage message={formState.errors.contactPerson.telefon.message} />
                                    )}

                                </div>

                            </div>
                            
                        </section>
                        {/* END 04 Ansprechperson -> contact-person.tsx */}
                        

                        {/* BEGIN 05 Teilnehmer:innen -> participants.tsx */}
                        <section className="mb-8">

                            <SectionHeading num="05" title="Teilnehmer:innen" subtitle={`${fields.length} Teilnehmer im Workshop`} />

                            <div className="flex flex-col gap-3">

                                {fields.map((field, index) => (

                                    <div
                                        key={field.id}
                                        className="rounded-lg bg-surface px-3.5 py-3"
                                    >

                                        <div
                                            className="grid grid-cols-1 md:grid-cols-[36px_1fr_1fr_1.4fr] items-center gap-2.5 "
                                        >

                                            <div className="font-mono text-[12px] tracking-wide text-neutral-500">
                                                {String(index + 1).padStart(2, "0")}
                                            </div>

                                            {/* Vorname */}
                                            <TextField
                                                placeholder="Vorname"
                                                {...register(`teilnehmer.${index}.vorname` as const)}
                                            />

                                            {/* Nachname */}
                                            <TextField
                                                placeholder="Nachname"
                                                {...register(`teilnehmer.${index}.nachname` as const, { required: "Bitte geben Sie den Nachnamen an.", validate: (value) => value.trim().length > 0 || "Bitte geben Sie den Nachnamen an.", })}
                                            />

                                            {/* E-Mail */}
                                            <TextField
                                                placeholder="E-Mail"
                                                {...register(`teilnehmer.${index}.email` as const, { min: 1, required: "Bitte geben Sie die E-Mail an." })}
                                            />

                                        </div>

                                        <div
                                            className="grid grid-cols-1 md:grid-cols-[36px_1fr_1fr_1.4fr] items-center gap-2.5 "
                                        >
                                            <div></div>
                                            <div>
                                                {formState.errors.teilnehmer?.[index]?.vorname && (
                                                    <ErrorMessage message={formState.errors.teilnehmer?.[index]?.vorname?.message} />
                                                )}
                                            </div>
                                            <div>
                                                {formState.errors.teilnehmer?.[index]?.nachname && (
                                                    <ErrorMessage message={formState.errors.teilnehmer?.[index]?.nachname?.message} />
                                                )}
                                            </div>

                                            <div>
                                                {formState.errors.teilnehmer?.[index]?.email && (
                                                    <ErrorMessage message={formState.errors.teilnehmer?.[index]?.email?.message} />
                                                )}
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))}

                            </div>

                        </section>
                        {/* END 05 Teilnehmer:innen -> participants.tsx */}

                        
                        {/* BEGIN 06 Rechnungsadresse -> billing-address.tsx -> address-fields.tsx */}
                        <section className="mb-8">

                            <SectionHeading num="06" title="Rechnungsadresse" />

                            <label className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-[1.55] text-foreground">
                                <input 
                                    type="checkbox" 
                                    className="mt-0.5 h-4 w-4 accent-primary-700"
                                    {...register("abweichendeRechnungsadresse")}
                                />
                                <span>Abweichende Rechnungsadresse verwenden</span>
                            </label>
                            
                            {/* BEGIN address-fields.tsx */}
                            {altBillingAddress && (
                            
                            <div className="mt-4 grid grid-cols-3 gap-x-3.5">

                                <div className="col-span-3 mb-4">

                                    {/* Label.tsx */}
                                    <Label>Firmenname (Rechnung)</Label>

                                    {/* Firma */}
                                    <TextField
                                        {...register("rechnungsadresse.firma")}
                                    />
                                    
                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.rechnungsadresse?.firma && (
                                        <ErrorMessage message={formState.errors.rechnungsadresse.firma.message} />
                                    )}

                                </div>

                                <div className="col-span-3 mb-4">

                                    {/* Label.tsx */}
                                    <Label>Straße (inkl. Hausnummer)</Label>

                                    {/* Straße (inkl. Hausnummer) */}
                                    <TextField
                                        {...register("rechnungsadresse.strasse")}
                                    />

                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.rechnungsadresse?.strasse && (
                                        <ErrorMessage message={formState.errors.rechnungsadresse.strasse.message} />
                                    )}

                                </div>

                                <div className="col-span-1 mb-4">

                                    {/* Label.tsx */}
                                    <Label>PLZ</Label>

                                    {/* PLZ */}
                                    <TextField
                                        {...register("rechnungsadresse.plz")}
                                    />

                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.rechnungsadresse?.plz && (
                                        <ErrorMessage message={formState.errors.rechnungsadresse.plz.message} />
                                    )}

                                </div>

                                <div className="col-span-2 mb-4">
                                    
                                    {/* Label.tsx */}
                                    <Label>Ort</Label>

                                    {/* Ort */}
                                    <TextField
                                        {...register("rechnungsadresse.ort")}
                                    />

                                    {/* ErrorMessage.tsx */}
                                    {formState.errors.rechnungsadresse?.ort && (
                                        <ErrorMessage message={formState.errors.rechnungsadresse.ort.message} />
                                    )}
                                    
                                </div>

                            </div>
                            )}
                            {/* END address-fields.tsx */}

                        </section>

                        {/* END 06 Rechnungsadresse -> billing-address.tsx -> address-fields.tsx */}
                        

                        {/* BEGIN 07 Weiteres -> extras-section.tsx */}
                        <section className="mb-8">

                            <SectionHeading num="07" title="Weiteres" />

                            <div className="grid grid-cols-12 gap-x-3.5">

                                <div className="col-span-12 mb-4">

                                    {/* Gutschein-Code Eingabefeld */}
                                    {/* Label.tsx */}
                                    <Label>Gutscheincode (optional)</Label>

                                    <div className="flex items-stretch gap-2.5">

                                        {/* Gutscheincode */}
                                        <TextField
                                            placeholder="z.B. CODE2026"
                                            className="flex-1"
                                            {...register("gutscheinCode")}
                                        />

                                        {/* Einlösen */}
                                        <button
                                            type="button"
                                            className="rounded-md bg-neutral-800 px-4.5 text-[13.5px] font-semibold text-white transition hover:bg-neutral-700"
                                        >
                                            Einlösen
                                        </button>

                                    </div>

                                </div>

                                <div className="col-span-12 mb-4">
                                    
                                    {/* Label.tsx */}
                                    <Label>Anmerkungen (optional)</Label>

                                    {/* TextArea.tsx */}
                                    <textarea
                                        className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 min-h-22.5 resize-y"
                                        placeholder="Besondere Wünsche, Ernährung, technische Anforderungen …"
                                        {...register("notizen")}
                                    />

                                    
                                </div>

                            </div>
                        </section>
                        {/* END 07 Weiteres -> extras-section.tsx */}
                        

                        {/* BEGIN Summary -> summary.tsx */}
                        {/* bg-surface oder bg-border? */}
                        <div className="mt-5 rounded-[10px] bg-surface px-6 py-5.5">

                            <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-primary-700">
                                Zusammenfassung
                            </div>
                            
                            {/* Workshop Titel, Dauer, Preis, Teilnehmeranzahl */}
                            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                                <span>{workshop.titel} · {workshop.dauer}</span>
                                <span className="font-mono text-[13.5px]">
                                    {formatPrice(workshop.preis)} x {participantCountLabel}
                                </span>
                            </div>

                            {/* Ausgewählter Termin */}
                            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                                <span>Termin</span>
                                <span className="font-mono text-[13.5px]">{selectedDateLabel}</span>
                            </div>
                            
                            {/* Zwischensumme */}
                            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                                <span>Zwischensumme</span>
                                <span className="font-mono text-[13.5px]">{formatPrice(subtotal)}</span>
                            </div>
                            
                            {/* Umsatzsteuer */}
                            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-muted">
                                <span>USt. 19%</span>
                                <span className="font-mono text-[13.5px]">{formatPrice(vat)}</span>
                            </div>

                            <div className="my-3 h-px bg-border" />
                            
                            {/* Gesamtsumme */}
                            <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                                <strong className="font-bold">Gesamtsumme</strong>
                                <strong className="font-mono text-[17px] font-bold">{formatPrice(total)}</strong>
                            </div>

                        </div>
                        {/* END Summary -> summary.tsx */}
                        

                        {/* BEGIN Consent -> consent.tsx */}
                        <div className="mt-6 rounded-lg border border-neutral-200 bg-white px-5 py-5">
                            
                            {/* Label.tsx text-[13.5px] */}
                            <label className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-[1.55] text-foreground">
                                
                                <input
                                    type="checkbox"
                                    className="mt-0.5 h-4 w-4 accent-primary-700"
                                    {...register("consent", { required: true })}
                                />

                                <span>
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
                                </span>
                            </label>

                        </div>
                        {/* END Consent -> consent.tsx */}
                        

                        {/* BEGIN Submit Footer -> submit-footer.tsx */}
                        <div className="mt-5.5 flex items-center justify-between gap-4">

                            {/* Hint */}
                            <div className="text-[13px] leading-relaxed text-muted">
                                Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Sicherheitsabfrage.
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!consent || formState.isSubmitting}
                                className={`rounded-md px-7.5 py-3.5 text-[15px] font-semibold tracking-wide text-white transition ${
                                    !consent || formState.isSubmitting 
                                        ? "cursor-not-allowed bg-primary-700/50" 
                                        : "cursor-pointer bg-primary-700 hover:bg-primary-700/90"
                                    }`
                                }
                            >
                                Verbindlich buchen
                            </button>

                        </div>
                        {/* END Submit Footer -> submit-footer.tsx */}

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
}