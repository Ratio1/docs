---
title: Deeploy Managing Deployments
sidebar_position: 5
description: Day-2 operations for Deeploy projects, jobs, updates, and controls.
---

# Deeploy Managing Deployments

## What this covers

This page focuses on day-2 operations after your first deploy: organizing jobs,
updating runtime settings, controlling app lifecycle, and operating safely at
scale.

## Organize by Projects and Jobs

- Use one project per product, tenant group, or environment (`dev`, `staging`,
  `prod`).
- Keep jobs focused and explicit (single service per job where possible).
- Use naming conventions that encode ownership and purpose.

## Manage networking and exposure

- Use Deeploy tunnel/domain integration for externally reachable services.
- Keep internal workloads private by default and expose only required ports.
- Treat domain and tunnel credentials as controlled secrets, not static config
  in repositories.

## Update deployments safely

- Prefer template reuse for repeatable rollout behavior.
- Change one operational dimension at a time (resources, image, or commands)
  when debugging.
- Validate logs and health immediately after each rollout.

## Control runtime through Deeploy channels

Based on Deeploy's command/control model, use:

- Instance-level commands for host or container runtime operations.
- App-level commands for service behavior and app-specific operations.

This split keeps operational controls clear when multiple jobs and teams share
infrastructure.

## Cost and reliability guardrails

- Keep sufficient USDC balance for active workloads and expected bursts.
- Track resource sizing against observed usage to avoid chronic over-provision.
- Review deployment states regularly so failed jobs are detected early.

## Notable date
- Reviewed on **February 23, 2026**.
- Sources:
- https://ratio1.ai/blog/ratio1-deeploy-blog-1-decentralized-managed-container-orchestration
- https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
- https://ratio1.ai/blog/deeploy-secrets-setup-guide

## Next steps
- Continue with [Deeploy End-to-End Example](./deeploy-end-to-end-example).
