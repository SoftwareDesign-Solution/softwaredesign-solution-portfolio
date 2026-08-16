import ContactRequestForm from "@/components/forms/contact-request/contact-request-form";

export default function AnfragePage() {
    return (
        <article>
            
            <div className="pt-28 px-12 pb-14 bg-white">
                <div className="max-w-225">
                    <div className="text-xs tracking-[1.5px] uppercase font-semibold text-primary-700 mb-4.5">
                        {"//"} Kontaktformular
                    </div>
                    <h1 className="text-[80px] leading-none tracking-[-2.4px] font-bold mb-4 text-foreground">
                        Ihre Anfrage
                    </h1>
                    <p className="text-lg leading-[1.55] max-w-180 text-muted">
                        Beratung, Coaching oder Workshop — schreiben Sie mir, worum es geht. Ich melde mich <strong className="font-semibold">umgehend</strong> bei Ihnen und wir vereinbaren ein unverbindliches Vorgespräch.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-290 px-12 py-14 pb-30">
                <ContactRequestForm />
            </div>

        </article>
    );
}