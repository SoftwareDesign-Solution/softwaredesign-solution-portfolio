"use server";

import { verifyTurnstileToken } from "@/lib/turnstile";
//import { ContactRequestFormData, contactRequestFormSchema } from "@/schemas/forms/contact-request.schema";
import { type SendContactRequestData, sendContactRequestEmailSchema, sendContactRequestSchema } from "@/schemas/contact-request.schema";

export async function sendContactRequest(data: SendContactRequestData): Promise<void> {
    
    // 1. Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist
    const validationResult = sendContactRequestSchema.safeParse(data);

    if (!validationResult.success) {
        console.error(
            "Ungültige Kontaktdaten",
            validationResult.error.flatten()
        );

        throw new Error(
            "Die eingegebenen Kontaktdaten sind ungültig."
        );
    }


    const contactRequestData = validationResult.data;


    // 2. Turnstile-Verifizierung — IMMER zuerst, vor jedem DB-Zugriff.
    const isHuman = await verifyTurnstileToken(
        contactRequestData.turnstile.token
    );

    if (!isHuman) {
        throw new Error(
            "Sicherheitsabfrage fehlgeschlagen. Bitte versuchen Sie es erneut."
        );
    }

    // 3. E-Mail versenden
    try {

        const emailData = sendContactRequestEmailSchema.parse(contactRequestData);
        
        // Kontaktnachricht per E-Mail versenden
        

    } catch (error) {
        throw new Error(
            "Ihre Nachricht konnte nicht versendet werden. Bitte versuchen Sie es erneut."
        );
    }

};