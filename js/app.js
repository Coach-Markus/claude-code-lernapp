/*
  app.js
  --------------------------------------------------------------------
  Die Logik der App. Nutzt die Daten aus js/lektionen.js.
  - baut die Übersicht und die einzelnen Lektionen
  - wertet die Quizfragen aus
  - speichert den Fortschritt lokal im Gerät (localStorage)
  - schaltet zwischen Hell und Dunkel um
  Kein Framework, reines JavaScript – damit du jede Zeile lesen kannst.
*/

(function () {
  "use strict";

  /* ---- Kleine Helfer für den Speicher (robust, falls er blockiert ist) ---- */
  var SPEICHER_SCHLUESSEL = "cclern:fortschritt";
  var THEMA_SCHLUESSEL = "cclern:thema";

  function ladeFortschritt() {
    try {
      var roh = localStorage.getItem(SPEICHER_SCHLUESSEL);
      return roh ? JSON.parse(roh) : {};
    } catch (e) {
      return {};
    }
  }

  function speichereFortschritt(daten) {
    try {
      localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(daten));
    } catch (e) {
      /* Im privaten Modus kann Speichern fehlschlagen – die App läuft trotzdem. */
    }
  }

  var fortschritt = ladeFortschritt();

  function istErledigt(nummer) {
    return !!(fortschritt[nummer] && fortschritt[nummer].erledigt);
  }

  /* ----------------------------- Thema (Dark Mode) ----------------------------- */
  function wendeThemaAn(thema) {
    document.documentElement.setAttribute("data-theme", thema);
    var knopf = document.getElementById("thema-knopf");
    if (knopf) {
      knopf.textContent = thema === "dark" ? "☀️ Hell" : "🌙 Dunkel";
      knopf.setAttribute("aria-label", thema === "dark" ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln");
    }
  }

  function aktuellesThema() {
    try {
      var gespeichert = localStorage.getItem(THEMA_SCHLUESSEL);
      if (gespeichert) return gespeichert;
    } catch (e) {}
    // Standard: dem System folgen
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function themaUmschalten() {
    var neu = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    wendeThemaAn(neu);
    try { localStorage.setItem(THEMA_SCHLUESSEL, neu); } catch (e) {}
  }

  /* ----------------------------- Text sicher einsetzen ----------------------------- */
  function escape(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /* ----------------------------- Ansicht: Übersicht ----------------------------- */
  function zeigeUebersicht() {
    window.scrollTo(0, 0);
    var erledigt = LEKTIONEN.filter(function (l) { return istErledigt(l.nummer); }).length;
    var prozent = Math.round((erledigt / LEKTIONEN.length) * 100);

    var html = "";
    html += '<section class="intro">';
    html += '<h2>Claude Code lernen</h2>';
    html += '<p class="intro-text">Neun ruhige Lektionen – vom ersten Befehl bis zur eigenen App. ' +
            'Jede Lektion hat eine Erklärung, ein Beispiel zum Abtippen, eine Übung und ein kurzes Quiz. ' +
            'Dein Fortschritt bleibt auf diesem Gerät.</p>';
    html += '<div class="fortschritt-leiste" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + prozent + '">';
    html += '<div class="fortschritt-fuellung" style="width:' + prozent + '%"></div>';
    html += '</div>';
    html += '<p class="fortschritt-text">' + erledigt + ' von ' + LEKTIONEN.length + ' Lektionen abgeschlossen</p>';
    html += '</section>';

    html += '<ol class="lektionsliste">';
    LEKTIONEN.forEach(function (l) {
      var fertig = istErledigt(l.nummer);
      html += '<li><button class="lektions-karte' + (fertig ? ' erledigt' : '') + '" data-nummer="' + l.nummer + '">';
      html += '<span class="karte-nummer">' + l.nummer + '</span>';
      html += '<span class="karte-inhalt">';
      html += '<span class="karte-titel">' + escape(l.titel) + '</span>';
      html += '<span class="karte-dauer">' + escape(l.dauer) + '</span>';
      html += '</span>';
      html += '<span class="karte-status" aria-hidden="true">' + (fertig ? '✓' : '›') + '</span>';
      html += '</button></li>';
    });
    html += '</ol>';

    var app = document.getElementById("app");
    app.innerHTML = html;

    var karten = app.querySelectorAll(".lektions-karte");
    for (var i = 0; i < karten.length; i++) {
      karten[i].addEventListener("click", function () {
        zeigeLektion(parseInt(this.getAttribute("data-nummer"), 10));
      });
    }
  }

  /* ----------------------------- Ansicht: eine Lektion ----------------------------- */
  function zeigeLektion(nummer) {
    window.scrollTo(0, 0);
    var lektion = LEKTIONEN.filter(function (l) { return l.nummer === nummer; })[0];
    if (!lektion) { zeigeUebersicht(); return; }

    var html = "";
    html += '<button class="zurueck" id="zurueck-knopf">‹ Übersicht</button>';

    html += '<article class="lektion">';
    html += '<header class="lektion-kopf">';
    html += '<p class="lektion-marke">Lektion ' + lektion.nummer + ' von ' + LEKTIONEN.length + ' · ' + escape(lektion.dauer) + '</p>';
    html += '<h2>' + escape(lektion.titel) + '</h2>';
    html += '</header>';

    // Erklärung (enthält bewusst HTML aus den Lektionsdaten)
    html += '<div class="erklaerung">' + lektion.erklaerung + '</div>';

    // Beispiel
    if (lektion.beispiel) {
      html += '<section class="block beispiel-block">';
      html += '<h3>📋 Beispiel zum Abtippen</h3>';
      if (lektion.beispiel.einleitung) {
        html += '<p>' + escape(lektion.beispiel.einleitung) + '</p>';
      }
      html += '<div class="code-box">';
      html += '<span class="code-label">' + escape(lektion.beispiel.sprache || "") + '</span>';
      html += '<button class="kopieren" type="button">Kopieren</button>';
      html += '<pre><code>' + escape(lektion.beispiel.code) + '</code></pre>';
      html += '</div>';
      html += '</section>';
    }

    // Übung
    if (lektion.uebung) {
      html += '<section class="block uebung-block">';
      html += '<h3>✍️ Deine Übung</h3>';
      html += '<p>' + escape(lektion.uebung) + '</p>';
      html += '</section>';
    }

    // Quiz
    if (lektion.quiz && lektion.quiz.length) {
      html += '<section class="block quiz-block" id="quiz">';
      html += '<h3>🧠 Quiz</h3>';
      html += '<p class="quiz-hinweis">Beantworte alle Fragen. Du bekommst sofort Rückmeldung.</p>';
      lektion.quiz.forEach(function (frage, fi) {
        html += '<div class="frage" data-frage="' + fi + '">';
        html += '<p class="frage-text">' + (fi + 1) + '. ' + escape(frage.frage) + '</p>';
        html += '<div class="optionen">';
        frage.optionen.forEach(function (opt, oi) {
          html += '<button class="option" data-frage="' + fi + '" data-option="' + oi + '">' + escape(opt) + '</button>';
        });
        html += '</div>';
        html += '<p class="frage-erklaerung" hidden>' + escape(frage.erklaerung) + '</p>';
        html += '</div>';
      });
      html += '<div class="quiz-ergebnis" id="quiz-ergebnis" hidden></div>';
      html += '</section>';
    }

    // Navigation unten
    html += '<nav class="lektion-nav">';
    if (lektion.nummer > 1) {
      html += '<button class="nav-knopf" data-ziel="' + (lektion.nummer - 1) + '">‹ Vorherige</button>';
    } else {
      html += '<span></span>';
    }
    if (lektion.nummer < LEKTIONEN.length) {
      html += '<button class="nav-knopf naechste" data-ziel="' + (lektion.nummer + 1) + '">Nächste ›</button>';
    } else {
      html += '<button class="nav-knopf naechste" data-ziel="0">Zur Übersicht ✓</button>';
    }
    html += '</nav>';

    html += '</article>';

    var app = document.getElementById("app");
    app.innerHTML = html;

    verdrahteLektion(lektion);
  }

  /* ----------------------------- Interaktion einer Lektion ----------------------------- */
  function verdrahteLektion(lektion) {
    var app = document.getElementById("app");

    document.getElementById("zurueck-knopf").addEventListener("click", zeigeUebersicht);

    var navKnoepfe = app.querySelectorAll(".nav-knopf");
    for (var n = 0; n < navKnoepfe.length; n++) {
      navKnoepfe[n].addEventListener("click", function () {
        var ziel = parseInt(this.getAttribute("data-ziel"), 10);
        if (ziel === 0) { zeigeUebersicht(); } else { zeigeLektion(ziel); }
      });
    }

    // Kopieren-Knopf
    var kopierKnopf = app.querySelector(".kopieren");
    if (kopierKnopf) {
      kopierKnopf.addEventListener("click", function () {
        var code = app.querySelector(".code-box code").textContent;
        var knopf = this;
        function erfolg() { knopf.textContent = "Kopiert ✓"; setTimeout(function () { knopf.textContent = "Kopieren"; }, 1500); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(erfolg, function () { knopf.textContent = "Bitte manuell markieren"; });
        } else {
          knopf.textContent = "Bitte manuell markieren";
        }
      });
    }

    // Quiz
    if (!lektion.quiz || !lektion.quiz.length) return;

    var beantwortet = {}; // frageIndex -> true

    var optionKnoepfe = app.querySelectorAll(".option");
    for (var i = 0; i < optionKnoepfe.length; i++) {
      optionKnoepfe[i].addEventListener("click", function () {
        var fi = parseInt(this.getAttribute("data-frage"), 10);
        var oi = parseInt(this.getAttribute("data-option"), 10);
        if (beantwortet[fi]) return; // schon beantwortet

        beantwortet[fi] = true;
        var frage = lektion.quiz[fi];
        var frageBox = app.querySelector('.frage[data-frage="' + fi + '"]');
        var alle = frageBox.querySelectorAll(".option");

        for (var k = 0; k < alle.length; k++) {
          var ko = parseInt(alle[k].getAttribute("data-option"), 10);
          alle[k].disabled = true;
          if (ko === frage.richtig) { alle[k].classList.add("richtig"); }
          if (ko === oi && oi !== frage.richtig) { alle[k].classList.add("falsch"); }
        }

        var erkl = frageBox.querySelector(".frage-erklaerung");
        erkl.hidden = false;
        erkl.classList.add(oi === frage.richtig ? "ok" : "nok");

        pruefeQuizAbschluss(lektion, beantwortet, app);
      });
    }
  }

  function pruefeQuizAbschluss(lektion, beantwortet, app) {
    var anzahl = lektion.quiz.length;
    var gezaehlt = 0, richtige = 0;
    for (var fi = 0; fi < anzahl; fi++) {
      if (beantwortet[fi]) {
        gezaehlt++;
        // richtig erkennbar an der markierten Klasse
        var frageBox = app.querySelector('.frage[data-frage="' + fi + '"]');
        var gewaehlt = frageBox.querySelector(".option.falsch");
        if (!gewaehlt) richtige++; // keine falsche Markierung = richtig beantwortet
      }
    }
    if (gezaehlt < anzahl) return;

    // Alle Fragen beantwortet → Lektion als erledigt speichern
    fortschritt[lektion.nummer] = { erledigt: true, punkte: richtige, von: anzahl };
    speichereFortschritt(fortschritt);

    var ergebnis = document.getElementById("quiz-ergebnis");
    var lob = richtige === anzahl ? "Alles richtig – stark! 🎉" :
              richtige >= anzahl - 1 ? "Fast alles richtig – sehr gut! 👏" :
              "Geschafft. Lies die Erklärungen in Ruhe nach. 🌱";
    ergebnis.hidden = false;
    ergebnis.innerHTML = '<p class="ergebnis-zeile">' + richtige + ' von ' + anzahl + ' richtig. ' + lob + '</p>' +
      '<p class="ergebnis-notiz">Lektion als abgeschlossen gespeichert.</p>';
  }

  /* ----------------------------- Service Worker (Offline) ----------------------------- */
  function registriereServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js").catch(function () {
          /* Offline-Funktion nicht verfügbar – App läuft trotzdem online. */
        });
      });
    }
  }

  /* ----------------------------- Start ----------------------------- */
  function start() {
    wendeThemaAn(aktuellesThema());
    var themaKnopf = document.getElementById("thema-knopf");
    if (themaKnopf) themaKnopf.addEventListener("click", themaUmschalten);

    var titel = document.getElementById("kopf-titel");
    if (titel) titel.addEventListener("click", zeigeUebersicht);

    zeigeUebersicht();
    registriereServiceWorker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
