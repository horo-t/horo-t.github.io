
self.addEventListener('activate', function(event) {
    event.waitUntil(
      Promise.all([
        self.registration.navigationPreload.enable(),
        self.registration.navigationPreload.setHeaderValue('abcd')
      ]));
  });

self.addEventListener('fetch', function(event) {
  if (event.preloadResponse) {
    event.respondWith(event.preloadResponse.then(
      res => {
        console.log(res);
        return res;
      },
      err => {
        console.log(err);
        return new Response("error");
      }
    ));
  }
});
