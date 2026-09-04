/**
 * @file create-booking.ts
 * @description Server Action zum Anlegen einer verbindlichen Workshop-Buchung.
 * Validiert und verarbeitet die vom Buchungsformular ({@link BookingForm}) übermittelten
 * Daten serverseitig, bevor sie in der Datenbank gespeichert und die Buchungsbestätigung
 * per E-Mail versendet wird.
 * @module app/actions/create-booking
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

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

/** Projektion von Workshop + Termin, wie sie für eine Buchung benötigt wird. */
interface BookableWorkshopAppointment {
    datumBis: string | Date;
    datumVon: string | Date;
    preis: number | string | null;
    terminId: number;
    workshopId: number;
    workshopTitel: string;
}

/** Parameter für {@link insertBooking}. */
interface InsertBookingOptions {
    bookingData: CreateBookingData;
    ipAddress: string | null;
    totalPrice: number;
    workshopAppointment:
        BookableWorkshopAppointment;
}

/** Parameter für {@link sendBookingEmailSafely}. */
interface SendBookingEmailOptions {
    bookingData: CreateBookingData;
    bookingId: string;
    totalPrice: number;
    workshopAppointment:
        BookableWorkshopAppointment;
}

/** Rückgabe von {@link sendBookingEmailSafely}. */
interface SendBookingEmailResult {
    emailId?: string;
    sent: boolean;
}

/** Ergebnis von {@link createBooking}. */
export interface CreateBookingResult {
    /** ID der angelegten Buchung. */
    bookingId: string;
    /** Ob die Buchungsbestätigungs-E-Mail erfolgreich versendet werden konnte. */
    confirmationEmailSent: boolean;
    /** Resend-ID der versendeten E-Mail, falls erfolgreich. */
    emailId?: string;
}

/**
 * Server Action für das Buchungsformular: validiert die Eingaben, prüft Turnstile,
 * lädt Workshop/Termin serverseitig neu (Preis/Verfügbarkeit dürfen nicht vom Client
 * kommen), speichert die Buchung und versendet die Buchungsbestätigung per E-Mail.
 *
 * Ein Fehler beim E-Mail-Versand führt NICHT zu einem geworfenen Error, da die
 * Buchung zu diesem Zeitpunkt bereits gespeichert ist — stattdessen wird
 * `confirmationEmailSent: false` mit einer Fehlermeldung zurückgegeben.
 *
 * @param data - Die vom Client übermittelten und gegen {@link createBookingSchema}
 *               zu validierenden Buchungsdaten (Workshop, Termin, Teilnehmer, Adressen,
 *               Zustimmung, Turnstile-Token)
 * @returns Ein {@link CreateBookingResult} mit der angelegten `bookingId` sowie dem
 *          Status des E-Mail-Versands (`confirmationEmailSent`, ggf. `emailId`)
 * @throws Error bei ungültigen Eingaben, fehlgeschlagener Turnstile-Prüfung,
 *         inkonsistenter Teilnehmerzahl, nicht verfügbarem Workshop/Termin
 *         oder einem Fehler beim Speichern in der DB
 *
 * @example
 * ```ts
 * const result = await createBooking({
 *   workshop: { id: 1, titel: "Clean Code Workshop" },
 *   termin: { id: 12, datumVon: "2026-09-01", datumBis: "2026-09-02" },
 *   teilnehmerzahl: 2,
 *   // ...weitere Formularfelder
 * });
 * ```
 */
export async function createBooking(
    data: CreateBookingData,
): Promise<CreateBookingResult> {

    // Server-seitige Zod-Validierung — nie nur auf Client-Validierung verlassen,
    //    da die Server Action theoretisch auch direkt (ohne UI) aufrufbar ist
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

    // Bot-/Spam-Schutz: ohne gültiges Turnstile-Token keine Verarbeitung
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

/**
 * Prüft, dass die Anzahl der erfassten Teilnehmer mit der angegebenen
 * Teilnehmerzahl übereinstimmt (Konsistenzprüfung gegen manipulierte Client-Daten).
 *
 * @param bookingData - Die validierten Buchungsdaten
 * @throws Error, falls Teilnehmerzahl und Anzahl der Teilnehmer-Datensätze abweichen
 */
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

/**
 * Lädt Workshop und Termin frisch aus der DB und prüft dabei direkt die
 * Buchbarkeit (aktiv, nicht ausgebucht). Preis und Verfügbarkeit kommen so
 * niemals ungeprüft vom Client.
 *
 * @param workshopId - ID des gebuchten Workshops
 * @param appointmentId - ID des ausgewählten Termins
 * @returns Die kombinierten Workshop-/Termin-Daten, oder `null` falls nicht buchbar
 */
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
 * Speichert die Buchung inkl. Teilnehmerliste und optionaler Rechnungsadresse in der DB.
 *
 * @param options - Siehe {@link InsertBookingOptions}
 * @returns Die ID der angelegten Buchung
 * @throws Error, falls das Speichern fehlschlägt
 */
async function insertBooking({
    bookingData,
    ipAddress,
    totalPrice,
    workshopAppointment,
}: InsertBookingOptions): Promise<string> {

    // Rechnungsadresse nur übernehmen, wenn sie explizit als abweichend markiert wurde
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

/**
 * Versendet die Buchungsbestätigung und fängt dabei jeden Fehler ab, statt ihn zu werfen —
 * die Buchung selbst wurde bereits gespeichert und soll dadurch nicht scheitern.
 *
 * @param options - Siehe {@link SendBookingEmailOptions}
 * @returns Ein {@link SendBookingEmailResult} mit Erfolgsstatus und ggf. der Resend-ID
 */
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

/**
 * Baut die persönliche Anrede für die Buchungsbestätigungs-E-Mail.
 *
 * @param firstName - Vorname des Ansprechpartners
 * @returns Die Anrede, z.B. "Hallo Manuel"
 */
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