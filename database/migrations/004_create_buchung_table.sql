-- ====================================================================
-- Projekt:      softwaredesign-solution-portfolio
-- Datei:        004_create_buchung_table.sql
-- Beschreibung: Erstellt die Tabelle "workshop"
-- Autor:        Manuel <mail@softwaredesign-solution.de>
-- Datum:        2026-08-08
-- Version:      1.0
-- ====================================================================

-- ====================================================================
-- buchung
-- Abhängigkeit: workshop (002)
--
-- workshop_titel: Snapshot des Workshop-Titels zum Buchungszeitpunkt,
-- damit die Buchung auch dann noch zuordenbar bleibt, wenn der
-- Workshop später gelöscht wird (workshop_id wird dann NULL).
-- teilnehmer: JSONB-Array einzelner Teilnehmer
--   [{ "vorname": "...", "nachname": "...", "email": "..." }, ...]
-- ====================================================================

-- Für gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE anrede AS ENUM ('Frau', 'Herr', 'Divers', 'Keine Angabe');

CREATE TABLE buchung (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id         INTEGER REFERENCES workshop(id) ON DELETE SET NULL,
    workshop_titel      TEXT NOT NULL,
    datum_von           DATE NOT NULL,
    datum_bis           DATE NOT NULL,
    teilnehmerzahl      NUMERIC(5),
    firma               TEXT,
    strasse             TEXT,
    plz                 TEXT,
    ort                 TEXT,
    website             TEXT,
    anrede              anrede,
    vorname             TEXT,
    nachname            TEXT,
    email               TEXT NOT NULL,
    telefon             TEXT,
    teilnehmer          JSONB,
    rechnung_firma      TEXT,
    rechnung_strasse    TEXT,
    rechnung_plz        TEXT,
    rechnung_ort        TEXT,
    notizen             TEXT,
    preis               NUMERIC(10, 2),
    gesamtpreis         NUMERIC(10, 2),
    ip_adresse          TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT buchung_datum_check CHECK (datum_bis >= datum_von)
);
