// main.js
import { enumerateExamples } from "./example.js";
import { initPrintButton } from "./printButton.js";
import { initRevealContent } from "./revealContent.js";

document.addEventListener("DOMContentLoaded", () => {
    // Start at 1; customize by page with data-example-start on <body> if you like
    const startAttr = document.body.getAttribute("data-example-start");
    const start = startAttr ? parseInt(startAttr, 10) : 1;

    enumerateExamples({
        start,
        selector: ".example",
        headerSelector: ".example__header",
        numberSelector: ".example-number__index",
    });

    initRevealContent();
    initPrintButton();
});
