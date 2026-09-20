// printButton.js
// Print controls share options at the top and bottom of the notes.

function replaceBlanksForPrint() {
    document.querySelectorAll('.blanked').forEach(el => {
        const originalText = el.textContent.trim();
        const underscoreCount = Math.min(originalText.length, 10);
        const underscores = '__'.repeat(underscoreCount);

        el.setAttribute('data-original-html', el.innerHTML);
        el.setAttribute('aria-label', 'Blank');
        el.textContent = underscores;
        el.classList.add('print-underscore');
        el.style.whiteSpace = 'nowrap';

        const parentWidth = el.parentElement?.clientWidth ?? Infinity;
        if (el.clientWidth > parentWidth * 0.4) {
            el.style.display = 'block';
        }
    });

    document.querySelectorAll('.blank-space').forEach(el => {
        el.setAttribute('data-original-html', el.innerHTML);
        el.setAttribute('aria-label', 'Blank');
        el.textContent = '';
    });

}

function restoreOriginalText() {
    document.querySelectorAll('.blanked').forEach(el => {
        const originalHTML = el.getAttribute('data-original-html');
        if (originalHTML !== null) {
            el.innerHTML = originalHTML;
            el.removeAttribute('aria-label');
            el.removeAttribute('data-original-html');
            el.classList.remove('print-underscore');
            el.style.whiteSpace = '';
            el.style.display = '';
        }
    });

    document.querySelectorAll('.blank-space').forEach(el => {
        const originalHTML = el.getAttribute('data-original-html');
        if (originalHTML !== null) {
            el.innerHTML = originalHTML;
            el.removeAttribute('aria-label');
            el.removeAttribute('data-original-html');
        }
    });

}

function createPrintControls(position) {
    const controls = document.createElement('div');
    controls.className = 'print-controls dontprint';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Print options');

    const button = document.createElement('button');
    button.type = 'button';
    button.id = `printNotes-${position}`;
    button.textContent = 'Print Notes';
    button.className = 'btn';
    button.addEventListener('click', () => window.print());
    controls.appendChild(button);

    for (const kind of ['solutions', 'answers']) {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `print-${kind}-${position}`;
        checkbox.dataset.printOption = kind;
        checkbox.checked = false;
        checkbox.addEventListener('change', () => {
            document.body.classList.toggle(`print-include-${kind}`, checkbox.checked);
            document.querySelectorAll(`input[data-print-option="${kind}"]`).forEach(input => {
                input.checked = checkbox.checked;
            });
        });
        label.append(checkbox, document.createTextNode(`Print ${kind}`));
        controls.appendChild(label);
    }
    return controls;
}

export function initPrintButton() {
    if (document.getElementById('printNotes-top')) return;
    document.body.classList.remove('print-include-solutions', 'print-include-answers');
    document.body.prepend(createPrintControls('top'));
    document.body.appendChild(createPrintControls('bottom'));

    let printing = false;
    window.addEventListener('beforeprint', () => {
        if (printing) return;
        printing = true;
        replaceBlanksForPrint();
    });
    window.addEventListener('afterprint', () => {
        if (!printing) return;
        restoreOriginalText();
        printing = false;
    });
}
