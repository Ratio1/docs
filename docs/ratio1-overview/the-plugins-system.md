---
title: The Plugins System
sidebar_position: 4
description: how plugins work on Ratio1
---

# The Plugins System

Plugins are the execution units of Ratio1 workloads.
Every workload is ultimately a set of plugin instances attached to a pipeline on one or more nodes.

## Core concepts

- **Plugin signature**: identifies plugin type/capability (for example custom execution, web API, container runners, network monitors).
- **Plugin instance**: a concrete configured runtime of a signature inside a pipeline.
- **Pipeline**: groups plugin instances and defines execution context on a target node.
- **Session callbacks**: consume payloads, notifications, and heartbeats from plugin execution.

## How plugins are deployed

1. Create a pipeline on a node.
2. Attach one or more plugin instances by signature.
3. Provide instance configuration (typically normalized as uppercase keys in SDK flows).
4. Deploy and monitor runtime signals.

This model applies to both simple single-plugin pipelines and complex multi-plugin app stacks.

## Plugin families in practice

- **Custom code plugins** for rapid workload logic injection.
- **Serving/API plugins** for request-response and inference-like workflows.
- **Container app plugins** (`CONTAINER_APP_RUNNER`, `WORKER_APP_RUNNER`) for app-style containerized deployments.
- **Network/admin plugins** for monitoring and control-plane functions.

## Repository extension surfaces

In the Edge Node codebase, plugin behavior is extended through:

- `extensions/business/`
- `extensions/data/`
- `extensions/serving/`
- `plugins/` (tutorial/sample plugin implementations)

This structure keeps runtime contracts stable while allowing domain-specific capabilities to evolve.

## Design guidance

- Keep plugin responsibilities narrow and composable.
- Prefer explicit instance IDs and clean config boundaries.
- Use CStore for coordination and R1FS for durable shared artifacts.
- Route high-level deployment logic through Deeploy when app lifecycle management is required.

## Ground truth references

- https://github.com/Ratio1/edge_node
- https://github.com/Ratio1/ratio1_sdk
- https://ratio1.ai/blog
- https://ratio1.ai/whitepaper

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
