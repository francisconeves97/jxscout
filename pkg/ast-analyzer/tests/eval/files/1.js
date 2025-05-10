// Test file for eval analyzer

// Basic eval call
eval('console.log("Hello")');

// Eval with variable
const code = 'console.log("World")';
eval(code);

// Eval with template literal
const name = 'John';
eval(`console.log("Hello ${name}")`);

// Eval with function call
function getCode() {
  return 'console.log("Dynamic")';
}
eval(getCode());

// Eval with multiple arguments (should not match)
eval('console.log("One")', 'console.log("Two")');

// Eval with no arguments (should not match)
eval();

// Eval with object property
const obj = {
  code: 'console.log("Object")'
};
eval(obj.code); 