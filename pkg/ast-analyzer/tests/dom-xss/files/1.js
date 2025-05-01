// document.write
document.write("<script>alert(1)</script>");

// document.writeln
document.writeln("<script>alert(1)</script>");

// document.domain
document.domain = "example.com";

// innerHTML
element.innerHTML = "<script>alert(1)</script>";

// outerHTML
element.outerHTML = "<script>alert(1)</script>";

// insertAdjacentHTML
element.insertAdjacentHTML("beforeend", "<script>alert(1)</script>");

// onevent with string value
element.onclick = "alert(1)";

// onevent with function (should not be detected)
element.onclick = function() { alert(1); }; 