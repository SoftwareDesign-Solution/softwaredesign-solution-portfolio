/**
 * @file create-quote-request.ts
 * @description Server Action zum Anlegen einer unverbindlichen Angebotsanfrage.
 * Validiert und verarbeitet die vom Angebots-Formular ({@link QuoteRequestForm})
 * übermittelten Daten serverseitig, bevor sie in der Datenbank gespeichert und die
 * Double-Opt-In-E-Mail versendet wird. Anders als bei der Buchung ist ein Termin
 * hier nur Pflicht, wenn der Workshop überhaupt Termine anbietet.
 * @module app/actions/create-quote-request
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use server";

import { db } from "@/lib/db";
import getClientIp from "@/lib/get-client-ip";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
    type CreateQuoteRequestData,
    createQuoteRequestSchema,
    sendQuoteRequestOptInEmailSchema,
} from "@/schemas/quote-request.schema";
import { sendQuoteRequestOptInEmail } from "@/services/emails/send-quote-request-optin-email";
import { generateSecureToken } from "@/utils/generate-secure-token";

// Gültigkeitsdauer des Bestätigungslinks in der Opt-In-E-Mail
//const CONFIRMATION_EXPIRATION_DAYS = 3;

/**
 * Projektion von Workshop + optionalem Termin. `terminId`/`datumVon`/`datumBis`
 * sind `null`, wenn die Anfrage ohne festen Termin gestellt wurde.
 */
interface WorkshopAppointmentData {
    datumBis: string | Date | null;
    datumVon: string | Date | null;
    preis: number | string | null;
    terminId: number | null;
    workshopId: number;
    workshopTitel: string;
}

/** Parameter für {@link insertQuoteRequest}. */
interface InsertQuoteRequestOptions {
    confirmationToken: string;
    ipAddress: string | null;
    quoteRequestData: CreateQuoteRequestData;
    totalPrice: number;
    workshopAppointment:
        WorkshopAppointmentData;
}

/** Parameter für {@link sendQuoteRequestEmailSafely}. */
interface SendQuoteRequestEmailOptions {
    confirmationToken: string;
    quoteRequestData: CreateQuoteRequestData;
    quoteRequestId: string;
    workshopAppointment:
        WorkshopAppointmentData;
}

/** Rückgabe von {@link sendQuoteRequestEmailSafely}. */
interface SendQuoteRequestEmailResult {
    emailId?: string;
    sent: boolean;
}

/** Ergebnis von {@link createQuoteRequest}. */
export interface CreateQuoteRequestResult {
    /** Ob die Opt-In-E-Mail erfolgreich versendet werden konnte. */
    confirmationEmailSent: boolean;
    /** Resend-ID der versendeten E-Mail, falls erfolgreich. */
    emailId?: string;
    /** ID der angelegten Angebotsanfrage. */
    quoteRequestId: string;
}

/**
 * Server Action für das Angebotsanfrage-Formular: validiert die Eingaben, prüft
 * Turnstile, lädt Workshop/Termin serverseitig neu (Preis/Verfügbarkeit dürfen
 * nicht vom Client kommen), speichert die Anfrage mit Bestätigungs-Token und
 * versendet die Double-Opt-In-E-Mail.
 *
 * @param data - Die vom Client übermittelten und gegen {@link createQuoteRequestSchema}
 *               zu validierenden Anfragedaten (Workshop, optional Termin, Teilnehmerzahl,
 *               Adressen, Turnstile-Token)
 * @returns Ein {@link CreateQuoteRequestResult} mit der angelegten `quoteRequestId`
 *          sowie dem Status des E-Mail-Versands
 * @throws Error bei ungültigen Eingaben, fehlgeschlagener Turnstile-Prüfung,
 *         fehlender Terminauswahl trotz verfügbarer Termine, nicht verfügbarem
 *         Workshop/Termin, einem Fehler beim Speichern in der DB oder beim
 *         Versand der Opt-In-E-Mail
 */
