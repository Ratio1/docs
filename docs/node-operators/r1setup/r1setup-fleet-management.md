---
title: r1setup Fleet Management
sidebar_position: 3
description: Register machines, discover services, and maintain instance assignments across a fleet.
---

# r1setup Fleet Management

## Audience and purpose

This page is for operators who add, import, group, or retire Edge Node instances across multiple
machines. Fleet actions should preserve the distinction between SSH hosts and the runtimes assigned
to them.

## Prerequisites

- An active r1setup configuration with the correct Ratio1 network.
- Verified SSH access to the machines you intend to inspect or change.
- Advanced mode for empty-machine registration or multiple instances per machine.

## Fleet workflow

### Register a machine without creating an instance

Use **Configuration → Register Machine** for a discovery target, a prepared-but-empty host, or a
migration destination. The action records the SSH endpoint and machine metadata only. If the action
is hidden, review the one-way switch to Advanced mode first.

### Discover and selectively import services

Use **Configuration → Discover Services** to scan a registered machine. The scan does not modify the
remote host. It groups results as clean, discovered, failed, or skipped and retains the most recent
candidate list for fleet views.

For each discovered service:

1. Confirm that its detected network matches the active configuration.
2. Confirm its service/container/volume runtime identity.
3. Select only the services this configuration should track.
4. Keep the discovered runtime name unless you have a documented reason to change the logical alias.

If another saved configuration appears to track the same machine endpoint and service name, resolve
that ownership warning before import. A multi-service import requires explicit expert-mode consent.

### Add, edit, and remove instances

**Configure Nodes** manages instance assignments. Adding a node creates an instance; it is different
from registering a machine. Removing an accidental placeholder leaves the underlying registered
machine available. Before deleting a deployed runtime, distinguish configuration cleanup from the
separate destructive **Delete Deployment** action.

### Review grouping and capacity

Use **Fleet Summary** to see:

- machines with their assigned instances;
- empty registered machines;
- untracked services found by the last discovery scan;
- multi-instance hosts that need Advanced/expert handling;
- probed hardware information when available.

Treat the capacity hints as planning information, not a guarantee. Leave resources for the operating
system and other workloads.

## Verify the fleet

After any import or assignment change, compare **Fleet Summary** with **View Configuration**, then run
**Operations → Test Connectivity**. For deployed instances, run **Node Status & Info** and confirm the
grouped runtime state under the expected machine.

## Troubleshooting and safety

- **Clean** means no matching service was discovered; **failed** means the scan could not establish
  that. Never deploy based on a failed scan as though it were clean.
- A service name suffix does not prove multi-instance topology. Use the recorded machine assignment.
- Do not import the same runtime into multiple configurations. Resolve duplicate-ownership warnings.
- Back up the active configuration before bulk changes, and avoid deleting remote workloads while
  you are only correcting local inventory.

## Next steps

Use [Managing and Monitoring Nodes](./r1setup-managing-and-monitoring-nodes) for daily operations or
the [Migration Guide](./r1setup-migration-guide) to move an instance.

## Review and public sources

- Reviewed on **August 6, 2026** against the current fleet, discovery, import, and grouping tests.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
