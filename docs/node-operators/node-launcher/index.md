---
title: Using Ratio1 Node Launcher
sidebar_position: 3
description: Manage local containerized Ratio1 Edge Nodes from a desktop application.
---

# Using Ratio1 Node Launcher

## Audience and purpose

Ratio1 Edge Node Launcher is a desktop GUI for creating and operating Edge Node containers on the
local computer. It checks local Docker, manages multiple local container/volume pairs, and displays
node identity, runtime metrics, and logs.

It is not the same tool as [r1setup](../r1setup/): r1setup is a CLI controller for provisioning and
operating remote Linux machines over SSH and Ansible. Choose Launcher for hands-on local desktop
management; choose r1setup for remote fleet orchestration.

## Prerequisites

- A supported current release artifact for Windows, Ubuntu, or Apple-silicon macOS.
- Docker installed and running on the same computer as Launcher.
- Enough local memory, storage, and—when applicable—GPU capacity for every node container.
- Permission to run Docker and write Launcher configuration in your user profile.

## In this section

1. Read [Node Launcher Overview](./node-launcher-overview) for the local-container model and feature
   boundaries.
2. Follow [Node Launcher Quick Setup](./node-launcher-quick-setup) to install, create, start, inspect,
   and update a node.

## Verify readiness

Start Docker, open Launcher, and confirm that its Docker check succeeds. The node selector should be
available even when no node exists yet; create a node only after reviewing available system capacity.

## Troubleshooting and safety

- Launcher controls local containers and persistent Docker volumes. Removing or re-creating a
  container is not the same as safely deleting its persistent data.
- Do not publish Launcher configuration, log output, node addresses linked to private operations, or
  access-control data without review.
- Use current release assets rather than platform claims or filenames from old README versions.

## Next steps

Continue to [Node Launcher Overview](./node-launcher-overview).

## Review and public sources

- Reviewed on **August 6, 2026** against the current shared Launcher code and release workflow.
- [Ratio1 Edge Node Launcher repository and releases](https://github.com/Ratio1/edge_node_launcher)
