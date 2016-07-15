self.addEventListener('fetch', function(event) {
    console.log("fetch event: " + event.request.url);
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    }
  });

  fetch("/loaded").then(r => r.text()).then(t => console.log(t));
