---
title: Node Launcher Overview
sidebar_position: 1
description: Understand local node containers, persistent volumes, identity, metrics, and controls.
---

# Node Launcher Overview

## Audience and purpose

This page explains what the desktop Launcher manages and where its responsibility ends. It is aimed
at operators who want a visual interface for one or more Edge Node containers on a local workstation
or server.

## Prerequisites

- Docker available through the local Docker CLI and daemon.
- Local resources sized for the desired number of node containers.
- A current Launcher release for the host platform.

## Local architecture

```text
desktop Launcher
  ├─ local Docker daemon
  │    ├─ Edge Node container A ── persistent Docker volume A
  │    └─ Edge Node container B ── persistent Docker volume B
  └─ local Launcher configuration and cached node identity
```

**Add New Node** allocates a generated container name and persistent-volume name, records that pair
in Launcher configuration, and starts the new container. The selector switches the GUI between local
nodes. **Launch Edge Node** and **Stop Edge Node** control the selected container.

### What Launcher displays

- the Ratio1 node address and Ethereum address, with copy actions;
- the node alias, uptime, epoch, epoch availability, and running version;
- local/container CPU, memory, GPU, and GPU-memory metrics when available;
- a live Launcher log console and explicit **Refresh Node Info** action;
- cached identity for a stopped container when it was previously discovered.

### Configuration and identity

Launcher automatically maintains the local container name, volume, timestamps, cached addresses,
and node alias. Use **Rename Node** for the supported alias change and refresh node information after
the container applies it.

The current primary window does not wire a raw startup/app-configuration editor, even though the
repository contains lower-level configuration components. Do not edit Launcher-managed JSON while
the app is running or present an unwired editor as a supported workflow.

Authorized addresses are the Edge Node's access-control entries, not the addresses displayed in the
identity card. Current shared `main` contains container commands for reading/updating that list, but
the primary Launcher window does not expose the editor. Use a supported node-administration surface,
verify the resulting allowlist on the node, and never authorize an address merely because it appears
in the Launcher UI.

### Launcher versus r1setup

| Need | Edge Node Launcher | r1setup |
|---|---|---|
| Interface | Desktop GUI | Interactive terminal CLI |
| Target | Local Docker daemon | Remote Linux machines over SSH |
| Main unit | Local container + volume | Machine fleet + assigned instances |
| Provision host packages | Checks/prompts for local Docker | Uses Ansible for remote prerequisites, CPU/GPU setup, and services |
| Best fit | One workstation or hands-on local nodes | Repeatable multi-machine operations |

## Verify the selected node

Select the node, click **Refresh Node Info**, and confirm that its address, alias, running version,
uptime, and metrics agree with the intended container. Stop and start it once only when a maintenance
window permits, then confirm that the same persistent identity returns.

## Troubleshooting and safety

- If identity remains “Starting up,” check the selected container, Docker state, and Launcher log.
- Metrics may be unavailable when the node is stopped or a host lacks the corresponding GPU source.
- A cached address is not proof that a stopped node is currently reachable.
- Protect Docker volumes and local configuration before reinstalling or removing containers.

## Next steps

Follow [Node Launcher Quick Setup](./node-launcher-quick-setup) or return to the [Launcher guide](./).

## Review and public sources

- Reviewed on **August 6, 2026** against the current Launcher forms, models, Docker commands, and widgets.
- [Ratio1 Edge Node Launcher repository](https://github.com/Ratio1/edge_node_launcher)
