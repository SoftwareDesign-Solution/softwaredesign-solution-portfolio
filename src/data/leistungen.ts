/**
 * @file leistungen.ts
 * @description Redaktionelle Inhalte der Leistungsseiten unter /leistungen/[slug].
 * Referenz-Projekte kommen über ihre Zuordnung `leistungen`/`hervorgehoben` aus `data/referenzen.ts`, Workshops live aus der DB.
 * @module data/leistungen
 * @author Manuel Kübler
 */

import type { Leistung, LeistungSchritt } from "@/types/leistung";

/** Standard-Vorgehen für Entwicklungsleistungen, sofern eine Leistung kein eigenes definiert. */
export const STANDARD_VORGEHEN: LeistungSchritt[] = [
  { titel: "Vorgespräch", beschreibung: "Wir klären Ziel, Ausgangslage und Rahmen — kostenlos und unverbindlich." },
  { titel: "Konzept & Angebot", beschreibung: "Sie erhalten einen konkreten Lösungsvorschlag mit Aufwand und Zeitplan." },
  { titel: "Umsetzung", beschreibung: "Ich entwickle in kurzen Schritten und zeige Zwischenstände früh." },
  { titel: "Übergabe", beschreibung: "Dokumentation, Einweisung und auf Wunsch eine Schulung für Ihr Team." },
];

