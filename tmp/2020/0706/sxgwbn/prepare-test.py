import json
import subprocess
import base64
import uuid

def start():
  certFile = "cert/cert.pem"
  privateKeyFile = "cert/priv.key"

  with open("sxg.html", "w") as outf:
    outf.write("<h1>Hello Signed Exchange</h1>")
  p = subprocess.run([
    "gen-certurl",
    "-pem", "./cert/cert.pem"],
    stdout=subprocess.PIPE)
  certUrl = "data:application/cert-chain+cbor;base64," + base64.b64encode(p.stdout).decode('utf-8')

  p = subprocess.run([
    "gen-signedexchange",
    "-uri", "https://sxg-demo.horo.jp/hello.html",
    "-validityUrl", "https://sxg-demo.horo.jp/hello.html.validity",
    "-content", "sxg.html",
    "-certificate", certFile,
    "-privateKey", privateKeyFile,
    "-certUrl", certUrl,
    "-o", "-"],
    stdout=subprocess.PIPE)
  sxg = base64.b64encode(p.stdout).decode('utf-8')

  scriptUrl = "urn:uuid:" + str(uuid.uuid4())
  sxgUrl = "urn:uuid:" + str(uuid.uuid4())

  bundleFname = "test.wbn"

  testHtml = "\n".join([
    "<head>",
    "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">",
    "</head>",
    "<script>",
      "function run() {",
    "    const wbn_path = 'test.wbn';",
    "    const wbn_url = new URL(wbn_path, location.href);",
    "",
    "    const link = document.createElement('link');",
    "    link.rel = 'webbundle';",
    "    link.href = wbn_path;",
    "    document.body.appendChild(link);",
    "",
    "    const script = document.createElement('script');",
    "    const script_url =",
    "      'package:' +",
    "      wbn_url.href.replace(/\//g, ',').replace(/\?/g, ';') +",
    "      '$' +",
    "      '%s';" % scriptUrl,
    "    console.log('Loading script ' + script_url);",
    "    script.src = script_url;",
    "    document.body.appendChild(script);",
    "  }",
    "</script>",
    "<div><input type=\"button\" onclick=\"run()\" value=\"run\"></div>"
  ])
  with open("sxgwbn.html", "w") as outf:
    outf.write(testHtml)

  script = [
    "(() => {",
    "  const wbn_url =",
    "      new URL('./%s', location.href).href;" % bundleFname,
    "  const url =",
    "     'package:' +",
    "      wbn_url.replace(/\\//g,',').replace(/\\?/g,';') +",
    "      '$' + '%s';" % sxgUrl,
    "  const i = document.createElement('iframe');",
    "  i.src = url;",
    "  i.width = 300;",
    "  i.height = 250;",
    "  document.body.appendChild(i);",
    "})();"]

  har = {"log": {"entries": []}}

  har["log"]["entries"].append({
    "request": {
      "method": "GET",
      "url": scriptUrl,
      "headers": []
    },
    "response": {
      "status": 200,
      "headers": [{
        "name": "Content-type",
        "value": "text/javascript"
      }],
      "content": {
        "text": "\n".join(script)
      }
    }
  })

  har["log"]["entries"].append({
    "request": {
      "method": "GET",
      "url": sxgUrl,
      "headers": []
    },
    "response": {
      "status": 200,
      "headers": [{
        "name": "Content-type",
        "value": "application/signed-exchange;v=b3"
      },{
        "name": "X-content-type-options",
        "value": "nosniff"
      }],
      "content": {
        "text": sxg,
        "encoding": "base64"
      }
    }
  })
  with open("test.har", "w") as outf:
    outf.write(json.dumps(har, indent=2))

  subprocess.run([
    "gen-bundle",
    "-har", "test.har",
    "-o", "test.wbn",
    "-primaryURL", scriptUrl])

  

if __name__ == "__main__":
  start()
