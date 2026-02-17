# 03_REVIEW_CAP_2

Owner: Andrei (`AID`)  
Role: **CRITIC** (template-driven pass)  
Date: 2026-02-17  
Scope: Section `2` (`2`, `2.1`, `2.2`, `2.3`, `2.4`) in `docs/ratio1-overview/`

Target files:
- `docs/ratio1-overview/index.md`
- `docs/ratio1-overview/decentralized-orchestration.md`
- `docs/ratio1-overview/distributed-storage.md`
- `docs/ratio1-overview/decentralized-apps.md`
- `docs/ratio1-overview/the-plugins-system.md`

# Executive Verdict
Chapter 2 is materially improved and aligned with current Ratio1 ecosystem narratives (governance/trust, CSP onboarding, escrow-aware settlement, and production motifs like `3send`). No critical factual contradiction was found, but there is one medium staleness issue in plugin extension-surface examples and one low-confidence version-cutoff statement that needs a source-backed rewrite.

# Findings (ordered by severity)
## MEDIUM-01: Plugin extension-surface examples are partially stale vs current repo layout
- Affected: `docs/ratio1-overview/the-plugins-system.md:23`, `docs/ratio1-overview/the-plugins-system.md:24`, `docs/ratio1-overview/the-plugins-system.md:25`
- Issue: The page lists `extensions/serving/` and includes `r1fs` in the `extensions/business/` example list, while current `edge_node` tree evidence shows `extensions/business/`, `extensions/default/`, `extensions/data/` as the explicit extension directories and no direct evidence for `extensions/serving/` in this release layout.
- Why this matters: This section is used as architecture orientation for developers; stale directory naming weakens reproducibility when readers inspect the repo.
- Evidence:
  - https://github.com/Ratio1/edge_node
  - https://github.com/Ratio1/edge_node/tree/main
  - https://github.com/Ratio1/edge_node/tree/main/extensions/business
- Assessment: OUTDATED
- Required change:
  - Replace extension surfaces with a repo-verified list for the current tree (`extensions/business/`, `extensions/default/`, `extensions/data/`), or use wording that explicitly marks examples as release-dependent.
  - Remove `r1fs` from the `extensions/business/` examples unless a concrete code-path citation is added.
- Confidence: HIGH

## LOW-01: `Pre-2.5` tutorial cutoff is not source-backed
- Affected: `docs/ratio1-overview/decentralized-apps.md:53`
- Issue: The statement “Pre-2.5 tutorials should be treated as historical implementation guidance” introduces a precise version cutoff without an explicit changelog/release-note citation.
- Why this matters: Version-gated guidance without a canonical source can incorrectly discourage valid tutorial usage.
- Evidence:
  - https://ratio1.ai/blog/ratio1-end-to-end-tutorial
  - https://ratio1.ai/blog/deploying-a-custom-web-application
  - https://ratio1.ai/blog/build-your-own-sandbox-in-minutes
- Assessment: INSUFFICIENT_EVIDENCE
- Required change:
  - Either remove the specific `Pre-2.5` threshold and keep generic historical wording, or add an authoritative release/changelog source that explicitly defines this cutoff.
- Confidence: MEDIUM

# Section Scorecard
- `docs/ratio1-overview/index.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: No major gap after this pass.
- `docs/ratio1-overview/decentralized-orchestration.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: No major gap after this pass.
- `docs/ratio1-overview/distributed-storage.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: No major gap after this pass.
- `docs/ratio1-overview/decentralized-apps.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Needs update
  - Main gap: Version-cutoff claim lacks explicit source.
- `docs/ratio1-overview/the-plugins-system.md`
  - Accuracy: Mixed
  - Completeness: Good
  - Traceability: Needs update
  - Main gap: Extension directory examples need repo-current wording.

# TODO Execution Checklist (Patch Plan)
1. `docs/ratio1-overview/the-plugins-system.md`
- [ ] Update extension surface list to match current `edge_node` tree (`business/default/data`) or mark examples as release-dependent.
- [ ] Remove `r1fs` from `extensions/business/` examples unless a direct code-path citation is added.
2. `docs/ratio1-overview/decentralized-apps.md`
- [ ] Replace `Pre-2.5` with source-backed wording, or cite a canonical release/changelog entry for the exact cutoff.

# Source Set Used
Core/context:
- `todo/README.md`
- `todo/TODO_ANDREI.md`

Architecture and governance:
- https://ratio1.ai/whitepaper
- https://ratio1.ai/blog/the-trust-protocol-inside-ratio1-s-node-governance-and-blacklisting-system
- https://ratio1.ai/blog/the-csp-business-blueprint
- https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
- https://ratio1.ai/blog/ratio1-deeploy-blog-1-decentralized-managed-container-orchestration

Apps and positioning:
- https://ratio1.ai/blog/redmesh-market-analysis-and-positioning-vs-competitors
- https://ratio1.ai/blog/shipping-the-future-why-today-s-3send-launch-shows-what-the-ratio1-protocol-was-built-for

Repo/runtime structure:
- https://github.com/Ratio1/edge_node
- https://github.com/Ratio1/edge_node/tree/main
- https://github.com/Ratio1/edge_node/tree/main/extensions/business
- https://github.com/ratio1/naeural_core

Tutorial-version phrasing check:
- https://ratio1.ai/blog/ratio1-end-to-end-tutorial
- https://ratio1.ai/blog/deploying-a-custom-web-application
- https://ratio1.ai/blog/build-your-own-sandbox-in-minutes

# Stop Condition
CRITIC status: **Pass with no critical blockers.**
