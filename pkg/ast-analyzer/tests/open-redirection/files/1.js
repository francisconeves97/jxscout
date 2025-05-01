// Test file for open-redirection analyzer
location.href = "https://example.com";
location.assign("https://example.com");
location.replace("https://example.com");
window.open("https://example.com");
element.srcdoc = "<html></html>";
xhr.open("GET", "https://example.com");
$.ajax({ url: "https://example.com" });
jQuery.ajax({ url: "https://example.com" });
location.host = "example.com";
location.hostname = "example.com";
location.pathname = "/path";
location.search = "?param=value";
location.protocol = "https:"; 
a + window.location.href