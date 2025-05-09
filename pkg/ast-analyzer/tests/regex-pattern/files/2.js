// utils
function safeURL(url) {
  let normalizedURL = new URL(url, location);
  return normalizedURL.origin === location.origin;
}

function addDynamicScript() {
  const src =
    window.CONFIG_SRC?.dataset["url"] || location.origin + "/confetti.js";
  if (safeURL(src)) {
    const script = document.createElement("script");
    script.src = new URL(src);
    document.head.appendChild(script);
  }
}

// main
(function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  if (name && name.match(/([a-zA-Z0-9]+|\s)+$/)) {
    const messageDiv = document.getElementById("message");
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    messageDiv.appendChild(spinner);

    fetch(`/message?name=${encodeURIComponent(name)}`)
      .then((response) => response.text())
      .then((data) => {
        spinner.remove();
        messageDiv.innerHTML = DOMPurify.sanitize(data);
      })
      .catch((err) => {
        spinner.remove();
        messageDiv.innerHTML = "Error fetching message.";
        console.error("Error fetching message:", err);
      });
  } else if (name) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "Error when parsing name";
  }

  // Load some non-misison-critical content
  requestIdleCallback(addDynamicScript);
})();
