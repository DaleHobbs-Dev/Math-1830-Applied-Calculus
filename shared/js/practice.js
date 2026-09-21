import "./practice-generators.js";
import { initPracticeProblems } from "./practice-engine.js";

function initialize() {
    initPracticeProblems();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
    initialize();
}
