/**
 * @file workshop.ts
 * @description Zentraler Datentyp für ein Workshop-Angebot inkl. Terminen, Agenda
 * und zugehörigem Trainer.
 * @module types/workshop
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

import { Agenda } from "./agenda";
import { Termin } from "./termin";
import { Trainer } from "./trainer";

/** Ein Workshop-Angebot inklusive Terminen, Agenda und zugehörigem Trainer. */
export type Workshop = {
    id: number;
    slug: string;
    titel: string;
    kurzbeschreibung?: string;
    beschreibung?: string;
    /** Dauer in Tagen. */
    dauer?: number;
    format?: string;
    sprache?: string;
    /** Preis in Euro (netto). */
    preis?: number;
    trainer_id?: number;
    trainer?: Trainer;
    zielgruppe?: string[];
    voraussetzungen?: string[];
    lernziele?: string[];
    agenda?: Agenda[];
    termine?: Termin[];
    active: boolean;
};
