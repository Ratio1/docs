---
title: Decentralized Orchestration
sidebar_position: 1
description: Deeploy-first orchestration across licensed edge infrastructure
---

# Decentralized Orchestration

Ratio1 orchestration controls where and how workloads run across licensed edge infrastructure,
including rollout policy, resource intent, and settlement-aware execution.

## Production-first orchestration model

For production services, the primary path is **Deeploy** on licensed node capacity.

1. Define deployment intent (service type, runtime model, resources, policies).
2. Select eligible node capacity through orchestration workflows.
3. Launch and monitor execution through deployment/app surfaces.
4. Operate updates and scaling through the same lifecycle channel.
5. Follow oracle-verified, escrow-based economics for funded execution and settlement.

This reduces direct node-by-node operational burden for teams running real services.

## Oracle verification and settlement path

Production jobs are funded through escrow and observed through oracle/runtime telemetry signals.
Settlement is conditional: when uptime/execution conditions are met for the relevant windows,
rewards can be released to participating roles and nodes.

When conditions fail, orchestration can reallocate workloads, while trust/economic controls can
apply withholding, penalty, or burn-linked outcomes depending on policy.

## CAR and WAR execution paths

Deeploy commonly exposes two app delivery patterns:

- **CAR (Container App Runner)**: container-image oriented deployment.
- **WAR (Worker App Runner)**: Git-to-edge worker app flow with build/run lifecycle management.

Both rely on the same decentralized plugin-based runtime, while differing in packaging and delivery workflow.

## ChainDist and direct SDK orchestration

Ratio1 also exposes orchestration modes outside app-style deployment:

- **ChainDist** for cooperative distributed jobs (fan-out workers + aggregation logic).
- **Direct SDK orchestration** for advanced control, prototyping, or narrow custom integrations.

Direct SDK control remains important, but it is an interface-level option rather than the default production posture.

## Role split in orchestration

- **Node Operator**: provides licensed compute capacity and node uptime.
- **CSP**: manages service deployment and lifecycle via Deeploy workflows.
- **Developer**: builds workload logic and integrations against runtime/data interfaces.

CSP production onboarding includes oracle-aligned deed/license requirements plus KYC/KYB checks.
Trust protocol governance provides freeze/suspend/blacklist enforcement paths for serious violations.

## Ground truth references

Primary:
- https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
- https://ratio1.ai/blog/ratio1-deeploy-blog-1-decentralized-managed-container-orchestration
- https://ratio1.ai/blog/introducing-the-worker-app-runner-deploy-from-git-to-edge
- https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required
- https://ratio1.ai/whitepaper

Supporting:
- https://github.com/Ratio1/edge_node
- https://deeploy.ratio1.ai/
- https://app.ratio1.ai/
- https://explorer.ratio1.ai/
- https://ratio1.ai/blog/the-csp-business-blueprint
- https://ratio1.ai/blog/the-trust-protocol-inside-ratio1-s-node-governance-and-blacklisting-system

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
