# AGENTS Guide for Ratio1 Docs

## Purpose of This Repository

This repository is the Ratio1 documentation hub, implemented as a Docusaurus site and structured by `todo/README.md` (Ratio1 Documentation Structure section).
Its purpose is to produce and maintain accurate, audience-specific docs for the Ratio1 ecosystem, including:
- platform overview and architecture,
- node operators,
- cloud service providers (CSPs),
- developers (SDKs and tools),
- explorer and auxiliary tools,
- application templates, deployable services, and partner applications.

## Ownership Legend

- `V` = Vitalii
- `P` = Petrica
- `AID` = Andrei
- `Ale` = Alessandro
- `B` = Bastia
- `Bleo` = Bleo

## Ownership TODO Files

Keep owner task lists in `/todo` (repo root):
- `todo/TODO_VITALII.md`
- `todo/TODO_PETRICA.md`
- `todo/TODO_ANDREI.md`
- `todo/TODO_ALESSANDRO.md`
- `todo/TODO_BASTIA.md`
- `todo/TODO_BLEO.md`

Use these files as the working queue for section drafting and updates.

Contributor working folders are also in `/todo`:
- `todo/andrei/`
- `todo/petrica/`
- `todo/vitalii/`
- `todo/alessandro/`
- `todo/bastia/`
- `todo/bleo/`

Each contributor folder is for plans, prompts, scraps, and related WIP materials.

## Execution Workflow for Every Agent Task

For each assigned task (example: `2.4. The Plugins system`), follow this sequence:

1. Identify the contributor first (`V`, `P`, `AID`, `Ale`, `B`, `Bleo`) from the assignment.
2. Use `todo/README.md` (Ratio1 Documentation Structure section) as the global taxonomy and scope map.
3. Use the contributor-specific queue file `todo/TODO_<CONTRIBUTOR>.md` as the task source of truth for what to write next.
4. Implement/update the target section.
5. Switch to **CRITIC** personality after drafting.
6. CRITIC validates content against Ratio1 ground truth sources (repos, whitepaper, blog, product apps, and other official references).
7. CRITIC outputs:
   - factual mismatches,
   - missing details,
   - weak or outdated claims,
   - required source links.
8. Refine the section using CRITIC findings.
9. Re-run a short CRITIC pass until no critical issues remain.

## Ground Truth Rules

- Prefer official Ratio1 sources over third-party summaries.
- Do not keep unverified technical claims.
- For changing topics (APIs, tooling behavior, operational flows), cross-check with current upstream sources before finalizing.

## Resources

### Core Ground Truth Sources

- https://github.com/Ratio1/edge_node
- https://github.com/Ratio1/ratio1_sdk
- https://ratio1.ai/whitepaper
- https://ratio1.ai/blog
- https://explorer.ratio1.ai/
- https://app.ratio1.ai/
- https://deeploy.ratio1.ai/

### Local Canonical Sources

- `todo/README.md`
- `README.md`
- `docs/`

### Resource Expansion Policy

As prompts and tasks evolve, append newly discovered high-signal sources to this `## Resources` section, with a short note on what each source is authoritative for.
