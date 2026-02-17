---
title: Ratio1 Overview
sidebar_position: 2
description: introduction to Ratio1
---

# Ratio1 Overview

Ratio1 is a decentralized execution ecosystem for AI and application workloads across edge nodes.
At a high level, developers define workloads as pipelines of plugin instances, then deploy and
operate those pipelines through SDK and app-level orchestration surfaces.

## Core building blocks

- **Edge runtime**: Ratio1 Edge Nodes execute pipelines and plugin instances.
- **SDK control plane**: `ratio1_sdk` provides `Session`, `Pipeline`, and `Instance` abstractions for deployment and operations.
- **Decentralized orchestration**: direct SDK orchestration, ChainDist cooperative jobs, and Deeploy-managed app deployment.
- **Decentralized data layers**: R1FS for file-oriented distributed storage and CStore/ChainStorage for shared in-memory coordination.
- **Operational surfaces**: `explorer.ratio1.ai` for network visibility, `app.ratio1.ai` for Node Operator fleet management, and `deeploy.ratio1.ai` for CSP deployment workflows.

## Execution model (quick mental map)

1. A client opens a **Session** to the Ratio1 network.
2. The client creates a **Pipeline** on one or more target nodes.
3. The pipeline runs one or more **Plugin Instances** identified by signature + instance ID.
4. Results, notifications, and heartbeats are consumed by callbacks, dashboards, and downstream services.

## Who should read this section

- Node operators who want to understand what actually runs on nodes.
- Developers building workloads with the SDK.
- CSPs and deployment teams planning production-grade rollouts.

## In this section
- [Decentralized Orchestration](./decentralized-orchestration)
- [Distributed Storage](./distributed-storage)
- [Decentralized Apps](./decentralized-apps)
- [The Plugins System](./the-plugins-system)

## Notable date

- Reviewed on **February 17, 2026** against:
  - https://github.com/Ratio1/edge_node
  - https://github.com/Ratio1/ratio1_sdk
  - https://ratio1.ai/whitepaper
  - https://ratio1.ai/blog
  - https://explorer.ratio1.ai/
  - https://app.ratio1.ai/
  - https://deeploy.ratio1.ai/
