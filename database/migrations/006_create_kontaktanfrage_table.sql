-- ====================================================================
-- Projekt:      softwaredesign-solution-portfolio
-- Datei:        006_create_kontaktanfrage_table.sql
-- Beschreibung: Erstellt die Tabelle "workshop"
-- Autor:        Manuel <mail@softwaredesign-solution.de>
-- Datum:        2026-08-08
-- Version:      1.0
-- ====================================================================

-- ====================================================================
-- kontaktanfrage
-- Abhängigkeit: Enum "anrede" (004)
-- ====================================================================

CREATE TABLE kontaktanfrage (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firma               TEXT,
    strasse             TEXT,
    plz                 TEXT,
    ort                 TEXT,
    website             TEXT,
    bereits_kunde       BOOLEAN,
    anrede              anrede,
    vorname             TEXT,
    nachname            TEXT,
    email               TEXT NOT NULL,
    beschreibung        TEXT,
    quelle              TEXT,
    ip_adresse          TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
