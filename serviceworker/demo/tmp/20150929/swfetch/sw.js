
self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    } else {
      event.respondWith(fetch(event.request));
    }

  });
