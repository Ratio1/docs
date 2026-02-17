---
title: Decentralized Apps
sidebar_position: 3
description: Distributed app state memory CStore
---

# Decentralized Apps

In Ratio1, a decentralized app is typically composed from pipelines and plugin instances running across
multiple nodes, with shared state and event exchange handled by decentralized coordination primitives.

## The role of CStore / ChainStorage

**CStore (ChainStorage)** is the shared in-memory coordination layer used by plugins/workers to exchange
state and synchronization signals without forcing every interaction through heavyweight storage.

Typical usage patterns include:

- worker-to-worker coordination,
- partial-result sharing during distributed jobs,
- coordination signals consumed by main aggregator plugins.

## dApp execution pattern on Ratio1

1. A client deploys pipeline logic (single node or distributed).
2. Plugin instances process data and exchange intermediate state.
3. Shared state keys/peers coordinate distributed progress.
4. Final outputs are emitted as payloads or persisted via R1FS when durability is needed.

## Practical design split: CStore + R1FS

- Keep **rapid coordination state** in CStore.
- Move **persistent or large artifacts** to R1FS.

This split keeps decentralized apps responsive while still enabling artifact persistence and cross-session reuse.

## Product surfaces around decentralized apps

- `app.ratio1.ai`: application-focused entry points and user workflows.
- `explorer.ratio1.ai`: network-level visibility (nodes, versions, licenses, activity snapshots).

## Ground truth references

- https://github.com/Ratio1/ratio1_sdk
- https://github.com/Ratio1/edge_node
- https://app.ratio1.ai/
- https://explorer.ratio1.ai/

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
