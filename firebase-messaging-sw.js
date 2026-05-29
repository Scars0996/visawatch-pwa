// Firebase messaging service worker
// This file MUST be named firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB93ukMEi9HBPMFHUbVqR8unpPiKFSf3I0",
  authDomain: "visawatch-68a06.firebaseapp.com",
  projectId: "visawatch-68a06",
  storageBucket: "visawatch-68a06.firebasestorage.app",
  messagingSenderId: "295007262171",
  appId: "1:295007262171:web:f2bc32d6ad6232bd4803fe"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || '🚨 Créneau BLS Espagne ouvert !', {
    body: body || 'Réservez votre rendez-vous maintenant !',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [300, 100, 300, 100, 600],
    requireInteraction: true,
    tag: 'visa-slot',
    actions: [
      { action: 'book', title: '📅 Réserver maintenant' },
      { action: 'dismiss', title: 'Ignorer' }
    ]
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'book' || !e.action) {
    e.waitUntil(clients.openWindow('https://algeria.blsspainglobal.com/DZA/account/login'));
  }
});
