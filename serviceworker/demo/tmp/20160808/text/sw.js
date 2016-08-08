self.addEventListener('install', event => {
    event.waitUntil(caches.open('cache_name').then(cache =>
      cache.addAll(['header', 'footer'])));
});

self.addEventListener('fetch', event => {
    var url = event.request.url;
    if (!url.endsWith('.html'))
      return;
    event.respondWith(
      Promise.all(
          [caches.match('header'), fetch(url + '.txt'), caches.match('header')])
        .then(responses => Promise.all(responses.map(res => res.text())))
        .then(txt_list =>
          new Response(
            txt_list.join(''),
            {headers:[['content-type', 'text/html']]})));
  });
