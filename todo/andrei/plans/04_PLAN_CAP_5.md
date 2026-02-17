# 04_PLAN_CAP_5

Owner: Andrei (`AID`)  
Date: 2026-02-17  
Scope: Chapter `5` tasks assigned to `AID` in `todo/TODO_ANDREI.md` and `todo/README.md`

## 1) Objective

Deliver complete, source-grounded Developer docs for all assigned Chapter 5 tasks:

- `5.` For Developers
- `5.1.` Python
- `5.1.1.` Quick end-to-end example
- `5.1.2.` Navigating the Tutorials
- `5.1.3.` API Quick Reference
- `5.1.4.` The Edge Node Software
- `5.1.5.` Contributing to the Edge Node and Beyond
- `5.5.` r1ctl
- `5.5.1.` r1ctl Overview
- `5.5.2.` r1ctl Features

Also complete Chapter 5 QA and checklist updates in:

- `todo/TODO_ANDREI.md`
- `todo/README.md`

## 2) Task-to-File Mapping

1. `5.` For Developers  
Target: `docs/developers/index.md`

2. `5.1.` Python  
Target: `docs/developers/python/index.md`

3. `5.1.1.` Quick end-to-end example  
Target: `docs/developers/python/quick-end-to-end-example.md`

4. `5.1.2.` Navigating the Tutorials  
Target: `docs/developers/python/navigating-the-tutorials.md`

5. `5.1.3.` API Quick Reference  
Target: `docs/developers/python/api-quick-reference.md`

6. `5.1.4.` The Edge Node Software  
Target: `docs/developers/python/the-edge-node-software.md`

7. `5.1.5.` Contributing to the Edge Node and Beyond  
Target: `docs/developers/python/contributing-to-the-edge-node-and-beyond.md`

8. `5.5.` r1ctl  
Target: `docs/developers/r1ctl/index.md`

9. `5.5.1.` r1ctl Overview  
Target: `docs/developers/r1ctl/r1ctl-overview.md`

10. `5.5.2.` r1ctl Features  
Target: `docs/developers/r1ctl/r1ctl-features.md`

## 3) Baseline Diagnosis (Current State)

Current Chapter 5 pages are mostly skeleton placeholders (`What this covers`, `TBD` dates).
The work is not a light edit; it is a full drafting pass with source validation.

## 4) Source Strategy (Authoritative-First)

## 4.1 Core Context (all Chapter 5 pages)

- `https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters`
- `https://ratio1.ai/whitepaper`
- `https://app.ratio1.ai/`
- `https://explorer.ratio1.ai/`
- `https://deeploy.ratio1.ai/`

## 4.2 Developer/SDK Ground Truth

- `https://github.com/Ratio1/ratio1_sdk`
- `https://ratio1.ai/blog/ratio1-sdk-for-typescript-your-bridge-to-edge-nodes`
- `https://ratio1.ai/blog/go-developers-meet-the-new-ratio1-sdk-and-sandbox`
- `https://ratio1.ai/blog/empowering-the-nodejs-ecosystem`
- `https://ratio1.ai/blog/ratio1-end-to-end-tutorial`
- `https://ratio1.ai/blog/distributed-prime-number-calculation`
- `https://ratio1.ai/blog/deploying-a-custom-web-application`
- `https://ratio1.ai/blog/build-your-own-sandbox-in-minutes`
- `https://ratio1.ai/blog/deep-dive-into-the-ratio1-community-telegram-bot-network-insights-for-everyone`

## 4.3 Edge Node / Architecture / Contribution

- `https://github.com/Ratio1/edge_node`
- `https://github.com/ratio1/naeural_core`
- Existing Chapter 2 docs as internal dependency:
  - `docs/ratio1-overview/index.md`
  - `docs/ratio1-overview/decentralized-orchestration.md`
  - `docs/ratio1-overview/distributed-storage.md`
  - `docs/ratio1-overview/the-plugins-system.md`

## 4.4 r1ctl Source Discovery Gate

There is no dedicated r1ctl canonical source listed in current local docs/resources.
Before drafting `5.5.*`, run a focused discovery step in official Ratio1 repos/blog/docs:

- locate command reference or source tree for `r1ctl`,
- extract command groups and stable behavior,
- avoid unverified command flags/examples.

If insufficient evidence remains, publish a constrained high-level page and explicitly mark unavailable deep-command claims as pending source confirmation.

## 5) Content Contracts Per Page

## 5.1 `docs/developers/index.md` (`5`)

- Frame Developer chapter paths and when to use each (Python/JS/Go/Sandbox/r1ctl).
- Tie to production reality: SDK is interface layer; deployment/orchestration context references Chapter 2.
- Add clear “choose your path” navigation for first-time readers.

## 5.2 `docs/developers/python/index.md` (`5.1`)

- Explain Python SDK role and target audience.
- Link to quickstart, tutorials index, API quick reference, edge node architecture, contributing.
- Set expectations on learning vs production usage.

## 5.3 `docs/developers/python/quick-end-to-end-example.md` (`5.1.1`)

