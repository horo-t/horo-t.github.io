self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('A').then(cache => cache.addAll(['sw.js', '/']))
    );
  });
self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    }
  });
