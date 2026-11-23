/**
 * @file referenzen.ts
 * @description Statische Referenz-Daten aus Manuels CV & Projektliste, gruppiert
 * nach Kunde, für die Anzeige auf der Referenzen-Seite.
 * @module data/referenzen
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 *
 * @todo (Phase 8): Sobald die Datenquelle final ist (Neon oder weiterhin
 * statisch), diese Datei ggf. durch eine Service-Funktion ersetzen/ergänzen,
 * analog zu den Workshop-Services.
 */

import type { LeistungSlug } from "@/types/leistung";
import type { ReferenzKunde, ReferenzProjektEintrag } from "@/types/referenz";

/** Alle Kunden-Referenzen, redaktionell gepflegt und in der eingetragenen Reihenfolge angezeigt. */
export const REFERENZEN: ReferenzKunde[] = [
  {
    id: "eigene-projekte",
    name: "Eigene Projekte",
    ort: "",
    branche: "Eigenentwicklung",
    zeitraum: "2025–2026",
    projekte: [
      {
        slug: "dto-klassengenerator",
        leistungen: ["sap-business-one-entwicklung", "dotnet-app-entwicklung"],
        hervorgehoben: ["dotnet-app-entwicklung"],
        titel: "DTO-Klassengenerator",
        beschreibung:
          "Automatische Generierung von Klassen, Funktionen und Methoden für .NET-Core-Projekte auf Basis der SAP Business One Service-Layer-Metadaten.",
        stack: [".NET Core", "C#", "Service Layer", "T4 Templates"],
        github: "https://github.com/SoftwareDesign-Solution/B1SLayer.ModelGenerator",
      },
      {
        slug: "e-rechnungs-import-addon",
        leistungen: ["sap-business-one-entwicklung"],
        hervorgehoben: ["sap-business-one-entwicklung"],
        titel: "E-Rechnungs-Import Add-On",
        beschreibung:
          "SAP Business One Add-On / coresuite-Modul zum automatisierten Import von ZUGFeRD-E-Rechnungen, mit konfigurierbarem Mapping über vier Typen (DIRECT, SQL, FIXED, EXPR) — als lizenziertes Produkt erhältlich.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "VB.NET"],
      },
      {
        slug: "portfolio-workshop-plattform",
        leistungen: ["webentwicklung"],
        hervorgehoben: ["webentwicklung"],
        details: true,
        titel: "Online-Portfolio & Workshop-Plattform",
        beschreibung:
          "Next.js-Plattform mit Neon-PostgreSQL-Datenbank, REST-API zum Workshop-Abruf und automatisiertem E-Mail-Versand über Resend.",
        stack: ["Next.js", "React", "React Hook Form", "TailwindCSS", "TypeScript", "Resend", "Neon PostgreSQL"],
        github: "https://github.com/SoftwareDesign-Solution/softwaredesign-solution-portfolio",
        rolle: "Konzeption & Entwicklung",
        // @todo Platzhaltertexte, bitte durch eigene Formulierungen ersetzen.
        abschnitte: [
          {
            titel: "Ausgangslage",
            absaetze: [
              "Workshops, Termine und Angebotsanfragen wurden bisher manuell gepflegt und per E-Mail abgestimmt – ohne zentrale Übersicht und ohne automatische Rückmeldung an Interessenten.",
            ],
          },
          {
            titel: "Lösung",
            absaetze: [
              "Eine Next.js-Plattform stellt Workshops und Termine online bereit, nimmt Buchungen und Anfragen entgegen und benachrichtigt Interessenten automatisch.",
            ],
            aufzaehlung: [
              "Workshop-Übersicht mit Terminen und Restplätzen",
              "Buchung und Angebotsanfrage per Formular mit Validierung",
              "Benachrichtigung bei neuen Terminen per Double-Opt-In",
              "REST-API zum Abruf der Workshops, Daten in Neon PostgreSQL",
              "E-Mail-Versand über Resend",
            ],
          },
          {
            titel: "Ergebnis",
            absaetze: [
              "Buchungen und Anfragen laufen ohne manuelle Abstimmung ein, Bestätigungen gehen sofort raus. Die Pflege der Workshops erfolgt über ein separates Admin-Dashboard.",
            ],
          },
        ],
        /*
        bilder: [
          {
            src: "/referenzen/portfolio-workshop-plattform/anwendung-1.png",
            alt: "Startseite der Portfolio- und Workshop-Plattform",
            kategorie: "Anwendung",
          },
          {
            src: "/referenzen/portfolio-workshop-plattform/anwendung-2.png",
            alt: "Workshop-Übersicht mit Terminen",
            kategorie: "Anwendung",
          },
          {
            src: "/referenzen/portfolio-workshop-plattform/anwendung-3.png",
            alt: "Buchungsformular für einen Workshop",
            kategorie: "Anwendung",
          },
          {
            src: "/referenzen/portfolio-workshop-plattform/email-1.png",
            alt: "Bestätigungs-E-Mail nach einer Buchung",
            kategorie: "E-Mail-Benachrichtigungen",
          },
          {
            src: "/referenzen/portfolio-workshop-plattform/email-2.png",
            alt: "Double-Opt-In-E-Mail für eine Terminbenachrichtigung",
            kategorie: "E-Mail-Benachrichtigungen",
          },
        ],
        */
        bilderPrefix: "referenzen/portfolio-workshop-plattform/",
      },
      {
        slug: "admin-dashboard",
        leistungen: ["webentwicklung"],
        titel: "Admin-Dashboard",
        beschreibung:
          "Separate Next.js-Anwendung zur Verwaltung von Workshops, Terminen und Angebotsanfragen, betrieben in einem eigenen Docker-Container.",
        stack: [
          "Next.js",
          "React",
          "React Hook Form",
          "TailwindCSS",
          "TypeScript",
          "Resend",
          "Neon PostgreSQL",
          "Docker",
        ],
      },
      {
        slug: "travel-planner",
        leistungen: ["it-schulungen-inhouse"],
        hervorgehoben: ["it-schulungen-inhouse"],
        details: true,
        titel: "Travel-Planner (Schulungsprojekt)",
        beschreibung:
          "Einheitliches Demo-Projekt für die React-, Vue.js- und Next.js-Workshops: eine vollständige Reiseplaner-Anwendung, parallel in drei Framework-Varianten in einem Nx Workspace implementiert, sodass alle Workshop-Varianten denselben Funktionsumfang und dieselbe Struktur aufweisen. Deckt State Management, Formularvalidierung, Routing und API-Anbindung über json-server und json-server-auth ab.",
        stack: [
          "React",
          "React Router",
          "React Hook Form",
          "Redux Toolkit",
          "Vue.js",
          "Vue Router",
          "Pinia",
          "Pinia Colada",
          "Zod",
          "Next.js",
          "Server Actions",
          "json-server",
          "json-server-auth",
          "TailwindCSS",
          "Nx",
        ],
        bilderPrefix: "referenzen/travel-planner-schulungsprojekt/",
      },
    ],
  },
  {
    id: "lwc-michelsen",
    name: "L.W.C. Michelsen GmbH",
    ort: "Hamburg",
    branche: "Logistik",
    zeitraum: "2013–2026 (13 Jahre)",
    projekte: [
      {
        slug: "service-layer-michelsen",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "SAP Business One Service Layer",
        beschreibung: "Installation & Konfiguration inkl. Table-/Column-Allowlist und Permissions.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL"],
      },
      {
        slug: "edi-schnittstelle",
        leistungen: ["sap-business-one-entwicklung"],
        hervorgehoben: ["sap-business-one-entwicklung"],
        titel: "EDI-Schnittstelle",
        beschreibung: "Import/Export von ORDERS, DESADV, INVOIC und IFTMIN aus SAP Business One.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL", "EDI"],
      },
      {
        slug: "datev-export",
        leistungen: ["sap-business-one-entwicklung", "dotnet-app-entwicklung"],
        titel: "DATEV-Export-Tool",
        beschreibung:
          "Windows-Anwendung zur automatisierten Aufbereitung und Übertragung von DATEV-relevanten Buchungen.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL"],
      },
      {
        slug: "sepa-generator",
        leistungen: ["sap-business-one-entwicklung", "dotnet-app-entwicklung"],
        hervorgehoben: ["dotnet-app-entwicklung"],
        titel: "SEPA-Generator",
        beschreibung:
          "Windows-Anwendung zur automatisierten Erstellung von SEPA-Zahlungsdateien mit direkter Bank-Übertragung.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL"],
      },
      {
        slug: "mde-logistik-app",
        leistungen: ["sap-business-one-entwicklung", "dotnet-app-entwicklung"],
        hervorgehoben: ["sap-business-one-entwicklung", "dotnet-app-entwicklung"],
        titel: "MDE Logistik-App",
        beschreibung: "Android-App (Xamarin & MAUI) für Kommissionierung, Wareneingang und Umlagerung.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL", "Xamarin", "MAUI"],
      },
      {
        slug: "provisionsabrechnung",
        leistungen: ["sap-business-one-entwicklung", "dotnet-app-entwicklung"],
        hervorgehoben: ["dotnet-app-entwicklung"],
        titel: "Provisionsabrechnung",
        beschreibung:
          "Windows-Dienst zur automatischen Berechnung, Auswertung und Rechnungsstellung von Provisionen.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "Sharpshooter Reports", "C#", "SQL"],
      },
      {
        slug: "auswertungen-michelsen",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Auswertungen",
        beschreibung:
          "SQL-basierte Auswertungen und Reports in SAP Business One mit coresuite Designer, SharpShooter Reports und Crystal Reports.",
        stack: [
          "SAP Business One",
          "Service Layer",
          "coresuite",
          "Sharpshooter Reports",
          "Crystal Reports",
          "C#",
          "SQL",
        ],
      },
      {
        slug: "layout-anpassungen-michelsen",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Layout-Anpassungen",
        beschreibung:
          "Anpassung und Erstellung von Verkaufs- und Einkaufsbelegen (coresuite Country Package, Crystal Reports).",
        stack: ["SAP Business One", "coresuite", "Sharpshooter Reports", "Crystal Reports"],
      },
      {
        slug: "shopware-anbindung",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Shopware-Anbindung",
        beschreibung: "Automatisierte Übertragung von Bestellungen, Artikeln und Kunden.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL", "Shopware"],
      },
      {
        slug: "lvs-anbindung",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "LVS-Anbindung",
        beschreibung: "Automatischer Abgleich von Lagerbeständen zwischen SAP Business One und Spediteur.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL"],
      },
    ],
  },
  {
    id: "wkn-datentechnik",
    name: "WKN Datentechnik GmbH",
    ort: "Balve",
    branche: "IT-Dienstleistung",
    zeitraum: "2019–2026 (7 Jahre)",
    projekte: [
      {
        slug: "e-rechnung-wkn",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "E-Rechnung (ZUGFeRD)",
        beschreibung: "Erstellung & Konfiguration von E-Rechnungen mit coresuite Designer.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        slug: "abrechnungsassistent",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Abrechnungsassistent",
        beschreibung: "coresuite-Customize-Regel zur assistierten Abrechnung in SAP Business One.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        slug: "it-man-geraeteanlage",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "IT-Man-Geräteanlage",
        beschreibung:
          "Automatisierte Übernahme seriennummergeführter Geräte aus Lieferscheinen in eine externe IT-Management-Datenbank.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        slug: "importvorlage-eingangsrechnungen",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Importvorlage Eingangsrechnungen",
        beschreibung:
          "CSV-basierter Import von Eingangsrechnungen mit konfigurierbaren Vorlagen je Lieferant.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
    ],
  },
  {
    id: "alfred-galke",
    name: "Alfred Galke GmbH",
    ort: "Bad Grund (Harz)",
    branche: "Industrie",
    zeitraum: "2019–2026 (7 Jahre)",
    projekte: [
      {
        slug: "service-layer-galke",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Service Layer & Berechtigungskonzept",
        beschreibung:
          "Installation, Konfiguration und rollenbasiertes Berechtigungskonzept in SAP Business One.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        slug: "belegpruefung",
        leistungen: ["sap-business-one-entwicklung"],
        hervorgehoben: ["sap-business-one-entwicklung"],
        titel: "Belegprüfung",
        beschreibung:
          "coresuite-Customize-Regel zur automatisierten Prüfung von Belegen anhand eines SQL-basierten Regelkatalogs (CTEs).",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        slug: "chargenrueckverfolgung",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Chargenrückverfolgung",
        beschreibung: "Mehrstufige SQL-Abfrage zur Rückverfolgung aller Bewegungen einer Charge.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        slug: "lagerverwaltung-umlagerung",
        leistungen: ["sap-business-one-entwicklung", "webentwicklung"],
        hervorgehoben: ["sap-business-one-entwicklung"],
        titel: "Lagerverwaltung (Umlagerung)",
        beschreibung:
          "Webanwendung mit Vue 3, Quasar und TypeScript zur Umlagerung chargengeführter Artikel mit Echtzeit-Anbindung an den Service Layer.",
        stack: ["SAP Business One", "Service Layer", "SQL", "Vue.js", "Quasar", "Vue Hook Form", "TypeScript"],
      },
    ],
  },
  {
    id: "cmt-gmbh",
    name: "cmt GmbH",
    ort: "München",
    branche: "Weiterbildung",
    zeitraum: "2022–2026 (4 Jahre)",
    projekte: [
      {
        slug: "postgresql-kurs",
        leistungen: ["it-schulungen-inhouse"],
        hervorgehoben: ["it-schulungen-inhouse"],
        titel: "PostgreSQL Grundlagen & Fortgeschrittene",
        jahr: "2025/2026",
        beschreibung: "Kursentwicklung und -durchführung inkl. Schulungsunterlagen und Aufgaben.",
        stack: ["PostgreSQL"],
      },
      {
        slug: "react-fortgeschrittene",
        leistungen: ["it-schulungen-inhouse"],
        hervorgehoben: ["it-schulungen-inhouse"],
        titel: "React für Fortgeschrittene",
        jahr: "2024/2025",
        beschreibung: "Vertiefende Schulung zu fortgeschrittenen React-Patterns.",
        stack: ["React", "Redux Toolkit", "GraphQL", "TailwindCSS", "Vite", "Vitest", "Cypress", "TypeScript"],
      },
      {
        slug: "laravel-kompaktkurs",
        leistungen: ["it-schulungen-inhouse"],
        hervorgehoben: ["it-schulungen-inhouse"],
        titel: "Laravel Kompaktkurs",
        jahr: "2025",
        beschreibung: "Kompaktkurs inkl. Beispielprojekt TaskFlow.",
        stack: ["PHP", "Laravel", "MySQL", "PHPUnit", "Docker"],
      },
      {
        slug: "aspnet-einfuehrung",
        leistungen: ["it-schulungen-inhouse"],
        titel: "ASP.NET Einführung",
        jahr: "2025",
        beschreibung: "Einführungskurs in das ASP.NET-Core-Ökosystem.",
        stack: ["ASP.NET Core MVC", "Web API", "Blazor", "Razor Pages", "ASP.NET Core Identity"],
      },
      {
        slug: "vuejs-grundkurs",
        leistungen: ["it-schulungen-inhouse"],
        titel: "Vue.js Grundkurs",
        jahr: "2023/2024",
        beschreibung: "Grundlagenkurs für Vue.js.",
        stack: ["Vue.js", "Pinia", "Vite", "Vitest", "Cypress", "TypeScript"],
      },
      {
        slug: "nx-kompaktkurs",
        leistungen: ["it-schulungen-inhouse"],
        titel: "Nx Kompaktkurs",
        jahr: "2025",
        beschreibung: "Kompaktkurs zu Monorepo-Verwaltung mit Nx.",
        stack: ["Nx", "TypeScript"],
      },
      {
        slug: "git-grundlagenkurs",
        leistungen: ["it-schulungen-inhouse"],
        titel: "Git Grundlagenkurs",
        jahr: "2025",
        beschreibung: "Grundlagenkurs zu Versionskontrolle und CI/CD.",
        stack: ["Git", "GitHub", "GitLab", "CI/CD", "Docker"],
      },
      {
        slug: "react-grundlagen",
        leistungen: ["it-schulungen-inhouse"],
        titel: "React Grundlagen",
        jahr: "2022",
        beschreibung: "Grundlagenkurs für React.",
        stack: ["React", "Vite", "Vitest", "TypeScript"],
      },
    ],
  },
  {
    id: "polyfoam-kautschuk",
    name: "Polyfoam Kautschuk GmbH",
    ort: "Niederzier",
    branche: "Industrie",
    zeitraum: "2017–2022 (5 Jahre)",
    projekte: [
      {
        slug: "kalkulationsmodul",
        leistungen: ["sap-business-one-entwicklung", "dotnet-app-entwicklung"],
        hervorgehoben: ["dotnet-app-entwicklung"],
        titel: "Kalkulationsmodul",
        beschreibung:
          "Windows-Anwendung mit Service-Layer-Anbindung zur Kalkulation kundenspezifischer Anfragen (Stücklisten, Angebote).",
        stack: ["SAP Business One", "Service Layer", "C#", "SQL", "DevExpress"],
      },
      {
        slug: "produktionsmodul",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Mehrstufiges Produktionsmodul",
        beschreibung: "coresuite-Customize-Regel zur Erstellung mehrerer Produktionsaufträge.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        slug: "produktionsetiketten",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Produktionsetiketten",
        beschreibung: "Layout-Entwicklung für Produktionsetiketten in SAP Business One.",
        stack: ["SAP Business One", "coresuite", "Sharpshooter Reports", "C#", "SQL"],
      },
    ],
  },
  {
    id: "magnetbau-schramme",
    name: "Magnetbau Schramme GmbH & Co. KG",
    ort: "Deggenhausertal",
    branche: "Industrie",
    zeitraum: "2022 (6 Monate)",
    projekte: [
      {
        slug: "customizing-schnittstellen",
        leistungen: ["sap-business-one-entwicklung"],
        titel: "Customizing & Schnittstellen",
        beschreibung:
          "Service-Layer-Setup, Customizing von SAP Business One & beas Manufacturing sowie Import-/Export-Schnittstellen für Produktions- und Lagerdaten.",
        stack: ["SAP Business One", "Service Layer", "beas Manufacturing", "C#", "SQL"],
      },
    ],
  },
  {
    id: "spedition-stahmer",
    name: "Spedition Stahmer",
    ort: "Hamburg",
    branche: "Logistik",
    zeitraum: "2022",
    projekte: [
      {
        slug: "lagersoftware",
        leistungen: ["webentwicklung"],
        hervorgehoben: ["webentwicklung"],
        titel: "Lagersoftware",
        beschreibung:
          "Portierung einer Excel-Mappe zu einer Webanwendung für Einlagerung, Auslagerung und Inventur",
        stack: ["Laravel", "React", "Redux Toolkit", "Material UI", "TypeScript", "MySQL"],
      },
    ],
  },
  {
    id: "smf-gmbh",
    name: "SMF GmbH",
    ort: "Dortmund",
    branche: "Öffentliche Verwaltung",
    zeitraum: "2021 (4 Monate)",
    projekte: [
      {
        slug: "monheim-pass",
        leistungen: ["webentwicklung"],
        hervorgehoben: ["webentwicklung"],
        titel: "Administrationsoberfläche Monheim Pass",
        beschreibung: "Backend mit Spring Boot, Frontend mit Vue.js, Vuetify, Jest, Cypress & Storybook.",
        stack: ["Spring Boot", "Vue.js", "Vuetify", "Jest", "Cypress", "Storybook", "TypeScript"],
      },
    ],
  },
  {
    id: "trendline",
    name: "TRENDline GmbH & Co. KG",
    ort: "Wesel",
    branche: "Marktforschung",
    zeitraum: "2018–2019 (1 Jahr)",
    projekte: [
      {
        slug: "dispo-online",
        leistungen: ["webentwicklung"],
        hervorgehoben: ["webentwicklung"],
        titel: "Dispo Online",
        beschreibung: "Online-Plattform (Laravel, Angular, NgRx) zur Buchung von Fahrgastzählungsaufträgen.",
        stack: ["Laravel", "Angular", "NgRx", "Bootstrap", "Laravel Sanctum"],
      },
      {
        slug: "desktop-anwendung-trendline",
        leistungen: ["dotnet-app-entwicklung"],
        titel: "Desktop-Anwendung",
        beschreibung:
          "Auftragsbearbeitung und Datenaufbereitung für das Portal (C#, Entity Framework, DevExpress).",
        stack: ["C#", "Entity Framework", "DevExpress"],
      },
    ],
  },
  {
    id: "birdvision",
    name: "BirdVision",
    ort: "",
    branche: "Windenergie / Vogelschutztechnik",
    zeitraum: "2020",
    projekte: [
      {
        slug: "birdvision-kundencenter",
        leistungen: ["webentwicklung"],
        hervorgehoben: ["webentwicklung"],
        titel: "BirdVision Kundencenter",
        beschreibung:
          "Kundenportal zur Überwachung vogelschutzrelevanter Windkraftanlagen: Windpark- und Anlagenübersicht, Anzeige der von einem externen Fleximaus-System gelieferten Sensordaten, Kamera-Livemonitor mit Bild- und Videoansicht, manuelle Nachbearbeitung erkannter Vogelarten inkl. Notizen sowie Auswertungen und Datenexport (Laravel, Vue.js).",
        stack: ["Laravel", "Vue.js", "TypeScript", "TailwindCSS", "Laravel Sanctum"],
      },
    ],
  },
  {
    id: "diverse-webkunden",
    name: "Verschiedene Web-Kunden",
    ort: "",
    branche: "Diverse Branchen",
    zeitraum: "2014–2021",
    projekte: [
      {
        slug: "buchungsplattform-probereaeume",
        leistungen: ["webentwicklung"],
        titel: "Buchungsplattform für Proberäume",
        beschreibung: "Webanwendung zur Buchung von Proberäumen.",
        stack: ["Laravel", "Vue.js", "TypeScript", "Bootstrap", "Laravel Sanctum"],
        github: "https://github.com/SoftwareDesign-Solution/onlinebooking",
      },
      {
        slug: "verwaltungssoftware",
        leistungen: ["webentwicklung"],
        titel: "Verwaltungssoftware",
        beschreibung: "Individuelle Verwaltungssoftware für interne Geschäftsprozesse.",
        stack: ["Laravel", "Angular", "NgRx", "TailwindCSS", "Laravel Sanctum"],
      },
      {
        slug: "intranet-anwendung",
        leistungen: ["webentwicklung"],
        titel: "Intranet-Anwendung",
        beschreibung: "Internes Portal zur unternehmensweiten Kommunikation und Informationsbereitstellung.",
        stack: ["Node.js", "React", "Next.js"],
      },
      {
        slug: "payment-package",
        leistungen: ["webentwicklung"],
        titel: "Payment-Package (TIVITA GmbH, Mannheim)",
        beschreibung: "PayPal- & Payrexx-Integration für Laravel.",
        stack: ["Laravel", "PayPal", "Payrexx"],
      },
      {
        slug: "auftragsverwaltung-ella",
        leistungen: ["webentwicklung"],
        titel: "Auftragsverwaltung (ella-Verlag, Düsseldorf)",
        beschreibung: "Laravel mit sevDesk-Anbindung.",
        stack: ["Laravel", "sevDesk"],
      },
      {
        slug: "warenwirtschaft-ballon-mueller",
        leistungen: ["webentwicklung"],
        titel: "Warenwirtschaftssystem (Ballon-Müller Diffusion GmbH, Herznach CH)",
        beschreibung: "Laravel-basiertes Warenwirtschaftssystem.",
        stack: ["Laravel"],
      },
      {
        slug: "anfrageportal-dnds",
        leistungen: ["webentwicklung"],
        titel: "Anfrageportal (DNDS GmbH, Bergheim)",
        beschreibung: "Bearbeitung von Reiseanfragen mit Laravel & WordPress.",
        stack: ["Laravel", "WordPress"],
      },
      {
        slug: "partnerportal-urbanoffers",
        leistungen: ["webentwicklung"],
        titel: "Partner-Portal (UrbanOffers, Wien)",
        beschreibung: "Portal zur Verwaltung und Präsentation von Partnerangeboten.",
        stack: ["Laravel", "WordPress"],
      },
    ],
  },
];
/**
 * Sucht ein einzelnes Projekt anhand seiner id über alle Kunden hinweg und
 * liefert es zusammen mit dem zugehörigen Kunden zurück. Für die
 * Detailseite unter /referenzen/[id].
 *
 * @param projektId - Die id des gesuchten Projekts (ReferenzProjektEintrag.id)
 * @returns Kunde und Projekt, oder undefined falls die id nicht existiert
 */
