---
title: Deeploy Overview
sidebar_position: 1
description: What Deeploy is, how it works, and how it maps to CSP operations.
---

# Deeploy Overview

## What Deeploy is

Deeploy is Ratio1's decentralized managed container orchestration layer for
CSPs. It is designed to let operators deploy and manage applications on Ratio1
infrastructure while keeping deployment logic auditable and payment flows
trust-minimized.

---

## How deployment works at a high level

1. A deployment job is created and signed by a valid actor.
2. The requested budget is locked in escrow through the protocol's Proof of AI
   process.
3. Edge nodes and oracles validate eligibility, signatures, and deployment
   constraints.
4. Oracle consensus confirms placement and execution rights.
5. The workload is started and then managed through Deeploy controls.

---

## Core concepts you will use

- `Project`: top-level grouping for one app family or environment.
- `Job`: one deployable unit under a project, with resource and runtime config.
- `Template`: pre-defined deployment profile you can reuse.
- `Tunnel`: secure external exposure for apps that need inbound traffic.
- `Escrow`: funds are approved and locked in a smart contract before execution
  to reduce payment risk for providers.

---

## Where Container App Runner fits

Container App Runner (CAR) is the image-first path in Deeploy. Use it when you
already have a container image and want predictable deployment behavior across
environments with explicit runtime/network/resource controls.

In practice, CAR is the better fit for teams that already package services with
their own build pipeline and only need orchestration and operations on Ratio1.

---

## Where Worker App Runner fits

Worker App Runner is the fastest entry point inside Deeploy for Git-based app
deployments. It removes the need to manage CI/CD pipelines for common cases: you
connect a repository, set runtime parameters, then deploy from the Deeploy UI.

---

## Notable date

- Reviewed on **February 23, 2026**.
