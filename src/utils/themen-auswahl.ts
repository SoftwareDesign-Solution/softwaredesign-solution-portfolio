/**
 * @file themen-auswahl.ts
 * @description Hilfsfunktionen für die Themenauswahl der Angebotsanfrage: Zählen der
 * gewählten Themen (Formular, Preisbox) und Aufbau der gespeicherten Momentaufnahme (Server).
 * @module utils/themen-auswahl
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { type TopicsAuswahl, type TopicsPosition } from "@/schemas/shared/topics.schema";
import { Agenda } from "@/types/agenda";

/** Ergebnis von {@link zaehleThemen}. */
export interface ThemenUmfang {
    angepasst: boolean;
    gesamt: number;
    gewaehlt: number;
}

/** Schlüssel einer Themen-Position, z.B. `"1-3"` für Tag 2, Thema 4. */
export function themenSchluessel(tag: number, thema: number): string {
    return `${tag}-${thema}`;
}

/**
 * Zählt die gewählten Themen. Positionen, die es in der Agenda nicht gibt, werden ignoriert.
 *
 * @param agenda - Die Agenda des Workshops
 * @param abgewaehlt - Positionen der abgewählten Themen
 * @returns Anzahl gewählt, Gesamtzahl und ob vom Standardumfang abgewichen wurde
 */
export function zaehleThemen(
    agenda: Agenda[],
    abgewaehlt: TopicsPosition[],
): ThemenUmfang {
    const gesamt = agenda.reduce((summe, tag) => summe + tag.inhalte.length, 0);

    const gueltig = new Set(
        abgewaehlt
            .filter(([tag, thema]) => thema < (agenda[tag]?.inhalte.length ?? 0))
            .map(([tag, thema]) => themenSchluessel(tag, thema)),
    );

    const gewaehlt = gesamt - gueltig.size;

    return {
        angepasst: gewaehlt < gesamt,
        gesamt,
        gewaehlt,
    };
}

/**
 * Baut die Momentaufnahme der Themenauswahl mit den Titeln aus der Agenda.
 * Nur auf dem Server aufrufen, mit der Agenda frisch aus der Datenbank.
 *
 * @param agenda - Die Agenda des Workshops aus der Datenbank
 * @param abgewaehlt - Positionen der abgewählten Themen aus dem Formular
 * @param wunschthemen - Freitext mit zusätzlichen Wunschthemen
 * @returns Die Momentaufnahme für `angebotsanfrage.themen` und die E-Mail
 */
export function baueThemenAuswahl(
    agenda: Agenda[],
    abgewaehlt: TopicsPosition[],
    wunschthemen?: string,
): TopicsAuswahl {
    const aus = new Set(abgewaehlt.map(([tag, thema]) => themenSchluessel(tag, thema)));

    const tage = agenda.map((tag, tagIndex) => ({
        themen: tag.inhalte.map((titel, themaIndex) => ({
            gewaehlt: !aus.has(themenSchluessel(tagIndex, themaIndex)),
            titel,
        })),
        titel: tag.titel,
    }));

    const { angepasst, gesamt, gewaehlt } = zaehleThemen(agenda, abgewaehlt);

    return {
        angepasst,
        gesamt,
        gewaehlt,
        tage,
        wunschthemen: wunschthemen?.trim() || null,
    };
}

/**
 * Kurzfassung des Themenumfangs für die Übersichtstabelle.
 *
 * @param themen - Die gespeicherte Themenauswahl (oder `null`/`undefined` bei festem Termin)
 * @returns Z.B. "13 von 15 Themen (angepasst)" oder "Standardumfang"
 */
export function formatThemenumfang(themen: TopicsAuswahl | null | undefined): string {
    // Kein Eintrag oder nur Wunschthemen (Agenda war ungültig)
    if (!themen || themen.tage.length === 0) {
        return "Standardumfang";
    }

    return themen.angepasst
        ? `${themen.gewaehlt} von ${themen.gesamt} Themen (angepasst)`
        : `Standard (${themen.gesamt} Themen)`;
}
