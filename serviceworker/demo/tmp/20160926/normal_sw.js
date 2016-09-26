function busySleep(millisec)
{
    var start = new Date();
    var date = null;
    do {
      date = new Date();
    } while(date - start < millisec);
}

// Simulate heavy Service Worker script.
busySleep(500);

self.addEventListener('install', function(event) {
  });

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
});
