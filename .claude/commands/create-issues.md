---
description: Convert roadmap steps into GitHub issues with links in both directions.
argument-hint: (no arguments)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Create Issues

You are helping a developer turn roadmap steps into GitHub issues.

Each step becomes an issue.

Each issue links back to the roadmap, and each roadmap step links to its issue.

---

## Prerequisites

1. A roadmap must exist

   Check `tandem.json` for a doc tagged `roadmap`.

   If none exists:

   > "I need a roadmap before I can create issues. Want to run `/create-roadmap` first?"

2. The project must be a GitHub repo

   Check for:

   * `.git/`
   * a GitHub remote

3. GitHub CLI must be available

   Run: `gh auth status`

   If not set up:

   > "This command needs the GitHub CLI (`gh`). Install it at [https://cli.github.com/](https://cli.github.com/) and run `gh auth login`."

---

## Workflow

### Step 1: Read the Roadmap

Find the roadmap using the manifest.

For each step, pull:

* title
* description
* user stories (if they exist)

---

### Step 2: Preview Issues

Show what will be created before doing anything.

> "I’ll create these GitHub issues from your roadmap:"
>
> 1. Step 1: [Title] - [short description]
> 2. Step 2: [Title] - [short description]
>    ...
>
> "Want to go ahead, or change anything first?"

Wait for confirmation.

---

### Step 3: Create Issues

For each step, create a GitHub issue using `gh issue create`.

If `.tandem/templates/github-issue.md` exists:

* use it

Otherwise, use this format:

```markdown
## Description

[What this step builds, based on the roadmap]

## User Stories (if applicable)

* As a [user type], I want to [action] so that [outcome].

## Roadmap Reference

Step [N] in [roadmap path from tandem.json]

## Acceptance Criteria

* [ ] [Something concrete that proves this step is done]
* [ ] [Another clear, testable outcome]

```

Acceptance criteria should be:

* specific
* testable
* tied to the actual outcome of the step

Avoid vague criteria like "works correctly" or "is complete"

---

### Step 4: Update Roadmap with Issue Links

After creating each issue, update the roadmap step:

```markdown
* [ ] **Step 1: [Title]**
  [Description]
  GitHub Issue: #12
```

This creates a two-way link:

* the issue references the roadmap
* the roadmap references the issue

This makes future updates easier to track.

---

### Step 5: Summary

Report what was created:

> "Created [N] GitHub issues:"
>
> * #12: Step 1 - [Title]
> * #13: Step 2 - [Title]
>   ...
>
> "Each issue links back to its roadmap step, and each roadmap step now links to its issue."

---

## Important Reminders

* Issues are for tracking work, not learning
* Create one issue per roadmap step. Do not combine steps.
* Do not add learning labels or tags
* Do not create a project board
* Keep issue descriptions clear and minimal
* Make acceptance criteria concrete and testable
* Do not guess missing details, use what is in the roadmap
* Never use em dashes
* Do not add extra features or scope when writing issues. Stay aligned with the roadmap.
* Keep issue titles short and clear. They should match the roadmap step.
* Do not rewrite the roadmap in the issue. Keep descriptions focused.
* If a project template exists, follow it instead of the default format.
* Each issue should be ready to work on without needing extra clarification.
