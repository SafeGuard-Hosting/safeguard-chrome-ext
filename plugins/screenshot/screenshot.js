document.addEventListener("DOMContentLoaded", function () {
    const captureButton = document.getElementById("captureButton");
    const screenshotImage = document.getElementById("screenshotImage");
  
    captureButton.addEventListener("click", async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
        const screenshotDataUrl = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: captureScreenshot
        });
  
        screenshotImage.src = screenshotDataUrl[0].result;
        screenshotImage.style.display = "block";
      } catch (error) {
        console.error("Error capturing screenshot:", error);
      }
    });
  });
  
  function captureScreenshot() {
    return new Promise((resolve) => {
      chrome.scripting.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
        resolve(dataUrl);
      });
    });
  }