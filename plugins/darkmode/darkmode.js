document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Restore the dark mode status from storage
    chrome.storage.sync.get('darkModeEnabled', function (data) {
        darkModeToggle.checked = !!data.darkModeEnabled;
    });

    // Handle the dark mode toggle change event
    darkModeToggle.addEventListener('change', function () {
        const isEnabled = darkModeToggle.checked;
        // Save the dark mode status to storage
        chrome.storage.sync.set({ darkModeEnabled: isEnabled });

        // Send a message to the content script to apply dark mode
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { darkModeEnabled: isEnabled });
        });
    });
});
