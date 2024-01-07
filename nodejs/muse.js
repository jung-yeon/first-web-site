//모듈 사용
// var M = {
//   v: "v",
//   f: function () {
//     console.log(this.v);
//   },
// };

//./는 현재 디렉토리라는 뜻
var part = require("./mpart.js");
console.log(part);
part.f();
