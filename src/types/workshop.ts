import { Agenda } from "./agenda";
import { Termin } from "./termin";
import { Trainer } from "./trainer";

export type Workshop = {
    id: number;
    slug: string;
    titel: string;
    kurzbeschreibung?: string;
    beschreibung?: string;
    dauer?: number;
    format?: string;
    sprache?: string;
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
