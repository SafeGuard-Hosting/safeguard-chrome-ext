document.addEventListener("DOMContentLoaded", function () {
    const colorPicker = document.getElementById("colorPicker");
    const hexValue = document.getElementById("hexValue");

    colorPicker.addEventListener("input", function () {
        const selectedColor = colorPicker.value;
        hexValue.value = selectedColor;
        updatePageBackgroundColor(selectedColor);
    });

    function updatePageBackgroundColor(color) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                { code: `document.body.style.backgroundColor = "${color}";` }
            );
        });
    }
});