// Direct assignment
window.onhashchange = function() {
  console.log("Hash changed!");
};

// Using addEventListener
window.addEventListener("hashchange", function() {
  console.log("Hash changed via addEventListener!");
});

// Assignment to a variable
const handler = function() {
  console.log("Hash changed via variable!");
};
window.onhashchange = handler;

// Multiple assignments
window.onhashchange = function() {
  console.log("First handler");
};
window.onhashchange = function() {
  console.log("Second handler");
}; 