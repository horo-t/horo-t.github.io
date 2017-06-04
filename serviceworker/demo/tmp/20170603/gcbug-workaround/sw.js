
self.addEventListener('install', event => {
  if (!self.registration.navigationPreload) {
    var err = 'registration.navigationPreload not found';
    console.error(err);
    event.waitUntil(Promise.reject(err));
    return;
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(registration.navigationPreload.enable());
});

self.addEventListener('fetch', event => {
  console.log("fetch event");
  event.respondWith(event.preloadResponse
    .then(response => {
      console.log("preloadResponse resolved");
      // [HACK] Just to keep the FetchEvent for crbug.com/728013.
      event;
      return response;
    }));
  // Need to add --js-flags="--expose-gc" to the flags.
  setTimeout(_ => {self.gc();}, 0);
});
