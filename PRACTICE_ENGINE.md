# Practice Engine

The practice engine provides randomized, ungraded multiple-choice activities for the course notes. It uses plain HTML,
CSS, and JavaScript so it can run in a Brightspace HTML content topic without a build step.

## Add a practice problem to a page

Add the practice stylesheet and module script in the page's `<head>`:

```html
<link href="../shared/css/practice.css" rel="stylesheet" />
<script type="module" src="../shared/js/practice.js"></script>
```

The page must also load MathJax when a generator uses mathematical notation. Then place this where the activity should
appear:

```html
<div data-practice
    data-generator="power-rule"
    data-title="Power Rule Practice"
    data-description="Choose an answer, check your work, and generate a new version.">
    <noscript>This practice problem requires JavaScript to be enabled.</noscript>
</div>
```

Available generators:

- `power-rule`: differentiates a randomized term of the form `ax^n + c`.

The title, description, and start-button label can be customized with `data-title`, `data-description`, and
`data-start-label`. A page may contain more than one `data-practice` element.

## Files

- `shared/js/practice-engine.js`: interface, answer checking, accessibility behavior, and generator registry.
- `shared/js/practice-generators.js`: question-generation logic.
- `shared/js/practice.js`: browser entry point that initializes every activity on the page.
- `shared/css/practice.css`: responsive visual design and feedback states.
- `practice-demo.html`: standalone demonstration and manual test page.

## Add another generator

Create a function that returns a question object, register it with `registerPracticeGenerator`, and import that module
from `practice-generators.js` or `practice.js`. Each choice needs a unique `id` and `label`; one ID must match
`correctChoiceId`. Generator-provided HTML is treated as trusted course-authored content.
