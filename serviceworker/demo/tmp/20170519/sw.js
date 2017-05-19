
self.addEventListener('activate', event => {
  if (!self.registration.navigationPreload) {
    console.error('registration.navigationPreload not found');
    return;
  }
  event.waitUntil(registration.navigationPreload.enable());
});

self.addEventListener('fetch', event => {
  if (!event.preloadResponse) {
    console.error('event.preloadResponse not found');
    event.respondWith(new Response('error'));
    return;
  }
  event.respondWith(
    event.preloadResponse.then(response => {
      if (!response) {
        console.log('-- Navigation preload is disabled --');
        return new Response('error');
      }
      return response.text().then(text => {
        console.log('-- Navigation preload response --');
        console.log(text);
        console.log('---------------------------------');
        var entries = performance.getEntriesByName(event.request.url);
        var entry = entries[entries.length - 1];
        var body = '<div>Navigation preload demo</div>';
        if (entries.length == 0) {
          body += '<h2>No performance information of navigation preload</h2>' +
                  '<div>It is availabe from Chrome 60. ' +
                  'See <a href="//crbug.com/712809">crbug.com/712809</a></div>';
        } else {
          if (entries.length == 1) {
            body += '<h2>This is the first request</h2>';
          }
          body += '<pre>' + JSON.stringify(entry, null, 2) + '</pre>';
        }
        return new Response(body,
                            {headers: [['content-type', 'text/html']]})
      })
    }));
});
