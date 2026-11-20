---
name: e2e-test
description: Schreibt Cypress-E2E-Tests für eine neu programmierte oder geänderte Funktion im Portfolio-Repo, z. B. "Schreib einen E2E-Test für den Tag-Filter" oder "Teste das neue Feld im Angebotsformular".
---

# E2E-Test für eine neue Funktion

Ziel: Die Funktion, die Manuel gerade programmiert hat, so testen, wie ein Besucher sie benutzt, im Stil der vorhandenen Specs unter `cypress/e2e/`.

## 1. Verstehen, was neu ist

1. Nennt Manuel die Funktion nicht genau, ermittle sie aus `git status` und `git diff` (bzw. `git diff main...HEAD` auf einem Feature-Branch). Ist danach unklar, was getestet werden soll, frag einmal nach.
2. Lies die geänderten Dateien und alles, was das sichtbare Verhalten bestimmt:
   - die Komponente bzw. Seite und ihre Route (wo erreicht man die Funktion?)
   - bei Formularen: das Zod-Schema in `src/schemas/` (**exakte** Fehlermeldungen), `*-form-status-messages.tsx` (Texte im Erfolgs-/Fehler-Modal), `*-form-default-values.ts`
   - die Server Action in `src/app/actions/` (was wird gespeichert, gibt es einen Double-Opt-In-Token?)
3. Schreib dir eine kurze Liste der Verhaltensweisen, die ein Besucher sieht. Daraus werden die `it`-Blöcke.

## 2. Neue Spec oder bestehende erweitern

Gehört die Funktion zu einem Bereich mit vorhandener Spec, erweitere diese um einen neuen `describe`-Block:

| Bereich | Spec |
| --- | --- |
| Header, Navigation, MobileMenu | `navigation.cy.ts` |
| Workshop-Kacheln, Tag-Filter auf der Startseite | `workshop-list.cy.ts` |
| Workshop-Detailseite | `workshop-detail-page.cy.ts` |
| Buchung | `booking-form.cy.ts` |
| Angebotsanfrage | `quote-request-form.cy.ts` |
| Termin-Benachrichtigung | `notification-signup.cy.ts` |
| Kontaktformular `/anfrage` | `contact-request-form.cy.ts` |
| Erfolg-/Fehler-Modal | `action-status-modal.cy.ts` |
| Impressum, Datenschutz, AGB | `legal-pages.cy.ts` |

Für einen neuen Bereich (z. B. Referenz-Detailseiten) eine neue Datei `cypress/e2e/<bereich>.cy.ts` in kebab-case anlegen.

## 3. Welche Fälle

Pro Funktion so viele wie sinnvoll, mindestens Happy Path:

- **Rendert:** Die Funktion ist an der erwarteten Stelle sichtbar und zeigt die erwarteten Inhalte.
- **Happy Path:** Der Hauptablauf funktioniert durchgehend bis zur sichtbaren Bestätigung.
- **Validierung** (bei Formularen): leerer Submit zeigt die Zod-Meldungen; mindestens ein ungültiger Wert (z. B. E-Mail). Meldungen wörtlich aus dem Schema übernehmen.
- **Double-Opt-In** (wenn die Action einen `confirmation_token` speichert): Datensatz per Task finden, Token lesen, Bestätigungs-URL besuchen, „bestätigt“-Seite prüfen; Link ein zweites Mal öffnen; ungültiger Token zeigt „Nicht gefunden“.
- **Grenzfälle**, die die Funktion selbst einführt, z. B. Workshop ohne Termine, Filter ohne Treffer, „Termin nach Absprache“.
- **Mobil**, wenn die Änderung Layout unter 768 px betrifft (`mobile-form:`, MobileMenu): eigener `describe` mit `cy.viewport(390, 844)`.

Nicht testen: reines Styling, Implementierungsdetails (State, Hooks), was andere Specs schon abdecken.

## 4. Konventionen im Code

```ts
/**
 * E2E: <Bereich> — <was abgedeckt ist>.
 */

import { createTestContactPerson } from "../utils/create-test-contactperson";

describe('<Bereich>', () => {

    beforeEach(() => {
        cy.viewport(1280, 1400);
        cy.visit('/workshops/ux-design-grundlagen');
    });

    it('<beschreibt das sichtbare Verhalten auf Deutsch>', () => {
        // …
    });

});
```

