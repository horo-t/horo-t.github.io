self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    }
  });
self.addEventListener('message', function(event) {
      event.waitUntil(fetch("./?" + Math.random()));
  });
