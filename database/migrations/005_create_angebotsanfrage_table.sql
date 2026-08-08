-- ====================================================================
-- Projekt:      softwaredesign-solution-portfolio
-- Datei:        005_create_angebotsanfrage_table.sql
-- Beschreibung: Erstellt die Tabelle "workshop"
-- Autor:        Manuel <mail@softwaredesign-solution.de>
-- Datum:        2026-08-08
-- Version:      1.0
-- ====================================================================

-- ====================================================================
-- angebotsanfrage
-- Abhängigkeit: workshop (002), Enum "anrede" (004)
--
-- workshop_titel: siehe Begründung bei buchung (004)
-- ====================================================================

CREATE TABLE angebotsanfrage (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id         INTEGER REFERENCES workshop(id) ON DELETE SET NULL,
    workshop_titel      TEXT NOT NULL,
    datum_von           DATE,
    datum_bis           DATE,
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
    rechnung_firma      TEXT,
    rechnung_strasse    TEXT,
    rechnung_plz        TEXT,
    rechnung_ort        TEXT,
    notizen             TEXT,
    preis               NUMERIC(10, 2),
    gesamtpreis         NUMERIC(10, 2),
    ip_adresse          TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT angebotsanfrage_datum_check CHECK (
        datum_bis IS NULL OR datum_von IS NULL OR datum_bis >= datum_von
    )
);
