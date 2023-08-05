console.log('This is a popup!');
function updatePageBackgroundColor(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.executeScript(
            activeTab.id,
            { code: `document.body.style.backgroundColor = "${color}";` }
        );
    });
}