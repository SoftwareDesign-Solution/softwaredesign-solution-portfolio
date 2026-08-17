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
    'react-advanced',
    'React Aufbaukurs',
    'Komplexe React-Anwendungen mit Redux, Routing, Tests und Deployment sicher strukturieren',
    '<p>Steige tiefer in die React-Entwicklung ein und arbeite an den Architekturfragen, die bei größeren Single-Page-Anwendungen schnell entscheidend werden: sauber geschnittener Application State, nachvollziehbare Routing-Strukturen, robuste API-Anbindung und automatisierte Tests. Im Mittelpunkt steht nicht die Wiederholung von Grundlagen, sondern die Umsetzung einer anspruchsvollen React-Anwendung mit vielen Komponenten, gemeinsam genutztem State und realistischen Anforderungen an Wartbarkeit und Erweiterbarkeit.</p><p>In dieser React Schulung entsteht über drei Tage hinweg eine komplexere Anwendung von Grund auf. Dabei werden Redux und Redux Toolkit für State-Management eingesetzt, React Router für geschützte und verschachtelte Routen genutzt und zentrale Abläufe mit Unit-, Component- und End-to-End-Tests abgesichert. Vite, Build-Prozess, Deployment und Continuous Integration runden den Entwicklungsablauf ab.</p>',
    '3 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    1490.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'Frontend-Entwicklerinnen und Frontend-Entwickler mit React-Grundkenntnissen, die größere Anwendungen strukturieren',
        'JavaScript-Entwicklerinnen und JavaScript-Entwickler, die Redux, Routing und Testing in React-Projekten einsetzen',
        'Webentwicklerinnen und Webentwickler in Teams mit komplexem Client State, API-Anbindung und Deployment-Anforderungen',
        'Software-Entwicklerinnen und Software-Entwickler, die eine React Inhouse Schulung oder Remote React Schulung für Projektteams planen'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Sichere Grundlagen in JavaScript, HTML und CSS', 
        'Erfahrung mit React-Komponenten, Props, State und Hooks', 
        'Grundverständnis von npm, Terminal und Git',
        'Erste Erfahrung mit REST APIs von Vorteil'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Sicherer Aufbau größerer React-Anwendungen mit klarer Komponenten- und State-Struktur',
        'Redux Toolkit für Slices, Store-Konfiguration, Selectors und asynchrone Abläufe einsetzen',
        'Routing-Konzepte mit geschützten, verschachtelten und parametrisierten Routen umsetzen',
        'Automatisierte Tests für Komponenten, Geschäftslogik und Benutzerabläufe erstellen',
        'API-Anbindung, Fehlerbehandlung, Build-Prozess und Deployment in einem React-Projekt zusammenführen'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "State-Management und Architektur",
            "inhalte": [
                "Architektur größerer React-Anwendungen",
                "Redux Toolkit und Store-Aufbau",
                "Slices, Reducer, Actions und Selectors",
                "Asynchrone Abläufe mit createAsyncThunk",
                "Custom Hooks für State-Zugriff"
            ]
        },
        {
            "titel": "APIs, Routing und Anwendungsausbau",
            "inhalte": [
                "Asynchrone Datenflüsse mit Redux",
                "API-Anbindung und Server State",
                "Routing mit React Router",
                "Private Routen und Authentifizierung",
                "Code-Splitting und Lazy Loading"
            ]
        },
        {
            "titel": "Testing, Build und Deployment",
            "inhalte": [
                "Unit Tests und Integration Tests",
                "End-to-End-Tests und Component-Tests mit Cypress",
                "Mocks, Testdaten und Assertions",
                "CI-Ausführung von Tests",
                "Build, Optimierung und Deployment"
            ]
        }
    ]'::jsonb
);