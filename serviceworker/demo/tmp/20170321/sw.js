
self.addEventListener('activate', function(event) {
    event.waitUntil(self.registration.navigationPreload.enable());
  });

self.addEventListener('fetch', function(event) {
    event.respondWith(new Response('test'));
  });
