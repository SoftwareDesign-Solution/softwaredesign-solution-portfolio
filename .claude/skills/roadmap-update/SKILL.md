---
name: roadmap-update
description: Pflegt die ROADMAP.md im Portfolio-Repo – Häkchen setzen, neue Punkte ergänzen, Plan ändern oder mit dem Ist-Stand abgleichen, inkl. Änderungshistorie und docs-Commit, z. B. "Hak den Tag-Filter ab" oder "Nimm Gutscheincodes als Phase auf".
---

# ROADMAP.md pflegen

`ROADMAP.md` ist Manuels Umsetzungsplan: Phasen mit Checkbox-Punkten, je Phase ein `**Commits:**`-Block, am Ende Architektur-Entscheidungen, Git-Workflow und die **Änderungshistorie**. Lies vor jeder Änderung die betroffene Phase und die letzten Zeilen der Änderungshistorie.

## 1. Art der Änderung bestimmen

| Fall | Was tun | Historie-Zeile | Commit |
| --- | --- | --- | --- |
| **A – Häkchen:** Punkt ist umgesetzt, Plan unverändert | `- [ ]` → `- [x]` | nein | zusammen mit dem Code-Commit |
| **B – Plan geändert:** neuer Punkt, Punkt umformuliert/verschoben/gestrichen, neue Phase | Punkt(e) und Commit-Zeilen anpassen | ja | eigener `docs`-Commit |
| **C – Abgleich:** Roadmap mit dem Code vergleichen | Abweichungen auflisten, erst nach Freigabe ändern | ja | eigener `docs`-Commit |

Ist unklar, ob A oder B: Wurde nur erledigt, was schon dastand → A. Weicht die Umsetzung vom Text ab (anderer Dateiname, andere Route, anderes Vorgehen) → zusätzlich B.

## 2. Fall A – Häkchen setzen

1. Passenden Punkt suchen (nach Datei- und Komponentennamen, nicht nur nach Wortlaut).
2. Prüfen, dass es wirklich umgesetzt ist (Datei existiert, Funktion ist eingebunden). Teilweise erledigt → Häkchen nicht setzen, Manuel sagen, was fehlt.
3. Nur die Checkbox ändern. Kein Historie-Eintrag.

## 3. Fall B – Punkt ergänzen oder Plan ändern

**Einordnen:** in die fachlich passende Phase, nicht automatisch ans Ende. Passt keine, eine neue Phase vorschlagen (Nummerierung wie vorhanden, Zwischenphasen als `7.5`, `7.6`) oder den Punkt unter „Zukünftig geplant (noch nicht terminiert)“ bzw. „Offene Entscheidungen“ eintragen.

**Format eines Punkts** (Stil der bestehenden Einträge übernehmen):

```markdown
- [ ] `WorkshopTagFilter` Komponente unter `src/app/_components/sections/` (Badges oben in der Workshop-Sektion, filtert nach `workshop.tag`)
- [ ] **Refactor:** `select.tsx` in `SelectField` integriert (doppelte Dropdown-Logik entfernt)
```

- Dateien, Pfade, Komponenten, Tabellen und Spalten in Backticks
- in Klammern kurz das *Warum* bzw. wo es verwendet wird
- `**Refactor:**` voranstellen, wenn sich nichts am Verhalten ändert

**Commit-Zeile** für jeden neuen Punkt im ` ```text `-Block unter `**Commits:**` derselben Phase ergänzen, in der Reihenfolge der Punkte. Conventional Commits mit deutscher Beschreibung (`feat`, `fix`, `refactor`, `test`, `chore`, `docs`; `style` nur für Formatierung, nie für CSS).

**Bestehendes nicht umformulieren**, sortieren oder neu formatieren, außer es ist Teil der gewünschten Änderung. Gestrichene Punkte entfernen und in der Historie nennen – nicht durchstreichen.

**Folgeänderungen prüfen:** Ändert sich eine Architektur-Entscheidung, auch „Architektur-Entscheidungen (geklärt)“ anpassen. Ändern sich Verzeichnisstruktur, Features oder Befehle, die auch in `README.md` stehen, Manuel darauf hinweisen (README nicht ungefragt ändern).

## 4. Fall C – Abgleich mit dem Ist-Stand

1. Phase für Phase die Punkte gegen das Repo prüfen: Gibt es die genannten Dateien und Routen unter diesem Namen? Ist ein offener Punkt längst umgesetzt? Ist ein abgehakter Punkt anders umgesetzt als beschrieben?
2. Ergebnis als Liste an Manuel, gruppiert nach Phase: *abhaken*, *Text korrigieren (alt → neu)*, *offen trotz Häkchen*.
3. Erst nach Freigabe ändern. Bei mehreren Phasen alles in einem `docs`-Commit mit einer Historie-Zeile.

## 5. Änderungshistorie (Fall B und C)

Neue Zeile **am Ende der Tabelle**, direkt vor dem Absatz `**Versionierung – Major.Minor …**`:

```markdown
| 2026-11-20 | 2.19 | *Manuel Kübler* | Phase 4: `WorkshopTagFilter` für Gruppierung der Workshops nach Tags ergänzt |
```

- **Datum:** heutiges Datum, `YYYY-MM-DD` (per `date +%F` ermitteln, nicht raten)
- **Version:** letzte Version in der Tabelle lesen und hochzählen
  - **Minor** (2.18 → 2.19): Ergänzung oder Korrektur innerhalb der bestehenden Struktur
  - **Major** (2.x → 3.0): Phasen umsortiert/umbenannt, Architektur-Entscheidung gekippt, Formulare zusammengeführt/aufgeteilt, Routen-Konzept geändert. Im Zweifel Minor und Manuel fragen.
- **Autor:** immer `*Manuel Kübler*`
- **Änderung:** ein Satz, Phase nennen, Namen in Backticks
- Reine Tippfehler-Korrekturen brauchen keine Zeile.

## 6. Abschluss

- Kurz zeigen, was geändert wurde (Phase, Punkt, ggf. Historie-Zeile mit Version).
- Commit-Vorschlag:
  - Fall A: keiner – das Häkchen geht mit dem Code-Commit mit
  - Fall B: `roadmap-update: docs(roadmap): Phase <n> angepasst - <kurz> [vX.Y]`
  - Fall C: `roadmap-update: docs(roadmap): Roadmap korrigiert - Ist-Stand weicht ab: <kurz> [v<X.Y>]`
- Committen nur auf Manuels Anweisung.
