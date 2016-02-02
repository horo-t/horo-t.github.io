var DUMMY_SCRIPT_URL_BASE = new Request('./dummy').url;
var CACHE_NAME = 'cache_name';

function createDummyScript(size) {
  var script = 'done();\n';
  while (script.length < size) {
    script += ' ';
  }
  return new Response(script);
}

self.addEventListener('install', function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return Promise.all([
              cache.put(DUMMY_SCRIPT_URL_BASE + '_small.js', createDummyScript(0)),
              cache.put(DUMMY_SCRIPT_URL_BASE + '_1m.js', createDummyScript(1024*1024)),
              cache.put(DUMMY_SCRIPT_URL_BASE + '_2m.js', createDummyScript(1024*1024*2)),
              cache.put(DUMMY_SCRIPT_URL_BASE + '_3m.js', createDummyScript(1024*1024*3)),
              cache.put(DUMMY_SCRIPT_URL_BASE + '_4m.js', createDummyScript(1024*1024*4)),
              cache.put(DUMMY_SCRIPT_URL_BASE + '_5m.js', createDummyScript(1024*1024*5))
            ]);
          }));
  });

self.addEventListener('fetch', function(event) {
    if (event.request.url.startsWith(DUMMY_SCRIPT_URL_BASE)) {
      event.respondWith(caches.match(event.request, {cacheName: CACHE_NAME}));
    }
  });
