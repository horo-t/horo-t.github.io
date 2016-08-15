console.log("shared worker");

var lastEvent = undefined;
self.onconnect = function(e) {
  console.log("onconnect");
  lastEvent = e;
  var port = e.ports[0];

  port.addEventListener('message', function(e) {
    var workerResult = 'message: ';
    lastEvent = e;
    port.postMessage(workerResult);
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
