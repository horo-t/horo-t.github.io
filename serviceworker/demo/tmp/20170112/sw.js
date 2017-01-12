self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('/scope/index.html') != -1) {
      return;
    }
    var headersText = ""
    for (var header of event.request.headers) {
      headersText += header[0] + ": " + header[1] + "\n";
    }
    console.log("Request headers in SW \n" + headersText);
    event.respondWith(new Response(res));
  });
