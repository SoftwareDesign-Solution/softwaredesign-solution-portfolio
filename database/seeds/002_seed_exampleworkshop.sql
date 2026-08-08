-- =========================================================
-- Seed: Beispiel-Workshop mit Trainer, Terminen und Buchung
-- Voraussetzung: Migrationen 001-007 wurden bereits ausgeführt
--
-- Erzeugt:
--   1x trainer
--   1x workshop (verweist auf den Trainer)
--   2x termin (ein eintägiger, ein mehrtägiger Termin)
--   1x buchung (für den ersten Termin)
-- =========================================================

WITH neuer_workshop AS (
    INSERT INTO workshop (
        slug, titel, kurzbeschreibung, beschreibung, dauer, format, sprache,
        preis, trainer_id, zielgruppe, voraussetzungen, lernziele, agenda, active
    )
    VALUES (
        'ux-design-grundlagen',
        'UX Design Grundlagen',
        'Lerne die Grundlagen des User Experience Designs in zwei intensiven Tagen.',
        'In diesem Workshop erarbeitest du dir das Handwerkszeug für nutzerzentriertes Design: von der Nutzerforschung über Wireframing bis zum Usability-Test. Du arbeitest an einem durchgängigen Praxisbeispiel und nimmst konkrete Methoden für deinen Arbeitsalltag mit.',
        '2 Tage',
        'Vor Ort / Online',
        'Deutsch',
        890.00,
        1,
        ARRAY['UX/UI Designer', 'Produktmanager', 'Frontend-Entwickler'],
        ARRAY['Keine Vorkenntnisse notwendig', 'Eigener Laptop wird benötigt'],
        ARRAY['Grundprinzipien des UX Designs verstehen', 'Wireframes eigenständig erstellen können', 'Einen Usability-Test planen und durchführen'],
        '[
            {"tag": 1, "titel": "Grundlagen & Methoden", "punkte": ["Einführung in UX", "Nutzerforschung", "Personas & User Journeys"]},
            {"tag": 2, "titel": "Praxis & Umsetzung", "punkte": ["Wireframing", "Prototyping", "Usability-Testing"]}
        ]'::jsonb,
        true
    )
    RETURNING id, titel
),
neue_termine AS (
    INSERT INTO termin (workshop_id, datum_von, datum_bis, format, status, active)
    SELECT id, '2026-09-14'::date, '2026-09-15'::date, 'Vor Ort', 'verfuegbar'::termin_status, true
    FROM neuer_workshop
    UNION ALL
    SELECT id, '2026-11-10'::date, '2026-11-11'::date, 'Online', 'restplaetze'::termin_status, true
    FROM neuer_workshop
    RETURNING id, workshop_id, datum_von, datum_bis
)
INSERT INTO buchung (
    workshop_id, workshop_titel, datum_von, datum_bis, teilnehmerzahl,
    firma, strasse, plz, ort, website,
    anrede, vorname, nachname, email, telefon,
    teilnehmer, notizen, preis, gesamtpreis, ip_adresse
)
SELECT
    w.id,
    w.titel,
    t.datum_von,
    t.datum_bis,
    3,
    'Musterfirma GmbH',
    'Musterstraße 1',
    '12345',
    'Musterstadt',
    'https://musterfirma.de',
    'Frau',
    'Julia',
    'Muster',
    'julia.muster@musterfirma.de',
    '+49 30 1234567',
    '[
        {"vorname": "Julia", "nachname": "Muster", "email": "julia.muster@musterfirma.de"},
        {"vorname": "Tom", "nachname": "Beispiel", "email": "tom.beispiel@musterfirma.de"},
        {"vorname": "Lea", "nachname": "Test", "email": "lea.test@musterfirma.de"}
    ]'::jsonb,
    'Bitte vegetarisches Catering einplanen.',
    890.00,
    2670.00,
    '203.0.113.42'
FROM neuer_workshop w
JOIN neue_termine t ON t.workshop_id = w.id
ORDER BY t.datum_von
LIMIT 1;

-- =========================================================
-- Beispiel: offene (unbestätigte) Benachrichtigungs-Anmeldung
-- für einen zukünftigen Termin desselben Workshops
-- =========================================================

INSERT INTO workshop_benachrichtigung (
    workshop_id, workshop_titel, vorname, nachname, email, ip_adresse,
    confirmation_expires_at
)
SELECT
    id,
    'UX Design Grundlagen',
    'Max',
    'Mustermann',
    'max.mustermann@example.com',
    '198.51.100.7',
    now() + interval '24 hours'
FROM workshop
WHERE slug = 'ux-design-grundlagen';