---
title: r1setup Quick Setup
sidebar_position: 2
description: Install r1setup and bring a remote CPU or GPU fleet under management.
---

# r1setup Quick Setup

## Audience and purpose

Use this procedure for an end-to-end first configuration: install the controller, describe the
fleet, discover existing services, deploy only fresh instances, and verify the result.

## Prerequisites

- A Linux, macOS, or Windows Subsystem for Linux control machine with `curl`, internet access, and
  `sudo` permission.
- SSH host, user, port, and authentication details for each remote Linux machine.
- The expected network and whether each machine should run the CPU or GPU image.
- A maintenance window when provisioning packages or restarting services could affect the host.

## Procedure

### 1. Install the control CLI

Run the official installer on the control machine—not on every remote host:

```bash
curl -sSL https://raw.githubusercontent.com/Ratio1/r1setup/refs/heads/main/install.sh | bash
r1setup --version
```

The installer creates an isolated Python environment, installs the Ansible collection, and makes the
`r1setup` command available. Inspect the downloaded script first if your security policy requires it.

### 2. Create the configuration

Run `r1setup`, choose **Create your first configuration**, give it a non-sensitive name, and select
mainnet, testnet, or devnet.

- Choose **Simple** for one instance per machine.
- Choose **Advanced** when you must register empty machines, import several services from one host,
  or prepare a migration target.

### 3. Register machines and discover existing services

Provide each machine's SSH connection details. In Advanced mode, use **Configuration → Register
Machine** for hosts that should exist in the fleet without immediately gaining an instance.

Run **Configuration → Discover Services** on any machine that might already run `edge_node` services.
Discovery is read-only. Review the network badge and runtime name for every result, then import only
the services this configuration should manage. Unselected services are left untouched.

For clean machines, add the intended node instances. Do not create a fresh instance on a machine
where an existing service should have been imported.

### 4. Test access before deployment

Open **Operations → Test Connectivity**. Fix unreachable hosts, incorrect SSH users or ports, key
permissions, and firewall rules before proceeding.

### 5. Deploy

Open **Deployment** and select one path:

- **Install GPU Nodes** for machines with supported NVIDIA hardware.
- **Install CPU Nodes** for CPU-only machines.
- **Prepare Machines** when you want prerequisites installed without deploying an instance yet.

Review the selected targets and answer the confirmation prompt. Deployment is not the place to test
unknown credentials or an uncertain network selection.

### 6. Verify

1. Open **Deployment → Deployment Status** and check for per-host failures.
2. Open **Node Status & Info** and confirm each intended instance is running.
3. Open **Node Addresses & Export** and confirm each reachable instance reports an address.
4. In Advanced mode, compare **Fleet Summary** with the planned machine-to-instance assignments.

## Troubleshooting and safety

- If discovery finds a service on another network, stop and resolve the configuration/network
  mismatch. Creating a fresh instance could stack different-network containers on one host.
- For an NVIDIA failure, confirm the machine exposes supported hardware and that Secure Boot or host
  policy is not blocking driver installation.
- A successful SSH test proves controller reachability, not application health. Always complete the
  status and address checks.
- Never publish saved configurations: password-auth configurations may contain sensitive SSH data.

## Next steps

Continue with [Fleet Management](./r1setup-fleet-management) and [Managing and Monitoring Nodes](./r1setup-managing-and-monitoring-nodes).

## Review and public sources

- Reviewed on **August 6, 2026** against the current installer, onboarding, discovery, and deployment code.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
