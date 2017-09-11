
var req = new XMLHttpRequest;
req.responseType = "blob";
req.open("GET", "data.txt", false);
req.send(null);
console.log(req.status);
console.log(req.response.size);
