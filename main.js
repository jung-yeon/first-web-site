var http = require("http");
var fs = require("fs");
var url = require("url");
var app = http.createServer(function (request, response) {
  var _url = request.url;
  //url을 분석하는 코드
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      var title = "Welcome";
      var description = "Hello, Node.js";
      var template = `<!DOCTYPE html>
        <html>
          <head>
            <title>WEB1-html</title>
            <meta charset="utf-8" />
            <link rel="stylesheet" href="style.css" />
          </head>
          <body>
            <h1>
              <a href="/"><font color="lightblue">WEB</font></a>
            </h1>
            <div id="grid">
              <ol>
                <li>
                  <a href="/?id=HTML"><font color="blue">HTML</font></a>
                </li>
                <li>
                  <a href="/?id=CSS"><font color="blue">CSS</font></a>
                </li>
                <li>
                  <a href="/?id=JavaScript"><font color="blue">JavaScript</font></a>
                </li>
              </ol>
              <div id="article">
                <h2>${title}</h2>
                <p>
                  ${description}
                </p>
              </div>
            </div>
          </body>
        </html>
        `;
      response.writeHead(200);
      response.end(template);
    } else {
      var title = queryData.id;
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        var template = `<!DOCTYPE html>
        <html>
          <head>
            <title>WEB1-html</title>
            <meta charset="utf-8" />
            <link rel="stylesheet" href="style.css" />
          </head>
          <body>
            <h1>
              <a href="/"><font color="lightblue">WEB</font></a>
            </h1>
            <div id="grid">
              <ol>
                <li>
                  <a href="/?id=HTML"><font color="blue">HTML</font></a>
                </li>
                <li>
                  <a href="/?id=CSS"><font color="blue">CSS</font></a>
                </li>
                <li>
                  <a href="/?id=JavaScript"><font color="blue">JavaScript</font></a>
                </li>
              </ol>
              <div id="article">
                <h2>${title}</h2>
                <p>
                  ${description}
                </p>
              </div>
            </div>
          </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
