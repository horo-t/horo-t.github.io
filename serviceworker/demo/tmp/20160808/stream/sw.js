self.addEventListener('install', event => {
    event.waitUntil(caches.open('cache_name').then(cache =>
      cache.addAll(['header', 'footer'])));
});

self.addEventListener('fetch', event => {
    var url = event.request.url;
    if (!url.endsWith('.html'))
      return;

    var stream = new ReadableStream({
      start(controller) {
        var startFetch = caches.match('header');
        var endFetch = caches.match('footer');
        var middleFetch = fetch(url + '.txt');

        function pushStream(stream) {
          var reader = stream.getReader();
          return reader.read().then(function process(result) {
            if (result.done) return;
            controller.enqueue(result.value);
            return reader.read().then(process);
          });
        }

        startFetch
          .then(response => pushStream(response.body))
          .then(() => middleFetch)
          .then(response => pushStream(response.body))
          .then(() => endFetch)
          .then(response => pushStream(response.body))
          .then(() => controller.close());
      }
    });
    event.respondWith(
      new Response(
          stream,
          {headers:[['content-type', 'text/html']]}));
  });
