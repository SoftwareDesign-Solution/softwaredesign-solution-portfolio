@AGENTS.md

# CLAUDE.md – softwaredesign-solution-portfolio

Online-Portfolio und Workshop-Plattform von Manuel Kübler (SoftwareDesign-Solution), live unter softwaredesign-solution.de.
Ausführliche Planung, Architektur-Entscheidungen und Konventionen: `ROADMAP.md`. Überblick: `README.md`.

> **Das Repository ist öffentlich.** Keine Secrets, keine echten Kunden- oder Personendaten in Code, Seeds, Tests oder Commits.

## Stack

Next.js 16 (App Router, React Compiler) · React 19 · TypeScript (strict) · Tailwind CSS 4 · React Hook Form + Zod 4 · Neon PostgreSQL (`@neondatabase/serverless`, rohes SQL, kein ORM) · React Email + Resend · Cloudflare Turnstile · Cypress · pnpm

Next.js 16 weicht von älterem Wissen ab: vor Änderungen an Routing, Caching, Server Actions o. Ä. die Doku unter `node_modules/next/dist/docs/` lesen (siehe AGENTS.md).

## Befehle

```bash
pnpm dev                    # Dev-Server auf http://localhost:3000
pnpm build                  # Produktions-Build (auch als Typecheck nutzbar)
pnpm lint                   # ESLint inkl. perfectionist-Import-Sortierung
pnpm exec tsc --noEmit      # reiner Typecheck
pnpm email:dev              # E-Mail-Vorschau auf Port 3001
pnpm test:e2e               # Dev-Server + Cypress (interaktiv, mit .env.test)
pnpm dotenv -e .env.test -- cypress run --spec cypress/e2e/<datei>.cy.ts   # headless, Dev-Server muss laufen
```

- Pakete immer mit `pnpm add` / `pnpm add -D` hinzufügen, nie npm oder yarn.
- Nach jeder Code-Änderung: `pnpm lint` und `pnpm exec tsc --noEmit` müssen grün sein.

## Projektstruktur (Kurzfassung)

| Pfad | Inhalt |
| --- | --- |
| `src/app/_components/` | Nur im Root Layout / auf der Startseite genutzt (Header, Footer, Navigation, `sections/`) |
| `src/app/<route>/_components/` | Nur auf dieser Route genutzt (z. B. `workshops/[slug]/_components/`) |
| `src/app/actions/` | Server Actions, **eine exportierte Funktion pro Datei** |
| `src/app/(confirmation)/` | Double-Opt-In-Seiten (`notifications/[id]/…`, `offer-requests/[id]/confirm`) |
| `src/components/ui/` | Generische UI-Primitive (`Button`, `Badge`) |
| `src/components/modals/` | `Modal`, `ActionStatusModal`, `*-modal.tsx`-Wrapper; gesteuert über `providers/modal-provider.tsx` |
| `src/components/forms/<formular>/` | `<formular>-form.tsx`, `-form-default-values.ts`, `-form-status-messages.tsx` |
| `src/components/forms/shared/` | Gemeinsame Felder und `sections/` (Adresse, Ansprechpartner, Termin, Teilnehmer, Consent, Summary …) |
| `src/schemas/` | Zod-Schemas `<name>.schema.ts`, Bausteine in `shared/` |
| `src/emails/` | React-Email-Templates, Bausteine in `components/` |
| `src/services/emails/` | `send-*.tsx` – je eine Versandfunktion über Resend |
| `src/lib/` | `db.ts` (Neon-Client `db`), `resend.ts`, `turnstile.ts`, `get-client-ip.ts` |
| `src/data/referenzen.ts` | Statische Daten der Referenzen-Seite (Typen in `types/referenz.ts`) |
| `database/migrations/` | Nummerierte SQL-Migrationen `NNN_beschreibung.sql` |
| `database/seeds/workshops/` | Eine Seed-Datei pro Workshop (`<slug>.sql`) |

Eine Komponente wandert erst dann von `_components/` nach `src/components/`, wenn sie an mehr als einer Stelle gebraucht wird.

## Architektur-Regeln

- **Lesen** in Server Components bzw. Read-Actions (`get-workshops.ts`, `get-workshop.ts`), **Schreiben** nur über Server Actions.
- Workshops, Termine und Trainer werden **direkt in Neon gepflegt** – keine Create/Update/Delete-Actions oder Admin-UI dafür in diesem Repo.
- Ablauf einer schreibenden Server Action (Vorbild: `create-quote-request.ts`):
  1. `"use server"` · Eingabe mit Zod `safeParse` serverseitig erneut validieren
  2. `verifyTurnstileToken()` – ohne gültiges Token keine Verarbeitung
  3. Preis, Workshop- und Termin-Verfügbarkeit **frisch aus der DB laden**, nie vom Client übernehmen
  4. In die DB schreiben (bei Double-Opt-In mit `generateSecureToken()`)
  5. E-Mail über `src/services/emails/` versenden; ein Versandfehler darf den gespeicherten Datensatz nicht verwerfen
