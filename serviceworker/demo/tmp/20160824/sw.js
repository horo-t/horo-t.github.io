self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    } else if (event.request.url.indexOf('dl') != -1) {
      event.respondWith(new Response('Hello world download test', {headers:[
        ['content-type', 'application/octet-stream; charset=utf-8'],
        ['Content-Disposition', 'attachment; filename=aho.txt']]
        }));
    }
  });
