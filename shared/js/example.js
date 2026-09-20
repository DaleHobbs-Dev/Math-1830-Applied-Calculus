// examples.js
// Dynamically numbers .example blocks and maintains anchors like #example-3

/**
 * Options:
 *  - start: number to start counting from (default 1)
 *  - selector: container selector for examples (default ".example")
 *  - headerSelector: header inside each example (default ".example__header")
 *  - numberSelector: numeric span to write into (default ".example-number__index")
 *  - insertIfMissing: create number label if missing (default true)
 *  - setAnchors: assign id="example-N" for deep linking (default true)
 */
export function enumerateExamples({
    start = 1,
    selector = ".example",
    headerSelector = ".example__header",
    numberSelector = ".example-number__index",
    insertIfMissing = true,
    setAnchors = true,
} = {}) {
    let n = start;
    const examples = document.querySelectorAll(selector);
    examples.forEach((ex) => {
        // Find or create the number span
        let numberSpan = ex.querySelector(numberSelector);

        if (!numberSpan && insertIfMissing) {
            const header = ex.querySelector(headerSelector);
            if (header) {
                const label = document.createElement("span");
                label.className = "example-number";
                // structure: Example <span class="example-number__index"></span>.
                label.innerHTML = `Example <span class="example-number__index"></span>.`;
                header.prepend(label);
                numberSpan = label.querySelector(".example-number__index");
            }
        }

        if (!numberSpan) return; // nothing to do if still missing

        // Respect an explicit data index if provided; otherwise increment
        const explicit = ex.getAttribute("data-example-index");
        const index = explicit ? parseInt(explicit, 10) : n++;

        numberSpan.textContent = index;               // write the number
        ex.setAttribute("data-example-index", index); // persist as attribute

        // Accessibility & anchors
        if (setAnchors) {
            if (!ex.id) ex.id = `example-${index}`;
            const header = ex.querySelector(headerSelector);
            if (header && !header.id) header.id = `${ex.id}-header`;
            if (header) {
                ex.setAttribute("role", "region");
                ex.setAttribute("aria-labelledby", header.id);
            }
        }
    });

    return n - 1; // how many numbered
}

/**
 * Convenience: re-run numbering (e.g., after dynamic inserts).
 */
export function renumberExamples(opts) {
    // Clear any existing data-example-index to force fresh numbering
    document.querySelectorAll(".example[data-example-index]").forEach((ex) =>
        ex.removeAttribute("data-example-index")
    );
    enumerateExamples(opts);
}
