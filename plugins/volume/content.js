chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "decreaseVolume" || message.action === "increaseVolume") {
      const videoElements = document.getElementsByTagName("video");
      const audioElements = document.getElementsByTagName("audio");
      const mediaElements = Array.from(videoElements).concat(Array.from(audioElements));
  
      mediaElements.forEach(function (element) {
        const currentVolume = element.volume;
        const newVolume = message.action === "decreaseVolume" ? Math.max(0, currentVolume - 0.1) : Math.min(1, currentVolume + 0.1);
        element.volume = newVolume;
      });
  
      sendResponse({ newVolume: `${Math.round(newVolume * 100)}%` });
    }
  });