---
title: Decentralized Apps
sidebar_position: 3
description: Production service patterns on Ratio1
---

# Decentralized Apps

On Ratio1, decentralized apps are production services running on licensed edge infrastructure with
decentralized orchestration, explicit operational roles, and protocol-governed economics.

## Production app shape on Ratio1

A typical deployment combines:

- Deeploy lifecycle control for rollout and operations;
- plugin-based execution on edge nodes;
- CStore for live coordination and R1FS for durable artifacts;
- visibility through `app.ratio1.ai` and `explorer.ratio1.ai`.

## Service lifecycle

1. Define service behavior and packaging (for example CAR or WAR paths).
2. Deploy on eligible licensed node capacity.
3. Operate and scale workers while tracking health and outputs.
4. Settle funded execution through oracle-verified protocol economic flows.

## Real-world motifs in the ecosystem

Ratio1 application narratives emphasize production outcomes:

- **RedMesh**: decentralized cybersecurity workloads.
- **J33VES and Keysoft flows**: assistant-style services with user-owned encrypted storage patterns.
- **Sovereign AI**: model/data control under owned or controlled infrastructure boundaries.
- **3send**: production file-transfer delivery motif built on distributed orchestration and storage primitives.

Recent RedMesh positioning also frames these deployments as often complementary to existing security
toolchains during near-term adoption, not only strict replacement paths.

## Role-aware operation

- **Node Operators** provide capacity and uptime.
- **CSPs** manage deployment and service lifecycle.
- **Developers** implement business logic and integrations.

This operating split is central to how decentralized apps are delivered in practice.
Trust protocol governance adds freeze/suspend/blacklist enforcement paths for violating actors, with
licensed and KYC/KYB-backed roles supporting accountable operations.

## SDK and tutorial content

SDK tutorials are important for learning and low-level integration, but they are not the default
production operating playbook. Older tutorial flows should be treated as historical implementation
guidance when they diverge from current managed production workflows.

## Ground truth references

Primary:
- https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity
- https://ratio1.ai/blog/ratio1-redmesh-from-annual-checkups-to-continuous-cyber-immunity
- https://ratio1.ai/blog/redmesh-market-analysis-and-positioning-vs-competitors
- https://ratio1.ai/blog/ratio1-sovereign-ai-keeping-your-models-and-data-on-prem-in-the-age-of-memorization
- https://ratio1.ai/blog/j33ves-keysoft-ratio1-three-assistants-that-turn-intent-into-results
- https://ratio1.ai/blog/migrating-build21-from-aws-to-ratio1
- https://ratio1.ai/blog/shipping-the-future-why-today-s-3send-launch-shows-what-the-ratio1-protocol-was-built-for

Supporting:
- https://deeploy.ratio1.ai/
- https://app.ratio1.ai/
- https://explorer.ratio1.ai/
- https://ratio1.ai/blog/the-trust-protocol-inside-ratio1-s-node-governance-and-blacklisting-system
- https://ratio1.ai/blog/ratio1-end-to-end-tutorial
- https://ratio1.ai/blog/deploying-a-custom-web-application
- https://ratio1.ai/blog/build-your-own-sandbox-in-minutes

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
