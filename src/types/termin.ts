export type TerminStatus = 'verfuegbar' | 'restplaetze' | 'ausgebucht';

export type Termin = {
    id: string;
    workshop_id: string;
    datumVon: string;
    datumBis: string;
    format?: string;
    status: TerminStatus;
    active: boolean;
};
