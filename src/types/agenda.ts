/**
 * @file agenda.ts
 * @description Typ für einen Agenda-Block eines Workshops.
 * @module types/agenda
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Ein Agenda-Block eines Workshops (z.B. "Tag 1") mit den zugehörigen Inhalten. */
export type Agenda = {
    titel: string;
    inhalte: string[];
};
