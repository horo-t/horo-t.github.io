self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      fetch("empty?omit", {credentials:'omit'});
      fetch("empty?include", {credentials:'include'});
      fetch("empty?same-origin", {credentials:'same-origin'});
      event.respondWith(new Response('Hello world'));
    }
  });

