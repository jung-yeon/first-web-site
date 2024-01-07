var members = ["a", "b", "c"];
console.log(members[1]);
var i = 0;
while (i < members.length) {
  console.log("array loop : ", members[i]);
  i += 1;
}
// object
var roles = { programmer: "a", designer: "b", manager: "c" };
console.log(roles.programmer);
console.log(roles["programmer"]);

for (var name in roles) {
  console.log("object => ", name, "value => ", roles[name]);
}
