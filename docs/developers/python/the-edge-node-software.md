---
title: The Edge Node Software
sidebar_position: 4
description: understanding the edge node software architecture
---

# The Edge Node Software

This page is about how `edge_node` itself works as runtime software. The SDK is only one control
surface; the core topic here is pipeline orchestration and plugin execution on Ratio1 nodes.

## What `edge_node` orchestrates

At runtime, edge nodes coordinate:

1. **Pipeline and instance lifecycle**:
   - receive deployment config, materialize pipelines, run plugin instances, and emit payloads/notifications/heartbeats.
2. **Multi-plane plugin execution**:
   - run data capture, business logic, and serving plugins as one coordinated workload graph.
3. **Containerized execution paths**:
   - support container app patterns including container-in-container orchestration used by app-runner flows.
4. **Blockchain/oracle interaction**:
   - interact with chain-facing components for escrow/job/oracle flows, creating immutable onchain anchors for critical lifecycle events.
5. **Endpoint provisioning**:
   - expose deployable API/service endpoints through business plugins and serving processes.

## Runtime layering (system view)

1. **Core contracts/engines** (`naeural_core`):
   - foundational contracts for plugin execution and runtime behavior.
2. **Edge packaging/orchestration** (`edge_node`):
   - production node entrypoints, extension families, operational plugins, and deployment packaging.
3. **Control clients** (SDK/CLI/Deeploy):
   - user-facing control planes that submit intents to the runtime.

## Extension surfaces and plugin outcomes

In the current edge runtime tree, extension families map to different execution responsibilities:

- `extensions/business/` for business plugins that define endpoints, orchestration behavior, and symbolic/heuristic rules on top of neural-model outputs.
- `extensions/data/` for Data Capture Thread plugins that ingest/listen/poll and normalize input streams.
- `extensions/serving/` for Serving Process plugins that host inference/serving workloads (they run as processes, not threads).
- `extensions/utils/` for shared utility components.

Exact module composition can evolve between releases; treat this as a runtime model, then verify concrete modules in the target branch.

## Why this matters for developers

- Python is the primary language surface for native Ratio1 applications built from plugin pipelines.
- Native applications can still include containerized front-ends or middle tiers when that is the best deployment shape.
- SDK calls (`create_pipeline(...)`, `deploy()`, callbacks) are controls over this runtime architecture, not substitutes for understanding it.
- Storage and coordination semantics (R1FS/ChainStore) and ChainDist behaviors are runtime-level concerns.

For broader architectural context, see:
- [Ratio1 Overview](../../ratio1-overview/)
- [The Plugins System](../../ratio1-overview/the-plugins-system)

## Ground truth references

Primary:
- https://github.com/Ratio1/edge_node
- https://github.com/ratio1/naeural_core
- https://ratio1.ai/whitepaper

Supporting:
- https://github.com/Ratio1/ratio1_sdk
- https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters

## Notable date
- Reviewed on **February 18, 2026**.

## Next steps
- Back to [Python](../).
