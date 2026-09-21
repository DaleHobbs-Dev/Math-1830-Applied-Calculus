import { registerPracticeGenerator } from "./practice-engine.js";

function randomInteger(random, minimum, maximum) {
    return Math.floor(random() * (maximum - minimum + 1)) + minimum;
}

function randomNonzeroInteger(random, minimum, maximum, excluded = []) {
    let value;
    do {
        value = randomInteger(random, minimum, maximum);
    } while (value === 0 || excluded.includes(value));
    return value;
}

function monomial(coefficient, exponent) {
    if (coefficient === 0) return "0";
    if (exponent === 0) return String(coefficient);

    const coefficientText = coefficient === 1
        ? ""
        : coefficient === -1
            ? "-"
            : String(coefficient);
    const exponentText = exponent === 1 ? "" : `^{${exponent}}`;
    return `${coefficientText}x${exponentText}`;
}

function polynomial(leadingCoefficient, exponent, constant) {
    const leadingTerm = monomial(leadingCoefficient, exponent);
    if (constant === 0) return leadingTerm;
    return `${leadingTerm} ${constant > 0 ? "+" : "-"} ${Math.abs(constant)}`;
}

function makeChoice(id, expression, feedback) {
    return {
        id,
        label: `\\(${expression}\\)`,
        feedback
    };
}

function generatePowerRuleQuestion({ random, previousQuestion }) {
    let coefficient;
    let exponent;
    let constant;
    let id;

    for (let attempt = 0; attempt < 12; attempt += 1) {
        coefficient = randomNonzeroInteger(random, -6, 6, [-1, 1]);
        exponent = randomInteger(random, 2, 7);
        constant = randomNonzeroInteger(random, -9, 9);
        id = `${coefficient}:${exponent}:${constant}`;

        if (!previousQuestion || id !== previousQuestion.id) {
            break;
        }
    }

    const derivativeCoefficient = coefficient * exponent;
    const correctExpression = monomial(derivativeCoefficient, exponent - 1);
    const candidateChoices = [
        makeChoice(
            "correct",
            correctExpression,
            "You multiplied by the original exponent, reduced the exponent by one, and treated the constant as having derivative zero."
        ),
        makeChoice(
            "did-not-multiply",
            monomial(coefficient, exponent - 1),
            "You reduced the exponent, but the power rule also requires multiplying the coefficient by the original exponent."
        ),
        makeChoice(
            "did-not-reduce",
            monomial(derivativeCoefficient, exponent),
            "You multiplied by the exponent, but remember to reduce the exponent by one."
        ),
        makeChoice(
            "kept-constant",
            polynomial(derivativeCoefficient, exponent - 1, constant),
            "The power-rule term is correct, but the derivative of a constant is zero, so the constant should disappear."
        ),
        makeChoice(
            "exponent-only",
            monomial(exponent, exponent - 1),
            "The new coefficient must be the original coefficient multiplied by the exponent."
        )
    ];

    const uniqueChoices = [];
    const labels = new Set();
    for (const choice of candidateChoices) {
        if (!labels.has(choice.label)) {
            labels.add(choice.label);
            uniqueChoices.push(choice);
        }
    }

    return {
        id,
        prompt: `<span>Find the derivative of \\(f(x)=${polynomial(coefficient, exponent, constant)}\\).</span>`,
        choices: uniqueChoices.slice(0, 4),
        correctChoiceId: "correct",
        feedback: {
            correct: "Nice work—you applied both parts of the power rule.",
            incorrect: "Review the power rule and try a new problem after studying the solution."
        },
        solution: `<p>Apply \\(\\frac{d}{dx}[ax^n]=anx^{n-1}\\), and remember that the derivative of a constant is zero:</p>
            <p>\\[f'(x)=(${coefficient})(${exponent})x^{${exponent}-1}+0=${correctExpression}.\\]</p>`
    };
}

registerPracticeGenerator("power-rule", generatePowerRuleQuestion);

export { generatePowerRuleQuestion };
