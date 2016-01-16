var VERSION = 1;
var STATIC_CACHE_NAME = 'static_' + VERSION;
var ORIGIN = location.protocol + '//' + location.hostname +
             (location.port ? ':' + location.port : '');
var STATIC_IMAGE_FILES =  [
    'sphereblur_512.png',
    'sphereblur_256.png',
    'ic_photo_black_24px.svg',
    'ic_save_black_24px.svg',
    'ic_loop_black_24px.svg',
    '4pt.svg',
    '7pt.svg',
    '10pt.svg'];
var SATATIC_FILES = [
  ORIGIN + '/jpeg_encoder_basic.js',
  ORIGIN + '/',
  ORIGIN + '/?homescreen'];

STATIC_IMAGE_FILES.forEach(function(x){
    SATATIC_FILES.push(ORIGIN + '/img/' + x);
  });

var STATIC_FILE_HASH = {};
SATATIC_FILES.forEach(function(x){ STATIC_FILE_HASH[x] = true; });

self.addEventListener('install', function(evt) {
  self.skipWaiting();
  var requests = SATATIC_FILES.map(function(url) {
    return new Request(url, {mode:'no-cors'});
  });
  evt.waitUntil(
      caches.open(STATIC_CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(requests)
            }));
});

self.addEventListener('activate', function(evt) {
  evt.waitUntil(
    self.clients.matchAll()
      .then(function(clients) {
          clients.forEach(function(client) {
              client.postMessage('reload');
            });
        })
      .then(function(clients) {
          return self.clients.claim();
        }));
});

self.addEventListener('fetch', function(evt) {
  if (STATIC_FILE_HASH[evt.request.url]) {
    evt.respondWith(
      caches.match(evt.request, {cacheName: STATIC_CACHE_NAME}));
    return;
  }
});
