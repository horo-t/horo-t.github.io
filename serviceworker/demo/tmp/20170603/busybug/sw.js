
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
  event.respondWith(new Promise(resolve => {
    setTimeout(_ => { resolve(new Response("OK"));}, 5000)
  }));
});
