---
title: The Edge Node Software
sidebar_position: 4
description: understanding the edge node software architecture
---

# The Edge Node Software

For Python SDK users, the edge node is the runtime endpoint that receives your pipeline config,
loads plugin instances, and executes workload logic.

## Runtime layering (developer view)

1. **SDK client layer** (`ratio1` package):
   - builds commands/configs and sends them through session communication channels.
2. **Edge node runtime layer** (`edge_node` repo):
   - receives commands, hosts pipelines/instances, and emits payloads/notifications/heartbeats.
3. **Core contracts layer** (`naeural_core` repo):
   - provides foundational runtime contracts and engine behavior used by edge-node packaging.

## Why this matters for Python developers

- API calls like `create_pipeline(...)` and `deploy()` map to remote runtime config transactions.
- Plugin signatures and instance IDs are not local abstractions only; they are runtime identifiers on nodes.
- Callback design (`on_data`, `on_notification`, `on_heartbeat`) should assume distributed and asynchronous behavior.
- Storage and coordination semantics (R1FS/ChainStore) belong to runtime architecture, not only client code.

## Extension surfaces and plugin outcomes

Edge runtime behavior is extended through plugin/extension families in the edge-node codebase.
Exact module composition can shift across releases, but the stable model is:

- business/runtime workload plugins,
- data/listener integrations,
- default/core extension modules.

For Chapter 2 architectural context, see:
- [Ratio1 Overview](../../ratio1-overview/)
- [The Plugins System](../../ratio1-overview/the-plugins-system)

## Practical implications for your SDK code

- Keep instance configs explicit and deterministic.
- Use one pipeline per workload concern instead of overloading a single pipeline.
- Treat network/node status as dynamic; wait for nodes/config where needed.
- Prefer source-backed plugin signatures and helper presets over guessed constants.

## Ground truth references

Primary:
- https://github.com/Ratio1/edge_node
- https://github.com/ratio1/naeural_core
- https://ratio1.ai/whitepaper

Supporting:
- https://github.com/Ratio1/ratio1_sdk
- https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters

## Notable date
- Reviewed on **February 17, 2026**.

## Next steps
- Back to [Python](../).
