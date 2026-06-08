const CACHE = 'kundali-milan-v2';
const STATIC = ['/', '/index.html', '/compatibility_logic.js', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Bypass cache for external APIs
  if (url.origin === 'https://bhargava-panchangam.onrender.com') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
