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
    e.respondWith( caches.match( e.request ).then(
  		function( response ) {
  			return response || fetch( e.request );
  		}));
 });
