/**
 * @file trainer.ts
 * @description Typ für einen Workshop-Trainer.
 * @module types/trainer
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

/** Ein Workshop-Trainer mit Kurzprofil für die Anzeige auf der Website. */
export type Trainer = {
    id: string;
    name: string;
    titel: string;
    bio: string;
    foto: string;
};
