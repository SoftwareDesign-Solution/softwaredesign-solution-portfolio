# SoftwareDesign Solution – Portfolio & Workshop Platform

## ✨ Beschreibung

Dieses Repository enthält mein **Online-Portfolio** sowie eine **Workshop-Plattform** für Softwareentwicklung.

Die Anwendung basiert auf **Next.js** und setzt konsequent auf moderne Webtechnologien wie **React 19**, **Server Components**, **Server Actions**, **React Hook Form**, **Zod** und **Neon PostgreSQL**.

Neben der Präsentation meiner Dienstleistungen und Referenzen dient die Plattform als zentrale Anlaufstelle für mein Workshop-Angebot. Interessenten können Workshops ansehen, Anfragen stellen sowie Workshops direkt buchen und sich über neue Termine benachrichtigen lassen.

> **Hinweis:** Dieses Repository ist **öffentlich** und befindet sich in aktiver Entwicklung. Die Workshop-Verwaltung (Anlegen/Ändern/Löschen) erfolgt direkt in der Datenbank, nicht über die Anwendung.

---

## 🚀 Technologien

### Frontend

* **Next.js 16** – React Framework mit App Router
* **React 19** – Moderne komponentenbasierte UI-Entwicklung
* **TypeScript** – Typsichere Entwicklung
* **Tailwind CSS 4** – Utility-First CSS Framework

### Formulare & Validierung

* **React Hook Form** – Performante Formularverwaltung
* **Zod** – Typsichere Validierung von Formulardaten
* **Cloudflare Turnstile** – Datenschutzfreundlicher Bot-/Spam-Schutz (bewusst statt Google reCAPTCHA)

### Backend

* **Next.js Server Components**
* **Next.js Server Actions** (eine Funktion pro Datei)

### Datenbank

* **Neon PostgreSQL** (`@neondatabase/serverless`)
* SQL-Migrations
* SQL-Seeds

### E-Mail

* **React Email**
* **Resend**

### Entwicklung & Qualitätssicherung

* **ESLint**
* **TypeScript**
* **React Compiler**
* **PostCSS**
* **Cypress** – End-to-End-Tests (Schwerpunkt, da die Anwendung überwiegend aus Seiten & Formularen besteht)
* Gezielte **Unit-Tests** für Zod-Schemas, Utility-Funktionen und Preisberechnung
* **Storybook** *(geplant)* – Komponenten-Katalog, sobald genug wiederverwendbare Komponenten existieren

---

## 📂 Projektstruktur

```text
.
├── database/
│   ├── migrations/
│   └── seeds/
│       └── workshops/
├── public/
└── src/
    ├── app/
    │   ├── _components/          # nur im Root Layout/auf der Startseite verwendet
    │   │   ├── Header, Footer, DesktopNavbar
    │   │   ├── HamburgerButton, MobileMenu
    │   │   └── Startseiten-Sections
    │   ├── actions/               # Server Actions, eine Funktion pro Datei
    │   ├── agb/
    │   ├── anfrage/               # Kontakt-/Anfrageformular
    │   ├── datenschutz/
    │   ├── impressum/
    │   ├── design-system/         # Design-Token-Showcase
    │   ├── notifications/
    │   │   └── [id]/
    │   │       └── confirm/
    │   │           └── page.tsx   # Double-Opt-In-Bestätigung, liest ?token= aus searchParams
    │   ├── referenzen/
    │   ├── workshops/
    │   │   └── [slug]/
    │   │       └── _components/   # WorkshopDetails, WorkshopSidebar
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── modals/                 # Modal, ActionStatusModal, *Modal-Wrapper
    │   └── forms/
    │       ├── shared/             # DateStep, ParticipantStepper, Address-/Kontakt-Fields, TurnstileWidget
    │       └── *.tsx + colokierte *-status-messages.tsx je Formular
    ├── emails/
    │   └── components/             # wiederverwendbare Email-Bausteine
    ├── lib/
    │   ├── db.ts                   # Neon-Connection
    │   ├── resend.ts                # Resend-Client
    │   └── turnstile.ts             # Server-seitige Token-Verifizierung
    ├── providers/
    │   └── ModalProvider.tsx        # React Context für zentrales Modal-State-Management
    ├── schemas/                     # Zod-Schemas, eine Datei pro Formular (type.schema.ts)
    ├── types/                       # Workshop, Trainer, Termin
    └── utils/                       # format-date.ts, format-number.ts, format-termin-status.ts
```

---

## 🏗 Architektur

Die Anwendung basiert vollständig auf dem **App Router** von Next.js.

### Server Components

* Rendering der Seiten
* Lesender Datenbankzugriff (Workshops, Termine, Trainer)
* SEO
* Optimale Performance

### Client Components

* Formulare
* Modals
* Interaktive UI-Komponenten (Navigation, Mobile Menu)

### Server Actions

Alle schreibenden Operationen werden über **Server Actions** umgesetzt (eine Funktion pro Datei, `src/app/actions/`), jeweils mit vorgeschalteter Turnstile-Verifizierung:

* `send-contact-request.ts` – Kontakt-/Anfrageformular unter `/anfrage` (nur E-Mail, keine DB-Persistierung)
* `create-booking.ts` – Workshop-Buchung (DB-Insert + E-Mail)
* `create-quote-request.ts` – Angebotsanfrage (DB-Insert + E-Mail)
* `create-notification-signup.ts` – Benachrichtigung bei neuen Terminen (DB-Insert + Double-Opt-In-E-Mail)

Die Workshop-Verwaltung selbst (Anlegen/Ändern/Löschen) erfolgt **nicht** über die App, sondern direkt in Neon.

