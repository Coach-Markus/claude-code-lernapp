/*
  lektionen.js
  --------------------------------------------------------------------
  Nur DATEN. Keine Logik. Hier stehen die Inhalte aller neun Lektionen.
  Wenn du einen Text ändern willst, machst du das hier – die App-Logik
  (js/app.js) bleibt unberührt.

  Aufbau einer Lektion:
    nummer      Fortlaufende Nummer
    titel       Überschrift
    dauer       Grobe Lesezeit
    erklaerung  Der Erklärtext (HTML erlaubt: <p>, <ul>, <strong>, <code> ...)
    beispiel    { einleitung, code, sprache }  Zum Abtippen/Ausprobieren
    uebung      Eine kleine Aufgabe für dich
    quiz        Liste von Fragen: { frage, optionen[], richtig (Index ab 0), erklaerung }
*/

const LEKTIONEN = [
  /* ================================================================= */
  {
    nummer: 1,
    titel: "Was Claude Code ist",
    dauer: "5 Min",
    erklaerung: `
      <p><strong>Claude Code</strong> ist ein KI-Assistent, der nicht nur redet, sondern <strong>handelt</strong>.
      Er lebt direkt auf deinem Computer – im Terminal, in der Desktop-App oder im Code-Editor – und darf dort
      (mit deiner Erlaubnis) Dateien lesen, Dateien schreiben, Programme ausführen und ganze Projekte bearbeiten.</p>

      <p>Den Unterschied zu <strong>Claude im Chat</strong> kann man sich so merken:</p>
      <ul>
        <li><strong>Claude im Chat</strong> ist wie ein kluger Gesprächspartner hinter einer Glasscheibe.
        Er gibt dir Text, Rat und Code – aber <em>du</em> musst alles von Hand umsetzen.</li>
        <li><strong>Claude Code</strong> steht mit dir im selben Raum. Du sagst „Bau mir das“, und er legt die
        Dateien wirklich an, probiert sie aus und bessert nach – Schritt für Schritt, über viele Arbeitsgänge hinweg.</li>
      </ul>

      <p>Das Zauberwort heißt <strong>agentisch</strong>: Claude Code arbeitet eine Aufgabe eigenständig in mehreren
      Schritten ab, statt nur eine einzige Antwort zu geben. Er merkt sich dein Projekt (dazu später die Datei
      <code>CLAUDE.md</code>), kann mit <strong>Git</strong> Versionen sichern und sich über <strong>MCP</strong>
      mit anderen Werkzeugen verbinden.</p>

      <p><strong>Wichtig zum Start:</strong> Für Claude Code brauchst du ein bezahltes Konto (Pro, Max, Team,
      Enterprise oder ein Console-Konto). Der kostenlose Claude-Chat allein reicht dafür nicht.</p>
    `,
    beispiel: {
      einleitung: "So klingt eine typische Aufgabe an Claude Code – ein ganzer Satz in normaler Sprache, kein kryptischer Befehl. (Zum Ausprobieren brauchst du Claude Code erst ab Lektion 2. Lies den Satz ruhig laut; genau so darfst du später mit ihm sprechen.)",
      code: `claude "Lies meinen Projektordner und erkläre mir in drei Sätzen, was dieses Projekt macht."`,
      sprache: "powershell"
    },
    uebung: "Schreib in eigenen Worten einen Satz auf (am besten in deine Notizen): Was möchtest DU eines Tages von Claude Code gebaut bekommen? Ein kleines Tool fürs Coaching? Eine Terminübersicht? Halte es konkret in einem Satz fest – daraus wird in Lektion 9 vielleicht dein erstes eigenes Projekt.",
    quiz: [
      {
        frage: "Was ist der Kernunterschied zwischen Claude Code und Claude im Chat?",
        optionen: [
          "Claude Code ist nur eine schnellere Version des Chats",
          "Claude Code kann Dateien auf deinem Computer lesen, schreiben und Befehle ausführen",
          "Claude Code versteht nur Englisch",
          "Es gibt keinen echten Unterschied"
        ],
        richtig: 1,
        erklaerung: "Claude Code handelt auf deinem Rechner – er bearbeitet echte Dateien und führt Befehle aus. Der Chat gibt dir nur Text, den du selbst umsetzt."
      },
      {
        frage: "Was bedeutet „agentisch“?",
        optionen: [
          "Claude arbeitet eine Aufgabe eigenständig in mehreren Schritten ab",
          "Claude ist ein Geheimagent",
          "Claude antwortet besonders höflich",
          "Claude darf nichts ohne Erlaubnis tun"
        ],
        richtig: 0,
        erklaerung: "Agentisch heißt: nicht nur eine einzelne Antwort, sondern ein eigenständiges Vorgehen über mehrere Schritte – planen, umsetzen, prüfen, nachbessern."
      },
      {
        frage: "Was brauchst du, um Claude Code nutzen zu können?",
        optionen: [
          "Nur den kostenlosen Claude-Account",
          "Einen Mac",
          "Ein bezahltes Konto (z. B. Pro, Max, Team oder Console)",
          "Eine Programmierausbildung"
        ],
        richtig: 2,
        erklaerung: "Claude Code setzt ein bezahltes Konto voraus. Einen Mac brauchst du nicht – es läuft auch unter Windows. Und Vorwissen im Programmieren ist nicht nötig."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 2,
    titel: "Installation & erste Befehle",
    dauer: "10 Min",
    erklaerung: `
      <p>Unter Windows installierst du Claude Code am einfachsten über <strong>PowerShell</strong>. Das ist das
      schwarze (oder blaue) Terminalfenster, in das man Befehle tippt. So öffnest du es: Taste
      <code>Windows</code> drücken, <code>PowerShell</code> tippen, Enter.</p>

      <p>Ein <strong>Terminal</strong> ist einfach eine Texteingabe für deinen Computer. Statt zu klicken,
      schreibst du einen Befehl und drückst Enter. Drei Befehle reichen dir fürs Erste:</p>
      <ul>
        <li><code>cd</code> – „change directory“, wechselt in einen Ordner. Beispiel: <code>cd Documents</code></li>
        <li><code>ls</code> – zeigt dir, was im aktuellen Ordner liegt</li>
        <li><code>cd ..</code> – geht einen Ordner nach oben</li>
      </ul>

      <p>Die Installation selbst ist <strong>ein einziger Befehl</strong> (siehe Beispiel unten). Danach prüfst du
      mit <code>claude --version</code>, ob alles da ist – es sollte eine Versionsnummer erscheinen.</p>

      <p><strong>Tipp für Windows:</strong> Installiere zusätzlich <em>Git for Windows</em> (git-scm.com). Das brauchst
      du später sowieso für Lektion 8 – und Claude Code arbeitet damit etwas runder.</p>

      <p>Gestartet wird Claude Code, indem du zuerst in deinen Projektordner wechselst und dann <code>claude</code>
      eintippst. Beim allerersten Mal führt er dich durch die Anmeldung im Browser. Danach bist du <em>drin</em> –
      jetzt sprichst du einfach in normaler Sprache mit ihm. Mit <code>/help</code> siehst du, was möglich ist,
      mit <code>/clear</code> beginnst du ein frisches Gespräch.</p>
    `,
    beispiel: {
      einleitung: "Öffne PowerShell und tippe diesen einen Befehl, um Claude Code zu installieren. (Er zeigt eine Weile keinen Fortschritt an – das ist normal. Danach ein NEUES PowerShell-Fenster öffnen und die Version prüfen.)",
      code: `irm https://claude.ai/install.ps1 | iex

# Neues Fenster öffnen, dann prüfen:
claude --version

# In einen Ordner wechseln und Claude Code starten:
cd Documents
claude`,
      sprache: "powershell"
    },
    uebung: "Installiere Claude Code mit dem Befehl oben. Prüfe anschließend mit `claude --version`, ob eine Versionsnummer erscheint. Öffne dann irgendeinen Ordner mit `cd` und starte `claude`. Begrüße ihn mit einem Satz, z. B. „Hallo, was kannst du hier für mich tun?“ – und tippe danach `/help`, um die Befehle zu sehen.",
    quiz: [
      {
        frage: "Mit welchem Befehl installierst du Claude Code unter Windows in PowerShell?",
        optionen: [
          "install claude",
          "irm https://claude.ai/install.ps1 | iex",
          "npm claude code",
          "winget claude"
        ],
        richtig: 1,
        erklaerung: "`irm ... | iex` lädt das Installationsskript und führt es aus. (`winget install Anthropic.ClaudeCode` geht auch, aktualisiert sich aber nicht von selbst.)"
      },
      {
        frage: "Wie prüfst du nach der Installation, ob Claude Code da ist?",
        optionen: [
          "claude --version",
          "claude test",
          "check claude",
          "version"
        ],
        richtig: 0,
        erklaerung: "`claude --version` gibt die installierte Versionsnummer aus. Erscheint sie, hat die Installation geklappt."
      },
      {
        frage: "Was macht der Befehl `cd Documents`?",
        optionen: [
          "Er löscht den Ordner Documents",
          "Er erstellt einen neuen Ordner",
          "Er wechselt in den Ordner Documents",
          "Er öffnet ein Dokument"
        ],
        richtig: 2,
        erklaerung: "`cd` heißt „change directory“ – du wechselst in den genannten Ordner. Mit `cd ..` geht es wieder eine Ebene nach oben."
      },
      {
        frage: "Wie startest du eine Claude-Code-Sitzung in einem Ordner?",
        optionen: [
          "Du tippst `claude` im gewünschten Ordner",
          "Du doppelklickst eine EXE-Datei",
          "Du öffnest den Browser",
          "Das geht nur auf dem Mac"
        ],
        richtig: 0,
        erklaerung: "Erst mit `cd` in den Ordner wechseln, dann `claude` eintippen. Beim ersten Mal meldest du dich im Browser an."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 3,
    titel: "CLAUDE.md – das Projektgedächtnis",
    dauer: "8 Min",
    erklaerung: `
      <p>Claude Code vergisst nach jeder Sitzung sein Gesprächsgedächtnis – wie ein freundlicher Gast, der jedes
      Mal neu zur Tür hereinkommt. Damit er dein Projekt trotzdem sofort kennt, gibt es die Datei
      <strong><code>CLAUDE.md</code></strong>. Sie liegt im Projektordner, und Claude Code <strong>liest sie zu
      Beginn jeder Sitzung automatisch</strong>.</p>

      <p>In die <code>CLAUDE.md</code> schreibst du alles, was dauerhaft gelten soll:</p>
      <ul>
        <li>Worum es im Projekt geht</li>
        <li>Regeln und Vorlieben („antworte auf Deutsch“, „keine komplizierten Werkzeuge“)</li>
        <li>Wichtige Dateien und wie sie zusammenhängen</li>
      </ul>

      <p>Du musst sie nicht von Hand anlegen. Der Befehl <code>/init</code> schaut sich dein Projekt an und
      schreibt dir einen ersten Entwurf. Mit <code>/memory</code> öffnest und bearbeitest du deine
      Gedächtnis-Dateien. Und wenn dir mitten in der Arbeit etwas einfällt, das Claude sich merken soll, beginnst
      du deine Nachricht einfach mit einer <strong><code>#</code></strong> – dann bietet er an, es dauerhaft zu
      speichern.</p>

      <p><strong>Faustregel:</strong> Halte die <code>CLAUDE.md</code> kurz (gern unter 200 Zeilen). Sie ist ein
      Steckbrief, kein Handbuch. Ausführliches Wissen wandert später besser in <em>Skills</em> (Lektion 5).</p>

      <p>Diese Lern-App hat selbst eine <code>CLAUDE.md</code> – wirf ruhig mal einen Blick hinein. Genau so sieht
      sie in der Praxis aus.</p>
    `,
    beispiel: {
      einleitung: "Starte Claude Code in einem Projektordner und lass ihn eine erste CLAUDE.md für dich schreiben. Oder sag ihm in normaler Sprache, welche Regel er sich merken soll:",
      code: `/init

# Oder du diktierst ihm eine Regel – beginne mit # :
# Antworte in diesem Projekt immer auf Deutsch und in der Du-Form.`,
      sprache: "text"
    },
    uebung: "Öffne (oder erstelle) einen Projektordner, starte `claude` und tippe `/init`. Sieh dir an, was er in die CLAUDE.md schreibt. Füge dann von Hand oder per `#`-Nachricht eine persönliche Regel hinzu, z. B. „Erkläre mir jeden Schritt in einfachen Worten.“ Starte die Sitzung neu und prüfe, ob er sich daran hält.",
    quiz: [
      {
        frage: "Wann liest Claude Code die Datei CLAUDE.md?",
        optionen: [
          "Nur wenn du es ausdrücklich verlangst",
          "Automatisch zu Beginn jeder Sitzung",
          "Nie, sie ist nur für Menschen",
          "Einmal pro Woche"
        ],
        richtig: 1,
        erklaerung: "Die CLAUDE.md wird zu Beginn jeder Sitzung automatisch geladen. Deshalb kennt Claude dein Projekt sofort wieder."
      },
      {
        frage: "Welcher Befehl erstellt einen ersten Entwurf der CLAUDE.md?",
        optionen: [
          "/start",
          "/new",
          "/init",
          "/create"
        ],
        richtig: 2,
        erklaerung: "`/init` sieht sich dein Projekt an und schreibt einen passenden Erstentwurf, den du dann anpassen kannst."
      },
      {
        frage: "Wie merkst du Claude mitten im Gespräch schnell etwas dauerhaft an?",
        optionen: [
          "Die Nachricht mit # beginnen",
          "Die Nachricht in GROSSBUCHSTABEN schreiben",
          "Dreimal „merken“ sagen",
          "Das geht nicht"
        ],
        richtig: 0,
        erklaerung: "Beginnst du eine Nachricht mit #, bietet Claude an, den Inhalt dauerhaft in eine Gedächtnis-Datei zu schreiben."
      },
      {
        frage: "Wie lang sollte eine gute CLAUDE.md sein?",
        optionen: [
          "So lang wie möglich, je mehr desto besser",
          "Eher kurz – ein Steckbrief, gern unter 200 Zeilen",
          "Genau eine Zeile",
          "Mindestens 50 Seiten"
        ],
        richtig: 1,
        erklaerung: "Kurz und fokussiert ist besser. Umfangreiches Detailwissen lagerst du später in Skills aus."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 4,
    titel: "Slash-Befehle, eigene Befehle & Hooks",
    dauer: "10 Min",
    erklaerung: `
      <p><strong>Slash-Befehle</strong> sind kurze Kommandos, die mit einem <code>/</code> beginnen und Claude Code
      direkt steuern. Tippe einfach <code>/</code>, und es erscheint eine Liste. Die wichtigsten:</p>
      <ul>
        <li><code>/help</code> – zeigt Hilfe und verfügbare Befehle</li>
        <li><code>/clear</code> – startet ein frisches Gespräch (alten Verlauf vergessen)</li>
        <li><code>/init</code> – erstellt die CLAUDE.md</li>
        <li><code>/memory</code> – Gedächtnis-Dateien bearbeiten</li>
        <li><code>/mcp</code> – externe Verbindungen verwalten (Lektion 7)</li>
        <li><code>/agents</code> – Subagents verwalten (Lektion 7)</li>
        <li><code>/config</code> – Einstellungen, z. B. das Farbthema</li>
        <li><code>/compact</code> – langes Gespräch zusammenfassen, um Platz zu schaffen</li>
      </ul>

      <p><strong>Eigene Befehle</strong> kannst du dir selbst bauen – für Aufgaben, die du immer wieder gleich
      machst. Heute ist dafür ein <em>Skill</em> der empfohlene Weg (das ist die nächste Lektion). Das Ergebnis:
      Du tippst z. B. <code>/wochenrückblick</code>, und Claude führt deinen gespeicherten Ablauf aus.</p>

      <p><strong>Hooks</strong> sind etwas für später, aber gut zu kennen: kleine Automatik-Regeln, die bei
      bestimmten Ereignissen von selbst auslösen – z. B. „jedes Mal, bevor Claude einen Befehl ausführt, prüfe
      erst X" oder „nach jeder Dateiänderung formatiere automatisch“. Sie werden in einer Einstellungsdatei
      (<code>settings.json</code>) festgelegt. Unter Windows lässt man sie mit <code>"shell": "powershell"</code>
      laufen. Du brauchst Hooks am Anfang nicht – merk dir nur: <em>Claude Code lässt sich automatisieren.</em></p>
    `,
    beispiel: {
      einleitung: "Probier in einer laufenden Claude-Code-Sitzung ein paar Slash-Befehle aus. Tippe nur den Schrägstrich, dann öffnet sich die Auswahl:",
      code: `/help      (zeigt dir alle Befehle)
/config    (hier kannst du z. B. Dark Mode einstellen)
/clear     (frischer Start, wenn du ein neues Thema beginnst)`,
      sprache: "text"
    },
    uebung: "Tippe in einer Sitzung `/` und lies dir die Liste der Befehle durch. Probiere `/help` und `/config` aus. Überlege dir danach eine Aufgabe, die du oft wiederholst (z. B. „fasse meine Woche zusammen“). Die bauen wir in der nächsten Lektion in einen eigenen Befehl um.",
    quiz: [
      {
        frage: "Womit beginnen alle Slash-Befehle?",
        optionen: [
          "Mit einem Ausrufezeichen !",
          "Mit einem Schrägstrich /",
          "Mit dem Wort „Claude“",
          "Mit einer Zahl"
        ],
        richtig: 1,
        erklaerung: "Alle Befehle beginnen mit /. Tippst du nur /, zeigt Claude Code dir eine Auswahlliste."
      },
      {
        frage: "Was macht `/clear`?",
        optionen: [
          "Es löscht deine Dateien",
          "Es beendet Claude Code für immer",
          "Es startet ein frisches Gespräch ohne alten Verlauf",
          "Es putzt den Bildschirm weiß"
        ],
        richtig: 2,
        erklaerung: "`/clear` leert den Gesprächsverlauf, damit du sauber mit einem neuen Thema starten kannst. Deine Dateien bleiben unberührt."
      },
      {
        frage: "Was ist ein Hook (einfach gesagt)?",
        optionen: [
          "Eine Automatik-Regel, die bei bestimmten Ereignissen von selbst auslöst",
          "Ein Schimpfwort",
          "Eine Art Slash-Befehl zum Aufräumen",
          "Ein spezieller Mac-Befehl"
        ],
        richtig: 0,
        erklaerung: "Ein Hook löst automatisch bei einem Ereignis aus – etwa vor oder nach einer Aktion. So lässt sich Claude Code automatisieren."
      },
      {
        frage: "Was ist heute der empfohlene Weg für einen eigenen, wiederverwendbaren Befehl?",
        optionen: [
          "Ein Hook",
          "Ein Skill",
          "Eine E-Mail an Anthropic",
          "Das geht gar nicht"
        ],
        richtig: 1,
        erklaerung: "Für neue eigene Befehle sind Skills der empfohlene Weg. Mehr dazu in der nächsten Lektion."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 5,
    titel: "Skills – eigene Fähigkeiten geben",
    dauer: "10 Min",
    erklaerung: `
      <p>Ein <strong>Skill</strong> ist eine kleine Anleitung, die du Claude Code dauerhaft mitgibst – wie ein
      Rezept in seinem Kochbuch. Jeder Skill ist eine Datei namens <strong><code>SKILL.md</code></strong> in einem
      eigenen Ordner. Claude holt sie sich <strong>automatisch</strong> hervor, wenn deine Aufgabe dazu passt –
      oder du rufst sie selbst mit <code>/skill-name</code> auf.</p>

      <p>Der Clou gegenüber der CLAUDE.md: Ein Skill wird <strong>nur dann geladen, wenn er gebraucht wird</strong>.
      Dadurch darf er ausführlich sein, ohne jede Sitzung mit Text vollzustopfen.</p>

      <p>Aufbau einer <code>SKILL.md</code>:</p>
      <ul>
        <li>Oben ein kleiner Kopf zwischen zwei <code>---</code>-Linien. Wichtig ist die Zeile
        <code>description:</code> – daran erkennt Claude, <em>wann</em> er den Skill einsetzen soll.</li>
        <li>Darunter die eigentliche Anleitung in normaler Sprache.</li>
      </ul>

      <p>Wo liegt ein Skill?</p>
      <ul>
        <li><strong>Persönlich</strong> (für alle deine Projekte): <code>~/.claude/skills/name/SKILL.md</code>
        – unter Windows ist <code>~</code> dein Benutzerordner, also z. B.
        <code>C:\\Users\\DeinName\\.claude\\skills\\...</code></li>
        <li><strong>Projekt</strong> (nur dieses Projekt): <code>.claude/skills/name/SKILL.md</code></li>
      </ul>

      <p>Am einfachsten lässt du Claude Code den Skill für dich schreiben: Beschreib ihm, was der Skill können soll,
      und bitte ihn, die passende <code>SKILL.md</code> anzulegen.</p>
    `,
    beispiel: {
      einleitung: "So sieht ein einfacher Skill aus, der einen Wochenrückblick formuliert. Du könntest Claude Code bitten: „Lege mir diesen Skill unter ~/.claude/skills/wochenrueckblick/SKILL.md an.“ Danach rufst du ihn mit /wochenrueckblick auf:",
      code: `---
description: Formuliert einen freundlichen Wochenrückblick. Einsetzen, wenn Markus seine Woche zusammenfassen oder reflektieren möchte.
---

## Aufgabe

Frage mich kurz nach den drei wichtigsten Dingen der Woche.
Fasse sie dann warm und ermutigend in einem kurzen Absatz
zusammen und schließe mit einer Frage für die kommende Woche.
Sprich mich mit Du an.`,
      sprache: "text"
    },
    uebung: "Denk an die wiederkehrende Aufgabe aus Lektion 4. Bitte Claude Code: „Bau mir dafür einen Skill und lege ihn unter ~/.claude/skills/… an.“ Schau dir die erzeugte SKILL.md an und rufe den Skill anschließend mit `/name` auf. Achte besonders auf die `description:` – sie entscheidet, wann Claude den Skill von selbst vorschlägt.",
    quiz: [
      {
        frage: "Wie heißt die Datei, die einen Skill ausmacht?",
        optionen: [
          "skill.txt",
          "SKILL.md",
          "CLAUDE.md",
          "readme.md"
        ],
        richtig: 1,
        erklaerung: "Jeder Skill ist eine SKILL.md in einem eigenen Ordner."
      },
      {
        frage: "Was ist der Vorteil eines Skills gegenüber der CLAUDE.md?",
        optionen: [
          "Ein Skill wird nur geladen, wenn er gebraucht wird",
          "Ein Skill ist bunter",
          "Ein Skill funktioniert ohne Internet besser",
          "Es gibt keinen Vorteil"
        ],
        richtig: 0,
        erklaerung: "Skills laden nur bei Bedarf. Deshalb dürfen sie ausführlich sein, ohne jede Sitzung zu belasten."
      },
      {
        frage: "Wie rufst du einen Skill selbst auf?",
        optionen: [
          "Mit !skill-name",
          "Mit /skill-name",
          "Mit dem Wort „Skill“",
          "Gar nicht, nur Claude darf das"
        ],
        richtig: 1,
        erklaerung: "Du rufst ihn wie einen Slash-Befehl auf: /skill-name. Claude kann ihn zusätzlich automatisch einsetzen."
      },
      {
        frage: "Woran erkennt Claude, wann er einen Skill von selbst einsetzen soll?",
        optionen: [
          "An der Zeile `description:` im Kopf der Datei",
          "An der Dateigröße",
          "Am Erstelldatum",
          "Das erkennt er nie automatisch"
        ],
        richtig: 0,
        erklaerung: "Die `description:` beschreibt, was der Skill tut und wann er passt. Danach entscheidet Claude, ob er ihn lädt."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 6,
    titel: "Artefakte & das Zusammenspiel",
    dauer: "7 Min",
    erklaerung: `
      <p>Ein <strong>Artefakt</strong> begegnet dir im <strong>Claude-Chat</strong> (auf claude.ai). Immer wenn
      Claude dir etwas Eigenständiges baut – eine kleine Web-Seite, ein Dokument, einen Rechner, ein Diagramm –
      erscheint das nicht als loser Text im Gespräch, sondern in einem eigenen Fenster daneben. Dieses Fenster ist
      das Artefakt. Du kannst es ansehen, ausprobieren, weiter verändern lassen und sogar veröffentlichen, um es zu
      teilen.</p>

      <p>Artefakte sind ideal zum <strong>schnellen Ausprobieren einer Idee</strong>: „Bau mir mal eben einen
      kleinen Rechner für meine Seminarpreise." In Sekunden steht ein benutzbares Ergebnis da – ohne Installation,
      ohne Dateien auf deinem Rechner.</p>

      <p>Und wie passt das mit <strong>Claude Code</strong> zusammen? So kannst du es dir merken:</p>
      <ul>
        <li><strong>Artefakt im Chat</strong> = schnelle Skizze. Eine einzelne Sache, sofort sichtbar, lebt online
        im Chat. Perfekt, um eine Idee zu testen.</li>
        <li><strong>Claude Code</strong> = das echte Werkstück. Ein richtiges Projekt aus vielen Dateien, auf deinem
        Computer, mit Git gesichert, offline lauffähig, veröffentlichbar als eigene App.</li>
      </ul>

      <p>Ein typischer Weg: Du skizzierst eine Idee als Artefakt im Chat, und wenn sie dir gefällt, baust du sie mit
      Claude Code als richtiges Projekt aus. <em>Genau das haben wir mit dieser Lern-App gemacht</em> – nur gleich
      als vollwertiges Projekt, damit du Git und Veröffentlichung mitlernst.</p>
    `,
    beispiel: {
      einleitung: "Dieses Beispiel tippst du NICHT ins Terminal, sondern in den normalen Claude-Chat auf claude.ai. Beobachte, wie rechts ein Artefakt-Fenster aufgeht:",
      code: `Bau mir ein kleines Artefakt: eine einseitige Übersicht
meiner fünf Säulen als schön gestaltete Web-Seite.`,
      sprache: "text"
    },
    uebung: "Öffne den Claude-Chat (claude.ai) und bitte ihn, ein kleines Artefakt zu bauen – etwa eine hübsche Begrüßungsseite für dein Coaching. Schau, wie es im Seitenfenster erscheint, und lass eine Kleinigkeit ändern (andere Farbe, anderer Text). Spüre den Unterschied: Hier skizzierst du schnell – mit Claude Code baust du dauerhaft.",
    quiz: [
      {
        frage: "Wo begegnen dir Artefakte?",
        optionen: [
          "Nur im Terminal",
          "Im Claude-Chat (claude.ai), in einem eigenen Fenster neben dem Gespräch",
          "In der Windows-Systemsteuerung",
          "Nur auf dem iPhone"
        ],
        richtig: 1,
        erklaerung: "Artefakte erscheinen im Claude-Chat als eigenständiges, benutzbares Ergebnis in einem Fenster neben dem Gespräch."
      },
      {
        frage: "Wofür eignen sich Artefakte besonders?",
        optionen: [
          "Zum schnellen Ausprobieren einer Idee",
          "Zum Verwalten großer Projekte mit vielen Dateien",
          "Zum Installieren von Programmen",
          "Als Ersatz für Git"
        ],
        richtig: 0,
        erklaerung: "Artefakte sind die schnelle Skizze: sofort sichtbar und benutzbar, ohne Installation."
      },
      {
        frage: "Was ist der beste Vergleich zwischen Artefakt und Claude Code?",
        optionen: [
          "Beide sind genau dasselbe",
          "Artefakt = schnelle Skizze im Chat; Claude Code = echtes Projekt auf deinem Rechner",
          "Artefakte sind besser als Claude Code",
          "Claude Code kann keine Web-Seiten"
        ],
        richtig: 1,
        erklaerung: "Das Artefakt ist die schnelle Skizze online, Claude Code das dauerhafte Werkstück aus vielen Dateien mit Git und Veröffentlichung."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 7,
    titel: "MCP-Verbindungen & Subagents",
    dauer: "9 Min",
    erklaerung: `
      <p>Von sich aus sieht Claude Code nur deinen Projektordner. Über <strong>MCP</strong> (Model Context Protocol)
      kannst du ihm <strong>weitere Türen öffnen</strong> – zu Diensten außerhalb deines Ordners. MCP ist ein
      offener Standard, eine Art einheitlicher Stecker. Damit kann Claude z. B.:</p>
      <ul>
        <li>Dokumente in deinem <strong>Google Drive</strong> lesen,</li>
        <li>Designs in <strong>Canva</strong> erstellen,</li>
        <li>Nachrichten aus <strong>Slack</strong> holen,</li>
        <li>oder dein eigenes Werkzeug ansteuern.</li>
      </ul>
      <p>Verwaltet werden diese Verbindungen mit dem Befehl <code>/mcp</code>. Für ein Projekt werden sie in einer
      Datei namens <code>.mcp.json</code> hinterlegt. Jede Verbindung musst du einmal freigeben – nichts passiert
      ohne deine Erlaubnis.</p>

      <p><strong>Subagents</strong> sind spezialisierte Helfer, an die Claude Code Teilaufgaben abgibt. Jeder
      Subagent hat sein eigenes Gedächtnis, seine eigenen Werkzeuge und eine eigene Aufgabe – und gibt am Ende nur
      das <strong>Ergebnis</strong> zurück, nicht den ganzen Arbeitslärm. Nützlich sind sie,</p>
      <ul>
        <li>um das Hauptgespräch sauber zu halten (der Helfer schluckt die lange Suche, du bekommst die Antwort),</li>
        <li>um Regeln durchzusetzen (z. B. ein Prüfer, der nur lesen, nichts ändern darf),</li>
        <li>um mehrere Dinge parallel erledigen zu lassen.</li>
      </ul>
      <p>Du erstellst einen Subagent am einfachsten, indem du Claude bittest, einen anzulegen, oder über den Befehl
      <code>/agents</code>. Technisch ist jeder Subagent eine kleine Datei im Ordner <code>.claude/agents/</code>.</p>
    `,
    beispiel: {
      einleitung: "In einer Sitzung schaust du dir die Verbindungs-Verwaltung an und bittest Claude, einen einfachen Prüf-Subagenten für dich anzulegen:",
      code: `/mcp

# Oder in normaler Sprache:
Lege mir einen Subagent "Korrekturleser" an, der meine Texte
nur LIEST und auf Rechtschreibung prüft, aber nichts verändert.`,
      sprache: "text"
    },
    uebung: "Tippe `/mcp` und sieh dir an, welche Verbindungen angeboten werden (du musst noch keine einrichten). Bitte Claude anschließend, dir einen kleinen „Korrekturleser“-Subagenten anzulegen, und lass ihn einen kurzen Text prüfen. Beobachte: Du bekommst ein knappes Ergebnis zurück, nicht den ganzen Suchweg.",
    quiz: [
      {
        frage: "Wofür ist MCP da?",
        optionen: [
          "Um Claude Code mit externen Diensten wie Google Drive oder Canva zu verbinden",
          "Um den Mac schneller zu machen",
          "Um Passwörter zu speichern",
          "Um Claude Code zu installieren"
        ],
        richtig: 0,
        erklaerung: "MCP ist der einheitliche „Stecker“, mit dem Claude Code auf externe Werkzeuge und Daten zugreifen kann – nach deiner Freigabe."
      },
      {
        frage: "Mit welchem Befehl verwaltest du MCP-Verbindungen?",
        optionen: [
          "/connect",
          "/mcp",
          "/tools",
          "/drive"
        ],
        richtig: 1,
        erklaerung: "Der Befehl `/mcp` verwaltet deine Verbindungen. Projektbezogen stehen sie in der Datei .mcp.json."
      },
      {
        frage: "Was ist das Besondere an einem Subagent?",
        optionen: [
          "Er arbeitet mit eigenem Gedächtnis an einer Teilaufgabe und gibt nur das Ergebnis zurück",
          "Er ersetzt dein Konto",
          "Er läuft nur nachts",
          "Er kostet extra Geld pro Stück"
        ],
        richtig: 0,
        erklaerung: "Ein Subagent erledigt eine Teilaufgabe in eigenem Kontext und liefert nur das Ergebnis – das hält dein Hauptgespräch übersichtlich."
      },
      {
        frage: "Wie legst du am einfachsten einen Subagent an?",
        optionen: [
          "Gar nicht, das geht nur in der Cloud",
          "Du bittest Claude darum oder nutzt /agents",
          "Du installierst ein Zusatzprogramm",
          "Über die Windows-Systemsteuerung"
        ],
        richtig: 1,
        erklaerung: "Am einfachsten beschreibst du Claude den gewünschten Helfer, oder du nutzt `/agents`. Er wird als Datei in .claude/agents/ gespeichert."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 8,
    titel: "Git – sicher rückgängig machen",
    dauer: "12 Min",
    erklaerung: `
      <p><strong>Git</strong> ist deine Zeitmaschine. Es macht <strong>Schnappschüsse</strong> deines Projekts, zu
      denen du jederzeit zurückkehren kannst. Das nimmt die Angst: Du darfst alles ausprobieren, denn ein sicherer
      Stand ist immer gespeichert.</p>

      <p>Ein solcher Schnappschuss heißt <strong>Commit</strong>. Der Ablauf hat drei Schritte, die du dir wie
      Fotografieren vorstellen kannst:</p>
      <ul>
        <li><code>git add .</code> – „stell alle Änderungen ins Bild“ (für den nächsten Schnappschuss vormerken)</li>
        <li><code>git commit -m "Was ich geändert habe"</code> – „Foto machen“ samt kurzer Beschriftung</li>
        <li><code>git log</code> – „das Fotoalbum ansehen“ (alle Schnappschüsse)</li>
      </ul>

      <p>Einmal pro Projekt richtest du Git mit <code>git init</code> ein. Mit <code>git status</code> siehst du
      jederzeit, was sich seit dem letzten Schnappschuss geändert hat. Und wenn etwas schiefging, holst du mit
      <code>git restore .</code> den letzten gespeicherten Stand zurück.</p>

      <p>Das Schöne: <strong>Du musst Git nicht von Hand bedienen.</strong> Du kannst Claude Code einfach bitten:
      „Mach bitte einen Commit mit einer passenden Beschreibung.“ Er erledigt die Schritte für dich. Trotzdem ist
      es gut, die Idee zu verstehen – dann weißt du, warum du sicher bist.</p>

      <p>Git ist übrigens die Grundlage dafür, dass wir die Lern-App gleich kostenlos ins Netz stellen können
      (nächster Abschnitt).</p>
    `,
    beispiel: {
      einleitung: "So machst du im Projektordner (in PowerShell) deinen allerersten Schnappschuss. Die ersten zwei Zeilen brauchst du nur einmal, damit Git weiß, wer du bist:",
      code: `git config --global user.name "Markus Möslang"
git config --global user.email "info@markusmoeslang.com"

git init
git add .
git commit -m "Erster Stand meiner Lern-App"
git log`,
      sprache: "powershell"
    },
    uebung: "Richte in deinem Projektordner mit `git init` Git ein und mache mit `git add .` und `git commit -m \"Start\"` deinen ersten Schnappschuss. Ändere danach testweise eine Datei und tippe `git status` – sieh, wie Git die Änderung erkennt. Bitte zum Schluss Claude Code einmal: „Mach bitte einen Commit meiner Änderungen.\“",
    quiz: [
      {
        frage: "Wofür ist Git gut?",
        optionen: [
          "Um Schnappschüsse des Projekts zu speichern und zurückzukehren",
          "Um Bilder zu bearbeiten",
          "Um das Internet schneller zu machen",
          "Um E-Mails zu schreiben"
        ],
        richtig: 0,
        erklaerung: "Git speichert Versionsstände (Commits), zu denen du jederzeit zurückkehren kannst – deine Sicherheitsleine."
      },
      {
        frage: "Wie heißt ein einzelner Schnappschuss in Git?",
        optionen: [
          "Ein Snap",
          "Ein Commit",
          "Ein Branch",
          "Ein Backup"
        ],
        richtig: 1,
        erklaerung: "Ein gespeicherter Stand heißt Commit. Mit `git commit -m \"...\"` legst du ihn samt kurzer Beschreibung an."
      },
      {
        frage: "Welcher Befehl richtet Git in einem Ordner das erste Mal ein?",
        optionen: [
          "git start",
          "git new",
          "git init",
          "git create"
        ],
        richtig: 2,
        erklaerung: "`git init` macht aus deinem Ordner ein Git-Projekt. Das machst du nur einmal pro Projekt."
      },
      {
        frage: "Musst du Git-Befehle immer selbst eintippen?",
        optionen: [
          "Ja, Claude Code kann das nicht",
          "Nein, du kannst Claude Code bitten, die Commits für dich zu machen",
          "Nur am Mac geht es automatisch",
          "Nur mit Zusatzkosten"
        ],
        richtig: 1,
        erklaerung: "Claude Code kann Git für dich bedienen. Du bittest ihn einfach, einen Commit zu machen – die Schritte erledigt er selbst."
      }
    ]
  },

  /* ================================================================= */
  {
    nummer: 9,
    titel: "Dein eigenes Mini-Projekt",
    dauer: "15 Min",
    erklaerung: `
      <p>Jetzt fügt sich alles zusammen. Du hast gesehen, wie man eine Idee in eine fertige App verwandelt –
      <em>diese Lern-App ist der lebende Beweis</em>. Hier ist dein Fahrplan für ein eigenes kleines Projekt, in
      denselben ruhigen, kleinen Schritten:</p>
      <ol>
        <li><strong>Idee in einem Satz.</strong> Was soll das Ding für dich tun? Klein halten. Beispiel: „Ein
        Rechner, der mir aus Teilnehmerzahl und Tagessatz meinen Seminarpreis ausrechnet."</li>
        <li><strong>Ordner & Start.</strong> Neuen Projektordner anlegen, mit <code>cd</code> hineinwechseln,
        <code>claude</code> starten.</li>
        <li><strong>Gedächtnis.</strong> <code>/init</code> ausführen und in der CLAUDE.md festhalten, worum es geht
        und wie Claude mit dir reden soll (Deutsch, Du-Form, einfach erklären).</li>
        <li><strong>In kleinen Schritten bauen.</strong> Immer eine Sache auf einmal: „Bau zuerst nur die
        Eingabefelder." Ansehen. „Jetzt die Berechnung.“ Ansehen. So behältst du den Überblick.</li>
        <li><strong>Ausprobieren.</strong> Die App im Browser öffnen und testen. Fehler? Beschreibe Claude, was du
        siehst – er bessert nach.</li>
        <li><strong>Sichern mit Git.</strong> Wenn etwas funktioniert: Commit machen (oder machen lassen). So ist
        der gute Stand gespeichert.</li>
        <li><strong>Veröffentlichen.</strong> Wie bei dieser App über GitHub Pages oder Netlify online stellen –
        und aufs iPhone holen.</li>
      </ol>

      <p>Das Wichtigste, das du mitnimmst: <strong>Du musst nicht programmieren können.</strong> Du musst nur klar
      sagen, was du willst, in kleinen Schritten vorgehen und zwischendurch sichern. Den Rest macht Claude Code –
      und du lernst bei jedem Schritt ein bisschen mehr.</p>
    `,
    beispiel: {
      einleitung: "So startest du dein eigenes Mini-Projekt von Grund auf. Danach sprichst du einfach in normaler Sprache weiter mit Claude Code:",
      code: `cd Documents\\Claude_Code
mkdir mein-seminarrechner
cd mein-seminarrechner
claude

# In der Sitzung dann z. B.:
# "Bau mir eine einfache Web-Seite mit zwei Eingabefeldern
#  (Teilnehmer, Tagessatz) und einem Knopf, der den Preis zeigt.
#  Erkläre mir jeden Schritt in einfachen Worten."`,
      sprache: "powershell"
    },
    uebung: "Nimm deinen Satz aus Lektion 1. Lege dafür einen neuen Projektordner an, starte Claude Code, mach eine CLAUDE.md mit `/init` und bitte ihn, den ersten kleinen Teil zu bauen. Geh in kleinen Schritten vor und mach zwischendurch einen Commit. Du musst nicht fertig werden – es geht ums Erleben, dass du es selbst kannst.",
    quiz: [
      {
        frage: "Was ist der beste erste Schritt für ein eigenes Projekt?",
        optionen: [
          "Sofort alles auf einmal bauen lassen",
          "Die Idee in einem einzigen, kleinen Satz festhalten",
          "Zuerst programmieren lernen",
          "Einen Mac kaufen"
        ],
        richtig: 1,
        erklaerung: "Eine klare, kleine Idee in einem Satz ist der beste Start. Daraus lässt sich Schritt für Schritt etwas bauen."
      },
      {
        frage: "Wie gehst du beim Bauen am besten vor?",
        optionen: [
          "Alles gleichzeitig",
          "In kleinen Schritten, immer eine Sache, dazwischen ansehen",
          "Nur nachts",
          "Ohne jemals zu testen"
        ],
        richtig: 1,
        erklaerung: "Kleine Schritte, zwischendurch ansehen und testen – so behältst du den Überblick und Fehler fallen früh auf."
      },
      {
        frage: "Wann solltest du einen Commit machen?",
        optionen: [
          "Nie",
          "Nur ganz am Ende",
          "Immer wenn ein Stück funktioniert",
          "Nur wenn etwas kaputt ist"
        ],
        richtig: 2,
        erklaerung: "Sichere gute Zwischenstände mit einem Commit. Dann kannst du jederzeit sicher dorthin zurück."
      },
      {
        frage: "Was ist die wichtigste Erkenntnis dieser Lern-App?",
        optionen: [
          "Man muss Informatik studieren",
          "Du musst nicht programmieren können – klar sagen, was du willst, reicht",
          "Claude Code ist nur für Profis",
          "Ohne Mac geht nichts"
        ],
        richtig: 1,
        erklaerung: "Du brauchst keine Programmierausbildung. Klar formulieren, in kleinen Schritten vorgehen, sichern – den Rest übernimmt Claude Code."
      }
    ]
  }
];
