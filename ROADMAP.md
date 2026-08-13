# Roadmap: Online-Portfolio & Workshop Übersicht

Next.js 16 · App Router · TypeScript · Tailwind CSS · Neon Postgres · Resend

Jeder Schritt = ein bewusster Meilenstein → nach Fertigstellung committen & pushen.

---

## Phase 0 – Setup

- [x] Repository auf GitHub angelegt (public)
- [x] Next.js Projekt via `create-next-app` (App Router, TypeScript, Tailwind)
- [x] Boilerplate-Content entfernt (`src/app/page.tsx`, `public/`)
- [x] Grundverzeichnisstruktur angelegt: `src/app/`, `src/components/`, `src/lib/`, `src/providers/`, `src/utils/`, `src/emails/`, `src/types/`, sowie `database/` (Migrations & Seeds) auf Root-Ebene. `src/services/` folgt erst in Phase 7.5.

**Ziel-Verzeichnisstruktur (wächst über die Phasen):** Verzeichnisse entstehen inkrementell mit der jeweils ersten Datei darin, nicht vorab leer angelegt – Git trackt ohnehin keine leeren Ordner. Der Baum unten zeigt den Zielzustand, nicht den Tag-1-Stand.

```text
├── database/
│   ├── migrations/
│   └── seeds/
│       └── workshops/
│           ├── aspnet-core-basics.sql
│           ├── cypress-testing.sql
│           └── ... (weitere Workshops)
├── src/
│   ├── app/
│   │   ├── _components/            # Header, Footer, DesktopNavbar, MobileMenu, HamburgerButton
│   │   │   └── sections/            # Startseiten-Sections, inkl. WorkshopList, WorkshopCard
│   │   ├── actions/                 # Server Actions, eine Funktion pro Datei
│   │   ├── notifications/
│   │   │   └── [id]/
│   │   │       └── confirm/
│   │   │           └── page.tsx     # Double-Opt-In-Bestätigung (liest ?token= aus searchParams)
│   │   ├── impressum/page.tsx
│   │   ├── datenschutz/page.tsx
│   │   ├── agb/page.tsx
│   │   ├── anfrage/page.tsx         # Kontakt-/Anfrageformular (contact-request)
│   │   ├── workshops/
│   │   │   └── [slug]/
│   │   │       ├── _components/     # nur auf der Detailseite verwendet
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                      # Button, Card – generische, formularunabhängige UI-Primitive
│   │   ├── modals/                  # Modal, ActionStatusModal, *Modal-Wrapper
│   │   └── forms/                   # *.tsx + colokierte *-status-messages.tsx je Formular
│   │       └── shared/              # Label, TextField, SelectField, AppointmentSelection, ParticipantStepper, turnstile-widget.tsx, ...
│   ├── emails/
│   │   └── components/              # geteilte Email-Bausteine
│   ├── lib/
│   │   ├── db.ts                    # Neon-Connection
│   │   ├── resend.ts                # Resend-Client
│   │   └── turnstile.ts             # Server-seitige Token-Verifizierung
│   ├── schemas/                     # Zod-Schemas, eine Datei pro Formular
│   ├── providers/
│   │   └── ModalProvider.tsx
│   ├── services/                    # erst ab Phase 7.5
│   ├── types/
│   └── utils/
│       ├── format-date.ts
│       ├── format-price.ts
│       ├── format-termin-status.ts
│       └── format-date-range.ts
├── .env.example
└── package.json
```

- [x] Abhängigkeiten installiert, obwohl erst in späteren Phasen benötigt:

  ```json
  - @neondatabase/serverless
  - react-hook-form, zod
  - resend
  - react-email, @react-email/ui (devDependency)
  - nextjs-turnstile
  ```

