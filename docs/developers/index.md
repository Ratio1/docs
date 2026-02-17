---
title: For Developers
sidebar_position: 5
description: introduction to developing on Ratio1
---

# For Developers

This chapter is the developer operating layer for Ratio1: SDK workflows, tutorials, API entry points,
runtime context, and CLI-based fleet operations.

## Choose your path

- **Python SDK**: fastest path for custom workloads, plugin orchestration, and integration code.
- **JavaScript / Go SDKs**: language-native integration surfaces for teams outside Python.
- **Sandbox workflows**: local and controlled experimentation before wider rollout.
- **`r1ctl` CLI**: operator/developer command-line control for nodes, network reports, and app inspection.

## Developer workflow vs production workflow

- **Developer workflow**: iterate with SDK/CLI, test callbacks and pipeline behavior, validate assumptions.
- **Production workflow**: run managed delivery through Deeploy UI/API on licensed infrastructure.
- **Operational split**: use `deeploy.ratio1.ai` for deployment operations, `app.ratio1.ai` for license/account flows, and `explorer.ratio1.ai` for telemetry.
- **Cross-reference**: use [Ratio1 Overview](../ratio1-overview/) for orchestration/economics/runtime architecture.

## In this section
- [Python](./python/)
- [JavaScript](./javascript/)
- [Go](./go/)
- [The Sandbox](./the-sandbox)
- [r1ctl](./r1ctl/)
- [Donation add-on for developers](./donation-add-on-for-developers)

## Ground truth references

Primary:
- https://github.com/Ratio1/ratio1_sdk
- https://pypi.org/project/ratio1/
- https://ratio1.ai/whitepaper

Supporting:
- https://ratio1.ai/blog/ratio1-sdk-for-typescript-your-bridge-to-edge-nodes
- https://ratio1.ai/blog/go-developers-meet-the-new-ratio1-sdk-and-sandbox
- https://ratio1.ai/blog/empowering-the-nodejs-ecosystem
- https://deeploy.ratio1.ai/
- https://app.ratio1.ai/
- https://explorer.ratio1.ai/

## Notable date
- Reviewed on **February 17, 2026**.
