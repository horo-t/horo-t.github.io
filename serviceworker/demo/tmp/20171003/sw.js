self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      var res = new Response('<h1>test</h1>');
      res.headers.delete('content-type');
      event.respondWith(res);
    }
  });
