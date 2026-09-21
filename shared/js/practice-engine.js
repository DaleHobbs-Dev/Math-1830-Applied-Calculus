const generators = new Map();

let instanceCount = 0;

/**
 * Register a question generator for use by a data-practice element.
 * A generator receives { random, previousQuestion } and returns:
 * { id, prompt, choices, correctChoiceId, feedback, solution }.
 */
export function registerPracticeGenerator(name, generator) {
    if (!name || typeof name !== "string") {
        throw new TypeError("A practice generator needs a name.");
    }

    if (typeof generator !== "function") {
        throw new TypeError(`The practice generator "${name}" must be a function.`);
    }

    generators.set(name, generator);
}

function shuffle(items, random) {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const otherIndex = Math.floor(random() * (index + 1));
        [shuffled[index], shuffled[otherIndex]] = [shuffled[otherIndex], shuffled[index]];
    }

    return shuffled;
}

function renderMath(container) {
    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
        window.MathJax.typesetClear?.([container]);
        window.MathJax.typesetPromise([container]).catch((error) => {
            console.warn("MathJax could not render a practice problem.", error);
        });
    }
}

function createButton(label, className, type = "button") {
    const button = document.createElement("button");
    button.type = type;
    button.className = className;
    button.textContent = label;
    return button;
}

export class PracticeProblem {
    constructor(root, options = {}) {
        this.root = root;
        this.random = options.random || Math.random;
        this.generatorName = root.dataset.generator;
        this.generator = generators.get(this.generatorName);
        this.question = null;
        this.instanceId = `practice-${++instanceCount}`;

        if (!this.generator) {
            this.showConfigurationError();
            return;
        }

        this.renderStart();
    }

    showConfigurationError() {
        this.root.innerHTML = "";
        const message = document.createElement("p");
        message.className = "practice__error";
        message.setAttribute("role", "alert");
        message.textContent = `This practice problem could not load. Unknown generator: ${this.generatorName || "(none)"}.`;
        this.root.append(message);
    }

    renderStart() {
        this.root.innerHTML = "";
        this.root.classList.add("practice");

        const intro = document.createElement("div");
        intro.className = "practice__intro";

        const title = document.createElement("h3");
        title.className = "practice__title";
        title.textContent = this.root.dataset.title || "Check Your Understanding";

        const description = document.createElement("p");
        description.className = "practice__description";
        description.textContent = this.root.dataset.description ||
            "Try an ungraded practice problem and receive immediate feedback.";

        const startButton = createButton(
            this.root.dataset.startLabel || "Try a Practice Problem",
            "practice__button practice__button--primary"
        );
        startButton.addEventListener("click", () => this.generateQuestion());

        intro.append(title, description, startButton);
        this.root.append(intro);
    }

    generateQuestion() {
        const previousQuestion = this.question;
        let nextQuestion;

        // A generator should normally avoid its previous question. The retry is
        // a safety net for small question pools.
        for (let attempt = 0; attempt < 8; attempt += 1) {
            nextQuestion = this.generator({
                random: this.random,
                previousQuestion
            });

            if (!previousQuestion || nextQuestion.id !== previousQuestion.id) {
                break;
            }
        }

        this.validateQuestion(nextQuestion);
        this.question = {
            ...nextQuestion,
            choices: shuffle(nextQuestion.choices, this.random)
        };
        this.renderQuestion();
    }

    validateQuestion(question) {
        if (!question || !question.prompt || !Array.isArray(question.choices)) {
            throw new TypeError(`Generator "${this.generatorName}" returned an invalid question.`);
        }

        const choiceIds = new Set(question.choices.map((choice) => choice.id));
        if (choiceIds.size !== question.choices.length || !choiceIds.has(question.correctChoiceId)) {
            throw new TypeError(`Generator "${this.generatorName}" returned invalid answer choices.`);
        }
    }

