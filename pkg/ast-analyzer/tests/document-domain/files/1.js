// Test case 1: Direct assignment
document.domain = "example.com";

// Test case 2: Assignment with variable
const domain = "test.com";
document.domain = domain;

// Test case 3: Assignment with string concatenation
document.domain = "sub." + "domain.com";

// Test case 4: Assignment with template literal
const subdomain = "api";
document.domain = `${subdomain}.example.com`;

// Test case 5: Assignment with function call
function getDomain() {
  return "dynamic.com";
}
document.domain = getDomain();

// Test case 6: Simple read
console.log(document.domain);

// Test case 7: Read in condition
if (document.domain === "example.com") {
  console.log("Domain matches");
}

// Test case 8: Read in function
function checkDomain() {
  return document.domain === "test.com";
}

// Test case 9: Read in template literal
console.log(`Current domain is ${document.domain}`);

// Test case 10: Read in object property
const config = {
  domain: document.domain
}; 