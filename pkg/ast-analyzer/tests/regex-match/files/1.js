// String.match() examples
const str = "Hello World";
const match1 = str.match(/Hello/);
const match2 = "test123".match(/\d+/);

// RegExp.test() examples
const regex1 = new RegExp("World");
const test1 = regex1.test(str);
const test2 = /test/.test("testing");

// RegExp.exec() examples
const regex2 = new RegExp("\\d+", "g");
const exec1 = regex2.exec("123 test 456");
const exec2 = /[a-z]+/.exec("abc123"); 