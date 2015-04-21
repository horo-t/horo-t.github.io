self.addEventListener('install', function(event) {
    	caches.open('s').then( function( cache ) {
    		cache.put(
          '/test.js',
          new Response(
              'console.log("Hello!");',
              { headers: { 'content-type': 'application/javascript' }} ));
    	});
  });

self.addEventListener('fetch', function(e) {
    if (e.request.url.indexOf('test2.js') != -1) {
      e.respondWith(new Response('console.log("Hello2!");'));
      return;
    }
    e.respondWith( caches.match( e.request ).then(
  		function( response ) {
  			return response || fetch( e.request );
  		}));
 });