export function findReferenzProjektMitKunde(
  projektId: string,
): { kunde: ReferenzKunde; projekt: ReferenzProjektEintrag } | undefined {
  for (const kunde of REFERENZEN) {
    const projekt = kunde.projekte.find((p) => p.slug === projektId);
    if (projekt) {
      return { kunde, projekt };
    }
  }
  return undefined;
}

/**
 * Alle Projekt-slugs, die `details: true` gesetzt haben und damit eine eigene
 * Detailseite bekommen. Basis für generateStaticParams auf /referenzen/[slug].
 *
 * @returns Liste aller Projekt-slugs mit Detailseite
 */
export function getReferenzProjektIdsMitBildern(): string[] {
  return REFERENZEN.flatMap((kunde) => kunde.projekte.filter(hatDetailseite).map((p) => p.slug));
}

/**
 * Ob ein Projekt eine eigene Detailseite unter /referenzen/[slug] hat. Das
 * ist nur der Fall, wenn im Eintrag ausdrücklich `details: true` steht.
 *
 * @param projekt - Das zu prüfende Projekt
 * @returns `true`, wenn eine Detailseite existiert
 */
export function hatDetailseite(projekt: ReferenzProjektEintrag): boolean {
  return projekt.details === true;
}

/**
 * Liefert zum angegebenen Projekt das vorherige und nächste Projekt **mit
 * Detailseite** (in der Reihenfolge von REFERENZEN). Für die Navigation am
 * Ende der Detailseite.
 *
 * @param projektId - Die id des aktuellen Projekts
 * @returns Vorheriges und nächstes Projekt (jeweils `undefined`, wenn es keines gibt)
 */
