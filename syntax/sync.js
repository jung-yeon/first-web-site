var fs = require("fs");

//readFildSync
/*
console.log("A");
//Sync가 있으면 동기적
// 없으면 비동기 (없는걸 선호 누가? nodejs가)
var result = fs.readFileSync("syntax/sample.txt", "utf8");
console.log(result);
console.log("C");
*/

console.log("A");
// Sync가 있으면 동기적
// 없으면 비동기 (없는걸 선호 누가? nodejs가)
// readFile은 return값이 아님
// but, readFileSync은 return값임
fs.readFile("syntax/sample.txt", "utf8", function (err, result) {
  console.log(result);
});
console.log("C");
