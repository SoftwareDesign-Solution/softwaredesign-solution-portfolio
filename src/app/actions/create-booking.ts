"use server";

import { db } from "@/lib/db";
import getClientIp from "@/lib/get-client-ip";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
    type CreateBookingData,
    createBookingSchema,
    sendBookingConfirmationEmailSchema,
} from "@/schemas/booking.schema";
import { sendBookingConfirmationEmail } from "@/services/emails/send-booking-confirmation-email";

interface BookableWorkshopAppointment {
    datumBis: string | Date;
    datumVon: string | Date;
    preis: number | string | null;
    terminId: number;
    workshopId: number;
    workshopTitel: string;
}

interface InsertBookingOptions {
    bookingData: CreateBookingData;
    ipAddress: string | null;
    totalPrice: number;
    workshopAppointment:
        BookableWorkshopAppointment;
}

interface SendBookingEmailOptions {
    bookingData: CreateBookingData;
    bookingId: string;
    totalPrice: number;
    workshopAppointment:
        BookableWorkshopAppointment;
}

interface SendBookingEmailResult {
    emailId?: string;
    sent: boolean;
}

export interface CreateBookingResult {
    bookingId: string;
    confirmationEmailSent: boolean;
    emailId?: string;
}

export async function createBooking(
    data: CreateBookingData,
): Promise<CreateBookingResult> {
    const validationResult =
        createBookingSchema.safeParse(data);

    if (!validationResult.success) {
        console.error(
            "Invalid booking data.",
            validationResult.error.flatten(),
        );

        throw new Error(
            "Die eingegebenen Buchungsdaten sind ungültig.",
        );
    }

    const bookingData = validationResult.data;

    const isHuman = await verifyTurnstileToken(
        bookingData.turnstile.token,
    );

    if (!isHuman) {
        throw new Error(
            "Die Sicherheitsabfrage ist fehlgeschlagen.",
        );
    }

    validateParticipantCount(bookingData);

    const workshopAppointment =
        await getBookableWorkshopAppointment(
            bookingData.workshop.id,
            bookingData.termin.id,
        );

    if (!workshopAppointment) {
        throw new Error(
            "Der ausgewählte Workshop oder Termin ist nicht verfügbar.",
        );
    }

    const totalPrice = calculateTotalPrice(
        workshopAppointment.preis,
        bookingData.teilnehmerzahl,
    );

    const ipAddress = await getClientIpSafely();

    const bookingId = await insertBooking({
        bookingData,
        ipAddress,
        totalPrice,
        workshopAppointment,
    });

    const emailResult =
        await sendBookingEmailSafely({
            bookingData,
            bookingId,
            totalPrice,
            workshopAppointment,
        });

    return {
        bookingId,
        confirmationEmailSent: emailResult.sent,
        emailId: emailResult.emailId,
    };
}

function validateParticipantCount(
    bookingData: CreateBookingData,
): void {
    if (
        bookingData.teilnehmer.length !==
        bookingData.teilnehmerzahl
    ) {
        throw new Error(
            "Die Teilnehmerzahl stimmt nicht mit den erfassten Teilnehmern überein.",
        );
    }
}

async function getBookableWorkshopAppointment(
    workshopId: number,
    appointmentId: number,
): Promise<BookableWorkshopAppointment | null> {
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
        WHERE w.id = ${workshopId}
          AND t.id = ${appointmentId}
          AND w.active = TRUE
          AND t.active = TRUE
          AND t.status <> 'ausgebucht'
        LIMIT 1
    `;

    if (!workshopAppointment) {
        return null;
    }

    return workshopAppointment as
        BookableWorkshopAppointment;
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

async function insertBooking({
    bookingData,
    ipAddress,
    totalPrice,
    workshopAppointment,
}: InsertBookingOptions): Promise<string> {
    const billingAddress =
        bookingData.abweichendeRechnungsadresse
            ? bookingData.rechnungsadresse
            : null;

    try {
        const [booking] = await db`
            INSERT INTO buchung (
                workshop_id,
                workshop_titel,
                termin_id,
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
                teilnehmer,
                rechnung_firma,
                rechnung_strasse,
                rechnung_plz,
                rechnung_ort,
                notizen,
                preis,
                gesamtpreis,
                ip_adresse
            )
            VALUES (
                ${workshopAppointment.workshopId},
                ${workshopAppointment.workshopTitel},
                ${workshopAppointment.terminId},
                ${workshopAppointment.datumVon},
                ${workshopAppointment.datumBis},
                ${bookingData.teilnehmerzahl},
                ${bookingData.adresse.firma},
                ${bookingData.adresse.strasse},
                ${bookingData.adresse.plz},
                ${bookingData.adresse.ort},
                ${bookingData.webseite ?? null},
                ${bookingData.ansprechpartner.anrede},
                ${bookingData.ansprechpartner.vorname},
                ${bookingData.ansprechpartner.nachname},
                ${bookingData.ansprechpartner.email},
                ${
                    bookingData.ansprechpartner
                        .telefon ?? null
                },
                ${
                    JSON.stringify(
                        bookingData.teilnehmer,
                    )
                },
                ${billingAddress?.firma ?? null},
                ${billingAddress?.strasse ?? null},
                ${billingAddress?.plz ?? null},
                ${billingAddress?.ort ?? null},
                ${bookingData.nachricht ?? null},
                ${workshopAppointment.preis},
                ${totalPrice},
                ${ipAddress}
            )
            RETURNING id
        `;

        if (!booking) {
            throw new Error(
                "No booking row was returned.",
            );
        }

        return String(booking.id);
    } catch (error: unknown) {
        console.error(
            "Failed to insert booking.",
            error,
        );

        throw new Error(
            "Die Buchung konnte nicht gespeichert werden.",
        );
    }
}

async function sendBookingEmailSafely({
    bookingData,
    totalPrice,
    workshopAppointment,
}: SendBookingEmailOptions): Promise<SendBookingEmailResult> {
    try {
        const emailData =
            sendBookingConfirmationEmailSchema.parse({
                ...bookingData,

                gesamtpreis: totalPrice,

                salutation:
                    createBookingSalutation(
                        bookingData.ansprechpartner
                            .vorname,
                    ),

                termin: {
                    datumBis: String(
                        workshopAppointment.datumBis,
                    ),
                    datumVon: String(
                        workshopAppointment.datumVon,
                    ),
                    id: workshopAppointment.terminId,
                },

                workshop: {
                    id: workshopAppointment.workshopId,
                    titel:
                        workshopAppointment.workshopTitel,
                },
            });

        const emailId =
            await sendBookingConfirmationEmail(
                emailData,
            );

        return {
            emailId,
            sent: true,
        };
    } catch (error: unknown) {
        console.error(
            "Booking was created, but its confirmation email could not be sent.",
            error,
        );

        return {
            sent: false,
        };
    }
}

function createBookingSalutation(
    firstName: string,
): string {
    return `Hallo ${firstName}`;
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