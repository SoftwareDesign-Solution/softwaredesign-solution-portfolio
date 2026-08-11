import SectionHeading from "../shared/section-heading";
import Link from "next/link";


export default function BookingForm() {

    return (
        <>
            <form>

                <div className="px-9 pb-9 pt-7">

                    {/* BEGIN 01 Termin -> appointment-selection.tsx*/}
                    <section className="mb-8">

                        <SectionHeading num="01" title="Termin" />

                        <div className="grid gap-2.5">

                            <label
                                className="grid w-full cursor-pointer grid-cols-[24px_1fr_auto] items-center gap-3.5 rounded-lg border-[1.5px] border-primary-700 bg-primary-50 px-4 py-3.5"
                            >
                                <span className="relative h-4.5 w-4.5 rounded-full border-2 border-primary-700 bg-white">
                                    <span className="absolute inset-0.75 rounded-full bg-primary-700" />
                                </span>
                                <div>
                                    <div className="text-[15px] font-semibold text-foreground">[Datum von - bis]</div>
                                    <div className="text-[12.5px] text-muted">[Format]</div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-success-600">
                                    <span className="h-1.75 w-1.75 rounded-full bg-success-500" />
                                        [Status]
                                </div>
                                <input type="radio" className="sr-only" readOnly checked />
                            </label>

                            <label
                                className="grid w-full cursor-pointer grid-cols-[24px_1fr_auto] items-center gap-3.5 rounded-lg border-[1.5px] border-primary-700 bg-primary-50 px-4 py-3.5"
                            >
                                <span className="relative h-4.5 w-4.5 rounded-full border-2 border-primary-700 bg-white">
                                    <span className="absolute inset-0.75 rounded-full bg-primary-700" />
                                </span>
                                <div>
                                    <div className="text-[15px] font-semibold text-foreground">[Datum von - bis]</div>
                                    <div className="text-[12.5px] text-muted">[Format]</div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-success-600">
                                    <span className="h-1.75 w-1.75 rounded-full bg-success-500" />
                                        [Status]
                                </div>
                                <input type="radio" className="sr-only" readOnly />
                            </label>
                            
                        </div>

                        <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>
                        
                    </section>
                    {/* END 01 Termin -> appointment-selection.tsx*/}
                    

                    {/* BEGIN 02 Teilnehmeranzahl -> participant-counter.tsx*/}
                    <section className="mb-8">

                        <SectionHeading num="02" title="Teilnehmeranzahl" />

                        <div className="flex flex-wrap items-center gap-3.5">

                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-lg font-semibold text-neutral-700 transition bg-surface hover:bg-neutral-100"
                            >
                                -
                            </button>

                            {/* TextField.tsx */}
                            <input 
                                type="number"
                                min={1}
                                max={20}
                                step="any"
                                className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 w-20! text-center" 
                            />
                            
                            <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-lg font-semibold text-neutral-700 transition bg-surface hover:bg-neutral-100"
                            >
                                +
                            </button>

                            <span className="basis-full ml-2 text-[13px] text-muted md:ml-2 md:basis-auto">
                                Max. 20 · für größere Gruppen Inhouse anfragen
                            </span>

                        </div>
                    </section>
                    {/* END 02 Teilnehmeranzahl -> participant-counter.tsx*/}


                    {/* BEGIN 03 Firma & Adresse -> company-address.tsx -> address-field.tsx*/}
                    <section className="mb-8">

                        <SectionHeading num="03" title="Firma & Adresse" />

                        {/* BEGIN address-fields.tsx */}
                        <div className="mt-4 grid grid-cols-3 gap-x-3.5">

                            <div className="col-span-3 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Firmenname (Rechnung)</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />
                                
                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-3 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Straße (inkl. Hausnummer)</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-1 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">PLZ</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-2 mb-4">
                                
                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Ort</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>
                                
                            </div>

                        </div>
                        {/* END address-fields.tsx */}

                        <div className="mb-4">

                            {/* Label.tsx */}
                            <label className="mb-1.5 block text-[13px] font-medium text-foreground">Webseite (optional)</label>

                            {/* TextField.tsx */}
                            <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

                        </div>

                    </section>
                    {/* END 03 Firma & Adresse -> company-address.tsx -> address-field.tsx*/}


                    {/* BEGIN 04 Ansprechperson -> contact-person.tsx */}
                    <section className="mb-8">

                        <SectionHeading num="04" title="Ansprechpartner" />

                        <div className="grid grid-cols-12 gap-x-3.5">

                            <div className="col-span-6 md:col-span-3 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Anrede</label>

                                {/* SelectField.tsx */}
                                <select
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                >
                                    <option value="Frau">Frau</option>
                                    <option value="Herr">Herr</option>
                                    <option value="Divers">Divers</option>
                                    <option value="Keine Angabe">Keine Angabe</option>
                                </select>

                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-12 md:col-span-4 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Vorname</label>

                                {/* TextField.tsx */}
                                <input 
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                />
                                
                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-12 md:col-span-5 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Nachname</label>

                                {/* TextField.tsx */}
                                <input 
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                />
                                
                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-12 md:col-span-7 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">E-Mail</label>

                                {/* TextField.tsx */}
                                <input 
                                    type="email"
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                />
                                
                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-12 md:col-span-5 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Telefon</label>

                                {/* TextField.tsx */}
                                <input 
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                />
                                
                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                        </div>
                        
                    </section>
                    {/* END 04 Ansprechperson -> contact-person.tsx */}
                    

                    {/* BEGIN 05 Teilnehmer:innen -> participants.tsx */}
                    <section className="mb-8">

                        <SectionHeading num="05" title="Teilnehmer:innen" subtitle="2 Teilnehmer" />

                        <div className="flex flex-col gap-3">

                            <div
                                className="grid grid-cols-1 md:grid-cols-[36px_1fr_1fr_1.4fr] items-center gap-2.5 rounded-lg bg-surface px-3.5 py-3"
                            >

                                <div className="font-mono text-[12px] tracking-wide text-neutral-500">
                                    {String(1).padStart(2, "0")}
                                </div>

                                {/* Vorname */}
                                {/* TextField.tsx */}
                                <input 
                                    placeholder="Vorname"
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                />

                                {/* Nachname */}
                                {/* TextField.tsx */}
                                <input 
                                    placeholder="Nachname"
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                />

                                {/* E-Mail */}
                                {/* TextField.tsx */}
                                <input 
                                    placeholder="E-Mail"
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100"
                                />

                            </div>

                        </div>

                    </section>
                    {/* END 05 Teilnehmer:innen -> participants.tsx */}

                    
                    {/* BEGIN 06 Rechnungsadresse -> billing-address.tsx -> address-fields.tsx */}
                    <section className="mb-8">

                        <SectionHeading num="06" title="Rechnungsadresse" />

                        <label className="flex cursor-pointer items-start gap-2.5 text-[14px] leading-[1.55] text-foreground">
                            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary-700" />
                            <span>Abweichende Rechnungsadresse verwenden</span>
                        </label>
                        
                        {/* BEGIN address-fields.tsx */}
                        <div className="mt-4 grid grid-cols-3 gap-x-3.5">

                            <div className="col-span-3 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Firmenname (Rechnung)</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />
                                
                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-3 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Straße (inkl. Hausnummer)</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-1 mb-4">

                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">PLZ</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>

                            </div>

                            <div className="col-span-2 mb-4">
                                
                                {/* Label.tsx */}
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Ort</label>

                                {/* TextField.tsx */}
                                <input className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

                                {/* ErrorMessage.tsx */}
                                <p className="mt-2 text-[12.5px] text-error-600">[errorMessage]</p>
                                
                            </div>

                        </div>
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
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Gutscheincode (optional)</label>

                                <div className="flex items-stretch gap-2.5">

                                    {/* TextField.tsx placeholder="" */}
                                    {/* flex-1, damit das Input-Feld die gesamte verfügbare Breite einnimmt */}
                                    <input placeholder="z.B. CODE2026" className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100" />

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
                                <label className="mb-1.5 block text-[13px] font-medium text-foreground">Anmerkungen (optional)</label>

                                {/* TextArea.tsx */}
                                <textarea
                                    className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-100 min-h-[90px] resize-y"
                                    placeholder="Besondere Wünsche, Ernährung, technische Anforderungen …" />
                                
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
                            <span>[Titel] · [Dauer]</span>
                            <span className="font-mono text-[13.5px]">
                                [Preis] x [Teilnehmeranzahl]
                            </span>
                        </div>

                        {/* Ausgewählter Termin */}
                        <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                            <span>Termin</span>
                            <span className="font-mono text-[13.5px]">[Ausgewählter Termin]</span>
                        </div>
                        
                        {/* Zwischensumme */}
                        <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                            <span>Zwischensumme</span>
                            <span className="font-mono text-[13.5px]">[Zwischensumme]</span>
                        </div>
                        
                        {/* Umsatzsteuer */}
                        <div className="flex items-baseline justify-between py-1.5 text-[14px] text-muted">
                            <span>USt. 19%</span>
                            <span className="font-mono text-[13.5px]">[Umsatzsteuer]</span>
                        </div>

                        <div className="my-3 h-px bg-border" />
                        
                        {/* Gesamtsumme */}
                        <div className="flex items-baseline justify-between py-1.5 text-[14px] text-foreground">
                            <strong className="font-bold">Gesamtsumme</strong>
                            <strong className="font-mono text-[17px] font-bold">[Gesamtsumme]</strong>
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
                        <div className="text-[13px] leading-relaxed text-muted">[hint]</div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="rounded-md px-7.5 py-3.5 text-[15px] font-semibold tracking-wide text-white transition cursor-not-allowed bg-primary-700/50"
                        >
                            Verbindlich buchen
                        </button>

                    </div>
                    {/* END Submit Footer -> submit-footer.tsx */}

                </div>

            </form>
        </>
    );
}