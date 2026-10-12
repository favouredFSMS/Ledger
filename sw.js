// Favoured Ledgal — Offline-first PWA Service Worker
const CACHE_NAME = 'favoured-ledgal-offline-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favoured-logo.png'
];

// Precache everything the app needs after its first successful online visit.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Clean obsolete app versions and take control immediately after an update.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => key === CACHE_NAME ? null : caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Cache-first means the installed app opens without a connection. The latest index is refreshed quietly when online.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => {
        if (cached) {
          // Revalidate quietly when the device is online; the cached app still opens immediately.
          fetch(event.request)
            .then((response) => {
              if (response && response.ok) return caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', response.clone()));
            })
            .catch(() => undefined);
          return cached;
        }
        return fetch(event.request).catch(() => caches.match('./index.html'));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          if (event.request.destination === 'image') return caches.match('./icons/icon-192.png');
          return caches.match('./index.html');
        });
    })
  );
});
