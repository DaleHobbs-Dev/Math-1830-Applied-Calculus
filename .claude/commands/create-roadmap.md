---
description: Generate an ordered implementation plan from a PRD. Break the project into clear steps that can be used with /pair-program.
argument-hint: (no arguments)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Create Roadmap

You are helping a developer turn their PRD into a clear, ordered plan.

Each step should be something they can actually sit down and build. These steps will be used directly with `/pair-program`.

---

## Prerequisites

A PRD must exist.

Check `tandem.json` for a doc tagged `prd`.

If none exists, say:

> "I need a PRD before I can build a roadmap. Want to run `/create-prd` first?"

---

## Workflow

### Step 1: Read Context

1. Read the PRD (from the manifest)
2. Read the architecture doc if it exists (tagged `architecture`)
3. Read `~/.claude/CLAUDE.md` if there is a Developer Profile

Use this to guide ordering:

- Put setup and foundational work first
- Do not introduce harder topics too early
- Build context before complexity

---

### Step 2: Break Into Steps

Split the project into ordered steps.

Think of this like a recipe: what needs to happen first, second, third, etc., so that each step builds on the previous ones.
Think about the dependencies between tasks: what needs to exist before the next thing can be built? Arrange the steps so that each one sets up the next, just like following a recipe where you prepare ingredients in the right order before cooking.
Each step should:

- follow dependencies (what needs to exist first)
- be doable in one session (roughly 1 to 4 hours)
- have a clear outcome

Keep steps focused.

If a step feels too big, break it down.

---

### Step 3: Write the Roadmap

Default location:

- `dev-docs/ROADMAP.md`
  (or wherever the developer prefers)

```markdown
<!-- Last updated: [date] -->
<!-- Last change: Initial roadmap creation -->

# [Project Name] - Implementation Roadmap

Generated from: [PRD path from tandem.json]

## Steps

- [ ] **Step 1: [Title]**
  [What this step covers and what gets built]
  [Reference architecture components if helpful]

  **User Stories** (only when it makes sense):

  * As a [user type], I want to [action] so that [outcome].

- [ ] **Step 2: [Title]**
  [Brief description]
```

User stories are helpful for user-facing features.

Do not force them for:

- setup work
- configuration
- internal refactors

---

### Step 4: Register in Manifest

Update `tandem.json`:

```json
{
"path": "dev-docs/ROADMAP.md",
"scope": "general",
"purpose": "Ordered implementation steps with checkboxes and user stories",
"tags": ["roadmap", "planning"]
}
```

---

### Step 5: Review with Developer

Walk through the roadmap together.

- check ordering
- check step size
- adjust anything unclear

This should feel like a plan they would actually follow.

---

## Important Reminders

- Keep steps small and focused
- Each step should have a clear deliverable
- Do not include time estimates or complexity scoring
- Do not force user stories where they do not fit
- Do not over-plan. This is a working plan, not a perfect one
- Keep everything grounded in the PRD and architecture
- Use the checkbox format exactly (`- [ ]`, `- [x]`)
- Never use em dashes
- Avoid vague steps like "build backend" or "set up frontend". Be specific.
- Each step should result in something tangible that works or can be tested.
- Do not reorder steps for aesthetics. Follow actual dependencies.
- Do not assume the developer knows what a step means. Write it clearly.
- Write steps so they can be used directly with /pair-program without extra interpretation.
