---
description: Generate a Product Requirements Document from a project idea. Talk through the idea, gather requirements, discuss trade-offs, and define scope.
argument-hint: [project idea or description] (optional)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---

# Create PRD

You are helping a developer turn an idea into a clear Product Requirements Document.

This should feel like a real conversation. Ask questions, explore trade-offs, and help define what should be built and why.

The final PRD should be clear, focused, and easy to reference later.

**Note:** `AskUserQuestion` is a Claude Code tool for structured choices. You do not implement it here.

---

## Step 1: Gather Context

If the developer provided a description: $ARGUMENTS

Start by understanding the idea.

Ask questions, but do not dump a long list all at once. Let it flow naturally.

Things you should figure out:

- What problem does this solve?
- Who is this for? (if anyone)
- What constraints exist?  
  (timeline, team size, hosting, budget, compliance)
- Is there a preferred tech stack, or is that still open?
- Is this a personal project, portfolio piece, or production work?

Read `~/.claude/CLAUDE.md` if it exists and includes a `## Developer Profile`.

Use it to adjust how you ask questions:

- newer developer → ask more guiding questions
- experienced developer → focus more on decisions and trade-offs

---

### Tech Stack Guidance

Stay neutral.

Do not default to tools the developer already knows or wants to learn.

Pick tools based on the project:

- requirements
- constraints
- trade-offs

If the developer asks for help:

- present a few options
- explain why each could work
- let them decide

---

### Using AskUserQuestion

Use `AskUserQuestion` when there are clear options to choose from.

Examples:

- choosing a tech stack
- deciding scope
- including or skipping features

Use normal conversation for open-ended questions like:
> "What problem are you trying to solve?"

---

## Step 2: Draft the PRD

Once you have enough context, write the PRD.

Default location:

- `dev-docs/PRD.md`  
(or wherever the developer prefers)

Use this as a starting structure. Adjust as needed.

```markdown
<!-- Last updated: [date] -->
<!-- Last change: Initial PRD creation -->

# [Project Name] - Product Requirements Document

## Problem Statement
## Target Users (if applicable)
## Core Requirements
## Technical Stack
  ### Stack Decisions (with brief rationale)
## Scope
  ### In Scope (v1)
  ### Out of Scope (future)
## Success Criteria
## Learning Goals (optional, for personal/portfolio projects only)
```

This is not a rigid template.

Adjust based on the project:

- simple tools → fewer sections
- complex systems → add more detail where needed

Keep it concise.

If it takes more than 10 to 15 minutes to read, it is too long.

---

### Learning Goals Section

Only include this if the project is meant for learning.

Examples:

- portfolio projects
- experiments
- skill-building work

Do not include it for:

- client work
- production systems
- anything where shipping matters more than learning

If included:

- `/pair-program` will use it for understanding checks
- it should not influence tool or stack decisions

---

## Step 3: Register in Manifest

After creating the PRD, update `tandem.json`.

If it exists:

- add a new entry to `docs`

If it does not exist:

- create it with default config and this entry

```json
{
  "path": "dev-docs/PRD.md",
  "scope": "general",
  "purpose": "Product requirements, target users, tech stack decisions, project scope",
  "tags": ["prd", "requirements", "scope", "stack"]
}
```

---

## Step 4: Review with Developer

Walk through the PRD together.

- ask for feedback
- adjust anything unclear
- refine scope if needed

The PRD is not final. It can change over time.

Use `/update-docs` later if needed.

---

## Important Reminders

- The PRD defines **what to build and why**
- Do not mix in architecture decisions (that belongs elsewhere)
- Keep tech stack reasoning short and clear
- Put deeper trade-off discussion in ADRs
- Do not overcomplicate the document
- Keep it readable and practical
- Never use em dashes
- Do not invent details just to fill sections. If something is unknown, say that clearly.
- A clear scope beats a complete list. Focus on what actually matters for v1.
- Keep everything tied to the actual project. Avoid generic or template-style writing.
- Avoid vague language like "scalable", "robust", or "user-friendly" unless you explain what it means here.
- When a decision is made, write it down. Do not leave important choices implied.
- Stay at the requirements level. Do not turn this into a build plan.
