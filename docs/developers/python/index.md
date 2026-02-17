---
title: Python
sidebar_position: 1
description: using the Python SDK for Ratio1
---

# Python

The Python SDK is the most direct way to build and test Ratio1 workloads: connect to the network,
discover nodes, create pipelines, deploy plugin instances, and consume payloads from remote execution.

## What this section covers

- quick execution path from install to first deployed workload;
- tutorial map by objective (network basics, custom code, distributed jobs, web apps, bots);
- practical API entry points for `Session`, `Pipeline`, `Instance`, and distributed presets;
- runtime architecture context for developers extending or integrating with edge software;
- contribution paths across docs, SDK, and edge runtime repos.

## When to use Python SDK first

- You need custom logic running on remote nodes quickly.
- You want callback-driven integration (`on_data`, `on_notification`, `on_heartbeat`).
- You need chain-distributed compute patterns or custom web endpoints from code.

For managed production lifecycle operations, default to Deeploy UI/API; treat direct SDK orchestration
as development, integration, and advanced control surfaces.

## In this section
- [Quick end-to-end example](./quick-end-to-end-example)
- [Navigating the Tutorials](./navigating-the-tutorials)
- [API Quick Reference](./api-quick-reference)
- [The Edge Node Software](./the-edge-node-software)
- [Contributing to the Edge Node and Beyond](./contributing-to-the-edge-node-and-beyond)

## Ground truth references

Primary:
- https://github.com/Ratio1/ratio1_sdk
- https://pypi.org/project/ratio1/

Supporting:
- https://ratio1.ai/blog/ratio1-end-to-end-tutorial
- https://ratio1.ai/blog/distributed-prime-number-calculation
- https://ratio1.ai/blog/deploying-a-custom-web-application
- https://ratio1.ai/blog/build-your-own-sandbox-in-minutes

## Notable date
- Reviewed on **February 17, 2026**.
