importScripts('jsgif/GIFEncoder.js');
importScripts('jsgif/LZWEncoder.js');
importScripts('jsgif/NeuQuant.js');

self.onmessage = function(event) {
  var imageData = event.data.imageData;
  var encoder = new GIFEncoder()
  encoder.setRepeat(0);
  encoder.setQuality(1);
  encoder.setSize(imageData.width, imageData.height);
  encoder.setDelay(500);
  encoder.start();
  encoder.addFrame(imageData.data, true);
  encoder.finish();
  var data = encoder.stream().getData();
  self.postMessage({"id": event.id, "data": data});
};
