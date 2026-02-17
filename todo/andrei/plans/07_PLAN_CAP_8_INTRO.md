# 07_PLAN_CAP_8_INTRO

Owner: Andrei (`AID`)  
Date: 2026-02-17  
Scope: Chapter `8.` only — `Application Templates` introduction page

## 1) Objective

Deliver a source-backed introduction for Chapter 8 in:

- `docs/application-templates/index.md`

This task does **not** include drafting `8.1+` subsection pages.

## 2) Inputs and Source of Truth

- Taxonomy: `todo/README.md` (Chapter 8 structure and ownership)
- Owner queue: `todo/TODO_ANDREI.md`
- Local canonical docs:
  - `docs/application-templates/index.md`
  - `docs/application-templates/r1fs-demo/index.md`
  - `docs/application-templates/redmesh-demo/index.md`
  - `docs/application-templates/docs-template/index.md`
- Ground-truth sources (authoritative-first):
  - https://ratio1.ai/whitepaper
  - https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters
  - https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
  - https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity
  - https://ratio1.ai/blog/shipping-the-future-why-today-s-3send-launch-shows-what-the-ratio1-protocol-was-built-for
  - https://app.ratio1.ai/
  - https://deeploy.ratio1.ai/
  - https://explorer.ratio1.ai/

## 3) Content Contract for `docs/application-templates/index.md`

The page must:

1. Explain what an "application template" means in Ratio1 docs context.
2. Clarify the split between:
   - template-level orientation (Chapter 8 intro), and
   - implementation/deployment details in each template subtree (`8.1+`).
3. Set practical reader path:
   - choose template,
   - understand develop vs deeploy tracks,
   - verify runtime posture via App/Explorer.
4. Avoid unverified claims about internals of templates not authored yet.
5. Include explicit `Ground truth references` and a concrete `Notable date`.

## 4) Execution Steps

1. Validate scope and current state of Chapter 8 files.
2. Draft Chapter 8 intro content in `docs/application-templates/index.md`.
3. Run CRITIC pass focused on:
   - factual correctness,
   - overclaim detection,
   - traceability coverage.
4. Apply any required refinements.
5. If CRITIC has no critical blockers, mark `8.` as completed in:
   - `todo/TODO_ANDREI.md`
   - `todo/README.md`

## 5) Risks and Mitigation

- Risk: Overstating template implementation status.
  - Mitigation: Keep intro scoped to navigation and workflow framing.
- Risk: Drift between docs and current ecosystem naming.
  - Mitigation: Use only official Ratio1 naming from current sources.
- Risk: Premature TODO closure.
  - Mitigation: Gate completion on CRITIC pass outcome.

## 6) Acceptance Criteria

1. `docs/application-templates/index.md` is no longer placeholder text.
2. Claims are source-backed and date-stamped.
3. CRITIC pass reports no critical blockers.
4. Chapter 8 intro TODO item is checked only after CRITIC approval.