- [x] `@/*` Path-Alias in `tsconfig.json`
- [x] Tailwind CSS Design-Tokens: eigene Farbpalette als Custom Colors in der Tailwind-Konfiguration hinterlegt
- [x] `DesignSystemPage` (`src/app/design-system/page.tsx`) als früher Token-Showcase (Farben, Typografie) – Orientierungshilfe, während die eigene Farbpalette noch nicht final feststeht
- [x] `.gitignore` geprüft (`node_modules/`, `.env*.local`, `.next/`)
- [x] `.env.example` mit Platzhaltern (Neon, Resend, Turnstile: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`)

**Commit:**

```text
chore: initial commit - Next.js 16 setup, Boilerplate entfernt
chore: Tailwind Design-Tokens (eigene Farbpalette) ergänzt
feat: DesignSystemPage als früher Token-Showcase ergänzt
```

---

## Phase 1 – Datenmodell & Server Actions (Reads)

- [x] `src/lib/db.ts` – Neon Postgres Verbindung (`@neondatabase/serverless`, `sql` Tagged Template zentral exportiert)
- [x] Migration-Files in `database/migrations/` (Tabellen: `trainer`, `workshop`, `termin`, `buchung`, `angebotsanfrage`, `kontaktanfrage`, `workshop_benachrichtigung`; ENUM-Typen `termin_status`, `anrede`; `pgcrypto`-Extension für `gen_random_uuid()`)
- [x] Seed-Files in `database/seeds/` für Testdaten
- [x] Types: `Workshop`, `Trainer`, `Termin` (Formular-bezogene Typen wie `BookingFormValues` folgen erst in Phase 6 per `z.infer` aus den Zod-Schemas)
- [x] Server Actions (eine Funktion pro Datei, `src/app/actions/`): `get-workshops.ts`, `get-workshop.ts` — nutzen `sql` aus `src/lib/db.ts` (noch keine Repository/Service-Trennung)
- [x] Utils: `format-date.ts`, `format-price.ts` (`src/utils/`)
- [ ] `src/app/notifications/[id]/confirm/page.tsx` reserviert für Double-Opt-In-Bestätigung (Server Component, liest `?token=` aus `searchParams`, keine separate API-Route nötig)

**Commits:**

```text
feat: src/lib/db.ts für Neon Postgres Verbindung
feat: Neon Postgres migration- und seed-files für trainer/workshop/termin/buchung/angebotsanfrage/kontaktanfrage/workshop_benachrichtigung angelegt
feat: Workshop-, Trainer- und Termin-Types ergänzt
feat: get-workshops.ts Server Action ergänzt
feat: get-workshop.ts Server Action ergänzt
feat: format-date und format-price Utilities ergänzt
```

---

## Phase 2 – Layout & Startseite

*(Header, Footer und Navigation werden nur im Root Layout verwendet – analog zu den Startseiten-Sections daher lokal unter `src/app/_components/`, nicht in `src/components/`. Ausnahme: falls einzelne Bausteine wie `HamburgerButton` später auch anderswo gebraucht werden, wandern sie nach `src/components/`.)*

- [x] `Header` Komponente unter `src/app/_components/` (bindet `DesktopNavbar` ein)
- [x] `DesktopNavbar` Komponente unter `src/app/_components/` (Navigation: Über mich, Schwerpunkte, Leistungen, Workshops, Kontakt)
- [x] `HamburgerButton` Komponente unter `src/app/_components/` (Toggle für `MobileMenu`)
- [x] `MobileMenu` Komponente unter `src/app/_components/` (mobile Navigation, nutzt `HamburgerButton`)
- [x] `Footer` Komponente unter `src/app/_components/` (inkl. Links zu Impressum, Datenschutz, AGB)
- [x] Root Layout (`src/app/layout.tsx`) mit Header/Footer eingebunden
- [x] Startseite (`src/app/page.tsx`) in Sections unterteilt, jede Section eine eigene Komponente unter `src/app/_components/sections/` (nur für die Startseite relevant, daher lokal statt in `src/components/`; eigenes Unterverzeichnis zur Abgrenzung von Header/Footer/Navigation)
- [x] `BackToTopButton` Komponente unter `src/app/_components/` (global sichtbar, im Root Layout eingebunden)

**Commits:**

```text
feat: Header- und DesktopNavbar-Komponente mit Hauptnavigation
feat: HamburgerButton- und MobileMenu-Komponente für mobile Navigation
feat: Footer-Komponente mit Rechtstext-Links
feat: Root Layout mit Header/Footer verknüpft
feat: Startseiten-Sections als Komponenten unter src/app/_components/sections angelegt
feat: BackToTopButton-Komponente ergänzt
```

---

## Phase 3 – Rechtliches & Error-Pages

- [x] `src/app/impressum/page.tsx`
- [x] `src/app/datenschutz/page.tsx`
- [x] `src/app/agb/page.tsx`
- [x] Verlinkung im Footer / Contact-Block
- [x] `src/app/not-found.tsx` – generische 404-Seite (falsche/kaputte URLs)
- [x] `src/app/workshops/[slug]/not-found.tsx` – Workshop nicht gefunden, greift z. B. bei
      `notFound()` in `WorkshopDetailPage`; lädt gezielt zur Themen-Anfrage über `/anfrage` ein
      statt der generischen 404-Meldung
- [x] `src/app/error.tsx` – Error Boundary für Laufzeitfehler (Client Component)
- [x] `src/app/global-error.tsx` – Root-Error-Boundary (fängt Fehler im Root Layout selbst ab)

**Commit:**

```text
docs: Impressum-Seite hinzugefügt
docs: Datenschutz-Seite hinzugefügt
docs: AGB-Seite hinzugefügt
feat: 404-Seite (not-found.tsx) ergänzt
feat: add workshop-specific not-found page
feat: Error Boundary (error.tsx, global-error.tsx) ergänzt
```

---

## Phase 4 – Workshop-Übersicht & Detailseite

*(Workshops selbst werden nicht über die App verwaltet, sondern direkt in Neon gepflegt – hier geht es nur um Lesen & Anzeigen.)*

- [x] `format-date-range.ts` unter `src/utils/` (formatiert einen Datumsbereich, z. B. für `WorkshopCard` – Anzeige des Termin-Zeitraums)
- [x] `isSameDay` als zusätzlicher Export in `format-date-range.ts` (unterscheidet "am" bei eintägigen vs. "vom...bis" bei mehrtägigen Workshops)
- [x] `WorkshopCard` Komponente unter `src/app/_components/sections` (einzelne Workshop-Kachel, aktuell nur auf Startseite verwendet)
- [x] `WorkshopList` Komponente unter `src/app/_components/sections` (Server Component, rendert Cards, aktuell nur auf Startseite verwendet)
- [x] Einbindung von `WorkshopList` auf der Startseite
- [x] `WorkshopDetailPage` (`src/app/workshops/[slug]/page.tsx`, `params` async awaiten)
- [x] `WorkshopHeader` Komponente unter `src/app/workshops/[slug]/_components/` (Header der Detailseite, nur dort verwendet)
- [x] `WorkshopDetails` Komponente unter `src/app/workshops/[slug]/_components/` (Haupt-Content der Detailseite, nur dort verwendet)
- [x] `WorkshopSidebar` Komponente unter `src/app/workshops/[slug]/_components/` (z. B. Booking-CTA, Termine, Trainer-Info, nur dort verwendet)
- [x] `format-termin-status.ts` unter `src/utils/` — vier Status:
  
  | Status | Label | Hinweis |
  | --- | --- | --- |
  | `ausgebucht` | "Ausgebucht" | keine Plätze mehr frei |
  | `restplaetze` | "Wenige Plätze frei" | Teilnehmerzahl nähert sich Maximum |
  | `verfuegbar` | "Verfügbar" | ausreichend Plätze frei |
  | `planung` | "In Planung" | keine Termine vorhanden → Text "Aktuell keine Termine geplant." |

  wiederverwendbar, u. a. in Phase 6 im Booking-Formular für die Termin-Auswahl (`AppointmentSelection`)

- [x] `TerminRow` Komponente zur zentralen Darstellung von Terminen in `src/app/_components/workshop-card.tsx` & `src/app/workshops/[slug]/_components/workshop-sidebar.tsx` eingebunden

**Commits:**

```text
feat: formatDateRange Utility für WorkshopCard ergänzt
feat: isSameDay Utility in format-date-range.ts ergänzt - unterscheidet "am" (eintägig) vs. "vom...bis" (mehrtägig) für die Termin-Anzeige
feat: WorkshopCard-Komponente
feat: WorkshopList als Server Component, Einbindung auf Startseite
feat: WorkshopDetailPage mit async params
feat: WorkshopHeader-Komponente
feat: WorkshopDetails-Komponente
feat: WorkshopSidebar-Komponente
feat: format-termin-status.ts Utility ergänzt
feat: TerminRow auf Design-System-Farben umgestellt
```

---

## Phase 5 – Modal-Basis (vor den Formularen)

- [x] `Modal` Basis-Komponente unter `src/components/modals/` (Overlay, Close-Handling, mit `createPortal`)
- [x] `ActionStatusModal` unter `src/components/modals/` (generische Erfolgs-/Fehler-Anzeige, Texte kommen von außen als Props – siehe die `*-status-messages.tsx` je Formular in Phase 6)
- [x] `ModalProvider` unter `src/providers/` (React Context intern, Open/Close-State + welches Modal aktiv ist, Einbindung im Root Layout)

**Commits:**

```text
feat: Modal-Basis-Komponente mit createPortal
feat: ActionStatusModal für Erfolgs-/Fehler-Rückmeldung ergänzt
feat: ModalProvider mit React Context für zentrales Modal-State-Management
fix: Header lag über Modal-Overlay - z-index von z-20 auf z-0 reduziert
```

---

## Phase 6 – Formulare & Schreib-Aktionen

- [x] `react-hook-form` + `zod` Setup
- [x] Booking-Formular unter `src/components/forms/` (zunächst mit allen Feldern inline, inkl. Datum, Teilnehmerzahl, Firmenadresse, Ansprechpartner, Rechnungsadresse)
- [x] `booking.schema.ts` unter `src/schemas/`
- [x] Formular-Typ per `z.infer<typeof bookingSchema>` abgeleitet (`BookingFormValues`), keine manuell doppelt gepflegten Types
- [x] **Refactor:** Rohes `label`/`input` im Booking-Formular durch wiederverwendbare Feld-Komponenten unter `src/components/forms/shared/` ersetzt: `Label`, `TextField`, `SelectField`
- [x] **Refactor:** Field-Sections aus dem Booking-Formular extrahieren nach `src/components/forms/shared/`: `AppointmentSelection`, `ParticipantStepper`, `CompanyAddressFields`, `ContactPersonFields`, `BillingAddressFields` — `AppointmentSelection` nutzt `format-termin-status.ts` aus Phase 4 zur Anzeige des Termin-Status
- [x] Restliche Zod-Schemas unter `src/schemas/`: `contact-request.schema.ts`, `quote-request.schema.ts`, `notification-signup.schema.ts`
- [x] Kontakt-/Anfrageformular (`contact-request`) unter `src/components/forms/`, erreichbar über `src/app/anfrage/page.tsx` — deckt sowohl allgemeine Kontaktaufnahme als auch Anfragen zu Leistungen ab (nutzt extrahierte Field-Sections wo passend)
- [x] Quote-Request-Formular unter `src/components/forms/` (nutzt extrahierte Field-Sections wo passend)
- [x] Notification-Signup-Formular unter `src/components/forms/`
- [x] **Refactor:** `Button.tsx` unter `src/components/ui/` extrahiert (wiederholte `className`-Strings, z. B. `ParticipantStepper` +/- Buttons) — generisch, nicht formularspezifisch, daher unter `ui/`
- [x] Modal-Wrapper für die Formulare unter `src/components/modals/`: `BookingModal`, `QuoteRequestModal`, `NotificationSignupModal` (nutzen `Modal` + jeweiliges Formular)
- [x] TypeScript-Migration (`.jsx` → `.tsx`)
- [x] `TurnstileWidget` Komponente unter `src/components/forms/shared/` (Wrapper um `nextjs-turnstile`)
- [x] `src/lib/turnstile.ts` – `verifyTurnstileToken()` gegen Cloudflare siteverify-API
- [x] Server Actions (`src/app/actions/`): `send-contact-request.ts` (nur E-Mail-Versand, keine DB-Persistierung), `create-booking.ts`, `create-quote-request.ts`, `create-notification-signup.ts` (DB-Insert + E-Mail) — nutzen `sql` aus `src/lib/db.ts` + `resend` aus `src/lib/resend.ts` direkt (noch keine Service-Schicht); jede Action verifiziert zuerst den Turnstile-Token über `src/lib/turnstile.ts`, bevor verarbeitet wird
- [ ] `revalidatePath` / `redirect` nach den jeweiligen Mutationen
- [x] Status-Messages je Formular im gleichen Verzeichnis wie das jeweilige Formular (`src/components/forms/`): `booking-status-messages.tsx`, `contact-request-status-messages.tsx`, `quote-request-status-messages.tsx`, `notification-signup-status-messages.tsx` (Erfolgs-/Fehlertexte, z. B. "Buchung erfolgreich" / "Fehler beim Senden")
- [x] `ActionStatusModal` nach jedem Formular-Submit eingebunden, nutzt die jeweilige `*-status-messages.tsx` (zeigt Ergebnis der jeweiligen Server Action an)
- [x] `confirm-notification-signup.ts` unter `src/app/actions/` – prüft Token/Gültigkeit, setzt `confirmed_at`, löst Hinweis-Mail aus; wird aus `notifications/[id]/confirm/page.tsx` aufgerufen
- [x] `src/app/notifications/[id]/confirm/page.tsx` reserviert für Double-Opt-In-Bestätigung (Server Component, liest `?token=` aus `searchParams`, keine separate API-Route nötig)
- [x] `confirm-quote-request.ts` unter `src/app/actions/` – prüft Token/Gültigkeit, setzt `confirmed_at`, löst Hinweis-Mail + interne Kopie aus; wird aus `quote-requests/[id]/confirm/page.tsx` aufgerufen
- [x] `src/app/quote-requests/[id]/confirm/page.tsx` – Double-Opt-In-Bestätigung für Quote-Request (analog zu `notifications/[id]/confirm`, Server Component, liest `?token=` aus `searchParams`)
- [x] `generate-secure-token.ts` unter `src/utils/` – `generateSecureToken()`, erzeugt opakes Zufalls-Token via `crypto.randomBytes(32).toString('base64url')` (Node `node:crypto`); genutzt in `create-notification-signup.ts` und `create-quote-request.ts` beim Erstellen des Datensatzes
- [x] Migration: `confirmation_token` in `workshop_benachrichtigung` von `UUID DEFAULT gen_random_uuid()` auf `TEXT` (kein DB-Default) umgestellt – Token wird ab jetzt im Anwendungscode über `generate-secure-token.ts` erzeugt, nicht mehr per DB-Default
- [x] Migration: `angebotsanfrage` um `confirmation_token` (TEXT, kein Default), `confirmation_expires_at`, `confirmed_at` erweitert (Double-Opt-In, gleiches Token-Verfahren wie `workshop_benachrichtigung`)

**Commits:**

```text
feat: Booking-Formular als statisches Grundgerüst ergänzt
feat: booking.schema.ts ergänzt
feat: react-hook-form und zod in Booking-Formular integriert
refactor: label/input im Booking-Formular durch Label, TextField und SelectField ersetzt
refactor: AppointmentSelection, ParticipantStepper und Address-/Kontakt-Fields aus Booking-Formular extrahiert
feat: Zod-Schemas für Kontakt-/Anfrage-, Quote-Request- und Notification-Signup-Formular ergänzt
feat: Kontakt-/Anfrageformular (/anfrage) mit react-hook-form und zod
feat: Quote-Request- mit react-hook-form und zod
feat: Notification-Signup-Formular mit react-hook-form und zod
refactor: Button.tsx als wiederverwendbare Komponente extrahiert (bisher wiederholte className-Strings, z. B. ParticipantStepper +/- Buttons)
feat: Modal-Wrapper für Booking-, Quote-Request- und Notification-Signup-Formular
refactor: TypeScript-Migration - typed interfaces für Formulare
feat: TurnstileWidget-Komponente ergänzt
feat: src/lib/turnstile.ts für Server-seitige Token-Verifizierung
feat: send-contact-request.ts Server Action ergänzt (inkl. Turnstile-Verifizierung)
feat: create-booking.ts Server Action ergänzt (inkl. Turnstile-Verifizierung)
feat: create-quote-request.ts Server Action ergänzt (inkl. Turnstile-Verifizierung)
feat: create-notification-signup.ts Server Action ergänzt (inkl. Turnstile-Verifizierung)
feat: Status-Messages je Formular (*-status-messages.tsx) ergänzt
feat: ActionStatusModal nach Formular-Submits eingebunden
feat: confirm-notification-signup.ts Server Action ergänzt
feat: notificatons/[id]/confirm - Double-Opt-In-Bestätigungsseite für Notification-signup
feat: confirm-quote-request.ts Server Action ergänzt
feat: quote-requests/[id]/confirm - Double-Opt-In-Bestätigungsseite für Quote-Request
feat: generate-secure-token.ts ergänzt - opakes Zufalls-Token statt UUID
feat: confirmation_token in workshop_benachrichtigung auf TEXT umgestellt (kein DB-Default mehr)
feat: confirmation_token, confirmation_expires_at und confirmed_at für Double-Opt-In in angebotsanfrage ergänzt
```

---

## Phase 7 – E-Mail-Versand

- [ ] `src/lib/resend.ts` – Resend-Client-Konfiguration (API-Key, zentrale Instanz)
- [ ] Wiederverwendbare Bausteine unter `src/emails/components/` (z. B. Layout, Header, Footer, Button), um Code-Duplikation zwischen den Templates zu vermeiden

**Checkliste Benachrichtigungen (Templates via React Email):**

- [ ] Kontakt-/Anfrageformular (`/anfrage`) – Bestätigungs-Mail an Kunde
- [ ] Kontakt-/Anfrageformular (`/anfrage`) – interne Kopie
- [ ] Booking – Bestätigungs-Mail an Kunde
- [ ] Booking – interne Kopie
- [ ] Notification-Signup "Neue Termine" – Double-Opt-In Confirmation-Mail (mit Bestätigungslink)
- [ ] Notification-Signup "Neue Termine" – Hinweis-Mail nach Bestätigung (Info: Benachrichtigung bei neuen Terminen aktiv)
- [ ] Integration direkt in `send-contact-request.ts`, `create-booking.ts`, `create-quote-request.ts`, `create-notification-signup.ts` (noch kein `email-service.ts`)
- [ ] Double-Opt-In Confirmation-Mail (Notification-Signup) wird über `src/app/notifications/[id]/confirm/page.tsx` ausgelöst (Hinweis-Mail nach erfolgreicher Bestätigung)
- [ ] Double-Opt-In Confirmation-Mail (Quote-Request) wird über `src/app/quote-requests/[id]/confirm/page.tsx` ausgelöst (Hinweis-Mail + interne Kopie nach erfolgreicher Bestätigung)
- [ ] `package.json` Script für lokale Email-Vorschau:
  
  ```json
  "email:dev": "email dev --dir ./src/emails --port 3001"
  ```

**Commits:**

```text
feat: src/lib/resend.ts für Resend-Client-Konfiguration
feat: wiederverwendbare Email-Bausteine unter src/emails/components ergänzt
feat: Kontakt-/Anfrageformular Bestätigungs-Mail und interne Kopie
feat: Booking Bestätigungs-Mail und interne Kopie
feat: Double-Opt-In Confirmation-Mail für Quote-Request
feat: Hinweis-Mail und interne Kopie nach Bestätigung der Quote-Request
feat: Double-Opt-In Confirmation-Mail für Neue-Termine-Benachrichtigung
feat: Hinweis-Mail nach Bestätigung der Neue-Termine-Benachrichtigung
chore: email:dev Script in package.json ergänzt
```

---

## Phase 7.5 – Repository/Service-Trennung nachziehen (Refactoring)

*(Erst wenn die Anwendung grundlegend läuft: DB-Zugriff aus den Server Actions in eine eigene Abstraktionsschicht extrahieren.)*

- [ ] `src/services/workshop-service.ts` (kapselt `get-workshops`/`get-workshop`)
- [ ] `src/services/booking-service.ts`, `quote-request-service.ts`, `notification-service.ts`
- [ ] `src/services/email-service.ts` (Resend-Wrapper)
- [ ] Server Actions refaktorieren: rufen nur noch Services auf, kein direkter `sql`-Zugriff mehr in `src/app/actions/`
- [ ] Optional: Repository-Schicht darunter, falls Trennung Service/DB-Zugriff zusätzlich sinnvoll erscheint

**Commits:**

```text
refactor: workshop-service.ts eingeführt, get-workshops/get-workshop nutzen Service
refactor: booking-, quote-request- und notification-service.ts eingeführt
refactor: email-service.ts eingeführt, Resend-Aufrufe zentralisiert
refactor: Server Actions greifen nur noch über Services auf Daten zu
```

---

## Phase 8 – Referenzen-Seite

- [ ] Layout-Entscheidung final (Variante 2: Projekt-Tiles mit Themen-Tags)
- [ ] Filterleiste nach Thema (KI, Architektur, Qualität, Trainings)
- [ ] Statische Daten oder DB-Anbindung

**Commits:**

```text
feat: Referenzen-Seite Variante 2 - Projekt-Tiles mit Themen-Tags
feat: Filterleiste nach Thema für Referenzen-Seite
```

---

## Phase 9 – Deployment & Infrastruktur

- [ ] Vercel-Projekt mit GitHub-Repo verknüpft
- [ ] Umgebungsvariablen in Vercel hinterlegt (Neon, Resend)
- [ ] Cloudflare DNS-Records für Vercel-Target konfiguriert
- [ ] Preview-Deployments für Feature-Branches testen

**Commit:**

```text
chore: Vercel-Deployment-Konfiguration ergänzt
```

---

## Phase 10 – Workshop-Seed-Dateien

Eine Seed-Datei pro Workshop unter `database/seeds/workshops/`:

- [ ] `aspnet-core-basics.sql` – ASP.NET Core Basics
- [ ] `cypress-testing.sql` – Cypress Testing
- [ ] `laravel.sql` – Laravel
- [ ] `nestjs.sql` – Nest.js
- [ ] `nextjs-basics.sql` – Next.js Basics
- [ ] `nextjs-advanced.sql` – Next.js Advanced
- [ ] `react-basics.sql` – React Basics
- [ ] `react-advanced.sql` – React Advanced
- [ ] `quasar-framework.sql` – Quasar Framework
- [ ] `storybook.sql` – Storybook
- [ ] `vuejs-basics.sql` – Vue.js Basics
- [ ] `vuejs-advanced.sql` – Vue.js Advanced

**Commits:**

```text
feat: Seed-Datei aspnet-core-basics.sql ergänzt
feat: Seed-Datei cypress-testing.sql ergänzt
feat: Seed-Datei laravel.sql ergänzt
feat: Seed-Datei nestjs.sql ergänzt
feat: Seed-Datei nextjs-basics.sql ergänzt
feat: Seed-Datei nextjs-advanced.sql ergänzt
feat: Seed-Datei react-basics.sql ergänzt
feat: Seed-Datei react-advanced.sql ergänzt
feat: Seed-Datei quasar-framework.sql ergänzt
feat: Seed-Datei storybook.sql ergänzt
feat: Seed-Datei vuejs-basics.sql ergänzt
feat: Seed-Datei vuejs-advanced.sql ergänzt
```

*Alternativ: alle 12 in einem Commit (`feat: Seed-Dateien für alle Workshops ergänzt`), falls dir 12 Einzel-Commits zu granular sind.*

---

## Phase 11 – Testing

*(Fokus auf E2E, da die Anwendung überwiegend aus Seiten & Formularen besteht, nicht aus komplexer Business-Logik. Ergänzend gezielte Unit-Tests für Schemas, Utils und Preisberechnung.)*

- [ ] Cypress Setup
- [ ] `.env.test` mit Turnstile-Test-Keys (garantiert bestehend, für automatisierte Test-Suiten):
  
  ```text
  TURNSTILE_SITEKEY=1x00000000000000000000AA
  TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
  ```

**E2E-Testszenarien (Cypress):**

- [ ] Navigation & MobileMenu
- [ ] Workshop-Liste auf Startseite rendert korrekt
- [ ] WorkshopDetailPage rendert korrekt (Details + Sidebar)
- [ ] Kontakt-/Anfrageformular (`/anfrage`): Happy Path + Validierungsfehler
- [ ] Booking-Formular: Happy Path (inkl. AppointmentSelection, ParticipantStepper, Adress-Sections) + Validierungsfehler
- [ ] Quote-Request-Formular: Happy Path + Validierungsfehler + Double-Opt-In-Bestätigungslink (`/quote-requests/[id]/confirm?token=...`)
- [ ] Notification-Signup: Happy Path + Double-Opt-In-Bestätigungslink (`/notifications/[id]/confirm?token=...`)
- [ ] `ActionStatusModal` zeigt Erfolg/Fehler korrekt an
- [ ] Rechtsseiten (Impressum, Datenschutz, AGB) erreichbar

**Ergänzende Unit-Tests:**

- [ ] Zod-Schemas (Validierungs-Grenzfälle je Formular)
- [ ] `format-date.ts`, `format-price.ts`, `format-termin-status.ts`
- [ ] Preisberechnung (`Preis × Teilnehmerzahl`)

**Commits:**

```text
chore: Cypress Setup
chore: Turnstile Test-Keys für .env.test ergänzt
test: E2E-Test Navigation & MobileMenu
test: E2E-Test Workshop-Liste und WorkshopDetailPage
test: E2E-Test Kontakt-/Anfrageformular
test: E2E-Test Booking-Formular
test: E2E-Test Quote-Request-Formular inkl. Double-Opt-In
test: E2E-Test Notification-Signup inkl. Double-Opt-In
test: E2E-Test ActionStatusModal
test: E2E-Test Rechtsseiten
test: Unit-Tests für Zod-Schemas
test: Unit-Tests für format-date, format-price, format-termin-status
test: Unit-Test für Preisberechnung
```

*Hinweis: Integration-Tests werden bewusst nicht als eigene Ebene eingeführt, solange die Repository/Service-Trennung fehlt (Phase 7.5) – aktuell würde das dieselbe Fläche wie die E2E-Tests abdecken.*

---

## Phase 12 – Storybook

*(Zeitlich unabhängig von der festen Phasen-Reihenfolge – frühestens sinnvoll, sobald genug wiederverwendbare Komponenten existieren, also ab Phase 5/6: Modal-Basis + Field-Sections. Ergänzt die `DesignSystemPage` aus Phase 0, ersetzt sie nicht: DesignSystemPage = Design-Tokens, Storybook = Komponenten-Katalog mit Props/States.)*

- [ ] Storybook Setup (inkl. Tailwind-Integration)
- [ ] Stories für Basis-Komponenten: `Modal`, `ActionStatusModal`
- [ ] Stories für Field-Sections: `AppointmentSelection`, `ParticipantStepper`, `CompanyAddressFields`, `ContactPersonFields`, `BillingAddressFields`
- [ ] Stories für Layout-Komponenten: `Header`, `Footer`, `MobileMenu`, `HamburgerButton`
- [ ] Stories für `WorkshopCard`

**Commits:**

```text
chore: Storybook Setup inkl. Tailwind-Integration
feat: Stories für Modal und ActionStatusModal
feat: Stories für Field-Sections (AppointmentSelection, ParticipantStepper, Address-/Kontakt-Fields)
feat: Stories für Header, Footer, MobileMenu, HamburgerButton
feat: Stories für WorkshopCard
```

---

## Offene Entscheidungen

- Filterleiste vs. Hybrid-Ansatz (Client/Projekt) für Referenzen-Seite

## Zukünftig geplant (noch nicht terminiert)

- **Gutscheincodes** – Datenmodell in der DB (nicht als Seed, da Laufzeitdaten):
  - `code` (Gutschein-Code)
  - `value` (Wert)
  - `type` (`percent` | `fixed`)
  - Gültigkeitsdauer (z. B. `valid_from`/`valid_until`)
  - Einlösung fließt in die Gesamtpreis-Berechnung (`Preis × Teilnehmerzahl`) mit ein

- **Zusätzliche Trainer pro Workshop** – aktuell hat `workshop.trainer_id` genau einen Haupttrainer (1:n). Falls später mehrere Trainer pro Workshop nötig werden: `workshop_trainers` Join-Tabelle für zusätzliche Trainer *neben* dem Haupttrainer (Haupttrainer bleibt über `trainer_id`)

## Architektur-Entscheidungen (geklärt)

- Workshop-Verwaltung erfolgt direkt in Neon, nicht über die App → keine Create/Update/Delete-Actions für Workshops nötig
- Booking, Quote-Request und Notification-Signup werden alle in der DB persistiert und lösen zusätzlich einen E-Mail-Versand aus
- Repository/Service-Trennung wird zu Beginn bewusst weggelassen (Server Actions greifen direkt auf Neon/Resend zu); wird als Refactoring-Schritt (Phase 7.5) nachgezogen, sobald die Anwendung läuft

---

## Git-Workflow-Hinweise

- **Ein Commit = eine logische Änderung** (leichteres Rollback)
- Für größere Features: eigener Branch (`feature/referenzen-seite`), PR gegen `main`
- Nach jedem Phase-Schritt: `git add`, `git commit -m "..."`, `git push`
- **Roadmap-Anpassungen während der Umsetzung:**
  - **Nur Häkchen setzen** (Todo erledigt, Plan unverändert) → zusammen mit dem jeweiligen Code-Commit, keine separate Roadmap-Änderung/Historie-Zeile nötig
  - **Neuer Punkt/Todo ergänzt oder Plan geändert** → eigener `docs`-Commit, referenziert die neue Version aus der Änderungshistorie:
  
    ```text
    docs: Roadmap Phase 6 angepasst - ... [vX.Y]
    docs: Roadmap korrigiert - Ist-Stand weicht ab: ... [vX.Y]
    ```

    Dabei immer auch eine neue Zeile in der Änderungshistorie ergänzen (Version hochzählen nach Major.Minor-Schema)

**Conventional Commits – Übersicht:**

| Typ | Bedeutung |
| --- | --- |
| `feat` | Neue Funktionalität (Komponente, Server Action, Seite, Feature) |
| `fix` | Fehlerbehebung an bestehender Funktionalität |
| `refactor` | Code-Umstrukturierung ohne Verhaltensänderung (z. B. Extrahieren von Komponenten, Umbenennungen) |
| `test` | Neue oder angepasste Tests (Cypress E2E, Unit-Tests) ohne Änderung an Anwendungscode |
| `style` | Reine Code-Formatierung ohne Verhaltensänderung (Einrückung, Prettier-Durchlauf) – **nicht** für CSS/Tailwind-Änderungen, siehe Hinweis unten |
| `chore` | Wartungsarbeiten ohne Auswirkung auf Anwendungscode (Setup, Dependencies, Scripts, Config) |
| `docs` | Änderungen an Dokumentation (README, ROADMAP, Kommentare) |

*Häufige Verwechslung: `style` ist Code-Formatierung, nicht visuelles CSS/Tailwind-Styling. CSS-Änderungen gehören zu `feat` (neue visuelle Behandlung), `fix` (visueller Bug) oder `refactor` (Tailwind-Klassen aufgeräumt, kein sichtbarer Unterschied).*

**Naming Conventions (Next.js/React) – Übersicht:**

| Konvention | Verwendung | Beispiel |
| --- | --- | --- |
| kebab-case | Dateinamen | `get-workshop.ts`, `format-date.ts`, `create-booking.ts` |
| `type.schema.ts` | Zod-Schema-Dateiname (Sonderfall von kebab-case) | `booking.schema.ts`, `contact-request.schema.ts` |
| PascalCase | Funktionale Komponenten, Type-/Interface-Namen | `WorkshopCard`, `ModalProvider`, `BookingFormValues` |
| camelCase | Funktions-/Methodennamen, Variablen | `getWorkshops()`, `verifyTurnstileToken()`, `isLoading` |

---

## pnpm – Übersicht der wichtigsten Befehle

*Wichtigster Unterschied zu npm: `pnpm install` (ohne Argument) installiert nur aus dem Lockfile – zum Hinzufügen eines neuen Pakets brauchst du `pnpm add`, nicht `pnpm install <pkg>`.*

| Befehl | Zweck | Beispiel | npm-Äquivalent |
| --- | --- | --- | --- |
| `pnpm install` | Alle Abhängigkeiten aus `package.json`/Lockfile installieren | `pnpm install` | `npm install` |
| `pnpm add <pkg>` | Neue Dependency hinzufügen | `pnpm add zod` | `npm install zod` |
| `pnpm add -D <pkg>` | Neue devDependency hinzufügen | `pnpm add -D vitest` | `npm install -D vitest` |
| `pnpm remove <pkg>` | Dependency entfernen | `pnpm remove zod` | `npm uninstall zod` |
| `pnpm update` | Abhängigkeiten aktualisieren (im Rahmen von semver) | `pnpm update` | `npm update` |
| `pnpm up --latest` | Abhängigkeiten auf neueste Version aktualisieren (auch major) | `pnpm up --latest` | `npm-check-updates` nötig |
| `pnpm <script>` | Script aus `package.json` ausführen (`run` ist optional) | `pnpm dev`, `pnpm build` | `npm run dev` |
| `pnpm dlx <pkg>` | Paket einmalig ausführen, ohne zu installieren | `pnpm dlx create-next-app@latest` | `npx create-next-app@latest` |
| `pnpm list` | Installierte Pakete anzeigen | `pnpm list` | `npm list` |
| `pnpm outdated` | Veraltete Abhängigkeiten anzeigen | `pnpm outdated` | `npm outdated` |
| `pnpm why <pkg>` | Zeigt, warum ein Paket installiert ist (Abhängigkeitskette) | `pnpm why react` | `npm ls react` |

---

## Änderungshistorie

| Datum | Version | Autor | Änderung |
| --- | --- | --- | --- |
| 2026-07-31 | 1.0 | *Manuel Kübler* | Erstversion der Roadmap auf Basis der bestehenden README: Grundgerüst Phasen 0–9 (Setup, Datenmodell, Layout, Workshop-Übersicht, Modal-Basis, Formulare, E-Mail-Versand, Referenzen, Deployment) |
| 2026-08-01 | 1.1 | *Manuel Kübler* | Fehlende Seiten ergänzt: Impressum/Datenschutz/AGB, Startseite, WorkshopList/WorkshopCard, Header/Footer, WorkshopDetailPage mit WorkshopDetails/WorkshopSidebar, Modal-Basis vor den Formularen vorgezogen |
| 2026-08-02 | 1.2 | *Manuel Kübler* | `src/`-Verzeichnisstruktur korrigiert (Migrations/Seeds in `database/` statt `src/`) |
| 2026-08-02 | 1.3 | *Manuel Kübler* | `utils/` von `services/` abgegrenzt (`format-date.ts`, `format-price.ts`) |
| 2026-08-02 | 1.4 | *Manuel Kübler* | Server Actions auf One-Function-per-File umgestellt; Double-Opt-In-Bestätigung als separate Route reserviert |
| 2026-08-02 | 1.5 | *Manuel Kübler* | Workshop-Verwaltung direkt in Neon geklärt (keine Create/Update/Delete-Actions); Booking, Quote-Request, Notification-Signup als DB-Schreibpfade festgelegt |
| 2026-08-02 | 1.6 | *Manuel Kübler* | Repository/Service-Trennung zu Projektbeginn bewusst weggelassen; Phase 7.5 als späterer Refactoring-Schritt ergänzt |
| 2026-08-02 | 1.7 | *Manuel Kübler* | Abhängigkeiten-Liste, `email:dev`-Script ergänzt; Phase „Rechtliches" zwischen Layout und Workshop-Übersicht verschoben |
| 2026-08-03 | 1.8 | *Manuel Kübler* | Startseiten-Sections sowie Header/Footer/DesktopNavbar/MobileMenu/HamburgerButton nach `src/app/_components/` verschoben |
| 2026-08-03 | 1.9 | *Manuel Kübler* | `WorkshopList`/`WorkshopCard` nach `_components`, `WorkshopDetails`/`WorkshopSidebar` nach lokalem `_components` unter `workshops/[slug]` verschoben |
| 2026-08-03 | 1.10 | *Manuel Kübler* | Modal-System auf `createPortal` umgestellt; `components/modals/`, `components/forms/shared/` strukturiert |
| 2026-08-03 | 1.11 | *Manuel Kübler* | `src/lib/` eingeführt (`db.ts`, `resend.ts`, später `turnstile.ts`) |
| 2026-08-03 | 1.12 | *Manuel Kübler* | Phase 10 (Workshop-Seeds) ergänzt; `MobileMenu` in Phase 2 nachgetragen; Verzeichnisbaum in Phase 0 ergänzt |
| 2026-08-03 | 1.13 | *Manuel Kübler* | Cloudflare Turnstile (`nextjs-turnstile`) für alle Formulare integriert |
| 2026-08-03 | 1.14 | *Manuel Kübler* | Zod-Schemas unter `src/schemas/` eingeführt, Formular-Typen per `z.infer` abgeleitet statt manuell gepflegt |
| 2026-08-03 | 1.15 | *Manuel Kübler* | Formular-Reihenfolge umgestellt: Booking-Formular zuerst gebaut, Field-Sections danach extrahiert (extract-as-you-go) |
| 2026-08-04 | 1.16 | *Manuel Kübler* | `ActionStatusModal` ergänzt; Gutscheincodes als zukünftiges Feature dokumentiert |
| 2026-08-04 | 1.17 | *Manuel Kübler* | Naming vereinheitlicht: `fields/` → `shared/`, Schema-Dateien auf `type.schema.ts` |
| 2026-08-04 | 1.18 | *Manuel Kübler* | Conventional-Commits-Tabelle ergänzt |
| 2026-08-05 | 1.19 | *Manuel Kübler* | Phase 1 anhand des tatsächlichen DB-Schemas aktualisiert; Trainer-Datenmodell geklärt (`trainer_id` = Haupttrainer) |
| 2026-08-06 | 1.20 | *Manuel Kübler* | `src/providers/` mit `ModalProvider` (React Context direkt integriert, kein separater `ModalContext`) |
| 2026-08-06 | 1.21 | *Manuel Kübler* | Naming-Conventions-Tabelle ergänzt |
| 2026-08-06 | 1.22 | *Manuel Kübler* | Status-Messages auf `*-status-messages.tsx`; `format-termin-status.ts` mit den vier konkreten Status |
| 2026-08-07 | 1.23 | *Manuel Kübler* | Design-Guidelines ergänzt |
| 2026-08-07 | 1.24 | *Manuel Kübler* | Design-Tokens korrigiert; `DesignSystemPage` |
| 2026-08-08 | 1.25 | *Manuel Kübler* | Phase 12 (Storybook) ergänzt |
| 2026-08-08 | 1.26 | *Manuel Kübler* | pnpm-Befehlsübersicht ergänzt; README.md auf aktuellen Roadmap-Stand gebracht |
| 2026-08-08 | 1.27 | *Manuel Kübler* | README: Next.js 16, Rückrufservice entfernt, Lizenz auf „All Rights Reserved" festgelegt, Route Handler entfernt |
| 2026-08-08 | 2.0 | *Manuel Kübler* | Double-Opt-In-Bestätigung von API-Route auf Page-Route (`/notifications/[id]/confirm`) umgestellt; Kontakt- und Anfrageformular zu einem Formular (`contact-request`, `/anfrage`) zusammengeführt |
| 2026-08-08 | 2.1 | *Manuel Kübler* | Versionierungsschema (Major.Minor) für diese Änderungshistorie definiert |
| 2026-08-08 | 2.2 | *Manuel Kübler* | Conventional-Commits-Typen `test` und `style` ergänzt; Phase-11-Test-Commits von `feat` auf `test` umgestellt |
| 2026-08-08 | 2.3 | *Manuel Kübler* | `style` als reine Code-Formatierung präzisiert (nicht CSS/Tailwind); Klassifizierung für visuelle Änderungen (`feat`/`fix`/`refactor`) ergänzt |
| 2026-08-08 | 2.4 | *Manuel Kübler* | Startseiten-Sections in eigenes `src/app/_components/sections/`-Unterverzeichnis verschoben |
| 2026-08-08 | 2.5 | *Manuel Kübler* | `WorkshopList`/`WorkshopCard` konsequent ebenfalls nach `_components/sections/` verschoben, da `WorkshopList` selbst eine Startseiten-Section ist |
| 2026-08-09 | 2.6 | *Manuel Kübler* | `BackToTopButton`-Komponente in Phase 2 ergänzt (`src/app/_components/`, global im Root Layout) |
| 2026-08-09 | 2.7 | *Manuel Kübler* | Phase 3 um Error-Pages erweitert (`not-found.tsx`, `error.tsx`, `global-error.tsx`), Phase umbenannt in „Rechtliches & Error-Pages" |
| 2026-08-09 | 2.8 | *Manuel Kübler* | `format-date-range.ts` als neue Utility für `WorkshopCard` in Phase 4 ergänzt |
| 2026-08-11 | 2.9 | *Manuel Kübler* | Booking-Schema von Anfang an mit wiederverwendbaren Teil-Schemas unter `src/schemas/shared/` geplant (`address`, `contact-person`, `teilnehmer`, `termin`), kein nachträglicher Split |
| 2026-08-11 | 2.10 | *Manuel Kübler* | `Label`, `TextField`, `SelectField` als Refactor-Schritt vor der Field-Section-Extraktion in Phase 6 ergänzt |
| 2026-08-11 | 2.11 | *Manuel Kübler* | `DateStep` in `AppointmentSelection` umbenannt (kein Multistep-Wizard, Name suggerierte das fälschlich) |
| 2026-08-12 | 2.12 | *Manuel Kübler* | `src/components/ui/` als neues Verzeichnis für generische UI-Primitive ergänzt (`Button`, `Card`) |
| 2026-08-12 | 2.13 | *Manuel Kübler* | `isSameDay` als zusätzlicher Export in `format-date-range.ts` ergänzt (Phase 4) |
| 2026-08-12 | 2.14 | *Manuel Kübler* | Quote-Request um Double-Opt-In-Flow erweitert (`src/app/quote-requests/[id]/confirm/page.tsx`, E-Mail-Checkliste in Phase 7 angepasst) |
| 2026-08-13 | 2.15 | *Manuel Kübler* | `confirm-notification-signup.ts` und `confirm-quote-request.ts` Server Actions in Phase 6 ergänzt |
| 2026-08-13 | 2.16 | *Manuel Kübler* | `confirmation_token` von UUID (`gen_random_uuid()`) auf opakes Zufalls-Token (TEXT, anwendungsseitig via `generate-secure-token.ts` erzeugt) umgestellt, betrifft `workshop_benachrichtigung` und `angebotsanfrage` |

**Versionierung – Major.Minor (kein SemVer-Patch-Level, da kein "Breaking Change"-Konzept für eine Roadmap sinnvoll ist):**

- **Major** (1.x → 2.x): strukturelle Überarbeitung – Phasen umsortiert/umbenannt, Architektur-Entscheidung gekippt, Formulare zusammengeführt/aufgeteilt, Routen-Konzept geändert
- **Minor** (x.1, x.2, ...): Ergänzung/Korrektur innerhalb der bestehenden Struktur – neue Komponente, Datei umbenannt, Tabelle ergänzt, Kommentar präzisiert

*Ab jetzt bei jeder inhaltlichen Änderung eine neue Zeile ergänzen. Kleine Formulierungs-/Tippfehler-Korrekturen müssen nicht zwingend erfasst werden.*
