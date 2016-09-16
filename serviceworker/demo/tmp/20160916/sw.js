self.addEventListener('install', function(event) {
    event.addNavigationPreload();
  });

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  if (!event.preloadResponse) {
    console.log("event.preloadResponse is null");
    return;
  }
  if (event.request.url.indexOf('test') != -1) {
    event.respondWith(new Response('Hello world'));
  } else if (event.request.url.indexOf('early0') != -1) {
    console.log(event.preloadResponse);
  } else if (event.request.url.indexOf('early1') != -1) {
    console.log(event.preloadResponse);
    event.preloadResponse
      .then(r => {
          console.log(r);
          return r.text();
        })
      .then(text => console.log(text))
      .catch(e => console.log(e));
  } else if (event.request.url.indexOf('early2') != -1) {
    event.respondWith(event.preloadResponse);
  } else if (event.request.url.indexOf('early3') != -1) {
    event.waitUntil(
      event.preloadResponse
        .then(r => {
            console.log(r);
            return r.text();
          })
        .then(text => {
          console.log(text);},
          ee => {
            console.log(ee);
          }));
  } else if (event.request.url.indexOf('early4') != -1) {
    event.respondWith(
      event.preloadResponse
        .then(r => {
            console.log(r);
            return r.text();
          })
        .then(text => {
          console.log(text);
          return new Response("aaa")},
          ee => {
            console.log(ee);
          }));
  }
});
