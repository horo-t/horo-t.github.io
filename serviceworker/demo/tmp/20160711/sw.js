self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    }
  });

  fetch("/loaded").then(r => r.text()).then(t => console.log(t));
