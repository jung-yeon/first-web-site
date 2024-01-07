// array, object
// function이 값이 될 수 있음을 보여줌
var f = function () {
  console.log(1 + 1);
  console.log(1 + 2);
};
// console.log(f);
// f();

//함수
var a = [f];
a[0]();

//객체
var o = {
  func: f,
};
o.func();
