---
title: Node Launcher Quick Setup
sidebar_position: 2
description: Install the current desktop release and create, operate, and verify a local Edge Node.
---

# Node Launcher Quick Setup

## Audience and purpose

Use this procedure to install a current release, create a local containerized Edge Node, inspect its
identity and metrics, and keep Launcher current.

## Prerequisites

- Docker Desktop running on Windows or macOS, or a running Docker Engine on Ubuntu.
- Permission to run Docker commands without an interactive privilege failure.
- Sufficient local RAM and disk for the node; Launcher performs a capacity check before adding one.
- A backup of any existing node volume before changing installation or container state.

## Procedure

### 1. Download the artifact produced by current `main`

Open the [Launcher releases page](https://github.com/Ratio1/edge_node_launcher/releases) and choose:

- **Windows:** the signed `.exe` or `.msi` release asset;
- **Ubuntu:** the Ubuntu 22.04 x86-64 `.AppImage` asset;
- **macOS:** the arm64 `.zip` containing the `.app` bundle.

Do not infer support for other Ubuntu releases, CPU architectures, or macOS Intel from older filenames.

### 2. Install and open Launcher

- On Windows, run the EXE directly or install the MSI.
- On Ubuntu, mark the AppImage executable and run it as your normal desktop user.
- On Apple-silicon macOS, extract the ZIP and open the app bundle. If Gatekeeper blocks it, confirm
  the asset came from the official release and use the operating system's reviewed security flow.

Launcher checks Docker at startup. Install or start Docker if the check reports that it is unavailable,
then reopen Launcher.

### 3. Create a local node

Click **Add New Node**. Review the capacity dialog and select **Create Node**. Launcher generates a
container and volume, saves the local mapping, selects it, pulls the required image when needed, and
starts the node. Wait for startup to finish before creating another node.

### 4. Inspect and name it

Click **Refresh Node Info**. Confirm the Ratio1 address, Ethereum address, uptime, epoch information,
running version, resource summary, and charts. Use the copy controls only into a trusted destination.

Use **Rename Node** for a friendly alias. Current aliases accept letters, numbers, hyphens, and
underscores and are limited to 15 characters. Refresh again to confirm the active node reports it.

### 5. Start, stop, and switch nodes

Use the node selector to choose the target container. The main action changes between launch and stop
according to its state. After either action, verify the selected container name and status in the log
and refresh the information panel.

### 6. Review access and configuration boundaries

The identity addresses shown in Launcher do not automatically modify the node's authorized-address
allowlist. Manage that allowlist through a currently supported administration surface and verify it on
the node. Use Launcher-supported actions for aliases and lifecycle; do not hand-edit its local config
files while it is running.

### 7. Apply Launcher updates

Launcher checks the official release stream on startup and periodically. Before accepting an update,
finish any image pull or node action, record which local node is selected, and protect persistent
volumes. Reopen the updated app and refresh every managed node; an application update should not be
treated as proof that node images or services also updated.

## Verify the setup

A successful setup has a running selected container, stable Ratio1 and Ethereum addresses, a visible
alias, current uptime/version data, and metrics or a clear “not available” state. Stop and restart only
when safe, then verify that the same volume-backed identity returns.

## Troubleshooting and safety

- If Docker is installed but unavailable, start the daemon and confirm the current user can access it.
- If an AppImage does not start, verify executable permission and the host's AppImage/FUSE support.
- If a pull or startup fails, read the Launcher log before retrying; repeated parallel pulls are not a
  recovery strategy.
- Never delete a Docker volume as a generic fix. It can remove node state permanently.
- Redact addresses, paths, and configuration values before sharing diagnostic logs.

## Next steps

Return to [Node Launcher Overview](./node-launcher-overview) or compare remote fleet management in the
[r1setup guide](../r1setup/).

## Review and public sources

- Reviewed on **August 6, 2026** against the current Launcher release workflow and local container flow.
- [Ratio1 Edge Node Launcher releases](https://github.com/Ratio1/edge_node_launcher/releases)
