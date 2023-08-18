chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "applyCSS") {
      const style = document.createElement("style");
      style.textContent = request.css;
      document.head.appendChild(style);
      sendResponse({ message: "CSS applied" });
    }
  });