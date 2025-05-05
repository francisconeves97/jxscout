// Basic postMessage usage
window.postMessage("Hello", "*");

// postMessage with target origin
window.postMessage({ data: "secure" }, "https://example.com");

// postMessage with transferable objects
const buffer = new ArrayBuffer(8);
window.postMessage(buffer, "*", [buffer]);

// postMessage on iframe
const iframe = document.createElement("iframe");
iframe.contentWindow.postMessage("iframe message", "*");

window.parent.postMessage("parent message", "*");

window.referer.postMessage("referer message", "*");

// postMessage on worker
const worker = new Worker("worker.js");
worker.postMessage("worker message");

// postMessage with complex data
window.postMessage({
  type: "update",
  payload: {
    user: "test",
    data: [1, 2, 3]
  }
}, "*"); 