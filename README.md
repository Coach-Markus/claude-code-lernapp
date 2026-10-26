# Claude Code Lern-App

Eine kleine Lern-App, mit der Markus Möslang **Claude Code** lernt — in neun ruhigen, aufeinander aufbauenden Lektionen. Gebaut als **Progressive Web App (PWA)**: Sie läuft im Browser, lässt sich auf iPhone und iPad zum Home-Bildschirm hinzufügen und funktioniert **offline**.

**🔗 Live:** <https://coach-markus.github.io/claude-code-lernapp/>
**📦 Code:** <https://github.com/Coach-Markus/claude-code-lernapp>

## Was drin ist

- Neun Lektionen mit Erklärung, Beispiel zum Abtippen, Übung und Quiz
- Dark Mode und helles Design, ruhig und gut lesbar
- Fortschritt wird lokal im Gerät gespeichert (nichts verlässt dein Gerät)
- Offline nutzbar nach dem ersten Laden

## Lokal testen (ohne Zusatzsoftware)

Die App braucht zum Testen eine echte `http://`-Adresse (sonst funktioniert die Offline-Technik nicht). Dafür liegt ein kleiner Testserver bei:

```powershell
.\dev-server.ps1
```

Danach im Browser öffnen: <http://localhost:8123>
Zum Beenden im PowerShell-Fenster `Strg + C` drücken.

## Dateien

| Datei / Ordner | Aufgabe |
|---|---|
| `index.html` | Grundgerüst der Seite |
| `css/styles.css` | Aussehen, Dark Mode, Layout für iPhone & iPad |
| `js/lektionen.js` | Die Inhalte aller neun Lektionen (reine Daten) |
| `js/app.js` | Logik: Navigation, Quiz, Fortschritt |
| `manifest.webmanifest` | Macht die App installierbar |
| `service-worker.js` | Offline-Funktion |
| `icons/` | App-Icons |
| `dev-server.ps1` | Kleiner lokaler Testserver (nur zum Entwickeln) |
| `CLAUDE.md` | Projektwissen für Claude Code |

## Online stellen & aktualisieren

Diese App ist bereits über **GitHub Pages** veröffentlicht (siehe Live-Adresse oben). Die ausführliche Anleitung steht in [`ANLEITUNG-Veroeffentlichen.md`](./ANLEITUNG-Veroeffentlichen.md).

**Änderungen hochladen:** Nach dem Bearbeiten in PowerShell im Projektordner:

```powershell
git add .
git commit -m "Was ich geändert habe"
git push
```

GitHub Pages aktualisiert sich dann von selbst. Hast du App-Dateien geändert, vorher in `service-worker.js` die `CACHE_VERSION` erhöhen (z. B. `cclern-v2`), damit die Geräte die neue Version laden.

## Technik-Hinweis

Bewusst ohne Framework und ohne Build-Schritt — nur HTML, CSS und JavaScript. So bleibt jede Zeile nachvollziehbar, und das Hosting ist denkbar einfach.
