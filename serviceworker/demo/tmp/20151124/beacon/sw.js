self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    }
  });
