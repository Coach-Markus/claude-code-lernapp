/*
  service-worker.js
  --------------------------------------------------------------------
  Macht die App offline-fähig. Beim ersten Besuch werden alle Dateien
  in einem Zwischenspeicher (Cache) abgelegt. Danach lädt die App auch
  ohne Internet.

  WICHTIG: Wenn du Dateien änderst, erhöhe CACHE_VERSION (z. B. v2, v3).
  Nur dann holt sich das Gerät die neue Version.
*/

const CACHE_VERSION = "cclern-v1";

// Alle Dateien, die zur App gehören. Pfade relativ ("./"), damit es auch
// in einem Unterordner (z. B. bei GitHub Pages) funktioniert.
const DATEIEN = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/lektionen.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

// 1. Installation: Dateien in den Cache legen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(DATEIEN))
  );
  self.skipWaiting();
});

// 2. Aktivierung: alte Caches aufräumen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((namen) =>
      Promise.all(
        namen.filter((n) => n !== CACHE_VERSION).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// 3. Anfragen: zuerst im Cache schauen, sonst aus dem Netz holen
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((treffer) => {
      if (treffer) return treffer;
      return fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});
