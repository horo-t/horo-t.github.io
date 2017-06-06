
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


self.pendingNavigationRequests = new Set();

function respondWith(event, response) {
  event.respondWith(
    Promise.resolve(response).then((resp) => {
      if (event.request.mode === 'navigate') {
        self.pendingNavigationRequests.delete(event);
      }
      return resp;
    })
  );
}

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    self.pendingNavigationRequests.add(event);
  }
  console.log("fetch event " + event.request.url);
  if (event.request.url.indexOf('bypass_sw') != -1) {
    event.preloadResponse
      .then(r => {
          console.log('response ok');
          if (r)
            return r.text();
        })
      .then(text => {
          console.log('text ok');
          self.pendingNavigationRequests.delete(event);
        })
      .catch(text => {
          console.log('catch');
          self.pendingNavigationRequests.delete(event);
        });
    setTimeout(_ => {self.gc();}, 0);
    return;
  }
  respondWith(event, event.preloadResponse);
  // Need to add --js-flags="--expose-gc" to the flags.
  setTimeout(_ => {self.gc();}, 0);
});
