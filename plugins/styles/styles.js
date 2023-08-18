document.addEventListener("DOMContentLoaded", function() {
    const cssEditor = document.getElementById("css-editor");
    const applyButton = document.getElementById("apply-button");
  
    applyButton.addEventListener("click", function() {
      const css = cssEditor.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "applyCSS", css: css });
      });
    });
  });