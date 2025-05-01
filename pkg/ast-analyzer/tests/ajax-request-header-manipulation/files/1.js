xhr.setRequestHeader("Content-Type", "application/json");
xhr.open("GET", "https://example.com");
xhr.send();
jQuery.globalEval("console.log('test')");
$.globalEval("console.log('test')"); 