> Aktuell greifen die Server Actions noch direkt auf Neon (`src/lib/db.ts`) und Resend (`src/lib/resend.ts`) zu. Eine Repository/Service-Trennung ist als späterer Refactoring-Schritt geplant, sobald die Anwendung grundlegend läuft.

---

## 📧 Formulare

Die Anwendung verwendet React Hook Form in Kombination mit Zod, abgesichert durch Cloudflare Turnstile.

* **Kontakt-/Anfrageformular** (`/anfrage`) – allgemeine Anfragen sowie Angebot/Anfrage zu Leistungen
* **Booking-Formular** – Workshop-Buchung (Termin, Teilnehmerzahl, Firmen-/Rechnungsadresse, Ansprechpartner)
* **Quote-Request-Formular** – Angebotsanfrage zu einem Workshop
* **Notification-Signup-Formular** – Benachrichtigung bei neuen Workshop-Terminen (Double-Opt-In)

---

## 📨 E-Mail-Versand

Für den Versand von E-Mails wird folgende Kombination eingesetzt:

* React Email
* Resend

Dadurch werden E-Mail-Templates vollständig als React-Komponenten entwickelt, wiederverwendbare Bausteine liegen unter `src/emails/components/`.

**Versendete Benachrichtigungen:**

* Kontakt-/Anfrageformular – Bestätigung an Kunde + interne Kopie
* Booking – Bestätigung an Kunde + interne Kopie
* Quote-Request – Bestätigung an Kunde + interne Kopie
* Notification-Signup – Double-Opt-In Confirmation-Mail + Hinweis-Mail nach Bestätigung

Lokale Vorschau der Templates:

```bash
pnpm email:dev
```

---

## 🗄 Datenbank

Als Datenbank kommt **Neon PostgreSQL** zum Einsatz.

Das Repository enthält bereits die Datenbankstruktur:

```text
database/
├── migrations/
└── seeds/
    └── workshops/
```

**Tabellen:** `trainer`, `workshop`, `termin`, `buchung`, `angebotsanfrage`, `kontaktanfrage`, `workshop_benachrichtigung`
**ENUM-Typen:** `termin_status` (`ausgebucht`, `restplaetze`, `verfuegbar`, `planung`), `anrede`

Die SQL-Skripte dienen zur Erstellung der Datenbank sowie zum Einfügen von Test- und Stammdaten (u. a. je ein Seed pro Workshop).

---

## 🛠 Entwicklung

Repository klonen

```bash
git clone https://github.com/SoftwareDesign-Solution/softwaredesign-solution-portfolio.git
```

Abhängigkeiten installieren

```bash
pnpm install
```

Entwicklungsserver starten

```bash
pnpm dev
```

Build erstellen

```bash
pnpm build
```

Produktiv starten

```bash
pnpm start
```

ESLint ausführen

```bash
pnpm lint
```

E-Mail-Templates lokal ansehen

```bash
pnpm email:dev
```

Cypress E2E-Tests ausführen

```bash
pnpm cypress:open
```

> Ausführliche Erläuterungen zu Architektur-Entscheidungen, Naming Conventions, Commit-Konventionen und pnpm-Befehlen findest du in [`ROADMAP.md`](./ROADMAP.md).

---

## 🎯 Geplante Features

### Portfolio

* Vorstellung meiner Dienstleistungen
* Referenzen
* Workshop-Angebot
* Kontaktmöglichkeiten

### Workshops

* Workshop-Übersicht
* Workshop-Detailseiten
* Workshop-Buchung
* Angebotsanfragen
* Benachrichtigung bei neuen Terminen

### Zukünftig geplant

* Gutscheincodes (Rabatt-Codes, prozentual oder fest)
* Zusätzliche Trainer pro Workshop (`workshop_trainers`-Join-Tabelle, aktuell nicht benötigt)
* Storybook als Komponenten-Katalog

### Administration (geplant, löst Nx-Monorepo-Migration aus)

* Eigene `admin`-Domain für Verwaltung von Workshops und Anfragen
* Eigene `app`-Domain als login-pflichtiger Kundenbereich

---

## 📚 Verwendete Bibliotheken

### Dependencies

* Next.js
* React, React DOM
* React Hook Form
* Zod
* @neondatabase/serverless
* React Email
* Resend
* nextjs-turnstile

### DevDependencies

* TypeScript
* ESLint
* Tailwind CSS, PostCSS
* React Compiler
* Cypress
* @react-email/ui

---

## 📈 Projektstatus

🚧 Das Projekt befindet sich derzeit in aktiver Entwicklung. Der vollständige Umsetzungsplan mit allen Entwicklungsphasen liegt in [`ROADMAP.md`](./ROADMAP.md).

Geplante Erweiterungen:

* Repository/Service-Trennung (Refactoring, sobald die Anwendung grundlegend läuft)
* Storybook als Komponenten-Katalog
* Gutscheincodes
* Authentifizierung
* Buchungssystem-Erweiterungen
* Admin-Portal (eigene Domain, Nx-Monorepo)
* Mehrsprachigkeit
* Suchfunktion
* Optimierung für SEO und Performance

---

## 📄 Lizenz

**All Rights Reserved.** Der Quellcode ist öffentlich einsehbar, steht aber unter keiner Open-Source-Lizenz. Eine Nutzung, Kopie, Modifikation oder Weiterverwendung des Quellcodes – auch auszugsweise, auch in anderen Projekten – ist ohne meine ausdrückliche schriftliche Genehmigung nicht gestattet. Alle Rechte am Quellcode verbleiben beim Autor.
