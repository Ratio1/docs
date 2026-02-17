---
title: Decentralized Orchestration
sidebar_position: 1
description: Orchestration review including Deeploy ChainDist CAR/WAR
---

# Decentralized Orchestration

Ratio1 orchestration is the way workloads are scheduled, coordinated, and evolved across distributed nodes.
In practice, Ratio1 supports three complementary orchestration paths:

- direct SDK-driven pipeline orchestration,
- ChainDist cooperative execution,
- Deeploy-managed app-style deployment.

## 1) Direct SDK orchestration

This is the most explicit, code-first model:

1. Connect with a `Session`.
2. Select a target node.
3. Create a `Pipeline`.
4. Add one or more plugin instances.
5. Deploy and observe payloads/notifications.

Use this model when you need full control over execution flow and plugin-level behavior.

## 2) ChainDist cooperative orchestration

ChainDist is Ratio1's distributed job pattern for splitting work across multiple remote workers and
aggregating results through a main coordinator path.

Typical pattern in `ratio1_sdk`:

- define worker code,
- define main-node aggregation and finish-condition logic,
- set `nr_remote_worker_nodes`,
- deploy through `create_chain_dist_custom_job(...)` or equivalent pipeline APIs.

Common use cases:

- parallel search/compute jobs,
- cooperative data processing over multiple nodes,
- aggregation workflows that return partial and final outputs.

## 3) Deeploy orchestration

Deeploy is the app deployment path for packaging workload intent (target nodes, plugin signature, resources,
policy) and letting the deployment service coordinate rollout.

In SDK and Edge Node internals, Deeploy flows include:

- plugin-signature driven launch contracts,
- target/spare node selection,
- container resource constraints,
- job/application metadata and status tracking.

## CAR/WAR in the orchestration model

Within current code-level terminology:

- **CAR** aligns with `CONTAINER_APP_RUNNER` style execution (container lifecycle + tunnel exposure + runtime policies).
- **WAR** aligns with `WORKER_APP_RUNNER` style execution (repo-aware worker web app behavior, build/run commands, VCS polling).

Both are orchestrated as plugin-driven deployments and can be managed via SDK or Deeploy flows, depending on
the use case.

## How to choose

- Use **direct SDK orchestration** for precise control and fast iteration.
- Use **ChainDist** for coordinated multi-worker compute.
- Use **Deeploy (CAR/WAR paths)** for app-like deployments with deployment metadata and resource-based rollout.

## Ground truth references

- https://github.com/Ratio1/ratio1_sdk
- https://github.com/Ratio1/edge_node
- https://app.ratio1.ai/
- https://explorer.ratio1.ai/

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