    renderQuestion() {
        const questionId = `${this.instanceId}-question`;
        const feedbackId = `${this.instanceId}-feedback`;

        this.root.innerHTML = "";

        const title = document.createElement("h3");
        title.className = "practice__title";
        title.textContent = this.root.dataset.title || "Check Your Understanding";

        const form = document.createElement("form");
        form.className = "practice__form";

        const fieldset = document.createElement("fieldset");
        fieldset.className = "practice__fieldset";

        const legend = document.createElement("legend");
        legend.id = questionId;
        legend.className = "practice__prompt";
        legend.innerHTML = this.question.prompt;
        fieldset.append(legend);

        const choiceList = document.createElement("div");
        choiceList.className = "practice__choices";

        this.question.choices.forEach((choice, index) => {
            const choiceId = `${this.instanceId}-choice-${index}`;
            const label = document.createElement("label");
            label.className = "practice__choice";
            label.htmlFor = choiceId;

            const input = document.createElement("input");
            input.type = "radio";
            input.name = `${this.instanceId}-answer`;
            input.id = choiceId;
            input.value = choice.id;
            input.setAttribute("aria-describedby", feedbackId);

            const choiceText = document.createElement("span");
            choiceText.className = "practice__choice-text";
            choiceText.innerHTML = choice.label;

            label.append(input, choiceText);
            choiceList.append(label);
        });

        fieldset.append(choiceList);

        const validation = document.createElement("p");
        validation.className = "practice__validation";
        validation.hidden = true;
        validation.textContent = "Choose an answer before checking your work.";

        const actions = document.createElement("div");
        actions.className = "practice__actions";
        const checkButton = createButton("Check Answer", "practice__button practice__button--primary", "submit");
        actions.append(checkButton);

        const feedback = document.createElement("div");
        feedback.id = feedbackId;
        feedback.className = "practice__feedback";
        feedback.hidden = true;
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        feedback.setAttribute("aria-atomic", "true");
        feedback.tabIndex = -1;

        form.append(fieldset, validation, actions, feedback);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.checkAnswer(form, validation, feedback, actions);
        });

        this.root.append(title, form);
        renderMath(this.root);

        const firstChoice = form.querySelector("input");
        firstChoice?.focus();
    }

    checkAnswer(form, validation, feedback, actions) {
        const selected = form.querySelector("input:checked");

        if (!selected) {
            validation.hidden = false;
            validation.setAttribute("role", "alert");
            form.querySelector("input")?.focus();
            return;
        }

        validation.hidden = true;
        const isCorrect = selected.value === this.question.correctChoiceId;
        const selectedChoice = this.question.choices.find((choice) => choice.id === selected.value);

        form.querySelectorAll("input").forEach((input) => {
            input.disabled = true;
            const label = input.closest("label");
            label.classList.toggle("practice__choice--correct", input.value === this.question.correctChoiceId);
            label.classList.toggle("practice__choice--incorrect", input.checked && !isCorrect);
        });

        feedback.hidden = false;
        feedback.classList.toggle("practice__feedback--correct", isCorrect);
        feedback.classList.toggle("practice__feedback--incorrect", !isCorrect);

        const heading = document.createElement("p");
        heading.className = "practice__feedback-heading";
        heading.textContent = isCorrect ? "Correct!" : "Not quite yet.";

        const explanation = document.createElement("div");
        explanation.className = "practice__feedback-text";
        explanation.innerHTML = isCorrect
            ? this.question.feedback.correct
            : selectedChoice.feedback || this.question.feedback.incorrect;

        const solution = document.createElement("div");
        solution.className = "practice__solution";
        solution.innerHTML = `<p class="practice__solution-title">Solution</p>${this.question.solution}`;

        feedback.replaceChildren(heading, explanation, solution);

        actions.innerHTML = "";
        const anotherButton = createButton("Try Another Problem", "practice__button practice__button--secondary");
        anotherButton.addEventListener("click", () => this.generateQuestion());
        actions.append(anotherButton);

        renderMath(this.root);
        feedback.focus();
    }
}

export function initPracticeProblems(selector = "[data-practice]") {
    return [...document.querySelectorAll(selector)].map((root) => {
        if (root.dataset.practiceInitialized === "true") {
            return null;
        }

        root.dataset.practiceInitialized = "true";
        return new PracticeProblem(root);
    }).filter(Boolean);
}
