---
title: Distributed Storage
sidebar_position: 2
description: R1FS and CStore as production data layers
---

# Distributed Storage

Ratio1 storage is a two-layer production model: **R1FS** for durable distributed artifacts and
**ChainStore (CSTORE), often referenced in SDK/docs as CStore**, for live coordination state.

## Why this split exists

Production services usually need both:

- persistent artifact exchange across nodes and sessions;
- fast state signaling during execution.

Using one layer for both concerns often introduces either latency or durability problems.

## R1FS: durable artifact plane

Use **R1FS** for:

- models, datasets, generated outputs, and larger payload artifacts;
- content that must be fetched later or by other nodes;
- storage flows that should stay decoupled from real-time runtime messaging.

R1FS is content-addressed and designed for distributed retrieval behavior.

## ChainStore (CSTORE/CStore): live coordination plane

Use **ChainStore/CStore** for:

- worker progress and synchronization markers;
- short-lived shared keys/state;
- coordination signals between distributed components.

ChainStore/CStore is not a replacement for durable artifact storage.

## Production pattern: CStore + R1FS together

1. Components coordinate state through ChainStore/CStore.
2. Durable or heavy artifacts are stored and retrieved through R1FS.
3. Services expose status/results while keeping data movement and runtime signaling separated.

This pattern also supports sovereignty-oriented deployments where data locality and infrastructure control are important.

## Security and tenancy semantics

- **Content-addressed integrity**: R1FS objects are retrieved by content identity, so tampering changes
  the addressable result.
- **Encrypted/private control**: privacy-sensitive application data can be managed with encryption and
  owner-controlled key boundaries.
- **Namespace and authorization boundaries**: coordination state and artifact access can be scoped with
  namespace-style separation and explicit authorization policy.

## Production evidence: 3send

The `3send` launch article documents this split explicitly: metadata/control flow in CStore and
encrypted file payloads in R1FS. This is a concrete production example of the CStore + R1FS pattern.

## SDK position

SDKs (Python/TS/Go) expose interfaces to both layers for integration work. The storage architecture itself
is defined by protocol/runtime design, not by one client library.

## Ground truth references

Primary:
- https://ratio1.ai/whitepaper

Supporting:
- https://github.com/Ratio1/edge_node
- https://ratio1.ai/blog/ratio1-sdk-for-typescript-your-bridge-to-edge-nodes
- https://ratio1.ai/blog/go-developers-meet-the-new-ratio1-sdk-and-sandbox
- https://ratio1.ai/blog/empowering-the-nodejs-ecosystem
- https://ratio1.ai/blog/ratio1-sovereign-ai-keeping-your-models-and-data-on-prem-in-the-age-of-memorization
- https://ratio1.ai/blog/shipping-the-future-why-today-s-3send-launch-shows-what-the-ratio1-protocol-was-built-for

## Notable date

- Reviewed on **February 17, 2026**.

## Next steps

- Back to [Ratio1 Overview](../).