export async function createQuoteRequest(
    data: CreateQuoteRequestData,
): Promise<CreateQuoteRequestResult> {

    // Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist
    const validationResult =
        createQuoteRequestSchema.safeParse(data);

    if (!validationResult.success) {
        console.error(
            "Invalid quote request data.",
            validationResult.error.flatten(),
        );

        throw new Error(
            "Die eingegebenen Daten der Angebotsanfrage sind ungültig.",
        );
    }

    const quoteRequestData =
        validationResult.data;

    // Bot-/Spam-Schutz: ohne gültiges Turnstile-Token keine Verarbeitung
    const isHuman = await verifyTurnstileToken(
        quoteRequestData.turnstile.token,
    );

    if (!isHuman) {
        throw new Error(
            "Die Sicherheitsabfrage ist fehlgeschlagen.",
        );
    }

    await validateAppointmentRequirement(
        quoteRequestData,
    );

    const workshopAppointment =
        await getWorkshopAppointment(
            quoteRequestData,
        );

    if (!workshopAppointment) {
        throw new Error(
            quoteRequestData.termin
                ? "Der ausgewählte Workshop oder Termin ist nicht verfügbar."
                : "Der ausgewählte Workshop ist nicht verfügbar.",
        );
    }

    const totalPrice = calculateTotalPrice(
        workshopAppointment.preis,
        quoteRequestData.teilnehmerzahl,
    );

    const ipAddress = await getClientIpSafely();
    const confirmationToken = generateSecureToken();

    const quoteRequestId =
        await insertQuoteRequest({
            confirmationToken,
            ipAddress,
            quoteRequestData,
            totalPrice,
            workshopAppointment,
        });

    const emailResult =
        await sendQuoteRequestEmailSafely({
            confirmationToken,
            quoteRequestData,
            quoteRequestId,
            workshopAppointment,
        });

    return {
        confirmationEmailSent: emailResult.sent,
        emailId: emailResult.emailId,
        quoteRequestId,
    };
}

/**
 * Erzwingt serverseitig eine Terminauswahl, aber nur wenn der Workshop
 * tatsächlich buchbare Termine hat — spiegelt die clientseitige Prüfung aus
 * {@link createQuoteRequestFormSchema}, da diese nicht erneut ausgewertet wird.
 *
 * @param quoteRequestData - Die validierten Anfragedaten
 * @throws Error, falls Termine verfügbar sind, aber keiner ausgewählt wurde
 */
async function validateAppointmentRequirement(
    quoteRequestData: CreateQuoteRequestData,
): Promise<void> {
    if (quoteRequestData.termin) {
        return;
    }

    const [result] = await db`
        SELECT COUNT(*)::int AS "appointmentCount"
        FROM termin
        WHERE workshop_id = ${
            quoteRequestData.workshop.id
        }
          AND active = TRUE
          AND status <> 'ausgebucht'
    `;

    const appointmentCount = Number(
        result?.appointmentCount ?? 0,
    );

    if (appointmentCount > 0) {
        throw new Error(
            "Bitte wählen Sie einen Termin aus.",
        );
    }
}

/**
 * Lädt Workshop (und, falls ausgewählt, Termin) frisch aus der DB und prüft
 * dabei direkt die Verfügbarkeit. Ohne Terminauswahl wird nur der Workshop
 * geladen (Termin-Felder bleiben `null`).
 *
 * @param quoteRequestData - Die validierten Anfragedaten (Workshop, ggf. Termin)
 * @returns Die kombinierten Workshop-/Termin-Daten, oder `null` falls nicht verfügbar
 */
async function getWorkshopAppointment(
    quoteRequestData: CreateQuoteRequestData,
): Promise<WorkshopAppointmentData | null> {
    if (quoteRequestData.termin) {
        const [workshopAppointment] = await db`
            SELECT
                w.id AS "workshopId",
                w.titel AS "workshopTitel",
                w.preis,
                t.id AS "terminId",
                t.datum_von AS "datumVon",
                t.datum_bis AS "datumBis"
            FROM workshop w
            INNER JOIN termin t
                ON t.workshop_id = w.id
            WHERE w.id = ${
                quoteRequestData.workshop.id
            }
              AND t.id = ${
                  quoteRequestData.termin.id
              }
              AND w.active = TRUE
              AND t.active = TRUE
              AND t.status <> 'ausgebucht'
            LIMIT 1
        `;

        return workshopAppointment
            ? workshopAppointment as
                WorkshopAppointmentData
            : null;
    }

    const [workshop] = await db`
        SELECT
            w.id AS "workshopId",
            w.titel AS "workshopTitel",
            w.preis,
            NULL::INTEGER AS "terminId",
            NULL::DATE AS "datumVon",
            NULL::DATE AS "datumBis"
        FROM workshop w
        WHERE w.id = ${
            quoteRequestData.workshop.id
        }
          AND w.active = TRUE
        LIMIT 1
    `;

    return workshop
        ? workshop as WorkshopAppointmentData
        : null;
}

