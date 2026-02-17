---
title: The Plugins System
sidebar_position: 4
description: Plugin runtime contracts and extension surfaces
---

# The Plugins System

Plugins are the execution substrate of Ratio1 workloads. Deeploy deployments, ChainDist jobs, and
direct workload paths all resolve to plugin runtime behavior on edge nodes.

## Where plugins fit in the stack

1. Orchestration defines deployment intent and policy.
2. Pipelines bind execution context to target nodes.
3. Plugin signatures select capability families.
4. Plugin instances execute configuration and emit payloads, notifications, and heartbeats.

## Runtime extension surfaces

In the edge runtime, plugin capabilities are organized through extension surfaces such as:

- `extensions/business/` (for example `deeploy`, `container_apps`, `chain_dist`, `cstore`, `r1fs`, `dauth`, `oracle_sync`, `jeeves`)
- `extensions/data/`
- `extensions/serving/`

`naeural_core` provides backbone modules and runtime contracts, while `edge_node` operationalizes
and extends those capabilities for network runtime behavior.

## Why this matters for production

This architecture allows multiple product experiences to share one execution substrate:

- managed deployments through Deeploy;
- distributed compute patterns through ChainDist;
- app runners (CAR/WAR) over consistent runtime contracts;
- evolving data/auth/service modules without replacing the full platform runtime.

## SDK relation

SDKs configure and interact with pluginized workloads, but plugins are runtime-level architecture first.
In production framing, SDK entities are interfaces to the system, not the system itself.

## Ground truth references

Primary:
- https://github.com/Ratio1/edge_node
- https://github.com/ratio1/naeural_core

Supporting:
- https://ratio1.ai/whitepaper
- https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity
- https://ratio1.ai/blog/paradigm-shift-how-ratio1-j33ves-is-revolutionizing-code-intelligence

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
