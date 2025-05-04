// Cookie assignments
document.cookie = "name=value";
document.cookie = "name=value; path=/";
document.cookie = "name=value; expires=Fri, 31 Dec 2023 23:59:59 GMT";

// Cookie reads
const cookieValue = document.cookie;
const hasCookie = document.cookie.includes("name=value");

// Cookie operations in functions
function setCookie(name, value) {
  document.cookie = `${name}=${value}`;
}

function getCookie(name) {
  return document.cookie;
} 