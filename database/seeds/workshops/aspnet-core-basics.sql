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
    'aspnet-core-basics',
    'ASP.NET Core Grundkurs',
    'Praxisnaher Einstieg in ASP.NET Core MVC, Razor Pages, REST APIs, Sicherheit und Performance',
    '<p>Diese ASP.NET Core Schulung bietet dir einen fundierten Einstieg in die Entwicklung professioneller Webanwendungen mit ASP.NET Core. Im Mittelpunkt stehen Architektur, MVC (Model-View-Controller), Routing, Datenbankzugriffe, REST APIs und die saubere Trennung von Frontend, Backend und Geschäftslogik. Du lernst, wie ASP.NET Core MVC-Anwendungen aufgebaut sind, welche Rolle Controller, Views, Models, Services und Middleware übernehmen und wie daraus wartbare Webanwendungen entstehen.</p><p>Ein weiterer Schwerpunkt liegt auf Razor Pages, mehrsprachigen Webseiten, Authentifizierung, Autorisierung und Performance-Optimierung. Für die Vertiefung seitenbasierter Weboberflächen eignet sich im Anschluss die Schulung ASP.NET Core - Razor Pages. Ergänzend zeigt der Kurs, wie Blazor mit serverseitigem Interaktionsmodell eingeordnet wird und wie Komponenten über Razor-Klassenbibliotheken wiederverwendbar aufgebaut werden.</p><p>Durch praxisnahe Beispiele erhältst du Orientierung für typische Anforderungen in Unternehmensprojekten: Login-Bereiche, personalisierte Inhalte, lokalisierte Oberflächen, Datenbankanbindung, sichere Konfiguration und performante Auslieferung. Wenn im Anschluss Architekturqualität, Wartbarkeit und Code-Qualität stärker im Vordergrund stehen, passt die Weiterbildung Clean Code für .NET Entwickler als fachliche Ergänzung.</p>',
    '3 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    1490.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        '.NET-Entwickler', 
        'Softwareentwickler', 
        'Webentwickler', 
        'Full-Stack-Entwickler'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Gute Kenntnisse in HTML5', 
        'Grundlagen der objektorientierten Programmierung mit C# oder einer vergleichbaren Sprache', 
        'Erste Erfahrung mit Visual Studio oder Visual Studio Code von Vorteil'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Fundiertes Verständnis der ASP.NET Core Architektur und ihrer zentralen Komponenten',
        'Eigenständige Entwicklung strukturierter ASP.NET Core MVC-Anwendungen',
        'Sicherer Einsatz von Razor Pages, Routing, Model Binding und Validierung',
        'REST APIs, Datenbankzugriffe und mehrsprachige Weboberflächen fachgerecht umsetzen',
        'Authentifizierung, Autorisierung und grundlegendes Hardening in Webprojekten berücksichtigen',
        'Performance-Probleme erkennen und geeignete Optimierungsmaßnahmen ableiten'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "Architektur und ASP.NET Core Grundlagen ",
            "inhalte": [
                "Einordnung von ASP.NET, ASP.NET Core und älteren ASP.NET-Versionen",
                "Aufbau einer ASP.NET Core Webanwendung",
                "Projektstruktur, Konfiguration und Middleware-Pipeline",
                "Dependency Injection, Routing und Hosting-Grundlagen",
                "Erste praktische Umsetzung einer Webanwendung"
            ]
        },
        {
            "titel": "MVC, Razor Pages und Datenzugriffe",
            "inhalte": [
                "MVC-Konzept mit Models, Views und Controllers",
                "Model Binding, Validierung und ViewModels",
                "ASP.NET Core MVC-Anwendungen mit Datenbankzugriff",
                "Razor Pages für seitenorientierte Weboberflächen",
                "REST APIs und Zusammenspiel von Frontend und Backend"
            ]
        },
        {
            "titel": "Lokalisierung, Sicherheit und Performance ",
            "inhalte": [
                "Mehrsprachige Webseiten mit JSON-Dateien und Ressourcendateien",
                "Blazor und Razor-Klassenbibliotheken im Überblick",
                "Logins, Authentifizierung und Autorisierung",
                "Sicherheitskonzepte und Hardening von Webanwendungen",
                "Performance-Optimierung, Diagnose und praxisnaher Ausblick"
            ]
        }
    ]'::jsonb
);