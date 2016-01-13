console.log("worker");

function tryFetch() {
  fetch("/")
    .then(function() {
        console.log("ok");
        tryFetch();
    })
    .catch(function(e) {
        console.log("ng");
        console.log(e);
        tryFetch();
    })
}

tryFetch();