- `describe`/`it`-Texte und Kommentare auf Deutsch; der `it`-Text beschreibt, was der Besucher sieht.
- **Selektoren**, in dieser Reihenfolge:
  1. Formularfelder über das `name`-Attribut, das React Hook Form aus dem Schema-Pfad setzt: `[name="ansprechpartner.email"]`
  2. Rollen und ARIA: `[role="dialog"]`, `button[aria-label="Schließen"]`
  3. Sichtbarer Text: `cy.contains('button', 'Angebot anfordern')`, Bereiche wie `aside`, `header`, `footer`, `#workshops`
  4. Keine `data-cy`-Attribute einführen. Tailwind-Klassen nur, wenn die Farbe selbst die Aussage ist (`.bg-success-500` für Erfolg).
- Innerhalb von Modals mit `cy.get('[role="dialog"]').within(() => { … })` arbeiten.
- Vorhandene Custom Commands nutzen statt Felder einzeln zu füllen: `fillAddressFields(prefix, address)`, `fillContactPerson(prefix, person)`, `fillParticipant(index, participant)`, `setParticipantCount(n)`, `selectTerminByStatus('verfuegbar' | 'restplaetze' | 'ausgebucht')`, `acceptConsent()`, `completeTurnstile()`.
- Ein Ablauf, der in mehreren Specs vorkommt, wird ein neuer Command in `cypress/support/commands.ts` – inklusive Eintrag im `declare global`-Block.
- **Testdaten** nur über `cypress/utils/create-test-*.ts` und `uniqueEmail('<präfix>')` (Domain `@e2e-fixtures.test`). Keine echten Namen, Firmen oder Adressen – das Repo ist öffentlich. Neue Testdaten-Typen in `cypress/types/test-*.ts`.
- **Fixtures** in der Test-DB:
  - `ux-design-grundlagen`: Workshop mit genau einem Termin pro Status
  - `cypress-testing`: Workshop ohne Termine
  Braucht der Test andere Daten, beschreib Manuel, welchen Seed er in die Test-DB einspielen muss – nicht selbst gegen die DB ausführen.
- Nach einem Submit auf die Server Action warten mit `{ timeout: 20000 }` auf den ersten erwarteten Text, statt `cy.wait(ms)`.
- **DB-Prüfungen** nur über `cy.task`. Neue Tasks in `setupNodeEvents` in `cypress.config.ts` ergänzen (dort sind die aktiven Tasks registriert), parametrisiert über den `sql`-Tagged-Template, Spalten per `AS "camelCase"` aliasen, Rückgabetyp aus `cypress/types/`.
- `cy.intercept` nur, wenn ein Fehlerzustand sonst nicht deterministisch herstellbar ist, und dann begründen wie in `action-status-modal.cy.ts`.

## 5. Ausführen und nachbessern

1. Der Dev-Server muss mit `.env.test` laufen (Turnstile-Test-Keys, Test-DB). Läuft er nicht und kannst du ihn nicht starten, bitte Manuel, `pnpm dotenv -e .env.test -- next dev` zu starten.
2. Nur die betroffene Spec headless ausführen:
   ```bash
   pnpm dotenv -e .env.test -- cypress run --spec cypress/e2e/<datei>.cy.ts
   ```
3. Schlägt ein Test fehl: Ist der Test falsch (Selektor, Text, Timing), den Test korrigieren. Zeigt der Fehler einen echten Bug in der Funktion, **nicht** die App ändern, sondern Manuel den Bug mit Spec, Test und erwartetem vs. tatsächlichem Verhalten melden.
4. `pnpm lint` und `pnpm exec tsc --noEmit` müssen grün sein.

## 6. Abschluss

- Kurz zusammenfassen: welche Spec, welche Fälle, Ergebnis des Laufs (bestanden / fehlgeschlagen und warum).
- ROADMAP Phase 11: neues Testszenario als Punkt vorschlagen (eigener `docs`-Commit) bzw. Häkchen setzen, wenn es dort schon steht.
- Commit-Vorschlag: `e2e-test: test(e2e): E2E-Test <Funktion> ergänzt` – committen nur auf Manuels Anweisung.
