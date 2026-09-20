---
description: [What this command does, in one clear sentence]
argument-hint: [what the user can pass in] (optional)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# [Command Name]

You are helping a developer [do something specific].

Keep this practical. Focus on clear steps and useful output.

---

## When to Use This

Use this command when:

* [scenario 1]
* [scenario 2]

Do not use it when:

* [edge case or overlap with another command]

---

## Workflow

### Step 1: Understand the Goal

If the developer provided input: $ARGUMENTS

Figure out:

* what they are trying to do
* why they are doing it (if relevant)

Ask questions if anything is unclear.

Do not guess missing intent.

---

### Step 2: Load Context (if needed)

Check `tandem.json` if this command depends on project docs.

Load only what you need:

* PRD → what and why
* Architecture → how it works
* Roadmap → order of work

If something is missing:

* suggest the appropriate command (create-prd, create-architecture, etc.)
* continue if the developer prefers

---

### Step 3: Plan or Structure the Work

Break the task into clear parts if needed.

Keep things:

* small
* ordered
* easy to follow

If this is a decision-heavy step:

* present options
* explain trade-offs
* let the developer decide

---

### Step 4: Do the Work

Carry out the task.

Follow these rules:

* work within existing structure
* do not rewrite things unnecessarily
* keep output clean and readable

If generating content:

* keep it concise
* avoid filler or generic language
* tie everything back to the actual project

---

### Step 5: Review with the Developer

Before finalizing:

* show what was created or changed
* ask for confirmation or feedback

Example:

> "Here’s what I put together. Want to adjust anything?"

---

### Step 6: Optional Follow-Up Actions

If relevant, suggest next steps:

* "Want to create issues from this?"
* "Want to move into /pair-program?"
* "Want to update related docs?"

Do not force next steps. Just offer.

---

## Output Guidelines

* Keep output easy to scan
* Use short sections and bullets
* Avoid long paragraphs
* Do not over-explain simple things
* Do not repeat the same idea

---

## Important Reminders

* Do not guess missing details, ask instead
* Keep changes minimal and intentional
* Stay grounded in the actual project
* Do not overcomplicate the solution
* Do not introduce new structure unless needed
* Respect existing files and formatting
* Never use em dashes
  *end markdown

---

## 🔧 How to Use This Template (Quick Guide)

When you create a new command:

### 1. Keep or remove sections as needed

Not every command needs:

* context loading
* follow-up actions
* structured planning

Delete what doesn’t apply.

---

### 2. Add command-specific rules

Example:

For a testing command:

```md
- Always run tests after writing them
- Do not mock unnecessarily
```

For a refactor command:

```md
- Do not change behavior unless explicitly requested
```

---

### 3. Add a “special section” if needed

Some of your commands had custom sections like:

* “Tech Stack Neutrality”
* “Diagram Preferences”
* “Learning Goals”

That’s intentional. Keep doing that.

---

### 4. Keep your tone consistent

Quick checklist:

* sounds like a dev, not documentation
* direct instructions
* minimal fluff
* explains decisions when needed
