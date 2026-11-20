---
name: commit-message
description: Schreibt Git-Commit-Messages für das Portfolio-Repo nach Conventional Commits (deutsch, mit Scope) aus den aktuellen Änderungen und teilt sie bei Bedarf in mehrere Commits auf, z. B. "Schreib mir eine Commit-Message" oder "Wie committe ich das?".
---

# Commit-Message schreiben

Format: **Conventional Commits mit Scope, Beschreibung auf Deutsch**:

```text
feat(workshops): Tag-Filter für Workshop-Übersicht ergänzt
fix(layout): z-index des Headers auf 100 erhöht, damit er über dem Seiteninhalt bleibt
feat(analytics): Vercel Analytics eingebunden
```

Type und Scope bleiben englisch bzw. technisch (Conventional-Commits-Standard), nur die Beschreibung ist deutsch.

Committe nur, wenn Manuel es ausdrücklich sagt. Standard ist: Message(s) vorschlagen.

## 1. Änderungen erfassen

1. `git status` und `git diff --staged` lesen. Ist nichts gestaged, `git diff` und die ungetrackten Dateien ansehen.
2. Bei Unklarheit, *warum* etwas geändert wurde, die geänderten Stellen lesen – die Message beschreibt die Absicht, nicht nur die Datei.
3. **Abbrechen und warnen**, wenn `.env*`, Zugangsdaten, `.next/` oder `node_modules/` in den Änderungen auftauchen. Das Repo ist öffentlich.

## 2. Aufteilen, wenn nötig

Ein Commit = eine logische Änderung. Enthalten die Änderungen mehrere unabhängige Dinge (z. B. neues Feature + Bugfix an anderer Stelle + Dependency-Update), schlag mehrere Commits vor, jeweils mit:

- Message
- zugehörigen Dateien (`git add <dateien>`)
- sinnvoller Reihenfolge (Grundlage zuerst: Migration → Typ/Schema → Action → UI → Test)

Zusammengehörig bleiben: eine Funktion samt ihrem Typ, Schema, Action, Komponente und E2E-Test, falls alles im selben Zug entstanden ist. Ein ROADMAP-Häkchen für genau diese Funktion geht mit in diesen Commit; neue oder geänderte ROADMAP-Punkte sind ein eigener `docs(roadmap)`-Commit.

## 3. Type wählen

| Type | Wann |
| --- | --- |
| `feat` | neue Funktion, Seite, Komponente, Server Action, Seed, Migration für ein Feature; auch neue sichtbare Gestaltung |
| `fix` | Fehler in bestehender Funktion behoben, auch visuelle Bugs |
| `refactor` | Umbau ohne Verhaltensänderung (extrahieren, umbenennen, verschieben, Tailwind-Klassen aufräumen) |
| `test` | nur Cypress-/Unit-Tests geändert |
| `docs` | README, ROADMAP, CLAUDE.md, Skills, Code-Kommentare |
| `chore` | Setup, Config, Scripts, Tooling ohne Auswirkung auf die App |
| `style` | **nur** Code-Formatierung (Einrückung, Import-Sortierung) – nie für CSS/Tailwind |
| `perf` | messbare Performance-Verbesserung ohne Funktionsänderung |

Dependency-Updates: `fix(deps)` bei Updates, die die App betreffen, `chore(deps)` für reine Dev-Tools.

## 4. Scope wählen

Ein Scope, klein geschrieben, nach dem betroffenen Bereich – nicht nach der Technik:

| Scope | Bereich |
| --- | --- |
| `workshops` | Workshop-Übersicht, Kacheln, Tag-Filter, Detailseite, `get-workshop(s)` |
| `booking` | Buchungsformular, `create-booking`, Gutschein |
| `quote-request` | Angebotsanfrage inkl. Double-Opt-In |
| `notifications` | Benachrichtigung bei neuen Terminen, Bestätigung, Abmeldung |
| `contact` | Kontaktformular `/anfrage` |
| `forms` | gemeinsame Formular-Bausteine (`forms/shared`), betrifft mehrere Formulare |
| `references` | Referenzen-Seite und -Detailseiten, `data/referenzen.ts` |
| `emails` | React-Email-Templates, `services/emails/` |
| `ui` | `components/ui`, Modals, Design-Tokens, Design-System-Seite |
| `layout` | Root Layout, Footer, Navigation, MobileMenu (oder genauer: `header`) |
| `legal` | Impressum, Datenschutz, AGB |
| `db` | Migrationen und Seeds |
| `e2e` | Cypress-Specs, Commands, Tasks |
| `deps` | Abhängigkeiten |
| `config` | Next-, ESLint-, TS-, Cypress-Konfiguration |
| `roadmap`, `readme` | Doku-Dateien |

Betrifft eine Änderung zwei Bereiche gleichwertig, eher aufteilen; sonst den Hauptbereich nehmen. Neue Bereiche (z. B. `analytics`) sind erlaubt, wenn keiner passt.

## 5. Beschreibung formulieren

- Deutsch, **Partizip am Ende**, wie bisher im Repo: `ergänzt`, `behoben`, `korrigiert`, `entfernt`, `umbenannt`, `extrahiert`, `umgestellt`, `vereinheitlicht` …
- Großschreibung nach Deutsch-Regeln (Substantive groß), kein Punkt am Ende
- Header insgesamt höchstens **72 Zeichen**; ein kurzes Warum darf mit ` - ` angehängt werden, wenn es passt
- Sagt, *was sich für die App ändert*, nicht welche Datei angefasst wurde:
  - gut: `fix(booking): Termin-ID wird an die Bestätigungs-Mail übergeben`
  - schlecht: `fix: Buchungsformular` / `create-booking.ts aktualisiert`
- Eigennamen und Bezeichner bleiben, wie sie im Code heißen (`WorkshopCard`, `noValidate`, `termin_id`), ohne Backticks

**Body** (nach Leerzeile, Zeilen ≤ 72 Zeichen, deutsch) nur, wenn das *Warum* nicht offensichtlich ist – z. B. Bugursache, bewusste Entscheidung, nötige Folgeaktion:

```text
fix(forms): noValidate in allen Formularen ergänzt

Die native Browser-Validierung hat den Submit blockiert, bevor das
Zod-Schema greifen konnte - die eigenen Fehlermeldungen kamen nie an.
```

**Migration oder manuelle Schritte** immer im Body nennen, weil Manuel sie in Neon selbst ausführt:

```text
feat(db): Tabelle gutschein und Gutschein-Spalten in buchung ergänzt

Vor dem Deployment database/migrations/009_create_gutschein_table.sql
in Neon ausführen.
```

**Breaking Change** (z. B. Spalte umbenannt, Route geändert): `!` nach dem Scope und Footer `BREAKING CHANGE: …`.

## 6. Ausgabe

- Je Commit ein Codeblock mit der fertigen Message, bei mehreren Commits nummeriert mit den `git add`-Dateien davor.
- Bei einem einzelnen einzeiligen Commit zusätzlich der Befehl: `git commit -m "feat(workshops): Tag-Filter für Workshop-Übersicht ergänzt"`
- Soll Claude selbst committen: nur die genannten Dateien stagen (nie `git add -A` blind), committen, danach `git log --oneline -n <anzahl>` zeigen. Pushen nur auf ausdrückliche Anweisung.
