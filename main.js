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
      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = "<ul>";
        var i = 0;
        while (i < filelist.length) {
          list =
            list +
            `<li>
            <a href="/?id=${filelist[i]}"><font color="blue">${filelist[i]}</font></a>
                </li>`;
          i += 1;
        }
        list = list + "</ul>";

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
              ${list}
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
    } else {
      fs.readdir("./data", function (err, filelist) {
        var list = "<ul>";
        var i = 0;
        while (i < filelist.length) {
          list =
            list +
            `<li>
            <a href="/?id=${filelist[i]}"><font color="blue">${filelist[i]}</font></a>
                </li>`;
          i += 1;
        }
        list = list + "</ul>";

        var title = queryData.id;
        fs.readFile(
          `data/${queryData.id}`,
          "utf8",
          function (err, description) {
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
              ${list}
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
          }
        );
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
