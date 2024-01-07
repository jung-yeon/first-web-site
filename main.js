var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
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
        var list = templateList(filelist);
        response.writeHead(200);
        response.end(
          templateHTML(list, title, description, `<a href="/create">create</a>`)
        );
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        var list = templateList(filelist);
        var title = queryData.id;
        fs.readFile(
          `data/${queryData.id}`,
          "utf8",
          function (err, description) {
            response.writeHead(200);
            response.end(
              templateHTML(
                list,
                title,
                description,
                `<a href="/create">create</a>
                 <a href="/update?id=${title}">update</a>
                 <form action="delete_process" method="post">
                  <input type="hidden" name="id" value=${title}>
                  <input type="submit" value="delete">
                </form>`
              )
            );
          }
        );
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var title = "WEB - create";
      var list = templateList(filelist);
      response.writeHead(200);
      response.end(
        templateHTML(
          list,
          title,
          `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"/></p>
          <p>
            <!-- 여러 줄 입력 -->
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>

      `,
          ""
        )
      );
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        // 302는 페이지를 다른 곳으로 redirection한다는 뜻
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", function (err, filelist) {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        var list = templateList(filelist);
        var title = queryData.id;
        var template = templateHTML(
          list,
          title,
          `<form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value=${title}></p>
            <p>
              <!-- 여러 줄 입력 -->
              <textarea name="description" placeholder="description" >${description}</textarea>
            </p>
            <p>
              <input type="submit" />
            </p>
          </form>
        `,
          `<a href="/create">create</a>
           <a href="/update?id=${title}">update</a> 
           <form action="delete_process" method="post">
                  <input type="hidden" name="id" value=${title}>
                  <input type="submit" value="delete">
           </form>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, "utf8", function (err) {
          // 302는 페이지를 다른 곳으로 redirection한다는 뜻
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`, function (error) {
        response.writeHead(302, { Location: "/" });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});

//HTML 본문 함수
function templateHTML(list, title, body, control) {
  var template = `<!DOCTYPE html>
        <html>
          <head>
            <title>WEB-${title}</title>
            <meta charset="utf-8" />
            <link rel="stylesheet" href="style.css" />
          </head>
          <body>
            <h1>
              <a href="/"><font color="lightblue">WEB</font></a>
            </h1>
            <div id="grid">
              ${list}
              ${control}
              <div id="article">
                <h2>${title}</h2>
                <p>
                  ${body}
                </p>
              </div>
            </div>
          </body>
        </html>
        `;
  return template;
}

//본문 전 list 함수
function templateList(filelist) {
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
  return list;
}
app.listen(3000);
