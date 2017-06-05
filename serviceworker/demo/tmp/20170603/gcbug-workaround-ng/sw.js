
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

// Copied from crbug.com/728013#c39
function respondWith(event, response) {
  event.respondWith(
    Promise.resolve(response).then((resp) => {
      if (Math.random() === -1) {
        return event;
      }
      return resp;
    })
  );
}

self.addEventListener('fetch', event => {
  console.log("fetch event");
  respondWith(event, event.preloadResponse);
  // Need to add --js-flags="--expose-gc" to the flags.
  setTimeout(_ => {self.gc();}, 0);
});
