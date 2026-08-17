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
    'vue-advanced',
    'Vue.js 3 Aufbaukurs',
    'In 3 Tagen zu fortgeschrittenen Vue.js 3 Konzepten wie Composition API, Pinia, Routing und Testing',
    '<p>Dieser <strong>Vue.js Fortgeschrittenenkurs</strong> vertieft die Entwicklung professioneller Web-Anwendungen mit Vue.js 3 und richtet sich an Entwicklerinnen und Entwickler, die über Grundlagenwissen hinaus produktionsnahe Architektur, sauberes State Management und belastbare Teststrategien beherrschen möchten. Im 3-tägigen Intensiv-Workshop entsteht Schritt für Schritt eine reale, funktionale Vue.js Anwendung. Dabei arbeitest du praxisnah mit Pinia, vue-router, REST-API-Anbindung, asynchronen Actions, dynamischen Routen, Component Testing, E2E-Tests und Performance-Optimierung.</p><p>Der Schwerpunkt liegt nicht auf Theorie, sondern auf nachvollziehbarer Umsetzung im Projektkontext: Komponenten strukturieren, globalen Application State sauber verwalten, Routing-Szenarien abbilden, Tests automatisieren und typische Fehler in komplexeren Vue.js Anwendungen vermeiden.</p>',
    '3 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    1490.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'Vue.js Entwicklerinnen und Entwickler, die komplexere Single-Page-Applications mit Pinia, Routing und Tests professionell umsetzen möchten',
        'Frontend-Entwicklerinnen und Frontend-Entwickler, die Vue.js 3 bereits einsetzen und Architekturentscheidungen sicherer treffen wollen',
        'JavaScript-Entwicklerinnen und JavaScript-Entwickler mit Vue.js Erfahrung, die State Management, REST-API-Anbindung und Testing vertiefen möchten',
        'Web-Teams, die bestehende Vue.js Anwendungen wartbarer, performanter und besser testbar weiterentwickeln möchten'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Solide Vue.js Kenntnisse', 
        'Praktische Erfahrung mit JavaScript, Komponenten, Properties und Events', 
        'Grundverständnis von HTML, CSS und modernen Web-Anwendungen',
        'Erste Erfahrung mit npm, Vite oder vergleichbaren Frontend-Toolchains hilfreich'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Sicherer Einsatz von Pinia für strukturiertes Application State Management',
        'Routing-Szenarien mit Vue Router, dynamischen Routen und Query Parametern eigenständig umsetzen',
        'REST-API-Anbindungen mit asynchronen Actions sauber in Vue.js Anwendungen integrieren',
        'Unit Tests, Component Tests und E2E-Tests für Vue.js Projekte gezielt einordnen und anwenden',
        'Performance, Lifecycle Hooks, Repainting und Sicherheitsaspekte in Vue.js Anwendungen bewerten',
        'Eine reale Vue.js Web-Anwendung nach fortgeschrittenen Best Practices weiterentwickeln'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "State Management mit Pinia",
            "inhalte": [
                "State Management mit Pinia",
                "Projektsetup mit Vite",
                "Entwicklungsserver und Vue Developer Tools",
                "Komponenten, Props und Events",
                "Bedingtes Rendering und Listen"
            ]
        },
        {
            "titel": "Routing, Projektstruktur und Anwendungspraxis",
            "inhalte": [
                "Vue Router Grundlagen",
                "Routen, Views und Navigation",
                "Dynamische Routen und Query Parameter",
                "REST-API-Anbindung mit fetch und Axios",
                "Projektstruktur und Best Practices"
            ]
        },
        {
            "titel": "Testing, SSR, Performance und Sicherheit",
            "inhalte": [
                "Asynchrone REST-Zugriffe mit fetch und Axios",
                "Lade- und Fehlerzustände",
                "Komponentenstruktur und State-Management",
                "Server-Side Rendering mit Nuxt.js",
                "Testing mit Vitest"
            ]
        }
    ]'::jsonb
);