document.addEventListener("DOMContentLoaded", function () {
    const decreaseButton = document.getElementById("decrease");
    const increaseButton = document.getElementById("increase");
    const volumeSpan = document.getElementById("volume");
  
    decreaseButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "decreaseVolume" }, function (response) {
          volumeSpan.textContent = response.newVolume;
        });
      });
    });
  
    increaseButton.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "increaseVolume" }, function (response) {
          volumeSpan.textContent = response.newVolume;
        });
      });
    });
  });