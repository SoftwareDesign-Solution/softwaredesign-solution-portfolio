import { Agenda } from "./agenda";
import { Termin } from "./termin";
import { Trainer } from "./trainer";

export type Workshop = {
    id: string;
    slug: string;
    titel: string;
    kurzbeschreibung?: string;
    beschreibung?: string;
    dauer?: string;
    format?: string;
    sprache?: string;
    preis?: number;
    trainer_id?: string;
    trainer?: Trainer;
    zielgruppe?: string[];
    voraussetzungen?: string[];
    lernziele?: string[];
    agenda?: Agenda[];
    termine?: Termin[];
    active: boolean;
};