- Provide a minimal runnable flow (prereqs, install, auth/session, deploy/run, observe outputs).
- Include expected outcomes and common failure checks.
- Keep copy/paste snippets concise and version-safe.

## 5.4 `docs/developers/python/navigating-the-tutorials.md` (`5.1.2`)

- Curate tutorials by objective (basics, distributed jobs, auth, storage, app-like flows).
- Label each as: learning/tutorial, integration pattern, or historical context.
- Add suggested progression order.

## 5.5 `docs/developers/python/api-quick-reference.md` (`5.1.3`)

- Build a compact reference for high-frequency SDK primitives and workflows.
- Include parameter/return intent and common usage notes.
- Explicitly avoid fabricating undocumented API behavior.

## 5.6 `docs/developers/python/the-edge-node-software.md` (`5.1.4`)

- Explain runtime architecture for developers consuming/extending behavior.
- Anchor to `edge_node` and `naeural_core` with a cross-reference to Chapter 2 plugin/runtime model.
- Keep this practical: “what it means for a developer” rather than protocol marketing.

## 5.7 `docs/developers/python/contributing-to-the-edge-node-and-beyond.md` (`5.1.5`)

- Contribution paths: docs, SDK, edge runtime, examples/tutorials.
- Include branch/PR hygiene, issue-first workflow, and validation expectations.
- Separate “where to contribute” from “how to contribute”.

## 5.8 `docs/developers/r1ctl/index.md` (`5.5`)

- Introduce r1ctl scope and relation to other operator/developer surfaces.
- Clarify intended audience and boundaries.

## 5.9 `docs/developers/r1ctl/r1ctl-overview.md` (`5.5.1`)

- High-level conceptual overview: what it is, why/when to use, safety model.
- No deep flags unless source-verified.

## 5.10 `docs/developers/r1ctl/r1ctl-features.md` (`5.5.2`)

- Feature catalog by command groups and workflows.
- Provide concrete examples only when verified against source.
- Mark unstable or release-dependent behavior clearly.

## 6) Execution Phases

1. Source collection and verification pass for all `5.*` tasks (including r1ctl discovery).
2. Draft pass A:
   - `5`, `5.1`, `5.1.1`, `5.1.2`, `5.1.3`
3. Draft pass B:
   - `5.1.4`, `5.1.5`, `5.5`, `5.5.1`, `5.5.2`
4. CRITIC pass #1 using `todo/andrei/prompts/CRITIC_TEMPLATE.md`.
5. Remediation patch pass from CRITIC findings.
6. CRITIC delta pass #2 until no critical/high issues remain.
7. TODO updates and closeout:
   - check items in `todo/TODO_ANDREI.md` for all Chapter 5 tasks,
   - check corresponding Chapter 5 items in `todo/README.md`,
   - update Chapter 5 QA lines in `todo/TODO_ANDREI.md`.

## 7) Risks and Mitigations

1. **API drift risk** (SDK signatures change):  
Mitigation: pin claims to currently visible repo/docs state and avoid over-specific internals without source.

2. **r1ctl evidence gap**:  
Mitigation: run explicit source discovery gate first; keep overview-level if deep command evidence is absent.

3. **Overlap confusion with Chapter 2**:  
Mitigation: reference Chapter 2 for architecture/economics and keep Chapter 5 focused on developer workflows.

4. **Tutorial staleness**:  
Mitigation: mark historical tutorials as context when needed; avoid hard version cutoffs without explicit release notes.

## 8) Acceptance Criteria

1. All 10 assigned Chapter 5 pages are no longer placeholders and contain practical, source-backed content.
2. Each page has a maintained “Ground truth references” block with topic-fit links.
3. No high-impact claim is left without an authoritative source.
4. CRITIC report for Chapter 5 ends with no critical/high blockers.
5. Chapter 5 checkboxes are marked complete in both:
   - `todo/TODO_ANDREI.md`
   - `todo/README.md`

## 9) Execution Checklist

## Drafting

- [x] `docs/developers/index.md`
- [x] `docs/developers/python/index.md`
- [x] `docs/developers/python/quick-end-to-end-example.md`
- [x] `docs/developers/python/navigating-the-tutorials.md`
- [x] `docs/developers/python/api-quick-reference.md`
- [x] `docs/developers/python/the-edge-node-software.md`
- [x] `docs/developers/python/contributing-to-the-edge-node-and-beyond.md`
- [x] `docs/developers/r1ctl/index.md`
- [x] `docs/developers/r1ctl/r1ctl-overview.md`
- [x] `docs/developers/r1ctl/r1ctl-features.md`

## Verification

- [x] CRITIC pass #1 completed
- [x] Remediation patch pass completed
- [x] CRITIC delta pass #2 completed

## TODO Closeout

- [x] Mark `5`, `5.1`, `5.1.1`, `5.1.2`, `5.1.3`, `5.1.4`, `5.1.5`, `5.5`, `5.5.1`, `5.5.2` as complete in `todo/TODO_ANDREI.md`
- [x] Mark corresponding Chapter 5 items as complete in `todo/README.md`
- [x] Mark Chapter 5 QA checks complete in `todo/TODO_ANDREI.md`
