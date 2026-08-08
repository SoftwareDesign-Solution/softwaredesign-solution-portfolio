-- =========================================================
-- Projekt:      softwaredesign-solution-portfolio
-- Datei:        003_create_termin_table.sql
-- Beschreibung: Erstellt die Tabelle "termin"
-- Autor:        Manuel <mail@softwaredesign-solution.de>
-- Datum:        2026-08-08
-- Version:      1.0
-- =========================================================

-- =========================================================
-- termin
-- Abhängigkeit: workshop (002)
--
-- Statt "datum": datum_von / datum_bis, damit auch
-- mehrtägige Schulungstermine abgebildet werden können.
-- Bei eintägigen Terminen ist datum_von = datum_bis.
--
-- Hinweis "in Planung": Hat ein aktiver Workshop keine aktiven
-- termin-Einträge, leitet die App daraus den Platzhalter-Status ab –
-- es gibt bewusst keinen eigenen termin_status-Wert dafür, weil
-- termin_status die Platzverfügbarkeit EINES konkreten Termins meint.
-- =========================================================

CREATE TYPE termin_status AS ENUM ('verfuegbar', 'restplaetze', 'ausgebucht');

CREATE TABLE termin (
    id              SERIAL PRIMARY KEY,
    workshop_id     INTEGER NOT NULL REFERENCES workshop(id) ON DELETE CASCADE,
    datum_von       DATE NOT NULL,
    datum_bis       DATE NOT NULL,
    format          TEXT,
    status          termin_status NOT NULL DEFAULT 'verfuegbar',
    active          BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT termin_datum_check CHECK (datum_bis >= datum_von)
);

-- Nur aktive Termine werden öffentlich angezeigt/abgefragt
CREATE INDEX termin_active_idx ON termin (workshop_id, datum_von) WHERE active = true;
