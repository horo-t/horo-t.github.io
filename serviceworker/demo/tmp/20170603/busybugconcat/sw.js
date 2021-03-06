
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

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    self.pendingNavigationRequests.add(event);
  }

  var delayHeaderPromise = new Promise(resolve => {
    setTimeout(_ => {
      fetch('./scope/header.html').then(resolve);
    }, 1000);
  })

  event.respondWith(
    Promise.all([delayHeaderPromise, event.preloadResponse])
      .then(responses => Promise.all(responses.map(res => res.text())))
      .then(texts => {
        if (event.request.mode === 'navigate') {
          self.pendingNavigationRequests.delete(event);
        }
        return new Response(texts[0] + texts[1],
                            {headers: [['content-type', 'text/html']]});
      })
  );
});
