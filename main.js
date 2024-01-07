var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var template = require("./lib/template.js");
var path = require("path");

var sanitizehtml = require("sanitize-html");

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
        var list = template.list(filelist);
        var html = template.html(
          list,
          title,
          description,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
          var list = template.list(filelist);
          var title = queryData.id;
          var sanitizedTitle = sanitizehtml(title);
          var sanitizedDescription = sanitizehtml(description, {
            allowedTags: ["h1"],
          });
          var html = template.html(
            list,
            sanitizedTitle,
            sanitizedDescription,
            `<a href="/create">create</a>
               <a href="/update?id=${sanitizedTitle}">update</a>
               <form action="delete_process" method="post">
                <input type="hidden" name="id" value=${sanitizedTitle}>
                <input type="submit" value="delete">
              </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var title = "WEB - create";
      var list = template.list(filelist);
      var html = template.html(
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
      );
      response.writeHead(200);
      response.end(html);
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
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, "utf8", function (err, description) {
        var list = template.list(filelist);
        var title = queryData.id;
        var html = template.html(
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
        response.end(html);
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

app.listen(3000);
