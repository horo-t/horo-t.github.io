self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    }
  });

self.addEventListener('sync', function(event) {
    console.log('event.tag: "' + event.tag + '"');
    console.log('event.lastChance: ' + event.lastChance);
  });
