# Claude Code Lern-App

Eine kleine Lern-App, mit der Markus Möslang **Claude Code** lernt — in neun ruhigen, aufeinander aufbauenden Lektionen. Gebaut als **Progressive Web App (PWA)**: Sie läuft im Browser, lässt sich auf iPhone und iPad zum Home-Bildschirm hinzufügen und funktioniert **offline**.

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

## Online stellen

Diese App ist eine reine statische Website und lässt sich kostenlos veröffentlichen, z. B. über **GitHub Pages** oder **Netlify**. Eine Schritt-für-Schritt-Anleitung steht in [`ANLEITUNG-Veroeffentlichen.md`](./ANLEITUNG-Veroeffentlichen.md).

## Technik-Hinweis

Bewusst ohne Framework und ohne Build-Schritt — nur HTML, CSS und JavaScript. So bleibt jede Zeile nachvollziehbar, und das Hosting ist denkbar einfach.
