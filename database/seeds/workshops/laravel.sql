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
    'laravel',
    'Laravel Workshop',
    'PHP-Webanwendungen mit MVC, Eloquent, REST APIs, Tests und Deployment sicher umsetzen',
    '<p>Laravel gehört zu den etablierten PHP-Frameworks für strukturierte Webanwendungen, APIs und datenbankgestützte Business-Anwendungen. In dieser Laravel Schulung steigst du nicht nur in einzelne Framework-Funktionen ein, sondern entwickelst gemeinsam mit dem Dozenten eine vollständige, realitätsnahe Laravel Web-Applikation. Dadurch werden Architektur, Routing, Controller, Blade-Templates, Eloquent ORM, Authentifizierung, Testing und Deployment im direkten Zusammenhang sichtbar.</p><p>Der Kurs richtet sich an PHP-Entwicklerinnen und PHP-Entwickler, die Laravel lernen und produktiv einsetzen möchten. Statt isolierter Code-Beispiele steht ein durchgängiges Projekt im Mittelpunkt: Anforderungen werden in Routen, Controller, Models, Views, REST-Endpunkte und Datenbankzugriffe übersetzt, getestet und für den Betrieb vorbereitet. So entsteht ein belastbares Verständnis dafür, wie Laravel-Anwendungen aufgebaut, erweitert, abgesichert und gewartet werden. Die Schulung ist keine reine Vortragsveranstaltung, sondern verbindet fachliche Erklärungen mit gemeinsamer Umsetzung, Code-Reviews und Übungen am entstehenden Projekt.</p>',
    '5 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    1990.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'PHP-Entwickler:innen', 
        'Web-Entwicklerinnen und Web-Entwickler mit PHP-Basiswissen', 
        'Backend-Entwicklerinnen und Backend-Entwickler für datenbankgestützte Anwendungen', 
        'Software-Teams mit Einstieg in Laravel'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Grundkenntnisse in PHP und SQL', 
        'Sicherer Umgang mit HTML-Grundlagen und Webanwendungen', 
        'Erste Erfahrung mit objektorientierter Programmierung'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Sicherer Einstieg in Architektur, Projektstruktur und Arbeitsweise von Laravel',
        'Eigenständige Entwicklung einer datenbankgestützten Laravel Web-Applikation',
        'Routing, Controller, Blade Templates und Services fachgerecht einsetzen',
        'Datenzugriffe mit Eloquent ORM modellieren und performant umsetzen',
        'REST APIs mit Authentifizierung, Autorisierung und Tests aufbauen'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "Laravel Grundlagen und Projektstart ",
            "inhalte": [
                "Grundlagen Laravel",
                "Installation und Konfiguration",
                "Composer und Projekt-Erstellung",
                "Artisan CLI und Befehle",
                "Projektstruktur und Routing"
            ]
        },
        {
            "titel": "Routing, Controller und Blade ",
            "inhalte": [
                "Routing konfigurieren",
                "Controller erstellen",
                "Blade Templates nutzen",
                "Formulare und Validierung",
                "Services und Dependency Injection"
            ]
        },
        {
            "titel": "Datenbanken und Eloquent ORM",
            "inhalte": [
                "Datenbanken einrichten",
                "Eloquent ORM nutzen",
                "Migrationen und Seeder",
                "Abfragen und Beziehungen"
            ]
        },
        {
            "titel": "REST APIs, Sicherheit und Schnittstellen",
            "inhalte": [
                "RESTful APIs erstellen",
                "Authentifizierung und Autorisierung",
                "API-Routen und Ressourcen",
                "Sicherheitsaspekte"
            ]
        },
        {
            "titel": "Testing, Queues, Performance und Deployment",
            "inhalte": [
                "Unit- und Feature-Tests schreiben",
                "Queues und Jobs nutzen",
                "Performance optimieren",
                "Deployment vorbereiten"
            ]
        }
    ]'::jsonb
);