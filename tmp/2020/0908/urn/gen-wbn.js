const wbn = require('wbn');
const fs = require('fs');

const scriptURL = 'http://localhost:8080/script.js';
const frameURL = 'urn:uuid:9f117f29-fb82-4b0e-9e69-cbf39cea3244';

const scriptContent = `
  let iframe = document.createElement('iframe');
  iframe.src = '${frameURL}';
  document.body.appendChild(iframe);
`;

const builder = (new wbn.BundleBuilder(scriptURL))
  .addExchange(scriptURL, 200, {'Content-Type': 'application/javascript'}, scriptContent)
  .addExchange(frameURL, 200, {'Content-Type': 'text/html'}, '<html>Hello, Web Bundle!</html>');
    
fs.writeFileSync('out.wbn', builder.createBundle());
