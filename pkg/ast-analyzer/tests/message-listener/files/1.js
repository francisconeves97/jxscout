window.onmessage = function(event) {
  console.log(event.data);
};

window.addEventListener("message", function(event) {
  console.log(event.data);
});

document.addEventListener("message", function(event) {
  console.log(event.data);
});

// This should not be detected
window.onload = function() {
  console.log("loaded");
}; 

onmessage = function(event) {
  console.log(event.data);
};
  