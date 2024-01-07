/*
function a() {
  console.log("A");
}
*/
var b = function () {
  console.log("A");
};

function slowfunc(callback) {
  callback();
}

slowfunc(b);
