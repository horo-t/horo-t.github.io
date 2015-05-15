self.addEventListener('fetch', function(event) {
      console.log(event.request.url);
      console.log(event.request.mode);
      console.log(event.request.credentials);
      for (var header of event.request.headers) {
        console.log(header[0] + " : " + header[1]);
      }
      event.respondWith(fetch(event.request));
  });
