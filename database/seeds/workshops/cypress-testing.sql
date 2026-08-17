INSERT INTO workshop (
    slug,
    titel,
    kurzbeschreibung,
    beschreibung,
    dauer,
    format,
    sprache,
    preis,
    trainer_id,
    zielgruppe,
    voraussetzungen,
    lernziele,
    agenda
)
VALUES (
    'cypress-testing',
    'Cypress Testing Grundkurs',
    'Automatisierte E2E-Tests für Webanwendungen mit Cypress strukturiert planen, schreiben und debuggen',
    '<p><strong>Cypress</strong> unterstützt Teams dabei, End-to-End-Tests für Webanwendungen nah am tatsächlichen Nutzerverhalten zu automatisieren. In diesem 3-tägigen Cypress Training lernst du, Testfälle strukturiert aufzubauen, über den Testrunner auszuführen, Fehler gezielt zu analysieren und Tests für Formulare, mehrseitige Abläufe, DOM-Interaktionen und Netzwerk-Anfragen umzusetzen. Der Kurs verbindet die Grundlagen des E2E-Testings mit konkreter Arbeit an Cypress-Konfiguration, Testorganisation, Assertions, Debugging und nützlichen Features wie Screenshots, Videoaufzeichnungen, Spies und Stubs.</p><p>Besonders wertvoll ist das Training für Entwicklerinnen, Entwickler und Software-Tester, die Cypress in Frontend-Projekten mit Angular, React, Next.js oder Vue 3 einsetzen möchten. Wenn dir noch JavaScript- oder TypeScript-Grundlagen fehlen, eignet sich vorab der <a href="/seminare/javascript-grundkurs-fuer-programmiererfahrene/">JavaScript Grundkurs</a> oder der <a href="/seminare/typescript-grundkurs/">TypeScript Grundkurs</a>. Für weitere Webentwicklungs-Themen findest du passende Schulungen in der Kategorie <a href="/kategorien/it-trainings/webprogrammierung-webdesign/">Webentwicklung und Webdesign</a>.</p>',
    '3 Tag',
    'Remote oder Inhouse',
    'Deutsch',
    1490.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'Webentwicklerinnen und Webentwickler in Frontend-Projekten', 
        'Software-Testerinnen und Software-Tester für Webanwendungen', 
        'QA-Engineers mit JavaScript-Bezug', 
        'Frontend-Teams mit Cypress-Testautomatisierung'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Grundkenntnisse in HTML, CSS und JavaScript', 
        'Erste Erfahrung mit TypeScript von Vorteil', 
        'Grundverständnis für Webanwendungen und Browser-Verhalten'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Sicherer Einstieg in Cypress für automatisierte End-to-End-Tests',
        'Strukturierte Einrichtung, Konfiguration und Ausführung von Cypress-Tests',
        'Eigenständiges Schreiben von Tests für DOM-Interaktionen, Formulare und mehrseitige Abläufe',
        'Gezieltes Debugging mit Testrunner, Assertions, Screenshots und Videoaufzeichnungen',
        'Fundierter Umgang mit Component-Tests, Spies, Stubs und Netzwerk-Anfragen',
        'Einordnung der Cypress-Integration in Angular-, React-, Next.js- und Vue-3-Projekte'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "Cypress-Grundlagen und Projektsetup",
            "inhalte": [
                "Grundlagen End-To-End-Testing",
                "Installation und Konfiguration",
                "Testorganisation und Struktur"
            ]
        },
        {
            "titel": "Tests schreiben, ausführen und debuggen",
            "inhalte": [
                "Tests schreiben",
                "Formulare testen",
                "Testausführung und Debugging",
                "Testdaten und Fixtures"
            ]
        },
        {
            "titel": "Component-Tests, Cypress-Features und Integration",
            "inhalte": [
                "Component-Tests",
                "Cypress Features nutzen",
                "Cypress und Web Frontend Frameworks",
                "Cypress Dashboard"
            ]
        }
    ]'::jsonb
);