/** Alle Leistungsseiten in der Reihenfolge, in der sie querverlinkt werden. */
export const LEISTUNGEN: Leistung[] = [
  {
    slug: "sap-business-one-entwicklung",
    titel: "SAP Business One Entwicklung",
    metaTitel: "SAP Business One Entwicklung & Add-Ons | SoftwareDesign-Solution",
    metaBeschreibung: "SAP Business One Entwickler für coresuite-Regeln, Add-Ons, Service-Layer-Apps und Schnittstellen wie EDI, DATEV und Shopware. Seit 2013, remote im DACH-Raum.",
    serviceTyp: "SAP Business One Entwicklung",
    kicker: "Leistung · SAP Business One",
    ueberschrift: "SAP Business One Entwicklung — vom Add-On bis zur Schnittstelle.",
    einleitung: "Ich erweitere SAP Business One dort, wo der Standard aufhört: mit coresuite-Regeln, Add-Ons, Service-Layer-Anwendungen und Schnittstellen zu EDI, DATEV, Shopware und Lagerverwaltung.",
    ctaText: "Projekt anfragen",
    fakten: [
      { label: "Erfahrung", value: "seit 2013" },
      { label: "Projekte", value: "24 · bei 5 Kunden" },
      { label: "Branchen", value: "Logistik · Industrie · IT" },
      { label: "Arbeitsweise", value: "Remote oder vor Ort" },
    ],
    bausteineTitel: "Wo ich SAP Business One erweitere.",
    bausteine: [
      { titel: "coresuite Country Package", beschreibung: "Mit coresuite Customize entstehen Prüfungen, Assistenten und Automatismen direkt in den Standardmasken, mit coresuite Designer Belege, Etiketten und E-Rechnungen." },
      { titel: "Service Layer & Apps", beschreibung: "Installation, Berechtigungskonzept und Anwendungen auf dem Service Layer: Web-Apps mit Vue.js, mobile Apps mit .NET MAUI." },
      { titel: "Web Client Customizing", beschreibung: "Anpassungen und Erweiterungen für den browserbasierten SAP Business One Web Client, damit Ihr Team auch dort mit den gewohnten Feldern und Abläufen arbeitet." },
      { titel: "SAP Business One MCP", beschreibung: "Ein MCP-Server verbindet KI-Assistenten wie Claude mit SAP Business One: Belege, Stammdaten und Auswertungen per Chat abfragen — abgesichert über Service Layer und Berechtigungen." },
      { titel: "Schnittstellen", beschreibung: "EDI mit ORDERS, DESADV, INVOIC und IFTMIN, DATEV-Export, SEPA-Zahlungen, Shopware und Lagerverwaltungssysteme." },
      { titel: "E-Rechnung", beschreibung: "ZUGFeRD-Rechnungen mit coresuite Designer erstellen und eingehende E-Rechnungen per Add-On automatisch als Beleg anlegen." },
    ],
    technologien: ["SAP Business One", "Service Layer", "Web Client", "coresuite", "C#", "SQL", "Crystal Reports", "SharpShooter Reports", "beas Manufacturing", "MCP", ".NET MAUI", "Vue.js"],
    workshopSlugs: [],
    // @todo Antworten mit "[Bitte prüfen]" vor dem Livegang bestätigen oder anpassen.
    faq: [
      {
        frage: "Was ist der Unterschied zwischen einer coresuite-Regel und einem Add-On?",
        antwort: "Eine coresuite-Customize-Regel erweitert die Standardmasken direkt, etwa um Prüfungen beim Speichern oder zusätzliche Schaltflächen. Ein Add-On ist eine eigene Anwendung und eignet sich für größere Funktionen wie den Import von E-Rechnungen. Welche Variante passt, klären wir im Vorgespräch.",
      },
      {
        frage: "Wofür brauche ich den Service Layer?",
        antwort: "Der Service Layer ist die REST-Schnittstelle von SAP Business One. Über ihn greifen Web-Apps, mobile Geräte und externe Systeme auf Belege und Stammdaten zu. Ich übernehme Installation, Konfiguration und ein passendes Berechtigungskonzept.",
      },
      {
        frage: "Können Sie bestehende Anpassungen übernehmen?",
        antwort: "Ja — vorausgesetzt, Quellcode und Regeln liegen vor. Ich analysiere den Bestand, dokumentiere ihn und entwickle ihn danach weiter. Bei coresuite-Regeln ist das in der Regel möglich, bei Add-Ons hängt es vom Quellcode ab.",
      },
      {
        frage: "Arbeiten Sie remote?",
        antwort: "In der Regel ja, über einen Zugang zu Ihrem Testsystem. Für Workshops, Abnahmen und Schulungen komme ich auch zu Ihnen.",
      },
    ],
  },
  {
    slug: "it-schulungen-inhouse",
    titel: "Inhouse-Schulungen",
    metaTitel: "Inhouse-Schulungen für Entwickler | SoftwareDesign-Solution",
    metaBeschreibung: "Inhouse- und Remote-Schulungen für Entwicklerteams: React, Vue.js, Next.js, Laravel, ASP.NET Core und Cypress — mit durchgängigem Übungsprojekt.",
    serviceTyp: "IT-Schulungen für Softwareentwickler",
    kicker: "Leistung · Workshops & Schulungen",
    ueberschrift: "Inhouse-Schulungen für Entwicklerteams.",
    einleitung: "Ich schule Ihr Team zu React, Vue.js, Next.js, Laravel, ASP.NET Core und Cypress — remote oder bei Ihnen vor Ort, mit einem durchgängigen Übungsprojekt statt isolierter Beispiele.",
    ctaText: "Schulung anfragen",
    fakten: [
      { label: "Format", value: "Remote oder Inhouse" },
      { label: "Dauer", value: "2–5 Tage" },
      { label: "Trainer seit", value: "2020" },
      { label: "Für", value: "Unternehmen - Weiterbildungspartner" },
      /*
      { label: "Themen", value: "Frontend · Backend · Testing" },
      { label: "Trainer seit", value: "2022 für cmt GmbH" },
      */
    ],
    bausteineTitel: "Wie ich Ihr Team schule.",
    bausteine: [
      { titel: "Workshops aus dem Katalog", beschreibung: "Erprobte Agenden mit festen Lernzielen, von Grundlagen bis Aufbaukurs — als offener Termin oder exklusiv für Ihr Team." },
      { titel: "Individuelle Agenda", beschreibung: "Sie wählen die Themen aus den Workshop-Agenden, ich stelle daraus eine Schulung zusammen, die zu Ihrem Projekt passt." },
      { titel: "Durchgängiges Übungsprojekt", beschreibung: "Ein Reiseplaner zieht sich durch React-, Vue.js- und Next.js-Workshops, TaskFlow durch den Laravel-Kurs: Gelerntes wird sofort angewendet." },
      { titel: "Unterlagen & Aufgaben", beschreibung: "Folien, Codebeispiele und Übungsaufgaben bleiben nach der Schulung bei Ihrem Team." },
      { titel: "Kursentwicklung für Anbieter", beschreibung: "Für Weiterbildungsanbieter entwickle ich Kurse inklusive Unterlagen und führe sie durch." },
      { titel: "SAP Business One", beschreibung: "Schulungen zu Service Layer und coresuite für Entwickler und Key-User." },
    ],
    technologien: ["React", "Next.js", "Vue.js", "Laravel", "ASP.NET Core", "Cypress", "Storybook", "TypeScript", "PostgreSQL", "Git"],
    workshopSlugs: "alle",
    vorgehen: [
      { titel: "Vorgespräch", beschreibung: "Wir klären Ziele, Vorkenntnisse und Teamgröße." },
      { titel: "Agenda", beschreibung: "Sie wählen Themen aus dem Katalog, ich stimme die Agenda darauf ab." },
      { titel: "Schulung", beschreibung: "Remote oder vor Ort, mit Übungsprojekt und vielen Praxisphasen." },
      { titel: "Nach der Schulung", beschreibung: "Unterlagen, Codebeispiele und Aufgaben bleiben bei Ihrem Team." },
    ],
    // @todo Antworten mit "[Bitte ergänzen]" vor dem Livegang ausfüllen.
    faq: [
      {
        frage: "Findet die Schulung remote oder bei uns statt?",
        antwort: "Beides ist möglich. Remote-Schulungen laufen über ein Videomeeting mit geteilter Entwicklungsumgebung, Inhouse-Schulungen in Ihren Räumen.",
      },
      {
        frage: "Können wir die Inhalte anpassen?",
        antwort: "Ja. Bei einer Anfrage wählen Sie die gewünschten Themen direkt aus der Workshop-Agenda aus, daraus entsteht Ihre individuelle Schulung.",
      },
      {
        frage: "Welche Vorkenntnisse braucht das Team?",
        antwort: "Jeder Workshop nennt seine Voraussetzungen auf der Detailseite. Im Vorgespräch klären wir, ob Grundlagen oder Aufbaukurs besser passt.",
      },
      /*
      {
        frage: "Wie viele Personen können teilnehmen?",
        antwort: "[Bitte ergänzen: maximale Teilnehmerzahl je Schulung]",
      },
      */
    ],
  },
  {
    slug: "webentwicklung",
    titel: "Web-Entwicklung",
    metaTitel: "Web-Entwicklung mit React, Vue & Node.js | SoftwareDesign-Solution",
    metaBeschreibung: "Webanwendungen, Portale und Kundencenter mit React, Vue.js, Node.js und Laravel — von der API bis zur getesteten Oberfläche. Remote im DACH-Raum.",
    serviceTyp: "Webentwicklung",
    kicker: "Leistung · Web-Entwicklung",
    ueberschrift: "Webanwendungen mit React, Vue.js und Node.js.",
    einleitung: "Ich entwickle Portale, Kundencenter und interne Werkzeuge, die Excel-Listen und Insellösungen ablösen — vom Datenmodell über die API bis zur getesteten Oberfläche.",
    ctaText: "Projekt anfragen",
    fakten: [
      { label: "Erfahrung", value: "seit 2014" },
      { label: "Frontend", value: "React · Vue.js · Angular" },
      { label: "Backend", value: "Node.js · Laravel · Spring Boot" },
      { label: "Qualität", value: "Cypress · Jest · Storybook" },
    ],
    bausteineTitel: "Was ich für Sie im Web baue.",
    bausteine: [
      { titel: "Portale & Kundencenter", beschreibung: "Anwendungen für Ihre Kunden und Partner, mit Rollen, geschützten Bereichen und Anbindung an Ihre Systeme." },
      { titel: "Ablösung von Excel-Lösungen", beschreibung: "Aus gewachsenen Excel-Mappen werden Webanwendungen mit Datenbank, Mehrbenutzerbetrieb und klaren Abläufen." },
      { titel: "Schnittstellen & APIs", beschreibung: "REST-APIs und Anbindungen an Zahlungsanbieter, Buchhaltung wie sevDesk oder den SAP Business One Service Layer." },
      { titel: "Next.js & Fullstack", beschreibung: "Server Components, Server Actions, Datenbank und Deployment auf Vercel oder Docker aus einer Hand." },
      { titel: "Testautomatisierung", beschreibung: "E2E-Tests mit Cypress, Unit-Tests mit Jest und Vitest sowie Komponenten-Dokumentation mit Storybook." },
      { titel: "Weiterentwicklung", beschreibung: "Bestehende Anwendungen modernisieren, aufräumen und mit Tests absichern, statt sie neu zu schreiben." },
    ],
    technologien: ["React", "Next.js", "Vue.js", "Angular", "Node.js", "Laravel", "TypeScript", "TailwindCSS", "MySQL", "PostgreSQL", "Cypress"],
    workshopSlugs: ["react-basics", "nextjs-fullstack", "vue-basics", "laravel", "cypress-testing"],
    // @todo Antworten mit "[Bitte ergänzen]" vor dem Livegang ausfüllen.
    faq: [
      {
        frage: "React oder Vue.js — was passt zu uns?",
        antwort: "Beide sind ausgereift. Entscheidend sind Ihr Team, bestehender Code und die Anforderungen. Ich berate neutral und arbeite mit beiden.",
      },
      {
        frage: "Übernehmen Sie auch den Betrieb?",
        antwort: "Hosting, Wartung und Support nach dem Go-live sind möglich, aber nicht zwingend. Ich liefere die Anwendung fertig getestet und deploye sie auf Wunsch auf Ihrem Server oder bei einem Cloud-Anbieter.",
      },
      {
        frage: "Können Sie eine bestehende Anwendung weiterentwickeln?",
        antwort: "Ja. Ich verschaffe mir zuerst einen Überblick über Code und Architektur und sichere kritische Abläufe mit Tests ab, bevor ich Neues einbaue.",
      },
    ],
  },
  {
    slug: "dotnet-app-entwicklung",
    titel: ".NET- und App-Entwicklung",
    metaTitel: ".NET- und App-Entwicklung mit C# | SoftwareDesign-Solution",
    metaBeschreibung: "Windows-Anwendungen, Hintergrunddienste und mobile Apps mit C#, .NET und .NET MAUI — oft mit Anbindung an SAP Business One. Remote im DACH-Raum.",
    serviceTyp: ".NET-Softwareentwicklung",
    kicker: "Leistung · .NET & Apps",
    ueberschrift: ".NET- und App-Entwicklung für Ihre Prozesse.",
    einleitung: "Ich entwickle Windows-Anwendungen, Hintergrunddienste und mobile Apps mit C# und .NET — für Lager, Produktion und Verwaltung, oft mit direkter Anbindung an SAP Business One.",
    ctaText: "Projekt anfragen",
    fakten: [
      { label: "Sprache", value: "C# · SQL" },
      { label: "Oberflächen", value: "DevExpress · .NET MAUI" },
      { label: "Daten", value: "Entity Framework · Service Layer" },
      { label: "Arbeitsweise", value: "Remote oder vor Ort" },
    ],
    bausteineTitel: "Was ich mit .NET entwickle.",
    bausteine: [
      { titel: "Windows-Anwendungen", beschreibung: "Fachanwendungen mit DevExpress und Entity Framework — übersichtlich, schnell und auf Ihre Abläufe zugeschnitten." },
      { titel: "Hintergrunddienste", beschreibung: "Windows-Dienste, die Abrechnungen, Exporte und Abgleiche automatisch und zuverlässig im Hintergrund erledigen." },
      { titel: "Mobile Apps mit .NET MAUI", beschreibung: "Apps für MDE-Geräte und Smartphones, etwa für Kommissionierung und Wareneingang — inklusive Migration von Xamarin." },
      { titel: "Generatoren & Werkzeuge", beschreibung: "Code-Generatoren und Entwickler-Tools, die wiederkehrende Arbeit in .NET-Projekten automatisieren." },
      { titel: "Datenbanken & SQL", beschreibung: "Datenmodelle, performante Abfragen und Auswertungen auf Microsoft SQL Server, SAP HANA und PostgreSQL." },
      { titel: "SAP-Anbindung", beschreibung: "Anbindung an SAP Business One über Service Layer oder DI API — ohne Umweg über Zwischendateien." },
    ],
    technologien: ["C#", ".NET", ".NET MAUI", "Xamarin", "DevExpress", "Entity Framework", "ASP.NET Core", "SQL", "T4 Templates"],
    workshopSlugs: ["aspnet-core-basics"],
    // @todo Antworten mit "[Bitte ergänzen]" vor dem Livegang ausfüllen.
    faq: [
      {
        frage: "Desktop-Anwendung oder Webanwendung?",
        antwort: "Desktop-Anwendungen spielen ihre Stärken bei vielen Daten, Hardware-Anbindung und schneller Bedienung aus, Webanwendungen bei verteilten Nutzern. Ich entwickle beides und berate entsprechend.",
      },
      {
        frage: "Können Sie Xamarin-Apps auf .NET MAUI migrieren?",
        antwort: "Ja. Die MDE Logistik-App habe ich von Xamarin auf .NET MAUI überführt.",
      },
      {
        frage: "Für welche Geräte entwickeln Sie Apps?",
        antwort: "Android, Windows, MDE-Geräte bestimmter Hersteller]",
      },
    ],
  },
];

/**
 * Sucht eine Leistung anhand ihres Slugs.
 *
 * @param slug - URL-Slug unter /leistungen/
 * @returns Die Leistung oder `undefined`
 */
export function findLeistung(slug: string): Leistung | undefined {
  return LEISTUNGEN.find((leistung) => leistung.slug === slug);
}
