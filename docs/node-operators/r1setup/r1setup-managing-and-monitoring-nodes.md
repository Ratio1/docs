---
title: r1setup Managing and Monitoring Nodes
sidebar_position: 5
description: Check fleet health, control services, export addresses, and collect logs.
---

# r1setup Managing and Monitoring Nodes

## Audience and purpose

This page covers daily operations after nodes are configured or deployed: connectivity, grouped
status, service lifecycle, address export, logs, and service-template version drift.

## Prerequisites

- An active configuration with the expected network and instance assignments.
- SSH reachability from the control machine.
- A deployed instance for service, address, and application-health checks.

## Daily operating procedure

### 1. Check reachability

Run **Operations → Test Connectivity** before interpreting an unreachable node as an application
failure. The test reports controller-to-machine SSH results for the selected fleet.

### 2. Review grouped status

Open **Node Status & Info**. Results are grouped by physical machine, which keeps multiple instances
on one host together and shows empty registered machines separately. Review the live runtime status,
last update age, and applied service-file version.

### 3. Control services

Use **Operations** to **Start**, **Stop**, or **Restart** the selected Edge Node services. These actions
operate the existing remote service; they do not create a new instance or migrate its data. Re-run
status after each action.

### 4. Resolve service-version drift

When status reports a different applied service-file version from the current target, use
**Operations → Update Service File**. The action re-renders the versioned systemd service definition,
reapplies approved overrides, and restarts selected eligible nodes. Run **Node Status & Info** again
to verify alignment.

### 5. Display or export addresses

Use **Node Addresses & Export** to display copy-friendly node addresses and write a CSV when needed.
Offline hosts may not return fresh address data; treat an incomplete export as a prompt to check
reachability rather than proof that the instance has no address.

### 6. Inspect logs

Use **Advanced → Get Logs** to stream logs or **Write Logs to File** to save a local diagnostic copy.
Choose the affected instance and a bounded number of recent lines for file export. Review log files for tokens,
addresses, user data, or other sensitive values before sharing them.

## Verify the operation

An operational change is complete only when connectivity succeeds, **Node Status & Info** shows the
expected state, the service version is current, and the application-level behavior is healthy. For a
restart or update, compare the status timestamp before and after the action.

## Troubleshooting and safety

- **Unreachable** usually indicates SSH/network/authentication trouble; inspect the machine path
  before restarting services repeatedly.
- A running container does not prove that the application is ready. Use node information and an
  application-level health check.
- Do not send unredacted logs or CSV exports to public channels.
- Stop and restart actions can interrupt workloads. Target only the intended instances.

## Next steps

See [Hardening Fleet Logins](./r1setup-hardening-your-fleet-logins) for SSH security or [Advanced
Tools](./r1setup-other-advanced-tools) for backups and service customization.

## Review and public sources

- Reviewed on **August 6, 2026** against the current status, lifecycle, address, log, and service-update code.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
