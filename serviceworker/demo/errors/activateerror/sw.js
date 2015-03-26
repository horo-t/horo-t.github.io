self.addEventListener('activate', function(event) {
    event.waitUntil(new Promise(function(resolve, reject){
        reject();
    }));
  });
