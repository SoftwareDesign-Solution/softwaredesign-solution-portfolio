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
    'vue-basics',
    'Vue.js 3 Grundlagen',
    'Vue 3, Vite, Komponenten und Routing sicher einsetzen und wartbare Frontend-Anwendungen entwickeln',
    '<p>Vue.js 3 eignet sich besonders für Webapplikationen, bei denen eine reaktive Oberfläche, saubere Komponentenstrukturen und ein gut wartbarer Frontend-Code gefragt sind. In dieser Vue.js 3 Schulung arbeitest du mit den zentralen Konzepten des Frameworks: Projektsetup mit create-vue und Vite, Single-File Components, Templates, Directives, Reaktivität, Props, Events, Formulare und der strukturierte Aufbau mehrerer Komponenten im Zusammenspiel.</p>',
    '3 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    1490.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'Web-Entwicklerinnen und Web-Entwickler mit JavaScript-Erfahrung, die Vue.js 3 produktiv einsetzen möchten',
        'Frontend-Entwicklerinnen und Frontend-Entwickler, die Komponenten, Routing und Formularverarbeitung mit Vue umsetzen',
        'App-Entwicklerinnen und App-Entwickler, die reaktive Weboberflächen für bestehende Anwendungen entwickeln',
        'Projektteams, die eine Vue.js Inhouse-Schulung für gemeinsame Frontend-Standards benötigen'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Sichere Grundlagen in HTML5 und CSS3', 
        'JavaScript ES6+ mit Funktionen, Objekten und Arrays', 
        'Grundverständnis für Browser, DOM und clientseitige Webentwicklung',
        'Erfahrung mit Entwicklungsumgebungen und Kommandozeile von Vorteil',
        'TypeScript-Grundlagen sind hilfreich, aber nicht erforderlich'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Sicherer Einstieg in Vue.js 3, create-vue und Vite-basierte Projektstrukturen',
        'Eigenständige Entwicklung wiederverwendbarer Vue-Komponenten mit Props, Events und Directives',
        'Strukturierter Umgang mit Reaktivität, Computed Properties, Watchern und Komponentenlogik',
        'Formulare, Validierung und REST API-Anbindungen in Vue-Anwendungen umsetzen',
        'Vue Router für Single Page Applications einrichten und grundlegende Navigationskonzepte anwenden',
        'Typische Vue-Projektstrukturen bewerten und erste Architekturentscheidungen begründen'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "Einstieg, Tooling und Komponenten",
            "inhalte": [
                "Projektstart mit create-vue und Vite",
                "Projektstruktur eines Vue-Projekts",
                "Single-File Components in Vue",
                "Computed Properties und Watcher"
            ]
        },
        {
            "titel": "Reaktivität, Directives und Formulare",
            "inhalte": [
                "Reactive Data und State",
                "Mehrere Komponenten im Zusammenspiel",
                "Wiederverwendbarkeit von Komponenten",
                "Direktiven, Props und Events",
                "Formulare, Validierung",
                "Effekte mit watch und Lifecycle Hooks"
            ]
        },
        {
            "titel": "REST API, Routing und Projektpraxis",
            "inhalte": [
                "Asynchrone REST-Zugriffe mit fetch und Axios",
                "Vue Router Grundlagen",
                "Routen und Views",
                "Navigation in Single Page Applications",
                "Tipps für Projektstrukturen",
                "Ausblick auf Pinia, Nuxt.js und Testing"
            ]
        }
    ]'::jsonb
);