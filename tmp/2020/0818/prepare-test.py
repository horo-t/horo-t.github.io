import json
import subprocess
import base64
import uuid

def start():
    
  with open("inabox-creative.html") as inf:
    inaboxCreative = inf.read()
  for i in range(10):
    buildWebbundle(inaboxCreative, i)


def buildWebbundle(inaboxCreative, index):
  indexStr = str(index + 1).zfill(2)
  bundleFname = indexStr + ".wbn"
  harFname = indexStr + ".har"
  scriptUrl = "https://example.com/" + indexStr + '.js'
  subframeHtmlUrl = "urn:uuid:" + str(uuid.uuid4())

  script = "\n".join([
    "(() => {",
    "  const script_url = '%s';" % scriptUrl,
    "  const subframe_url = '%s';" % subframeHtmlUrl,
    "  document.body.querySelectorAll('link').forEach((link) => {",
    "    if (link.rel == 'webbundle' &&",
    "        link.resources.contains(script_url)) {",
    "      link.resources.add(subframe_url);",
    "    }",
    "  });",
    "  const i = document.createElement('iframe');",
    "  i.src = subframe_url;",
    "  i.width = 300;",
    "  i.height = 250;",
    "  document.body.appendChild(i);",
    "})();"])

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
        "text": script
      }
    }
  })

  har["log"]["entries"].append({
    "request": {
      "method": "GET",
      "url": subframeHtmlUrl,
      "headers": []
    },
    "response": {
      "status": 200,
      "headers": [{
        "name": "Content-type",
        "value": "text/html"
      }],
      "content": {
        "text": inaboxCreative
      }
    }
  })
  with open("out/" + harFname, "w") as outf:
    outf.write(json.dumps(har, indent=2))

  subprocess.run([
    "gen-bundle",
    "-har", "out/" + harFname,
    "-o", "out/" + indexStr + ".wbn",
    "-primaryURL", scriptUrl])


  

if __name__ == "__main__":
  start()
