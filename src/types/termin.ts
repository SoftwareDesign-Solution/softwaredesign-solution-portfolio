/**
 * @file termin.ts
 * @description Typen für einen buchbaren Workshop-Termin und dessen Verfügbarkeitsstatus.
 * @module types/termin
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Verfügbarkeitsstatus eines Workshop-Termins. */
export type TerminStatus = 'verfuegbar' | 'restplaetze' | 'ausgebucht';

/** Ein konkreter, buchbarer Termin eines Workshops. */
export type Termin = {
    id: number;
    workshop_id: number;
    datumVon: string;
    datumBis: string;
    format?: string;
    status: TerminStatus;
    active: boolean;
};
