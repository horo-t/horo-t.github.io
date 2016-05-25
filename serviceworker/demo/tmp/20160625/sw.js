self.addEventListener('fetch', function(event) {
    if (event.request.url.indexOf('test') != -1) {
      event.respondWith(new Response(
          '<body></body><script>\n' +
          'document.body.appendChild(document.createTextNode(' +
          'performance.timing.responseEnd - performance.timing.navigationStart' +
          '))' +
          '</script>\n' ,
          {headers: [['Content-Type', 'Text/Html']]}));
    }
  });
