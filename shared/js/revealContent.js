const CONTENT_TYPES = {
    solutions: {
        selector: ".solution, .m1830-solution",
        singular: "solution",
    },
    answers: {
        selector: ".answer, .m1830-answer",
        singular: "answer",
    },
};

function setItemState(item, revealed) {
    item.content.hidden = !revealed;
    item.button.setAttribute("aria-expanded", String(revealed));
    item.button.textContent = `${revealed ? "Hide" : "Reveal"} ${item.singular}`;
}

function syncMasterCheckbox(type, items, checkbox) {
    const matchingItems = items.filter((item) => item.type === type);
    const revealedCount = matchingItems.filter((item) => !item.content.hidden).length;

    checkbox.checked = revealedCount === matchingItems.length;
    checkbox.indeterminate = revealedCount > 0 && revealedCount < matchingItems.length;
}

function createMasterControls(items) {
    const controls = document.createElement("fieldset");
    controls.className = "reveal-controls dontprint";

    const legend = document.createElement("legend");
    legend.className = "reveal-controls__legend";
    legend.textContent = "Notes display options";
    controls.appendChild(legend);

    Object.entries(CONTENT_TYPES).forEach(([type, config]) => {
        if (!items.some((item) => item.type === type)) return;

        const label = document.createElement("label");
        label.className = "reveal-controls__option";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.revealAll = type;
        checkbox.addEventListener("change", () => {
            items
                .filter((item) => item.type === type)
                .forEach((item) => setItemState(item, checkbox.checked));
            syncMasterCheckbox(type, items, checkbox);
        });

        label.append(checkbox, document.createTextNode(`Reveal all ${type}`));
        controls.appendChild(label);
    });

    return controls;
}

function controlsContainer() {
    const pageInner = document.querySelector(".page__inner");
    if (pageInner) {
        const pageHeader = pageInner.querySelector(":scope > .page__header");
        return { parent: pageInner, before: pageHeader?.nextSibling ?? pageInner.firstChild };
    }

    return { parent: document.body, before: document.body.firstChild };
}

function ensureContentId(content, baseId) {
    if (content.id) return content.id;

    let id = baseId;
    let suffix = 2;
    while (document.getElementById(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
    }

    content.id = id;
    return id;
}

export function initRevealContent() {
    if (document.querySelector(".reveal-controls")) return;

    const claimedContent = new Set();
    const items = [];

    Object.entries(CONTENT_TYPES).forEach(([type, config]) => {
        document.querySelectorAll(config.selector).forEach((content, index) => {
            if (claimedContent.has(content)) return;
            claimedContent.add(content);

            const contentId = ensureContentId(content, `reveal-${config.singular}-${index + 1}`);

            const button = document.createElement("button");
            button.type = "button";
            button.className = "reveal-toggle dontprint";
            button.setAttribute("aria-controls", contentId);

            const item = { button, content, singular: config.singular, type };
            setItemState(item, false);
            button.addEventListener("click", () => {
                setItemState(item, content.hidden);
                const checkbox = document.querySelector(`[data-reveal-all="${type}"]`);
                if (checkbox) syncMasterCheckbox(type, items, checkbox);
            });

            content.before(button);
            items.push(item);
        });
    });

    if (!items.length) return;

    const controls = createMasterControls(items);
    const location = controlsContainer();
    location.parent.insertBefore(controls, location.before);
}