export function findBenachbarteDetailProjekte(projektId: string): {
  vorheriges?: Pick<ReferenzProjektEintrag, "slug" | "titel">;
  naechstes?: Pick<ReferenzProjektEintrag, "slug" | "titel">;
} {
  const mitDetail = REFERENZEN.flatMap((kunde) => kunde.projekte.filter(hatDetailseite));
  const index = mitDetail.findIndex((p) => p.slug === projektId);

  if (index === -1) {
    return {};
  }

  const vorheriges = mitDetail[index - 1];
  const naechstes = mitDetail[index + 1];

  return {
    vorheriges: vorheriges && { slug: vorheriges.slug, titel: vorheriges.titel },
    naechstes: naechstes && { slug: naechstes.slug, titel: naechstes.titel },
  };
}

/**
 * Referenz-Projekte für eine Leistungsseite, in der Reihenfolge von {@link REFERENZEN}.
 * Gezeigt werden die für diese Leistung hervorgehobenen Projekte; gibt es keine,
 * die ersten {@link maxAnzahl} zugeordneten Projekte.
 *
 * @param leistung - Slug der Leistungsseite
 * @param maxAnzahl - Höchstzahl der Projekte (Default 6)
 * @returns Kunde und Projekt je Treffer
 */
export function findReferenzenFuerLeistung(
  leistung: LeistungSlug,
  maxAnzahl = 6,
): { kunde: ReferenzKunde; projekt: ReferenzProjektEintrag }[] {
  const zugeordnet = REFERENZEN.flatMap((kunde) =>
    kunde.projekte
      .filter((projekt) => projekt.leistungen?.includes(leistung))
      .map((projekt) => ({ kunde, projekt })),
  );
  const hervorgehoben = zugeordnet.filter(({ projekt }) => projekt.hervorgehoben?.includes(leistung));

  return (hervorgehoben.length > 0 ? hervorgehoben : zugeordnet).slice(0, maxAnzahl);
}
