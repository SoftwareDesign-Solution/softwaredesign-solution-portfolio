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
    'nextjs-fullstack',
    'Next.js Fullstack',
    'In 4 Tagen zur produktionsreifen Next.js-Anwendung mit App Router, Server Actions, Datenbank, Authentifizierung und Deployment',
    '<p>In diesem <strong>Next.js Workshop</strong> entwickelst du innerhalb von vier Tagen eine vollständige Fullstack-Webanwendung auf Basis des App Routers. Du lernst, wie Server Components und Client Components zusammenspielen, wie du Seiten und Layouts strukturierst und dynamische Routen, Ladezustände, Fehlerseiten sowie Metadaten umsetzt. Dabei geht es nicht nur um einzelne Funktionen, sondern um eine Projektstruktur, die sich auch für größere und langfristig wartbare Anwendungen eignet.</p><p>Eine durchgängige Beispielanwendung verbindet Frontend, Backend und Datenbank. Du liest Daten direkt in Server Components, setzt Mutationen mit Server Actions um und sicherst Eingaben durch serverseitige Validierung ab. Anschließend ergänzt du Authentifizierung, Session Management und rollenbasierte Autorisierung. Zum Abschluss bereitest du die Anwendung für den produktiven Betrieb vor und stellst sie wahlweise über Vercel oder als Docker-Container bereit. Dabei behandelst du auch Umgebungsvariablen, Datenbankmigrationen, Build-Prozesse und typische Sicherheitsaspekte einer produktiven Next.js-Anwendung.</p>',
    '4 Tage',
    'Remote oder Inhouse',
    'Deutsch',
    1990.00,
    1, -- ID des passenden Trainers aus der trainer-Tabelle

    -- zielgruppe (TEXT[])
    ARRAY[
        'Du entwickelst React-Anwendungen und möchtest vollständige Fullstack-Anwendungen mit Next.js umsetzen',
        'Du möchtest Server Components, Server Actions und den App Router sicher einsetzen',
        'Du planst datenbankgestützte Webanwendungen mit Authentifizierung und geschützten Bereichen',
        'Du möchtest Next.js-Anwendungen produktiv über Vercel oder Docker bereitstellen'
    ],

    -- voraussetzungen (TEXT[])
    ARRAY[
        'Sichere Grundlagen in HTML5 und CSS3',
        'Gute JavaScript- und TypeScript-Kenntnisse',
        'Praktische Erfahrung mit React, funktionalen Komponenten und Hooks',
        'Grundkenntnisse zu HTTP, REST und relationalen Datenbanken sind hilfreich'
    ],

    -- lernziele (TEXT[])
    ARRAY[
        'Eine Next.js-Anwendung mit TypeScript und App Router einrichten und strukturieren',
        'Server Components und Client Components gezielt einsetzen',
        'Layouts, dynamische Routen, Ladezustände, Fehlerseiten und Metadaten umsetzen',
        'Datenbankabfragen und Mutationen sicher in eine Next.js-Anwendung integrieren',
        'Formulare mit Server Actions verarbeiten und serverseitig validieren',
        'Authentifizierung, Session Management und rollenbasierte Autorisierung umsetzen',
        'Geschützte Seiten, Server Actions und Datenbankzugriffe zuverlässig absichern',
        'Eine Next.js-Anwendung über Vercel oder als Docker-Container bereitstellen'
    ],

    -- agenda (JSONB)
    '[
        {
            "titel": "Next.js, App Router und Rendering",
            "inhalte": [
                "Next.js im React-Ökosystem und typische Einsatzgebiete",
                "Projektsetup mit TypeScript und App Router",
                "Ordnerstruktur, Seiten, Layouts und Route Groups",
                "Server Components und Client Components",
                "Statisches und dynamisches Rendering",
                "Navigation mit Link und programmatische Navigation",
                "Dynamische Routen und URL-Parameter",
                "Loading UI, Error Boundaries und Not-found-Seiten",
                "Metadaten und Suchmaschinenoptimierung"
            ]
        },
        {
            "titel": "Datenbankanbindung, Queries und Mutations",
            "inhalte": [
                "Datenbankanbindung und sichere Verwendung von Umgebungsvariablen",
                "Datenmodellierung und Datenbankmigrationen",
                "Datenabfragen in Server Components",
                "Dynamische Abfragen und Detailseiten",
                "Erstellen, Ändern und Löschen von Datensätzen",
                "Server Actions für Datenmutationen",
                "Formulare und serverseitige Validierung",
                "Fehlerbehandlung und strukturierte Rückgabewerte",
                "Cache-Verhalten, Revalidierung und Aktualisierung der Benutzeroberfläche"
            ]
        },
        {
            "titel": "Authentication, Sessions und Authorization",
            "inhalte": [
                "Unterschiede zwischen Authentication und Authorization",
                "Registrierung, Anmeldung und Abmeldung",
                "Sicheres Speichern und Prüfen von Passwörtern",
                "Session Management mit Cookies",
                "Zugriff auf den angemeldeten Benutzer in Server Components",
                "Geschützte Seiten und Weiterleitungen",
                "Rollen und Berechtigungen",
                "Autorisierung von Server Actions und Datenbankzugriffen",
                "Sicherheitsaspekte bei Formularen und Benutzereingaben"
            ]
        },
        {
            "titel": "Produktionsbetrieb mit Vercel und Docker",
            "inhalte": [
                "Produktionsbuild und Überprüfung der Anwendung",
                "Konfiguration von Umgebungsvariablen",
                "Deployment auf Vercel",
                "Produktive Datenbankverbindungen und Migrationen",
                "Containerisierung einer Next.js-Anwendung mit Docker",
                "Mehrstufiger Docker-Build",
                "Konfiguration über Docker Compose",
                "Logging, Fehleranalyse und typische Deployment-Probleme",
                "Abschluss und Weiterentwicklung der Beispielanwendung"
            ]
        }
    ]'::jsonb
);