---
title: r1setup Migration Guide
sidebar_position: 4
description: Move an Edge Node instance and its persistent data between registered machines safely.
---

# r1setup Migration Guide

## Audience and purpose

Use this guide to move one existing Edge Node instance, including its persistent volume, from a
source machine to a different machine while keeping the same assignment in the active configuration.

## Prerequisites

- A maintenance window: execution stops the source service before archiving its data.
- A current backup and enough free storage on the source, controller, and target.
- Verified SSH access from the same control machine to both source and target.
- An empty destination registered with **Register Machine**. Do **not** use **Add Node** for it first.
- Advanced mode if **Register Machine** is not visible.

## Migration architecture

```text
source volume ──archive + checksum──> controller temporary storage
       │                                      │
       └─ source remains recovery authority   └─verified upload──> target volume
                                                                      │
                                                     apply/start/health verification
```

The controller mediates the transfer: source machine → controller temporary folder → target
machine. The saved plan tracks progress so an uncertain execution can be rolled back instead of
silently cleaning recovery data.

## Procedure

### 1. Plan

Open **Deployment → Plan Migration**. Select the existing instance and its registered destination.
Planning validates structure and saves a non-mutating checklist; it does not stop the source or move
data. Resolve all blocking checks before execution.

### 2. Execute

Open **Deployment → Execute Migration** and review the saved plan. Execution:

1. prepares the destination when needed;
2. stops the source instance;
3. archives the source volume and records a checksum;
4. downloads and verifies the archive on the controller;
5. uploads and verifies it on the target;
6. creates the target volume with the required ownership and permissions;
7. extracts the data, applies the service, and starts the target;
8. verifies target runtime and best-effort application health;
9. updates the existing instance assignment in the same configuration.

Do not add the migrated node again after execution.

### 3. Verify

Run **Node Status & Info**, **Node Addresses & Export**, and an application-level check appropriate to
the node. Confirm the target machine assignment and that the node address and expected state are
preserved. Keep the source and controller artifacts until this check is complete.

### 4. Finalize or roll back

- Use **Finalize Migration** only after a verified execution. It explicitly cleans source-side and
  controller transfer artifacts while keeping the target authoritative.
- Use **Rollback Migration** for a failed or interrupted execution. It restores source authority and
  restarts/verifies the source when possible.

## Troubleshooting and safety

- If execution stops or its result is uncertain, do not manually delete archives, volumes, or the
  source runtime. Inspect the saved plan and use rollback.
- A checksum mismatch is a transfer failure; do not start from unverified data.
- Revalidate or rebuild a saved plan after fleet/runtime changes.
- Finalization is not a repair action. It intentionally removes recovery artifacts and should follow
  a positive target verification only.

## Next steps

Return to [Fleet Management](./r1setup-fleet-management) or verify the moved instance with [Managing
and Monitoring Nodes](./r1setup-managing-and-monitoring-nodes).

## Review and public sources

- Reviewed on **August 6, 2026** against the current migration planner, execution, rollback, and finalization tests.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
