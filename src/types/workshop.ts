import { Agenda } from "./agenda";
import { Termin } from "./termin";

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
    zielgruppe?: string[];
    voraussetzungen?: string[];
    lernziele?: string[];
    agenda?: Agenda[];
    termine?: Termin[];
    active: boolean;
};
