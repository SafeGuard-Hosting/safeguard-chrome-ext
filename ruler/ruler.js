document.addEventListener("DOMContentLoaded", function () {
    const startMeasuringButton = document.getElementById("startMeasuring");

    startMeasuringButton.addEventListener("click", function () {
        chrome.scripting.executeScript({
            target: { tabId: chrome.tabs.TabID },
            function: startRuler
        });
    });

    function startRuler() {
        let startX, startY, endX, endY;
        let ruler = document.createElement("div");
        ruler.style.position = "absolute";
        ruler.style.border = "1px solid red";
        ruler.style.pointerEvents = "none";
        document.body.appendChild(ruler);

        document.addEventListener("mousedown", (event) => {
            startX = event.clientX;
            startY = event.clientY;
            updateRuler();
        });

        document.addEventListener("mousemove", (event) => {
            endX = event.clientX;
            endY = event.clientY;
            updateRuler();
        });

        document.addEventListener("mouseup", () => {
            startX = startY = endX = endY = undefined;
            updateRuler();
        });

        function updateRuler() {
            if (typeof startX === "undefined" || typeof startY === "undefined") {
                ruler.style.display = "none";
            } else {
                ruler.style.display = "block";
                ruler.style.left = `${Math.min(startX, endX)}px`;
                ruler.style.top = `${Math.min(startY, endY)}px`;
                ruler.style.width = `${Math.abs(endX - startX)}px`;
                ruler.style.height = `${Math.abs(endY - startY)}px`;
            }
        }
    }
});