
var req = new XMLHttpRequest;
req.responseType = "blob";
req.onreadystatechange = () => {
  console.log('readyState' + req.readyState);
};
req.open("GET", "data.txt", false);
req.send(null);
console.log('status ' + req.status);
console.log('response.size ' + req.response.size);
