---
title: Ratio1 Overview
sidebar_position: 2
description: Ratio1 as a cloud-on-edge AI meta-OS
---

# Ratio1 Overview

Ratio1 is a cloud-on-edge AI meta-OS that combines licensed edge infrastructure, decentralized
execution, and protocol-level economic settlement for AI and application workloads.

## What this chapter covers

- how production orchestration works across distributed licensed nodes;
- how storage and shared state are handled for real services;
- how plugins act as the execution substrate under product and SDK interfaces.

## Participation model: licenses, trust, and incentives

Ratio1 participation is license-gated and role-specific:

- **Node Operators** run licensed node capacity and receive network rewards (for example Proof of Availability (PoA) and Proof of AI (PoAI) flows).
- **CSPs** package and operate deployments through Deeploy lifecycle workflows.
- **Developers** build business logic and integrations through SDK/API interfaces.

Job funding and execution are designed around escrow-aware protocol economics, so production delivery
does not depend only on off-platform trust assumptions.

Governance is enforced through protocol trust controls: severe policy violations can trigger
freeze/suspend/blacklist actions, and licensed + identity-backed participation improves accountability
for enterprise operations.

## CSP minimum requirements (overview)

For managed production delivery, CSP participation typically includes:

- oracle-aligned licensed/deed posture for settlement-aware operations;
- KYC/KYB onboarding for accountable service ownership;
- escrow setup/funding before production job settlement can be released.

## Production path vs development path

- **Recommended managed production path**: Deeploy-centered orchestration on licensed nodes, using `deeploy.ratio1.ai` (and Deeploy API) for deployment operations, and `explorer.ratio1.ai` for telemetry.
- **Node/license account operations**: `app.ratio1.ai` for KYC/KYB, license lifecycle, node linking, and reward-claiming flows.
- **Development/integration path**: SDK-driven control for prototyping, custom integration, and advanced workflow logic.
- **Distributed compute path**: ChainDist for fan-out worker execution with aggregation behavior.

## In this section
- [Decentralized Orchestration](./decentralized-orchestration)
- [Distributed Storage](./distributed-storage)
- [Decentralized Apps](./decentralized-apps)
- [The Plugins System](./the-plugins-system)

## Ground truth references

Primary:
- https://ratio1.ai/whitepaper
- https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters
- https://app.ratio1.ai/
- https://explorer.ratio1.ai/
- https://deeploy.ratio1.ai/

Supporting:
- https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
- https://ratio1.ai/blog/migrating-build21-from-aws-to-ratio1
- https://ratio1.ai/blog/the-csp-business-blueprint
- https://ratio1.ai/blog/the-trust-protocol-inside-ratio1-s-node-governance-and-blacklisting-system
- https://ratio1.ai/blog/redmesh-market-analysis-and-positioning-vs-competitors
- https://ratio1.ai/blog/shipping-the-future-why-today-s-3send-launch-shows-what-the-ratio1-protocol-was-built-for

## Notable date
- Reviewed on **February 17, 2026**.
