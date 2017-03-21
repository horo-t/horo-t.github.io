// fetch("global fetch");
self.onmessage = function (msg) {
  if (msg.data == 'fetch') {
    setTimeout(function(){
        fetch(msg.data)
          .then(res => res.text())
          .then(text => self.postMessage(text));
      }, 100);
  } else if (msg.data == 'syncXHR') {
    var request = new XMLHttpRequest();
    request.open('GET', msg.data, false);  // `false` makes the request synchronous
    request.send(null);
    self.postMessage(request.responseText);
  }
}
