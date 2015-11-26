self.addEventListener('fetch', function(event) {
    console.log(new Date());
    console.log(event.request.url);
    console.log('isReload: ' + event.isReload);
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('isReload: ' + event.isReload));
    }
  });
