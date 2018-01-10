self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response(
        'console.log("from SharedWorker in the Service Worker scope.")',
        ));
    }
  });
