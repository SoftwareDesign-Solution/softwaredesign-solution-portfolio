-- ====================================================================
-- Projekt:      softwaredesign-solution-portfolio
-- Datei:        007_create_workshop_benachrichtigung_table.sql
-- Beschreibung: Erstellt die Tabelle "workshop"
-- Autor:        Manuel <mail@softwaredesign-solution.de>
-- Datum:        2026-08-08
-- Version:      1.0
-- ====================================================================

-- ====================================================================
-- workshop_benachrichtigung
-- Abhängigkeit: workshop (002)
--
-- Benachrichtigung, sobald neue Termine für einen Workshop
-- verfügbar sind (Double-Opt-In + Unsubscribe-Token).
-- ====================================================================

CREATE TABLE workshop_benachrichtigung (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id                 INTEGER NOT NULL REFERENCES workshop(id) ON DELETE CASCADE,
    workshop_titel              TEXT NOT NULL,
    vorname                     TEXT,
    nachname                    TEXT,
    email                       TEXT NOT NULL,
    ip_adresse                  TEXT,
    confirmation_token          UUID NOT NULL DEFAULT gen_random_uuid(),
    confirmation_expires_at     TIMESTAMPTZ,
    confirmed_at                TIMESTAMPTZ,
    unsubscribe_token           UUID NOT NULL DEFAULT gen_random_uuid(),
    unsubscribed_at             TIMESTAMPTZ,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Verhindert doppelte aktive Anmeldungen fürs selbe Workshop+E-Mail
CREATE UNIQUE INDEX workshop_benachrichtigung_unique_idx
    ON workshop_benachrichtigung (workshop_id, email)
    WHERE unsubscribed_at IS NULL;