/**
 * Berechnet den Gesamtpreis serverseitig aus dem tatsächlichen DB-Preis —
 * niemals einen vom Client übermittelten Preis vertrauen.
 *
 * @param price - Der Preis pro Teilnehmer aus der DB (netto)
 * @param participantCount - Anzahl der Teilnehmer
 * @returns Der berechnete Gesamtpreis
 * @throws Error, falls für den Workshop kein gültiger numerischer Preis hinterlegt ist
 */
function calculateTotalPrice(
    price: number | string | null,
    participantCount: number,
): number {
    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice)) {
        throw new Error(
            "Für den Workshop ist kein gültiger Preis hinterlegt.",
        );
    }

    return numericPrice * participantCount;
}

/**
 * Speichert die Angebotsanfrage inkl. optionaler Rechnungsadresse und
 * Bestätigungs-Token in der DB.
 *
 * @param options - Siehe {@link InsertQuoteRequestOptions}
 * @returns Die ID der angelegten Angebotsanfrage
 * @throws Error, falls das Speichern fehlschlägt
 */
async function insertQuoteRequest({
    confirmationToken,
    ipAddress,
    quoteRequestData,
    totalPrice,
    workshopAppointment,
}: InsertQuoteRequestOptions): Promise<string> {

    // Rechnungsadresse nur übernehmen, wenn sie explizit als abweichend markiert wurde
    const billingAddress =
        quoteRequestData.abweichendeRechnungsadresse
            ? quoteRequestData.rechnungsadresse
            : null;

    try {
        const [quoteRequest] = await db`
            INSERT INTO angebotsanfrage (
                workshop_id,
                workshop_titel,
                datum_von,
                datum_bis,
                teilnehmerzahl,
                firma,
                strasse,
                plz,
                ort,
                website,
                anrede,
                vorname,
                nachname,
                email,
                telefon,
                rechnung_firma,
                rechnung_strasse,
                rechnung_plz,
                rechnung_ort,
                notizen,
                preis,
                gesamtpreis,
                ip_adresse,
                confirmation_token,
                confirmation_expires_at
            )
            VALUES (
                ${workshopAppointment.workshopId},
                ${workshopAppointment.workshopTitel},
                ${workshopAppointment.datumVon},
                ${workshopAppointment.datumBis},
                ${quoteRequestData.teilnehmerzahl},
                ${quoteRequestData.adresse.firma},
                ${quoteRequestData.adresse.strasse},
                ${quoteRequestData.adresse.plz},
                ${quoteRequestData.adresse.ort},
                ${quoteRequestData.webseite ?? null},
                ${
                    quoteRequestData.ansprechpartner
                        .anrede
                },
                ${
                    quoteRequestData.ansprechpartner
                        .vorname
                },
                ${
                    quoteRequestData.ansprechpartner
                        .nachname
                },
                ${
                    quoteRequestData.ansprechpartner
                        .email
                },
                ${
                    quoteRequestData.ansprechpartner
                        .telefon ?? null
                },
                ${billingAddress?.firma ?? null},
                ${billingAddress?.strasse ?? null},
                ${billingAddress?.plz ?? null},
                ${billingAddress?.ort ?? null},
                ${quoteRequestData.nachricht ?? null},
                ${workshopAppointment.preis},
                ${totalPrice},
                ${ipAddress},
                ${confirmationToken},
                NOW() + INTERVAL '3 DAY'
            )
            RETURNING id
        `;

        if (!quoteRequest) {
            throw new Error(
                "No quote request row was returned.",
            );
        }

        return String(quoteRequest.id);
    } catch (error: unknown) {
        console.error(
            "Failed to insert quote request.",
            error,
        );

        throw new Error(
            "Die Angebotsanfrage konnte nicht gespeichert werden.",
        );
    }
}

