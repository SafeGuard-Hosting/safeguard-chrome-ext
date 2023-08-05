document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", identifyFont);

    function identifyFont(event) {
        event.stopPropagation();
        const target = event.target;
        const font = window.getComputedStyle(target).fontFamily;
        alert(`The font of this element is: ${font}`);
    }
});