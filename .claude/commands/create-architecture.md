---
description: Generate or map a technical architecture document. Works for new projects, existing codebases, or projects that are being updated.
argument-hint: [design|reverse-engineer|migration] (optional)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
---

# Create Architecture

You are helping a developer create a technical architecture document.

This can happen in three situations:

- starting something new
- understanding an existing codebase
- updating or reshaping an existing system

Keep this practical. The goal is a clear mental model, not a perfect document.

**Note:** `AskUserQuestion` is a Claude Code tool for structured choices. You do not implement it here.

Use `AskUserQuestion` when:

- choosing between options
- deciding scope or structure
- making trade-offs

Keep open-ended discussion as normal conversation.

---

## Detect Mode

Figure out what situation you are in.

1. Check `tandem.json` for a doc tagged `prd`
2. Check if the project has real source code (not just config)

Then decide:

- Code + PRD or target description → **updating a system (migration)**
- PRD exists, no code → **new project (design)**
- Code exists → **existing codebase (reverse-engineer)**

If it is not clear, ask:

> "Are we designing something new, mapping an existing project, or planning changes to something that already exists?"

If the developer passed an argument ($ARGUMENTS), follow that.

---

### Mode 1: New Project (Design)

The developer has an idea or PRD and needs a system design.

1. Read the PRD (from the manifest)
2. Read `~/.claude/CLAUDE.md` if a Developer Profile exists
3. Talk through the architecture together:
   - main components
   - data model
   - API shape
   - infrastructure

   Do not rush this. Make sure the developer understands and agrees with the decisions.

4. Write the architecture doc  
(default: `dev-docs/ARCHITECTURE.md`, or whatever they prefer)

5. Register it in the manifest and review it together

**Important:**
Do not include Codebase Map or Entry Points yet. There is no code.

---

### Mode 2: Existing Codebase (Reverse-Engineer)

The developer already has code and wants to understand it.

1. Scan the codebase

   Adjust depth based on size:

   - **Small (<20 files)**
   - read most files
   - understand full flow

   - **Medium (20–100 files)**
   - read structure fully
   - read entry points and key modules
   - summarize supporting files

   - **Large (100+ files)**
   - start with structure and config
   - read entry points
   - identify major areas
   - go deeper only if asked

   If unsure:

   > "This is a larger codebase. Want me to go deeper anywhere?"

2. Write the architecture doc  
   Include:

   - Codebase Map
   - Entry Points

3. Add an **Unanswered Questions** section if needed  
Only include questions that actually block understanding of the system. Do not list things that are merely curiosities or nice-to-know details.

4. Register in manifest and review with the developer

---

### Mode 3: Updating a System (Migration)

There is existing code, but things are changing.

1. Map the current system (same as Mode 2)
2. Understand the target system (from PRD or discussion)
3. Write the architecture doc with:

   - Current State
   - Target State
   - Migration Path (what changes, in what order)

4. Add Unanswered Questions if needed
Only include questions that actually block understanding of the system. Do not list things that are merely curiosities or nice-to-know details.

5. Register and review

---

## Architecture Doc Template

Use this as a starting point. Adjust as needed.

```md
<!-- Last updated: [date] -->
<!-- Last change: Initial architecture document -->

# [Project Name] - Technical Architecture

## System Overview
[High-level description of the system]

## Codebase Map
[What folders and key files do]
[Skip for new projects]

## Entry Points
[Where the app starts, request flow]
[Skip for new projects]

## Component Breakdown
[Main parts of the system and how they interact]

## Data Model
[Tables or collections, fields, relationships]

## API Design
[Endpoints, patterns, auth]

## Infrastructure & Deployment
[Hosting, environments, CI/CD]

## Key Technical Decisions
[Short summary, details go in ADRs]

## Project Conventions (optional)

### Development Philosophy
### Testing
### Code Style
### Error Handling
### Commits & PRs
### AI Rules
[Guidelines for how AI should be used in the project, if applicable]
```

---

## Diagrams (Keep This Lightweight)

Do not assume one format.

Ask the developer:

> "Do you want diagrams here, or keep this text-only?"

If diagrams are used:

- Prefer simple and lightweight options
- Avoid heavy or expensive rendering

### System Diagram

- Optional
- Keep it simple if included

### Data Model

Default preference:

- Use a `docs/ERD.dbml` file
- Do not default to Mermaid ERDs

If the developer prefers something else, ask.

---

## Register in Manifest

After writing the doc, update `tandem.json`:

```json
{
  "path": "dev-docs/ARCHITECTURE.md",
  "scope": "general",
  "purpose": "System design, component breakdown, data model, API design, project conventions",
  "tags": ["architecture", "system-design", "conventions", "data-model"]
}
```

---

## Important Reminders

- This document explains **how the system works**
- Do not repeat the PRD
- Keep it practical, not exhaustive
- A short, clear map is better than a long one nobody uses
- Do not guess unclear behavior, ask instead
- Keep diagrams optional and lightweight
- Never use em dashes
- Do not over-design early. Start simple and expand only when needed.
- If this is based on an existing project, keep everything grounded in actual code.
- If something is unclear, call it out instead of guessing.
- Write this so someone new to the project could understand it quickly.
- Do not include sections that do not apply just to fill the template.
