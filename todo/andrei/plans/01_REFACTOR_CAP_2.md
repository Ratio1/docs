# REFACTOR_01_CAP_2

Owner: Andrei (`AID`)  
Date: 2026-02-17  
Scope: Chapter `2` (`2`, `2.1`, `2.2`, `2.3`, `2.4`) in `docs/ratio1-overview/`

## 1. Refactor Objective

Refactor Chapter 2 away from SDK-first framing and re-anchor it in:

1. Ratio1 as a Cloud-on-Edge AI meta-OS.
2. Tokenized and licensed node operation model (Node Deeds, PoA/PoAI, escrowed job economics).
3. Production orchestration via Deeploy and licensed operators/CSPs.
4. SDKs as secondary interfaces (primarily development/prototyping and controlled integrations), not the primary production story.

## 2. Source Analysis Digest (All Requested Sources)

## 2.1 Overall System Behavior and Purpose

- `https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters` (2025-06-11):
  - Defines Ratio1 as an AI operating system powered by blockchain.
  - Frames node operation as licensed participation with dual rewards (PoA + PoAI).
  - Emphasizes onboarding via node tooling (`r1setup`, launcher, dAuth) and Node Deed gating.
- `https://ratio1.ai/whitepaper` (v1.3.9, 2025-2026):
  - Formalizes AI meta-OS architecture, decentralized orchestration, dAuth, CStore, R1FS, Deeploy, OracleSync.
  - Formalizes licensing and reward flows, PoA/PoAI mechanics, escrow logic, and burn dynamics.
- `https://explorer.ratio1.ai/` (checked 2026-02-17):
  - Public evidence of live token/network telemetry and license-linked node state (examples present for `$R1` price, minted supply, license classes, node versions, availability).
- `https://app.ratio1.ai/` (checked 2026-02-17):
  - Product surface explicitly centered on licenses, linking nodes, KYC/KYB, PoA/PoAI reward claiming, transfer/sell/buy license flows.
- `https://deeploy.ratio1.ai/` (checked 2026-02-17):
  - Dedicated deployment product surface for managing jobs/deployments, scaling workers, updating pipelines, and fund lifecycle.

## 2.2 Cloud Deployment and Orchestration

- `https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1` (2025-09-03):
  - CSP-as-franchise operator model is explicit.
  - Deeploy positioned as CSP gateway into distributed compute.
  - Licensed Oracle Node + KYC/KYB called out as access prerequisites.
- `https://ratio1.ai/blog/ratio1-deeploy-blog-1-decentralized-managed-container-orchestration` (2025-05-08):
  - Core architecture: decentralized orchestration for heterogeneous edge nodes.
  - Contrasts centralized orchestrators and explains smart contract/oracle mediated control.
- `https://ratio1.ai/blog/migrating-build21-from-aws-to-ratio1` (2025-08-02):
  - Real migration narrative from centralized cloud to decentralized cloud-edge.
  - Reinforces sovereignty, cost/control, and CSP-assisted migration patterns.
- `https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required` (2025-10-10):
  - Worker App Runner (WAR) as production-grade Git-to-edge path.
  - Distinguishes SDK path and no-code Deeploy path.
- `https://ratio1.ai/blog/introducing-the-worker-app-runner-deploy-from-git-to-edge` (2025-09-05):
  - WAR introduced as plugin + Deeploy job type.
  - Contrasts with container-image-first flow (CAR).

## 2.3 Existing Application Templates and Frameworks

- `https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity` (2025-08-29):
  - Production framework example running on edge plugin architecture with decentralized orchestration.
- `https://ratio1.ai/blog/ratio1-redmesh-from-annual-checkups-to-continuous-cyber-immunity` (2025-12-17):
  - Compliance and continuous operations narrative anchored in decentralized execution and verifiable outcomes.
- `https://ratio1.ai/blog/ratio1-sovereign-ai-keeping-your-models-and-data-on-prem-in-the-age-of-memorization` (2026-01-09):
  - Strong “Your AI, Your Data” framing; infrastructure ownership as security boundary.
- `https://ratio1.ai/blog/paradigm-shift-how-ratio1-j33ves-is-revolutionizing-code-intelligence` (2025-04-09):
  - High-context production assistant narrative built on Ratio1 architecture (not just isolated SDK examples).

## 2.4 Production Application Development Sources

- `https://ratio1.ai/blog/ratio1-sdk-for-typescript-your-bridge-to-edge-nodes` (2025-11-12):
  - TS access to CStore/R1FS for app integration; supports production integrations but still interface-level.
- `https://ratio1.ai/blog/go-developers-meet-the-new-ratio1-sdk-and-sandbox` (2025-10-21):
  - Go SDK + sandbox pairing; reinforces split between local development and edge production runtime.
- `https://ratio1.ai/blog/j33ves-keysoft-ratio1-three-assistants-that-turn-intent-into-results` (2025-09-08):
  - Production assistants running on Ratio1 with encrypted/user-owned storage.
- `https://ratio1.ai/blog/empowering-the-nodejs-ecosystem` (2025-07-31):
  - Platform expansion beyond Python; CStore/R1FS as primitives for ecosystem integrations.

## 2.5 Low-Level / SDK-Oriented Sources (Not Primary Production Baseline)

- `https://ratio1.ai/blog/deep-dive-into-the-ratio1-community-telegram-bot-network-insights-for-everyone` (2025-07-09):
  - Template/tutorial operational bot architecture.
- `https://ratio1.ai/blog/ratio1-end-to-end-tutorial` (2025-02-02):
  - Learning-focused node + SDK flow.
- `https://ratio1.ai/blog/introducing-dauth-simplified-decentralized-authentication-in-ratio1` (2025-01-20):
  - dAuth fundamentals, onboarding simplification.
- `https://ratio1.ai/blog/distributed-prime-number-calculation` (2024-12-19):
  - Educational distributed compute tutorial.
- `https://ratio1.ai/blog/deploying-a-custom-web-application` (2024-12-20):
  - Marked as pre-2.5 era guidance; contains explicit “important update” notice.
- `https://ratio1.ai/blog/build-your-own-sandbox-in-minutes` (2024-12-13):
  - Sandbox tutorial; also pre-2.5 caution.
- `https://github.com/Ratio1/ratio1_sdk` (updated 2026-02-07):
  - SDK/client abstractions and tutorials; appropriate as implementation interface reference, not ecosystem architecture anchor.

## 2.6 Main Edge Node Repositories and Behavior

- `https://github.com/Ratio1/edge_node` (updated 2026-02-11):
  - Runtime packaging and plugin surfaces; strong extension map:
  - `extensions/business/*` includes `deeploy`, `container_apps`, `chain_dist`, `cstore`, `r1fs`, `dauth`, `oracle_sync`, `jeeves`, etc.
- `https://github.com/ratio1/naeural_core` (updated 2026-02-16):
  - Core execution contracts and base runtime modules; edge-node behavior inheritance source.

## 3. Chapter 2 Diagnosis (Current Docs)

Current `docs/ratio1-overview/*` is structurally coherent but over-indexed on SDK entity vocabulary (`Session`, `Pipeline`, `Instance`) as the primary mental model, which:

1. Understates the licensed, tokenized operational economy.
2. Understates Deeploy/CSP operational centrality in production.
3. Overstates SDK-direct orchestration as default production posture.
4. Leaves business-role flows (Node Operator vs CSP vs Developer) under-explained in Chapter 2.

## 4. Refactor Strategy

## 4.1 Narrative Hierarchy (New)

1. **First**: protocol purpose + cloud-on-edge architecture.
2. **Second**: participation and economics (license + rewards + escrow + governance constraints).
3. **Third**: orchestration surfaces (Deeploy primary for production; CAR/WAR/ChainDist context).
4. **Fourth**: data/state layers (R1FS, CStore) in service of real deployments.
5. **Fifth**: SDK and low-level APIs as implementation interfaces.

## 4.2 Page-Level Refactor Plan

1. `docs/ratio1-overview/index.md`
   - Rewrite intro around AI meta-OS + cloud-on-edge + tokenized node economy.
   - Add explicit role model (Node Operators, CSPs, Developers).
   - Add explicit production-vs-development positioning.
2. `docs/ratio1-overview/decentralized-orchestration.md`
   - Make Deeploy and licensed orchestration path primary.
   - CAR/WAR split with practical production intent.
   - Keep direct SDK orchestration as advanced/controlled path.
3. `docs/ratio1-overview/distributed-storage.md`
   - Reframe as production artifact layer with sovereignty guarantees.
   - Preserve CStore contrast but avoid SDK-only framing.
4. `docs/ratio1-overview/decentralized-apps.md`
   - Reframe around deployed service patterns (CStore + R1FS + orchestration lifecycle).
   - Anchor with production frameworks examples (RedMesh/J33VES/Sovereign AI motifs).
5. `docs/ratio1-overview/the-plugins-system.md`
   - Describe plugin system via edge runtime extension surfaces (`edge_node` + `naeural_core`).
   - Position plugins as execution substrate for orchestration products and workloads, not as SDK artifacts.

## 5. Source-to-Section Mapping for Drafting

## 5.1 Section `2` (Overview)

- Primary: whitepaper + what-is-ratio1 + explorer + app + deeploy.
- Supporting: deeploy-unlocked, build21 migration.

## 5.2 Section `2.1` (Orchestration)

- Primary: deeploy-unlocked, deeploy-blog-1, WAR posts, whitepaper sections on Deeploy/ChainDist/oracles.
- Supporting: edge_node extensions (`deeploy`, `container_apps`, `chain_dist`, `oracle_sync`).

## 5.3 Section `2.2` (Distributed Storage)

- Primary: whitepaper R1FS/CStore sections.
- Supporting: TS/Go/NodeJS posts only to illustrate interface access (not architecture authority).

## 5.4 Section `2.3` (Decentralized Apps)

- Primary: redmesh, sovereign AI, j33ves+keysoft, build21 migration.
- Supporting: explorer/app product surfaces for operational observability/licensing context.

## 5.5 Section `2.4` (Plugins System)

- Primary: `edge_node` + `naeural_core` repo structure.
- Supporting: blog/framework examples to demonstrate plugin outcomes.

## 6. Writing Constraints for Refactor

1. Do not imply SDK is the standard production orchestrator path.
2. Explicitly state that production deployments are centered on licensed nodes and orchestration workflows.
3. Keep dynamic values (token price, live counts) non-hardcoded unless explicitly dated.
4. Tag pre-2.5 tutorial content as historical/low-level where referenced.
5. Every major claim in Chapter 2 should map to at least one primary source above.

## 7. Execution Plan

1. Rewrite `index.md` to establish architecture + economy + roles.
2. Rewrite `decentralized-orchestration.md` with Deeploy-first production framing.
3. Rewrite `distributed-storage.md` and `decentralized-apps.md` with operational perspective.
4. Rewrite `the-plugins-system.md` anchored to `edge_node`/`naeural_core` extension contracts.
5. Run CRITIC pass #1: factual consistency vs mapped sources.
6. Apply corrections and remove weak claims.
7. Run CRITIC pass #2 and finalize.

## 8. Acceptance Criteria

1. Chapter 2 no longer reads as SDK-first architecture.
2. Cloud-on-edge + tokenized node operation model is explicit in all subchapters.
3. Deeploy/CSP/Node Operator roles are clearly separated.
4. SDK is clearly positioned as interface layer, not protocol core narrative.
5. Source links in each page reflect updated ground truth grouping from `AGENTS.md`.

