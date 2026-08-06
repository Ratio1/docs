---
title: r1setup FAQ
sidebar_position: 8
description: Current answers for first setup, discovery, migration, service updates, and SSH access.
---

# r1setup FAQ

## Audience and purpose

These answers mirror the current read-only topics in **Main Menu → Help & FAQ**. Use them to choose a
safe next action; use live status and logs for machine-specific diagnosis.

## Prerequisites

- Know which configuration and network are active.
- Keep the source machine or recovery SSH session available while resolving migration or auth issues.
- Do not share configuration files, passwords, private keys, or unredacted logs with a question.

## Questions and answers

### What is the difference between a machine and a node?

A machine is an SSH-reachable physical or virtual host. A node or instance is an Edge Node runtime
assigned to that machine. A registered machine can be empty; Advanced mode can explicitly track more
than one instance on a machine.

### What is the shortest first-time setup?

Create a configuration, select the network, register or add the intended machines, discover and
selectively import any existing services, test connectivity, then deploy only fresh instances. Verify
status and addresses afterward. See [Quick Setup](./r1setup-quick-setup).

### When do I use Register Machine instead of Add Node?

Use **Register Machine** for a discovery target, migration destination, or prepared-but-empty host.
Use **Add Node** to create an instance assignment. If Register Machine is hidden, the configuration is
in Simple mode; switching to Advanced is one-way.

### Does discovery change the remote machine?

No. Discovery is read-only, and import is selective. Services you do not import stay untouched.
Imported services keep their discovered runtime names by default.

### What is the difference between Prepare Machines and deployment?

**Prepare Machines** installs or verifies host prerequisites without adding an Edge Node instance.
**Install GPU Nodes** and **Install CPU Nodes** deploy configured instances with the corresponding
runtime image.

### How do I migrate an existing instance?

Register an empty destination, create a non-mutating plan, execute the saved plan, verify the target,
then finalize. Execution moves data through controller temporary storage and updates the same instance
assignment. Do not add the destination node first or re-add the instance afterward.

### Should I roll back or finalize a migration?

Roll back a failed or interrupted execution so the source remains authoritative. Finalize only after
the target is verified; finalization cleans recovery artifacts. See the [Migration Guide](./r1setup-migration-guide).

### What does service-file version drift mean?

The deployed systemd service definition differs from r1setup's current target version. Use
**Operations → Update Service File**, then run **Node Status & Info** again. This does not migrate node
data or create a new instance.

### Why does SSH work elsewhere but fail in r1setup?

Check the configured user, port, private-key path and permissions, controller reachability, firewall,
and whether the host is in `key_installed_unverified` or `verification_failed`. Validate access from
the same controller before disabling password authentication.

### What mistakes should I avoid?

- Adding a migration destination as a node instead of registering it as an empty machine.
- Treating a skipped or failed discovery probe as proof that the host is clean.
- Re-adding an instance after migration already updated its assignment.
- Ignoring service-version drift.
- Disabling password authentication before key login and recovery access are verified.

## Verify the resolution

Return to the relevant read-only or low-impact check: **Fleet Summary**, **Test Connectivity**, **Node
Status & Info**, or **Show SSH Auth Status**. Confirm observed state rather than relying on a command's
last success message.

## Troubleshooting and safety

Open the current in-app Help & FAQ rather than following menu numbers from older screenshots or blog
posts. Menu labels and capabilities evolve. For uncertain migration or SSH state, preserve recovery
artifacts and access until the live condition is understood.

## Next steps

Return to the [r1setup guide](./), [Fleet Management](./r1setup-fleet-management), or [Managing and
Monitoring Nodes](./r1setup-managing-and-monitoring-nodes).

## Review and public sources

- Reviewed on **August 6, 2026** against all current in-app `Help & FAQ` topics.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
