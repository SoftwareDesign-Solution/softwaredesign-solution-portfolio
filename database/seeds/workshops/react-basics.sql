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
    'react-basics',
    'React Grundlagen',
    'In 3 Tagen zur eigenen React-Anwendung mit funktionalen Komponenten, JSX, Props und Hooks',
    '<p>Der <strong>React Grundkurs</strong> führt dich in drei Tagen von einer vorhandenen JavaScript-Basis zu einer strukturierten, interaktiven React-Anwendung. Du arbeitest mit funktionalen Komponenten und JSX, übergibst Daten über Props, verarbeitest Events und modellierst lokale Zustände mit Hooks. Für den Projektstart nutzt du Vite, da Create React App für neue Projekte nicht mehr empfohlen wird. So lernst du einen Aufbau kennen, den du direkt auf neue Frontend-Projekte übertragen kannst.</p><p>Eine durchgängige Beispielanwendung verbindet die einzelnen Konzepte. Du zerlegst eine Oberfläche in wiederverwendbare Komponenten, bindest Formulare und REST-Daten ein, behandelst Lade- und Fehlerzustände und prüfst deinen Code mit React Developer Tools. Du setzt useEffect ein, um Komponenten mit externen Systemen zu synchronisieren, und berücksichtigst Abhängigkeiten und Cleanup. Am Ende kannst du Komponentenstrukturen begründen, State passend platzieren und typische Fehler bei Props, Events und Hooks gezielt korrigieren.</p>',
    '3 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    1490.00,
    1, -- id des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'Du entwickelst Weboberflächen und bringst sichere JavaScript-Grundkenntnisse mit', 
        'Du wechselst als Frontend-Entwickler von DOM-Skripten zu React-Komponenten', 
        'Du planst im Projektteam eine gemeinsame React-Basis für Frontends', 
        'Du entwickelst Apps und brauchst React-Grundlagen für React Native'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Sichere Grundlagen in HTML5 und CSS3', 
        'JavaScript ES6+ mit Funktionen, Objekten und Arrays', 
        'Erfahrung mit DOM-Konzepten und Browser-Developer-Tools',
        'TypeScript-Grundlagen sind hilfreich, aber nicht erforderlich'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Eine React-Anwendung mit Vite einrichten und strukturieren',
        'Funktionale Komponenten mit JSX und Props entwickeln und wiederverwenden',
        'Benutzerinteraktionen und kontrollierte Formulare umsetzen',
        'Lokalen State mit useState verwalten und Effekte mit useEffect kontrollieren',
        'REST-Daten abrufen und Lade- sowie Fehlerzustände darstellen',
        'React Router, Redux, Tests und Next.js für Folgeprojekte einordnen'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "Projektsetup, JSX und Komponenten",
            "inhalte": [
                "React-Arbeitsweise und typische Einsatzgebiete",
                "Projektsetup mit Vite",
                "Entwicklungsserver und React Developer Tools",
                "JSX, Komponenten und Props",
                "Bedingtes Rendering und Listen"
            ]
        },
        {
            "titel": "Props, Events, Formulare und Hooks",
            "inhalte": [
                "Props und Komponentenkomposition",
                "React children und Standardwerte",
                "Event-Handling in Komponenten",
                "Kontrollierte Formularelemente",
                "Lokaler State mit useState",
                "Effekte mit useEffect und Cleanup"
            ]
        },
        {
            "titel": "REST-Daten, Struktur und Ökosystem",
            "inhalte": [
                "Asynchrone REST-Zugriffe mit fetch und Axios",
                "Lade- und Fehlerzustände",
                "Komponentenstruktur und State-Management",
                "React Router, Redux und Next.js",
                "Testing mit React Testing Library"
            ]
        }
    ]'::jsonb
);