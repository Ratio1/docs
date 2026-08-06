---
title: Managing Edge Nodes with r1setup
sidebar_position: 2
description: Operate a remote fleet of Ratio1 Edge Nodes from one control machine.
---

# Managing Edge Nodes with r1setup

## Audience and purpose

This section is for node operators who administer one or more remote Linux machines. `r1setup` is an
interactive command-line controller: install it once on a trusted control machine, register remote
machines over SSH, and use the same local configuration to deploy and operate their Edge Node
instances.

Use the [Edge Node Launcher](../node-launcher/) instead when you want a desktop GUI to manage local
Docker containers on the computer in front of you.

## Prerequisites

- A Linux, macOS, or Windows Subsystem for Linux control machine with `sudo` access.
- SSH access to each remote Linux machine and permission to install system packages.
- A deliberate Ratio1 network choice: mainnet, testnet, or devnet.
- A recovery plan before changing SSH authentication or moving node data.

## Choose a guide

1. Read the [overview](./r1setup-overview) for the control-machine, machine, and instance model.
2. Follow [Quick Setup](./r1setup-quick-setup) for a new fleet.
3. Use [Fleet Management](./r1setup-fleet-management) to discover, import, and organize machines.
4. Use the [Migration Guide](./r1setup-migration-guide) to move an existing instance safely.
5. See [Managing and Monitoring Nodes](./r1setup-managing-and-monitoring-nodes) for service status,
   addresses, connectivity, and logs.
6. Follow [Hardening Fleet Logins](./r1setup-hardening-your-fleet-logins) before disabling SSH
   password authentication.
7. Review [Advanced Tools](./r1setup-other-advanced-tools) and the [FAQ](./r1setup-faq) as needed.

## Verify readiness

Run `r1setup`, confirm the intended configuration and network in the header, then run **Operations →
Test Connectivity**. Do not deploy until every intended target is recognizable and reachable.

## Troubleshooting and safety

`r1setup` can install packages, change systemd services, move persistent node data, and alter remote
SSH policy. Review the selected machines at every confirmation prompt. Never reuse a production
configuration as an experiment, and never place passwords or private keys in tickets or chat.

## Next steps

Start with [r1setup Overview](./r1setup-overview), then continue to [Quick Setup](./r1setup-quick-setup).

## Review and public sources

- Reviewed on **August 6, 2026** against the current shared `r1setup` implementation.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
