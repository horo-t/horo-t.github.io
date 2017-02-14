self.onmessage = function (msg) {
  fetch(msg.data).then(res => res.text()).then(text => self.postMessage(text))
}