- SQL immer über den Tagged Template `` db`…` `` (parametrisiert). String-Konkatenation mit Nutzereingaben ist tabu.
- Repository/Service-Trennung ist bewusst noch nicht umgesetzt (ROADMAP Phase 7.5) – nicht ungefragt einführen.
- Schema-Änderungen nur als **neue** Migrationsdatei mit der nächsten freien Nummer, bestehende Migrationen nicht ändern. Migrationen und Seeds nie selbst gegen eine Datenbank ausführen – Manuel führt sie in Neon aus.

## Code-Konventionen

- Dateinamen kebab-case; Zod-Schemas `name.schema.ts`; Komponenten und Typen PascalCase; Funktionen und Variablen camelCase.
- Technische Bezeichner auf Englisch (`createQuoteRequest`, `QuoteRequestForm`), fachliche Felder und DB-Spalten auf Deutsch (`termin`, `teilnehmerzahl`, `ansprechpartner`, `datumVon`). DB-Spalten snake_case, im SQL per `AS "camelCase"` aliasen.
- Jede Datei beginnt mit einem JSDoc-Header:
  ```ts
  /**
   * @file dateiname.ts
   * @description Was die Datei macht.
   * @module pfad/ohne/src
   * @author Manuel Kübler <mail@softwaredesign-solution.de>
   */
  ```
  Exportierte Funktionen, Typen und Props bekommen JSDoc; Kommentare auf Deutsch und erklären das *Warum*.
- Imports werden von `eslint-plugin-perfectionist` sortiert (Typ-Imports zuerst, dann extern, dann `@/…`, dann relativ) – `pnpm lint --fix` statt manuell sortieren.
- Interne Imports über den Alias `@/` statt langer relativer Pfade.
- Texte für Besucher in **Sie-Form**, Workshop-Inhalte (Beschreibung, Zielgruppe, Lernziele) in **Du-Form**. Fehlermeldungen für Nutzer auf Deutsch, `console.error`-Logs dürfen englisch sein.

## Styling

- Tailwind CSS 4, Design-Tokens im `@theme`-Block von `src/app/globals.css`. Immer die Tokens nutzen: `primary-*`, `surface`, `foreground`, `muted`, `border`, `border-strong`, `error-*`, `success-*`, `warning-*` – keine rohen `neutral-*`/`gray-*`/Hex-Werte.
- Neue Farben erst als Token in `globals.css` ergänzen und in `src/app/design-system/page.tsx` sichtbar machen.
- Für mobile Formular-Anpassungen gibt es die Variante `mobile-form:` (greift unter 768 px innerhalb eines `.mobile-form`-Containers).
- Buttons immer über `@/components/ui/button` (Varianten `primary`, `secondary`, `dark`, `muted`, `outline`, `dashed`).

## Tests

- E2E mit Cypress in `cypress/e2e/<bereich>.cy.ts`; wiederkehrende Abläufe als Custom Commands in `cypress/support/commands.ts` (`acceptConsent`, `completeTurnstile`, `fillAddressFields`, `selectTerminByStatus` …), Testdaten über `cypress/utils/create-test-*.ts`.
- DB-Zugriffe aus Tests nur als Task in `cypress.config.ts` (z. B. Token für Double-Opt-In auslesen).
- `.env.test` nutzt die Turnstile-Test-Keys und die Test-Datenbank. Neue oder geänderte Formulare bekommen einen E2E-Test für Happy Path und Validierungsfehler.

## Git

- Conventional Commits **mit Scope und deutscher Beschreibung**, max. 72 Zeichen, z. B. `feat(workshops): Tag-Filter für Workshop-Übersicht ergänzt`. Details, Scopes und Aufteilung: Skill `commit-message`. Die Commit-Zeilen in der ROADMAP (ohne Scope) sind Planungsnotizen. `style` = nur Formatierung, CSS/Tailwind-Änderungen sind `feat`/`fix`/`refactor`.
- Ein Commit = eine logische Änderung. Größere Features auf `feature/<name>`-Branch.
- ROADMAP: erledigte Häkchen im selben Commit wie der Code; neue oder geänderte Punkte als eigener `docs`-Commit mit neuer Zeile in der Änderungshistorie (Version hochzählen).
- Nur committen oder pushen, wenn Manuel es ausdrücklich sagt.

## Tabu ohne Rückfrage

- `.env`, `.env.test` und andere `.env*`-Dateien lesen, ausgeben oder ändern
- Bestehende Migrationen ändern, SQL gegen eine echte Datenbank ausführen
- Rechtstexte (`impressum`, `datenschutz`, `agb`) inhaltlich ändern
- Entwurfsdateien wie `src/app/referenzen/page2.tsx` / `page3.tsx` löschen
- Neue Abhängigkeiten hinzufügen
