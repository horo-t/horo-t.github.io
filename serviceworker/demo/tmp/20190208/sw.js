var VERSION = 1;
var ORIGIN = location.protocol + '//' + location.hostname +
             (location.port ? ':' + location.port : '');
var STATIC_CACHE_NAME = 'static_' + VERSION;
var HTML_PATH = './scope/test.html';
var STATIC_FILES = [
  HTML_PATH];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            return Promise.all(STATIC_FILES.map((url) => {
                return fetch(new Request(url)).then((res) => {
                    console.log('fetched ' + url );
                    if (res.ok)
                      return cache.put(url, res);
                    return Promise.reject(
                        'Invalid response.  URL:' + res.url +
                        ' Status: ' + res.status);
                  });
              }));
          }));
  });

self.addEventListener('fetch', function(event) {
  event.respondWith(new Promise((resolve, reject) => {
    var cache_p = caches.match(new Request(HTML_PATH),
                               {cacheName: STATIC_CACHE_NAME});
    cache_p.then((res) => resolve(res));
  }));
});
