// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "updateBackgroundColor") {
            document.body.style.backgroundColor = request.color;
        }
    }
);