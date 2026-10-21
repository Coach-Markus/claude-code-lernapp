# Claude Code Lern-App

Eine Lern-App für **Markus Möslang**, mit der er Claude Code lernt. Gebaut als **Progressive Web App (PWA)**: läuft im Browser, lässt sich auf iPhone und iPad über Safari zum Home-Bildschirm hinzufügen und funktioniert offline.

## Zweck

Markus ist Einsteiger in Claude Code und will es lernen, um später eigene Apps und Tools für sein Business (systemisches Coaching, Heilpraktiker für Psychotherapie, Firmenseminare) zu bauen. Die App vermittelt die Grundlagen in neun aufeinander aufbauenden Lektionen.

## Technischer Ansatz (bewusst einfach gehalten)

- **Reine statische Website**: nur HTML, CSS und JavaScript. **Kein** Build-Schritt, **kein** `node_modules`, **keine** Frameworks.
- Grund: Markus soll jede Zeile verstehen können, und so läuft die App ohne Werkzeuge direkt im Browser und auf kostenlosem Hosting (GitHub Pages oder Netlify).
- Zielgeräte: iPhone und iPad, Safari, Hoch- und Querformat. Läuft aber in jedem modernen Browser.

## Dateien

| Datei | Aufgabe |
|---|---|
| `index.html` | Grundgerüst, lädt CSS und JavaScript |
| `css/styles.css` | Aussehen: ruhig, warm, gut lesbar, Dark Mode, responsiv |
| `js/lektionen.js` | Die Inhalte aller neun Lektionen (reine Daten) |
| `js/app.js` | Logik: Navigation, Quiz-Auswertung, Fortschritt speichern |
| `manifest.webmanifest` | Macht die App installierbar (Name, Icons, Farben) |
| `service-worker.js` | Speichert die Dateien im Gerät → Offline-Betrieb |
| `icons/` | App-Icons (192, 512, Apple-Touch 180) |

## Wichtige Konventionen

- **Sprache: Deutsch, Du-Form.** Ton: ruhig, warm, klar, ermutigend. Kein Fachjargon ohne Erklärung.
- **Fortschritt** wird mit `localStorage` im Gerät gespeichert (Schlüssel beginnen mit `cclern:`). Nichts verlässt das Gerät, keine Server, kein Tracking.
- **Lektionsinhalte** stehen ausschließlich in `js/lektionen.js`. Jede Lektion hat: `titel`, `erklaerung` (HTML), `beispiel` (Code zum Abtippen), `uebung` (Text) und `quiz` (Array von Fragen mit Antwortoptionen und `richtig`-Index).
- **Fachliche Korrektheit zu Claude Code** ist entscheidend. Vor inhaltlichen Änderungen an den Lektionen die offizielle Doku unter <https://code.claude.com/docs> prüfen. Stand der Recherche: Oktober 2026.
- Beim Ändern des `service-worker.js` die `CACHE_VERSION` erhöhen, sonst sehen Geräte die alte Version weiter.
- Alle Pfade **relativ** halten (`./...`), damit die App auch in einem Unterordner (z. B. bei GitHub Pages unter `/repo-name/`) funktioniert.

## Lektionen (Reihenfolge)

1. Was Claude Code ist und wie es sich von Claude im Chat unterscheidet
2. Installation unter Windows, Terminal-Grundlagen, erste Befehle
3. Die Datei CLAUDE.md und wie Claude Code sich Projektwissen merkt
4. Slash-Befehle, eigene Befehle und Hooks
5. Skills: was sie sind, wie man eigene erstellt und nutzt
6. Artefakte in Claude und wie sie mit Claude Code zusammenspielen
7. MCP-Verbindungen (z. B. Google Drive, Canva) und Subagents
8. Git-Grundlagen zum sicheren Rückgängigmachen
9. Ein eigenes Mini-Projekt von der Idee bis zur fertigen App

## Entwicklungsumgebung

- Windows 11, Terminal-Befehle für **PowerShell** angeben.
- Lokal testen: im Projektordner `python -m http.server 8000` (oder einen anderen kleinen Server) starten und `http://localhost:8000` öffnen. Ein Service Worker braucht `http://` oder `https://`, über `file://` funktioniert er nicht.
