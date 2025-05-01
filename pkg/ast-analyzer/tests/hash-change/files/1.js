// Direct window.onhashchange assignment
window.onhashchange = function(event) {
  console.log(window.location.hash);
}

// Window addEventListener
window.addEventListener("hashchange", function(event) {
  console.log(window.location.hash);
})

// Document addEventListener
document.addEventListener("hashchange", function(event) {
  console.log(window.location.hash);
})

// Global onhashchange assignment
onhashchange = function(event) {
  console.log(window.location.hash);
}

// Non-hashchange event (should not be detected)
window.addEventListener("click", function(event) {
  console.log("clicked");
}) 