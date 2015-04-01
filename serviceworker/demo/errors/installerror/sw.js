self.addEventListener('install', function(event) {
    event.waitUntil(new Promise(function(resolve, reject){
        reject("install rejection");
    }));
  });
