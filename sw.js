// Service Worker pour les notifications push des rappels médicaux
self.addEventListener('push', e => {
  const data = e.data.json();
  
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'pilule.png',
    badge: 'pilule.png',
    vibrate: [200, 100, 200],
    tag: 'medcoach-reminder',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Ouvrir',
        icon: 'check.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: 'close.png'
      }
    ]
  });
});

// Gérer les clics sur les notifications
self.addEventListener('notificationclick', e => {
  e.notification.close();
  
  if (e.action === 'open') {
    clients.matchAll({type: 'window', includeUncontrolled: true}).then(clientList => {
      if (clientList.length > 0) {
        clientList[0].focus();
      } else {
        clients.openWindow('/');
      }
    });
  }
});

// Fermeture des notifications
self.addEventListener('notificationclose', e => {
  console.log('Notification fermée:', e.notification.tag);
});
