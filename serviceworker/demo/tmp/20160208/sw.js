self.addEventListener('install', function(event) {
    event.registerForeignFetch({scopes: [registration.scope],
                                origins: ['*']});
  });

self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response('Hello world'));
    }
  });

self.addEventListener('foreignfetch', function(event) {
    event.respondWith(new Response('Foreign Fetch'));
  });
