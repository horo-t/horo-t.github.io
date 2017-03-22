
self.addEventListener('activate', function(event) {
    event.waitUntil(self.registration.navigationPreload.enable());
  });

self.addEventListener('fetch', function(event) {
    // event.respondWith(new Response('test'));
    if (event.request.url.indexOf('NoWaitUntil.html') != -1) {
      return;
    }
    if (event.request.url.indexOf('NoWaitUntil.html') != -1) {
      event.waitUntil(event.preloadResponse);
      return;
    }
  });
