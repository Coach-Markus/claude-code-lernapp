# Die App kostenlos online stellen und aufs iPhone/iPad holen

Diese App ist eine reine statische Website. Du kannst sie kostenlos ins Netz stellen. Hier zwei Wege: zuerst der **einfachste** (Netlify Drop, ohne Konto-Gedöns), dann der **lehrreichere** über GitHub Pages (passt zu Lektion 8, Git).

Danach kommt die Anleitung, wie du die App auf iPhone und iPad installierst und die Offline-Funktion prüfst.

---

## Weg A — Netlify Drop (am einfachsten, ~2 Minuten)

Hier ziehst du einfach den Projektordner auf eine Webseite. Kein Git nötig.

1. Öffne im Browser: <https://app.netlify.com/drop>
2. Öffne daneben den Windows-Explorer im Ordner
   `Dokumente\Claude_Code\claude-code-lernapp`.
3. Ziehe den **gesamten Ordner** `claude-code-lernapp` in das Feld auf der Netlify-Seite.
4. Nach ein paar Sekunden bekommst du eine Internet-Adresse wie
   `https://zufallsname-12345.netlify.app`.
5. Diese Adresse ist deine App. Öffne sie zum Test im Browser.

> Tipp: Mit einem kostenlosen Netlify-Konto kannst du den Namen ändern (z. B.
> `claude-code-lernen.netlify.app`) und die App später durch erneutes Hochziehen
> aktualisieren.

---

## Weg B — GitHub Pages (lehrreich, passt zu Git)

Etwas mehr Schritte, aber du lernst dabei Git und GitHub kennen — genau das, worum es in der App geht.

### Einmalige Vorbereitung
1. Lege dir ein kostenloses Konto an auf <https://github.com>.
2. Installiere, falls noch nicht geschehen, **Git for Windows**: <https://git-scm.com/downloads/win>.
   (Auf diesem Rechner ist Git bereits vorhanden.)

### 1. Projekt bei GitHub anlegen
1. Auf GitHub oben rechts auf **+** → **New repository**.
2. Name z. B. `claude-code-lernapp`. Sichtbarkeit **Public**. **Keine** Häkchen bei
   „Add README" usw. (wir haben schon Dateien). Dann **Create repository**.
3. GitHub zeigt dir Befehle an. Du brauchst nur die unter „…or push an existing
   repository". Die entscheidende Zeile ist die mit deiner Adresse:
   `git remote add origin https://github.com/DEIN-NAME/claude-code-lernapp.git`

### 2. Vom Rechner hochladen (in PowerShell, im Projektordner)
```powershell
# Dein Projekt ist schon mit Git eingerichtet und hat einen ersten Commit.
# Jetzt nur noch mit GitHub verbinden und hochladen:
git remote add origin https://github.com/DEIN-NAME/claude-code-lernapp.git
git branch -M main
git push -u origin main
```
Beim ersten `push` öffnet sich ein Fenster zur Anmeldung bei GitHub — einmal anmelden, fertig.

Noch einfacher: Du kannst auch Claude Code bitten: *„Lade dieses Projekt zu meinem
GitHub hoch."* — er führt dich durch die Schritte.

### 3. Pages einschalten
1. Im GitHub-Repository oben auf **Settings** → links auf **Pages**.
2. Unter „Build and deployment" bei **Source**: **Deploy from a branch**.
3. Branch: **main**, Ordner: **/ (root)** → **Save**.
4. Nach ein bis zwei Minuten erscheint oben die Adresse, etwa
   `https://dein-name.github.io/claude-code-lernapp/`.

### Später etwas ändern
```powershell
git add .
git commit -m "Was ich geändert habe"
git push
```
GitHub Pages aktualisiert sich dann von selbst. Wenn du App-Dateien geänderst hast,
erhöhe vorher in `service-worker.js` die `CACHE_VERSION` (z. B. auf `cclern-v2`),
damit die Geräte die neue Version laden.

---

## Auf iPhone und iPad installieren (Safari)

1. Öffne die Adresse deiner App (von Weg A oder B) in **Safari**.
   Wichtig: Safari, nicht Chrome — nur Safari kann auf iOS zum Home-Bildschirm hinzufügen.
2. Tippe unten (iPhone) bzw. oben (iPad) auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben).
3. Wähle **„Zum Home-Bildschirm"**.
4. Namen bestätigen → **Hinzufügen**.
5. Jetzt liegt die App mit dem Berg-Symbol auf deinem Home-Bildschirm und öffnet sich
   wie eine echte App, im Vollbild.

## Offline-Funktion prüfen

1. Öffne die installierte App einmal **mit** Internet (damit sie sich speichert).
2. Schalte in den **Flugmodus** (oder WLAN/Mobilfunk aus).
3. Öffne die App erneut — sie sollte normal laufen. Dein Fortschritt bleibt erhalten.

Fertig. Deine erste eigene App lebt im Netz und auf deinem Home-Bildschirm. 🏔️
