const CACHE = 'visawatch-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || '🚨 Créneau BLS ouvert !', {
      body: data.body || 'Réservez immédiatement !',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [300, 100, 300, 100, 600],
      requireInteraction: true,
      actions: [
        { action: 'book', title: '📅 Réserver' },
        { action: 'dismiss', title: 'Ignorer' }
      ]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'book' || !e.action) {
    e.waitUntil(clients.openWindow('https://algeria.blsspainglobal.com/DZA/account/login'));
  }
});
