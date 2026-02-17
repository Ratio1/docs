---
title: Distributed Storage
sidebar_position: 2
description: R1FS storage review
---

# Distributed Storage

Ratio1 distributed storage is centered on **R1FS**, the ecosystem's IPFS-backed storage layer for
file/object exchange across nodes and clients.

## What R1FS is for

R1FS is best suited for:

- files and blobs that must be shared across nodes or sessions,
- artifacts that should outlive in-memory plugin execution,
- payload-adjacent content that is too heavy for inline transport.

In SDK internals, R1FS is implemented through an IPFS relay integration (`R1FSEngine`) and is exposed
as upload/download utilities used by client and node workflows.

## R1FS vs CStore (quick decision rule)

- Use **R1FS** for durable, file-oriented, distributed storage.
- Use **CStore/ChainStorage** for lightweight in-memory coordination and shared state exchange between workers/plugins.

In real workloads, both are often combined:

- CStore coordinates state and peer signaling,
- R1FS carries heavier artifacts and shared files.

## Typical R1FS workflow

1. Node/client is configured for relay connectivity.
2. File/object is uploaded and represented by a content-addressed identifier.
3. Peers/plugins consume the identifier and fetch content when needed.
4. Workload logic emits status/results while file exchange remains decoupled.

## Operational notes

- IPFS relay readiness can take time after startup; early reads may fail if queried too soon.
- Keep large/binary payloads in R1FS instead of pushing them as inline message fields.
- Treat R1FS as a shared storage substrate, not a replacement for per-plugin runtime state.

## Ground truth references

- https://github.com/Ratio1/ratio1_sdk
- https://github.com/Ratio1/edge_node
- https://ratio1.ai/whitepaper

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
