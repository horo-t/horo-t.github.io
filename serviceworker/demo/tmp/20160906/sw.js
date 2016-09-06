self.addEventListener('install', function(event) {
    self.enablePreflightRequest();
  });

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf('test') != -1) {
    event.respondWith(new Response('Hello world'));
  } else if (event.request.url.indexOf('early0') != -1) {
    console.log(event.earlyResponse);
  } else if (event.request.url.indexOf('early1') != -1) {
    console.log(event.earlyResponse);
    event.earlyResponse
      .then(r => {
          console.log(r);
          return r.text();
        })
      .then(text => console.log(text));
  } else if (event.request.url.indexOf('early2') != -1) {
    event.respondWith(event.earlyResponse);
  }
});
