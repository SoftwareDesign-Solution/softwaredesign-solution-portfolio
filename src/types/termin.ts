export type TerminStatus = 'verfuegbar' | 'restplaetze' | 'ausgebucht';

export type Termin = {
    id: number;
    workshop_id: number;
    datumVon: string;
    datumBis: string;
    format?: string;
    status: TerminStatus;
    active: boolean;
};
