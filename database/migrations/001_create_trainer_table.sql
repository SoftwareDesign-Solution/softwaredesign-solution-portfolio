-- ====================================================================
-- Projekt:      softwaredesign-solution-portfolio
-- Datei:        001_create_trainer_table.sql
-- Beschreibung: Erstellt die Tabelle "trainer"
-- Autor:        Manuel <mail@softwaredesign-solution.de>
-- Datum:        2026-08-08
-- Version:      1.0
-- ====================================================================
 
CREATE TABLE trainer (
    id      SERIAL PRIMARY KEY,
    name    TEXT NOT NULL,
    titel   TEXT,
    bio     TEXT,
    foto    TEXT
);
