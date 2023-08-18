chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.url.includes("adserver.com")) {
        return { cancel: true };
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );