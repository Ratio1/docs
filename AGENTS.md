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

For overall system behavior and purpose:
- https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters
- https://ratio1.ai/whitepaper
- https://explorer.ratio1.ai/
- https://app.ratio1.ai/
- https://deeploy.ratio1.ai/

For Cloud deployment and orchestration overview:
- https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
- https://ratio1.ai/blog/ratio1-deeploy-blog-1-decentralized-managed-container-orchestration
- https://ratio1.ai/blog/migrating-build21-from-aws-to-ratio1
- https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required
- https://ratio1.ai/blog/introducing-the-worker-app-runner-deploy-from-git-to-edge
- https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple

For ecosystem business model, trust/governance, and competitive positioning:
- https://ratio1.ai/blog/the-csp-business-blueprint
- https://ratio1.ai/blog/redmesh-market-analysis-and-positioning-vs-competitors
- https://ratio1.ai/blog/the-trust-protocol-inside-ratio1-s-node-governance-and-blacklisting-system
- https://ratio1.ai/blog/who-will-be-looking-for-us-the-ratio1-ideal-customer-profile-and-more-v0-3
- https://ratio1.ai/blog/from-zero-to-node-runner-mainnet

For existing application templates and frameworks:
- https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity
- https://ratio1.ai/blog/ratio1-redmesh-from-annual-checkups-to-continuous-cyber-immunity
- https://ratio1.ai/blog/ratio1-sovereign-ai-keeping-your-models-and-data-on-prem-in-the-age-of-memorization
- https://ratio1.ai/blog/paradigm-shift-how-ratio1-j33ves-is-revolutionizing-code-intelligence
- https://ratio1.ai/blog/shipping-the-future-why-today-s-3send-launch-shows-what-the-ratio1-protocol-was-built-for

For production application development:
- https://ratio1.ai/blog/ratio1-sdk-for-typescript-your-bridge-to-edge-nodes
- https://ratio1.ai/blog/go-developers-meet-the-new-ratio1-sdk-and-sandbox
- https://ratio1.ai/blog/j33ves-keysoft-ratio1-three-assistants-that-turn-intent-into-results
- https://ratio1.ai/blog/empowering-the-nodejs-ecosystem

For low-level information and SDK-oriented development (not production-grade apps):
- https://ratio1.ai/blog/deep-dive-into-the-ratio1-community-telegram-bot-network-insights-for-everyone
- https://ratio1.ai/blog/ratio1-end-to-end-tutorial
- https://ratio1.ai/blog/introducing-dauth-simplified-decentralized-authentication-in-ratio1
- https://ratio1.ai/blog/distributed-prime-number-calculation
- https://ratio1.ai/blog/deploying-a-custom-web-application
- https://ratio1.ai/blog/build-your-own-sandbox-in-minutes
- https://github.com/Ratio1/ratio1_sdk

For the main Edge Node repositories and behavior:
- https://github.com/Ratio1/edge_node
- https://github.com/ratio1/naeural_core

### Local Canonical Sources

- `todo/README.md`
- `README.md`
- `docs/`

### Resource Expansion Policy

As prompts and tasks evolve, append newly discovered high-signal sources to this `## Resources` section, with a short note on what each source is authoritative for.
