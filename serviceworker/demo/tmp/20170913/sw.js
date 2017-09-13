self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
      return;
    }
    if (event.request.url.indexOf('redirect1') != -1) {
      event.respondWith(Response.redirect("./aa"));
      return;
    }
    if (event.request.url.indexOf('redirect2') != -1) {
      event.respondWith(Response.redirect("http://localhost:8000/redirected"));
      return;
    }
  });
