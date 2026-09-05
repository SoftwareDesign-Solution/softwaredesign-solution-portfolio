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

import type { ReferenzKunde } from "@/types/referenz";

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
        id: "dto-klassengenerator",
        titel: "DTO-Klassengenerator",
        beschreibung:
          "Automatische Generierung von Klassen, Funktionen und Methoden für .NET-Core-Projekte auf Basis der SAP Business One Service-Layer-Metadaten.",
        stack: [".NET Core", "C#", "Service Layer", "T4 Templates"],
      },
      {
        id: "e-rechnungs-import-addon",
        titel: "E-Rechnungs-Import Add-On",
        beschreibung:
          "SAP Business One Add-On / coresuite-Modul zum automatisierten Import von ZUGFeRD-E-Rechnungen, mit konfigurierbarem Mapping über vier Typen (DIRECT, SQL, FIXED, EXPR) — als lizenziertes Produkt erhältlich.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "VB.NET"],
      },
      {
        id: "portfolio-workshop-plattform",
        titel: "Online-Portfolio & Workshop-Plattform",
        beschreibung:
          "Next.js-Plattform mit Neon-PostgreSQL-Datenbank, REST-API zum Workshop-Abruf und automatisiertem E-Mail-Versand über Resend.",
        stack: ["Next.js", "React", "React Hook Form", "TailwindCSS", "TypeScript", "Resend", "Neon PostgreSQL"],
      },
      {
        id: "admin-dashboard",
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
        id: "travel-planner",
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
        id: "service-layer-michelsen",
        titel: "SAP Business One Service Layer",
        beschreibung: "Installation & Konfiguration inkl. Table-/Column-Allowlist und Permissions.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL"],
      },
      {
        id: "edi-schnittstelle",
        titel: "EDI-Schnittstelle",
        beschreibung: "Import/Export von ORDERS, DESADV, INVOIC und IFTMIN aus SAP Business One.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL", "EDI"],
      },
      {
        id: "datev-export",
        titel: "DATEV-Export-Tool",
        beschreibung:
          "Windows-Anwendung zur automatisierten Aufbereitung und Übertragung von DATEV-relevanten Buchungen.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL"],
      },
      {
        id: "sepa-generator",
        titel: "SEPA-Generator",
        beschreibung:
          "Windows-Anwendung zur automatisierten Erstellung von SEPA-Zahlungsdateien mit direkter Bank-Übertragung.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL"],
      },
      {
        id: "mde-logistik-app",
        titel: "MDE Logistik-App",
        beschreibung: "Android-App (Xamarin & MAUI) für Kommissionierung, Wareneingang und Umlagerung.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL", "Xamarin", "MAUI"],
      },
      {
        id: "provisionsabrechnung",
        titel: "Provisionsabrechnung",
        beschreibung:
          "Windows-Dienst zur automatischen Berechnung, Auswertung und Rechnungsstellung von Provisionen.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "Sharpshooter Reports", "C#", "SQL"],
      },
      {
        id: "auswertungen-michelsen",
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
        id: "layout-anpassungen-michelsen",
        titel: "Layout-Anpassungen",
        beschreibung:
          "Anpassung und Erstellung von Verkaufs- und Einkaufsbelegen (coresuite Country Package, Crystal Reports).",
        stack: ["SAP Business One", "coresuite", "Sharpshooter Reports", "Crystal Reports"],
      },
      {
        id: "shopware-anbindung",
        titel: "Shopware-Anbindung",
        beschreibung: "Automatisierte Übertragung von Bestellungen, Artikeln und Kunden.",
        stack: ["SAP Business One", "Service Layer", "coresuite", "C#", "SQL", "Shopware"],
      },
      {
        id: "lvs-anbindung",
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
        id: "e-rechnung-wkn",
        titel: "E-Rechnung (ZUGFeRD)",
        beschreibung: "Erstellung & Konfiguration von E-Rechnungen mit coresuite Designer.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        id: "abrechnungsassistent",
        titel: "Abrechnungsassistent",
        beschreibung: "coresuite-Customize-Regel zur assistierten Abrechnung in SAP Business One.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        id: "it-man-geraeteanlage",
        titel: "IT-Man-Geräteanlage",
        beschreibung:
          "Automatisierte Übernahme seriennummergeführter Geräte aus Lieferscheinen in eine externe IT-Management-Datenbank.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        id: "importvorlage-eingangsrechnungen",
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
        id: "service-layer-galke",
        titel: "Service Layer & Berechtigungskonzept",
        beschreibung:
          "Installation, Konfiguration und rollenbasiertes Berechtigungskonzept in SAP Business One.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        id: "belegpruefung",
        titel: "Belegprüfung",
        beschreibung:
          "coresuite-Customize-Regel zur automatisierten Prüfung von Belegen anhand eines SQL-basierten Regelkatalogs (CTEs).",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        id: "chargenrueckverfolgung",
        titel: "Chargenrückverfolgung",
        beschreibung: "Mehrstufige SQL-Abfrage zur Rückverfolgung aller Bewegungen einer Charge.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        id: "lagerverwaltung-umlagerung",
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
        id: "postgresql-kurs",
        titel: "PostgreSQL Grundlagen & Fortgeschrittene",
        jahr: "2025/2026",
        beschreibung: "Kursentwicklung und -durchführung inkl. Schulungsunterlagen und Aufgaben.",
        stack: ["PostgreSQL"],
      },
      {
        id: "react-fortgeschrittene",
        titel: "React für Fortgeschrittene",
        jahr: "2024/2025",
        beschreibung: "Vertiefende Schulung zu fortgeschrittenen React-Patterns.",
        stack: ["React", "Redux Toolkit", "GraphQL", "TailwindCSS", "Vite", "Vitest", "Cypress", "TypeScript"],
      },
      {
        id: "laravel-kompaktkurs",
        titel: "Laravel Kompaktkurs",
        jahr: "2025",
        beschreibung: "Kompaktkurs inkl. Beispielprojekt TaskFlow.",
        stack: ["PHP", "Laravel", "MySQL", "PHPUnit", "Docker"],
      },
      {
        id: "aspnet-einfuehrung",
        titel: "ASP.NET Einführung",
        jahr: "2025",
        beschreibung: "Einführungskurs in das ASP.NET-Core-Ökosystem.",
        stack: ["ASP.NET Core MVC", "Web API", "Blazor", "Razor Pages", "ASP.NET Core Identity"],
      },
      {
        id: "vuejs-grundkurs",
        titel: "Vue.js Grundkurs",
        jahr: "2023/2024",
        beschreibung: "Grundlagenkurs für Vue.js.",
        stack: ["Vue.js", "Pinia", "Vite", "Vitest", "Cypress", "TypeScript"],
      },
      {
        id: "nx-kompaktkurs",
        titel: "Nx Kompaktkurs",
        jahr: "2025",
        beschreibung: "Kompaktkurs zu Monorepo-Verwaltung mit Nx.",
        stack: ["Nx", "TypeScript"],
      },
      {
        id: "git-grundlagenkurs",
        titel: "Git Grundlagenkurs",
        jahr: "2025",
        beschreibung: "Grundlagenkurs zu Versionskontrolle und CI/CD.",
        stack: ["Git", "GitHub", "GitLab", "CI/CD", "Docker"],
      },
      {
        id: "react-grundlagen",
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
        id: "kalkulationsmodul",
        titel: "Kalkulationsmodul",
        beschreibung:
          "Windows-Anwendung mit Service-Layer-Anbindung zur Kalkulation kundenspezifischer Anfragen (Stücklisten, Angebote).",
        stack: ["SAP Business One", "Service Layer", "C#", "SQL", "DevExpress"],
      },
      {
        id: "produktionsmodul",
        titel: "Mehrstufiges Produktionsmodul",
        beschreibung: "coresuite-Customize-Regel zur Erstellung mehrerer Produktionsaufträge.",
        stack: ["SAP Business One", "coresuite", "C#", "SQL"],
      },
      {
        id: "produktionsetiketten",
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
        id: "customizing-schnittstellen",
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
        id: "lagersoftware",
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
        id: "monheim-pass",
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
        id: "dispo-online",
        titel: "Dispo Online",
        beschreibung: "Online-Plattform (Laravel, Angular, NgRx) zur Buchung von Fahrgastzählungsaufträgen.",
        stack: ["Laravel", "Angular", "NgRx", "Bootstrap", "Laravel Sanctum"],
      },
      {
        id: "desktop-anwendung-trendline",
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
        id: "birdvision-kundencenter",
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
        id: "buchungsplattform-probereaeume",
        titel: "Buchungsplattform für Proberäume",
        beschreibung: "Webanwendung zur Buchung von Proberäumen.",
        stack: ["Laravel", "Vue.js", "TypeScript", "Bootstrap", "Laravel Sanctum"],
      },
      {
        id: "verwaltungssoftware",
        titel: "Verwaltungssoftware",
        beschreibung: "Individuelle Verwaltungssoftware für interne Geschäftsprozesse.",
        stack: ["Laravel", "Angular", "NgRx", "TailwindCSS", "Laravel Sanctum"],
      },
      {
        id: "intranet-anwendung",
        titel: "Intranet-Anwendung",
        beschreibung: "Internes Portal zur unternehmensweiten Kommunikation und Informationsbereitstellung.",
        stack: ["Node.js", "React", "Next.js"],
      },
      {
        id: "payment-package",
        titel: "Payment-Package (TIVITA GmbH, Mannheim)",
        beschreibung: "PayPal- & Payrexx-Integration für Laravel.",
        stack: ["Laravel", "PayPal", "Payrexx"],
      },
      {
        id: "auftragsverwaltung-ella",
        titel: "Auftragsverwaltung (ella-Verlag, Düsseldorf)",
        beschreibung: "Laravel mit sevDesk-Anbindung.",
        stack: ["Laravel", "sevDesk"],
      },
      {
        id: "warenwirtschaft-ballon-mueller",
        titel: "Warenwirtschaftssystem (Ballon-Müller Diffusion GmbH, Herznach CH)",
        beschreibung: "Laravel-basiertes Warenwirtschaftssystem.",
        stack: ["Laravel"],
      },
      {
        id: "anfrageportal-dnds",
        titel: "Anfrageportal (DNDS GmbH, Bergheim)",
        beschreibung: "Bearbeitung von Reiseanfragen mit Laravel & WordPress.",
        stack: ["Laravel", "WordPress"],
      },
      {
        id: "partnerportal-urbanoffers",
        titel: "Partner-Portal (UrbanOffers, Wien)",
        beschreibung: "Portal zur Verwaltung und Präsentation von Partnerangeboten.",
        stack: ["Laravel", "WordPress"],
      },
    ],
  },
];