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
    'storybook',
    'Storybook',
    'UI-Komponenten isoliert entwickeln, dokumentieren und automatisiert in Front-End-Workflows absichern',
    '<p>Storybook unterstützt Front-End-Teams dabei, UI-Komponenten isoliert vom Anwendungskontext zu entwickeln, unterschiedliche Zustände nachvollziehbar abzubilden und die Zusammenarbeit zwischen Entwicklung, Design und Qualitätssicherung zu verbessern. Im Storybook Komplettkurs arbeitest du mit Stories, Add-ons, Dokumentation, Tests und CI/CD-Integration, damit Komponenten nicht nur funktionieren, sondern auch dauerhaft wartbar bleiben.</p><p>Der Kurs richtet sich an Entwicklerinnen und Entwickler, die Storybook in bestehenden React-, Vue- oder Angular-Projekten einsetzen oder eine belastbare Grundlage für Component-Driven Development schaffen möchten. Dabei geht es nicht nur um die Installation, sondern auch um sinnvolle Story-Strukturen, Args und Controls, Dokumentationsseiten, visuelle Regressionstests, Interaction-Tests und den Einsatz in Build- und Review-Prozessen. Für Teams mit stärkerem UX- und Strukturanspruch ergänzt der <a href="/seminare/website-usability-und-informationsarchitektur-workshop/">Website Usability und Informationsarchitektur Workshop</a> die technische Komponentenarbeit um konzeptionelle Aspekte.</p><p>Live-Coding, Übungen und ein durchgängiges Schulungsprojekt sorgen dafür, dass die Inhalte direkt auf reale Front-End-Workflows übertragbar sind.</p>',
    '2 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    990.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'Front-End-Entwicklerinnen und Front-End-Entwickler mit React-, Vue- oder Angular-Projekten',
        'App-Entwicklerinnen und App-Entwickler mit komponentenbasierten UI-Architekturen',
        'UX- und Design-System-Teams, die Komponenten dokumentieren und abstimmen',
        'QA- und Test-Engineers, die UI-Regressionen früher im Entwicklungsprozess prüfen'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Sichere Kenntnisse in TypeScript',
        'Erfahrung mit React, Vue oder Angular',
        'Grundlagen in HTML, CSS und komponentenbasierter Front-End-Entwicklung',
        'Erste Berührungspunkte mit Testing-Tools wie Vitest, Cypress oder Playwright hilfreich'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Sicherer Aufbau und Betrieb einer Storybook-Umgebung in bestehenden Front-End-Projekten',
        'Komponentenvarianten mit Stories, Args und Controls nachvollziehbar abbilden',
        'Wartbare Dokumentation für UI-Komponenten und Design-Systeme erstellen',
        'Visual Tests, Interaction-Tests und Accessibility-Checks gezielt einsetzen',
        'Storybook-Builds und Tests in CI/CD-Workflows integrieren'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "Setup, Stories und Dokumentation",
            "inhalte": [
                "Einordnung von Storybook im Entwicklungsprozess",
                "Installation und Konfiguration in React-, Vue- oder Angular-Projekten",
                "Stories für Komponentenvarianten erstellen",
                "Args, Controls, Actions und Parameter einsetzen",
                "Dokumentation mit Docs und MDX strukturieren"
            ]
        },
        {
            "titel": "Tests, Add-ons und CI/CD",
            "inhalte": [
                "Interaction-Tests und Component Tests ausführen",
                "Accessibility-Checks in Stories nutzen",
                "Storybook-Builds in CI/CD integrieren",
                "Add-ons auswählen und Konfiguration pflegen"
            ]
        }
    ]'::jsonb
);