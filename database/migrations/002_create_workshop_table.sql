-- ====================================================================
-- Projekt:      softwaredesign-solution-portfolio
-- Datei:        002_create_workshop_table.sql
-- Beschreibung: Erstellt die Tabelle "workshop"
-- Autor:        Manuel <mail@softwaredesign-solution.de>
-- Datum:        2026-08-08
-- Version:      1.0
-- ====================================================================

-- ====================================================================
-- workshop
-- Abhängigkeit: trainer (001)
--
-- preis: NULL => App zeigt "Preis auf Anfrage" an
-- active + fehlende aktive termin-Einträge => App zeigt
-- Platzhalter "Aktuell keine Termine geplant" / Status "in Planung"
-- (abgeleitet, siehe termin, 003 - keine eigene Spalte nötig)
-- ====================================================================

CREATE TABLE workshop (
    id                  SERIAL PRIMARY KEY,
    slug                TEXT NOT NULL UNIQUE,
    titel               TEXT NOT NULL,
    kurzbeschreibung    TEXT,
    beschreibung        TEXT,
    dauer               TEXT,
    format              TEXT,
    sprache             TEXT,
    tag                TEXT,
    preis               NUMERIC(10, 2),
    trainer_id          INTEGER REFERENCES trainer(id) ON DELETE SET NULL,
    zielgruppe          TEXT[],
    voraussetzungen     TEXT[],
    lernziele           TEXT[],
    agenda              JSONB,
    reihenfolge         INTEGER NOT NULL DEFAULT 0,
    active              BOOLEAN NOT NULL DEFAULT true,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
