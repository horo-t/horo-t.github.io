self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(
          self.clients.matchAll()
           .then(function(clients){
              var results = 'clients.length: ' + clients.length + "\n";
              for(var i=0;i< clients.length; ++i) {
                var c = clients[i];
                results += "------------------\n";
                results += " url: " + c.url + "\n";
                results += " focused: " + c.focused + "\n";
                results += " frameType: " + c.frameType + "\n";
                results += " id: " + c.id + "\n";
                results += " visibilityState: " + c.visibilityState + "\n";
              }
              return new Response(results);
            }));
    }
  });
