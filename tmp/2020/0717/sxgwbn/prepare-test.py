import json
import subprocess
import base64
import uuid

def start():
  certFile = "cert/cert.pem"
  privateKeyFile = "cert/priv.key"

  pageUrl = "https://sxg-demo.horo.jp/hello.html"
  scriptUrl = "https://sxg-demo.horo.jp/load_iframe.js"

  with open("sxg.html", "w") as outf:
    outf.write("<h1>Hello Signed Exchange</h1>")
  p = subprocess.run([
    "gen-certurl",
    "-pem", "./cert/cert.pem"],
    stdout=subprocess.PIPE)
  certUrl = "data:application/cert-chain+cbor;base64," + base64.b64encode(p.stdout).decode('utf-8')

  p = subprocess.run([
    "gen-signedexchange",
    "-uri", pageUrl,
    "-validityUrl", pageUrl + ".validity",
    "-content", "sxg.html",
    "-certificate", certFile,
    "-privateKey", privateKeyFile,
    "-certUrl", certUrl,
    "-expire", "168h0m0s",
    "-o", "-"],
    stdout=subprocess.PIPE)
  sxg = base64.b64encode(p.stdout).decode('utf-8')

  bundleFname = "test.wbn"

  testHtml = "\n".join([
    "<head>",
    "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">",
    "</head>",
    "<script>",
      "function run() {",
    "    const wbn_path = 'test.wbn';",
    "    const script_url = '%s';" % scriptUrl,
    "",
    "    const link = document.createElement('link');",
    "    link.rel = 'webbundle';",
    "    link.href = wbn_path;",
    "    link.resources = script_url;",
    "    document.body.appendChild(link);",
    "",
    "    const script = document.createElement('script');",
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
    "  const links = document.getElementsByTagName('link')",
    "  for (let i = 0;i < links.length; ++i) {",
    "    if (links[i].rel === 'webbundle' &&",
    "        links[i].resources.contains('%s')) {" % scriptUrl,
    "      links[i].resources.add('%s');" % pageUrl,
    "    }",
    "  }",
    "  const url = '%s';" % pageUrl,
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
      "url": pageUrl,
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
