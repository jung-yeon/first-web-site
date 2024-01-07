var template = {
  html: function (list, title, body, control) {
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
  },
  list: function (filelist) {
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
  },
};

module.exports = template;
