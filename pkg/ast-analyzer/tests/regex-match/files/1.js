// Test string.match() calls
const str = "hello world";
const result1 = str.match(/world/);

"asd".match(/world/)

// Test RegExp.test() and exec() calls
const regex = new RegExp("world");
const result2 = regex.test("hello world");
const result3 = regex.exec("hello world");

// Test RegExp.test() with RegExp identifier
const result4 = RegExp.test("hello world");

// Test non-regex match calls (should not be detected)
const result5 = str.indexOf("world"); 