/**
 * Versendet die Double-Opt-In-E-Mail und fängt dabei jeden Fehler ab, statt ihn
 * zu werfen — die Anfrage selbst wurde bereits gespeichert und soll dadurch nicht scheitern.
 *
 * @param options - Siehe {@link SendQuoteRequestEmailOptions}
 * @returns Ein {@link SendQuoteRequestEmailResult} mit Erfolgsstatus und ggf. der Resend-ID
 */
async function sendQuoteRequestEmailSafely({
    confirmationToken,
    quoteRequestData,
    quoteRequestId,
    workshopAppointment,
}: SendQuoteRequestEmailOptions): Promise<SendQuoteRequestEmailResult> {
    try {

        // Absolute URL nötig, da der Link per E-Mail versendet wird (kein relativer Request-Kontext)
        const baseUrl = getBaseUrl();

        const emailData =
            sendQuoteRequestOptInEmailSchema.parse({
                ...quoteRequestData,

                confirmationLink:
                    `${baseUrl}/offer-requests/` +
                    `${quoteRequestId}/confirm` +
                    `?token=${confirmationToken}`,

                salutation:
                    createFormalSalutation(
                        quoteRequestData.ansprechpartner,
                    ),

                termin: workshopAppointment.terminId
                    ? {
                          datumBis: String(
                              workshopAppointment.datumBis,
                          ),
                          datumVon: String(
                              workshopAppointment.datumVon,
                          ),
                          id: workshopAppointment.terminId,
                      }
                    : null,

                workshop: {
                    id: workshopAppointment.workshopId,
                    titel:
                        workshopAppointment.workshopTitel,
                },
            });

        const emailId =
            await sendQuoteRequestOptInEmail(
                emailData,
            );

        return {
            emailId,
            sent: true,
        };
    } catch (error: unknown) {
        console.error(
            "Quote request was created, but its opt-in email could not be sent.",
            error,
        );

        return {
            sent: false,
        };
    }
}

/**
 * Baut die formelle Anrede für die Opt-In-E-Mail passend zur gewählten Anrede
 * des Ansprechpartners.
 *
 * @param contactPerson - Der Ansprechpartner der Anfrage (Anrede, Vor-/Nachname)
 * @returns Die formelle Anrede, z.B. "Sehr geehrte Frau Mustermann,"
 */
function createFormalSalutation(
    contactPerson:
        CreateQuoteRequestData["ansprechpartner"],
): string {
    switch (contactPerson.anrede) {
        case "Frau":
            return `Sehr geehrte Frau ${contactPerson.nachname},`;

        case "Herr":
            return `Sehr geehrter Herr ${contactPerson.nachname},`;

        default:
            return `Guten Tag ${contactPerson.vorname} ${contactPerson.nachname},`;
    }
}

/**
 * Liest die Basis-URL der Anwendung aus der Umgebungsvariable, ohne trailing Slash.
 *
 * @returns Die konfigurierte Basis-URL
 * @throws Error, falls `NEXT_PUBLIC_BASE_URL` nicht gesetzt ist
 */
function getBaseUrl(): string {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error(
            "NEXT_PUBLIC_BASE_URL is not configured.",
        );
    }

    return baseUrl.replace(/\/$/, "");
}

/**
 * Ermittelt die Client-IP-Adresse und fängt dabei jeden Fehler ab — die Anfrage
 * soll auch ohne bekannte IP-Adresse gespeichert werden können.
 *
 * @returns Die Client-IP-Adresse oder `null`, falls nicht ermittelbar
 */
async function getClientIpSafely():
    Promise<string | null> {
    try {
        return (await getClientIp()) ?? null;
    } catch (error: unknown) {
        console.error(
            "Failed to determine client IP address.",
            error,
        );

        return null;
    }
}