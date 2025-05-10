// Test file for location analyzer

// Direct location property access
location.href = "https://example.com";
const currentHref = location.href;
const locationProtocol = location.protocol;
const locationHost = location.host;
const locationPathname = location.pathname;
const locationSearch = location.search;
const locationHash = location.hash;

// Window.location property access
window.location.href = "https://example.com";
const windowHref = window.location.href;
const windowProtocol = window.location.protocol;
const windowHost = window.location.host;
const windowPathname = window.location.pathname;
const windowSearch = window.location.search;
const windowHash = window.location.hash;

// Location method calls
location.assign("https://example.com");
location.replace("https://example.com");
location.reload();

// Window.location method calls
window.location.assign("https://example.com");
window.location.replace("https://example.com");
window.location.reload();

// Nested location access
const obj = {
  location: {
    href: "https://example.com"
  }
};
obj.location.href = "https://example.com"; // Should not match

// Location in function
function updateLocation(url) {
  location.href = url;
  window.location.href = url;
}

// Location in arrow function
const updateLocationArrow = (url) => {
  location.href = url;
  window.location.href = url;
};

// Location in class method
class LocationManager {
  update(url) {
    location.href = url;
    window.location.href = url;
  }
}

// Location in template literal
const baseUrl = "https://example.com";
const fullUrl = `${location.protocol}//${location.host}${location.pathname}`;

// Location in conditional
if (location.href.includes("example.com")) {
  location.href = "https://other.com";
}

// Location in try-catch
try {
  location.href = "https://example.com";
} catch (e) {
  console.error(e);
}

// Location in loop
for (let i = 0; i < 3; i++) {
  location.href = `https://example${i}.com`;
}

// Location in switch
switch (location.protocol) {
  case "https:":
    location.href = "https://secure.com";
    break;
  case "http:":
    location.href = "https://upgrade.com";
    break;
}

// Location with destructuring
const { href: locationHref, protocol: locationProtocol2 } = location;
const { href: windowHref2, protocol: windowProtocol2 } = window.location;

// Location with spread
const locationProps = { ...location };
const windowLocationProps = { ...window.location };

// Location with computed properties
const prop = "href";
location[prop] = "https://example.com";
window.location[prop] = "https://example.com";

// Location with optional chaining
const maybeLocation = null;
maybeLocation?.href; // Should not match
maybeLocation?.assign?.(); // Should not match 