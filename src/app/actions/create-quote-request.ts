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

const CONFIRMATION_EXPIRATION_DAYS = 3;

interface WorkshopAppointmentData {
    datumBis: string | Date | null;
    datumVon: string | Date | null;
    preis: number | string | null;
    terminId: number | null;
    workshopId: number;
    workshopTitel: string;
}

interface InsertQuoteRequestOptions {
    confirmationToken: string;
    ipAddress: string | null;
    quoteRequestData: CreateQuoteRequestData;
    totalPrice: number;
    workshopAppointment:
        WorkshopAppointmentData;
}

interface SendQuoteRequestEmailOptions {
    confirmationToken: string;
    quoteRequestData: CreateQuoteRequestData;
    quoteRequestId: string;
    workshopAppointment:
        WorkshopAppointmentData;
}

interface SendQuoteRequestEmailResult {
    emailId?: string;
    sent: boolean;
}

export interface CreateQuoteRequestResult {
    confirmationEmailSent: boolean;
    emailId?: string;
    quoteRequestId: string;
}

export async function createQuoteRequest(
    data: CreateQuoteRequestData,
): Promise<CreateQuoteRequestResult> {
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

async function insertQuoteRequest({
    confirmationToken,
    ipAddress,
    quoteRequestData,
    totalPrice,
    workshopAppointment,
}: InsertQuoteRequestOptions): Promise<string> {
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

async function sendQuoteRequestEmailSafely({
    confirmationToken,
    quoteRequestData,
    quoteRequestId,
    workshopAppointment,
}: SendQuoteRequestEmailOptions): Promise<SendQuoteRequestEmailResult> {
    try {
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