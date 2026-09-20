---
description: Update project documentation when something changes. Figure out what is affected, resolve conflicts, and keep docs aligned.
argument-hint: [what changed and why]
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Update Docs

You are helping a developer update their documentation after something changed.

This could be:

- a requirement change
- a new decision
- a scope shift
- something discovered during implementation

The trigger is simple:
Something in the project changed (perhaps a requirement, a decision, or the scope of work). Whatever it is that changed, the documentation that describes the project no longer matches reality.

**Something changed. Now the docs need to match reality.**

---

## Workflow

### Step 1: Understand What Changed

If the developer provided context: $ARGUMENTS

Make sure you understand:

- what changed
- why it changed

Ask questions if anything is unclear.

The "why" matters. It helps decide if this should be recorded as an ADR.

---

### Step 2: Identify Affected Docs

Read `tandem.json`.

Use `scope`, `purpose`, and `tags` to figure out what is impacted.

Then suggest:

> "Based on this change, I think these docs need updates:"
>
> - `dev-docs/PRD.md` (scope changed)
> - `dev-docs/ARCHITECTURE.md` (component affected)
>
> "Does that look right?"

Wait for confirmation before making changes.

---

### Step 3: Check for Conflicts

Use this as a guide:

| Domain                  | Source of truth |
| ----------------------- | --------------- |
| What to build and why   | PRD             |
| How the system works    | Architecture    |
| Build order             | Roadmap         |
| Why a decision was made | ADRs            |

If something conflicts, call it out.

Example:

> "The PRD says [X], but the architecture describes [Y].
> The requirement still stands, so the architecture needs to change.
> Here’s what I’d update. Does that make sense?"

Do not fix conflicts silently.

Always explain:

- what is conflicting
- which doc takes priority
- what needs to change

---

### Step 4: Update Each Doc

For each affected doc:

1. Read the doc as it is
2. Work within its structure
3. Do not force templates or new sections
4. Only change what needs to change
5. Leave everything else alone

If the doc has a version header, update it:

```markdown
<!-- Last updated: [today's date] -->
<!-- Last change: [what changed, briefly, include ADR if relevant] -->
```

If a roadmap step no longer applies:

- mark it clearly
- do not delete it

---

### Step 5: GitHub Issue Sync

If a roadmap step is linked to an issue and changes:

> "This step changed and is linked to issue #12. Want me to update the issue?"

If `gh` is available:

- update with `gh issue edit`

If not:

- note what needs to be updated manually

---

### Step 6: Architecture Enrichment

If this started as a new project and now has real code:

Offer:

> "The architecture doc does not include a codebase map yet, and there is now code to document. Want me to add that?"

If yes:

- scan the codebase
- add Codebase Map and Entry Points
- follow the same approach as reverse-engineer mode

---

### Step 7: Suggest ADR (If Needed)

If this is a meaningful decision:

> "This looks like a real decision. Want me to capture it with `/create-adr`?"

---

## Important Reminders

- This is one workflow. Do not split into separate commands
- Do not rewrite entire docs unless necessary
- Make changes visible and easy to understand
- Always explain meaningful changes before making them
- Preserve existing structure
- Do not guess unclear intent, ask instead
- Keep docs aligned with reality, not plans
- Never use em dashes
- Do not update docs just because you can. Only change what is actually affected.
- Make the smallest change needed to fix the problem. Avoid rewriting large sections.
- If something is ambiguous, ask instead of making assumptions about intent.
- Do not remove past decisions unless they are clearly invalid. Prefer marking or updating instead.
- If you are unsure about part of a change, say so and ask before updating.
