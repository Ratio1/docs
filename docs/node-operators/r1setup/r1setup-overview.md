---
title: r1setup Overview
sidebar_position: 1
description: Understand the control-machine, fleet, machine, and Edge Node instance model.
---

# r1setup Overview

## Audience and purpose

This page gives fleet operators the mental model needed before using the CLI. `r1setup` centralizes
remote deployment and routine operations, but the machines and Edge Node instances remain distinct
resources.

## Prerequisites

- A trusted control machine from which you can reach the remote fleet over SSH.
- Remote Linux machines that meet the intended CPU or NVIDIA GPU workload requirements.
- Familiarity with the difference between a host and a containerized service.

## Operating model

```text
trusted control machine
  └─ r1setup configuration
       ├─ machine A (SSH endpoint)
       │    └─ Edge Node instance 1 (service + container + persistent volume)
       └─ machine B (SSH endpoint)
            ├─ Edge Node instance 2
            └─ Edge Node instance 3 (Advanced mode only)
```

- A **configuration** is a named local workspace containing the network, registered machines,
  assigned instances, and deployment state.
- A **machine** is a physical or virtual host reached through SSH. A machine may be registered and
  prepared without having an Edge Node instance.
- A **node** or **instance** is an Edge Node assignment on a machine. It has its own remote service,
  container, persistent volume, runtime names, and status.
- A **deployment** creates or updates the remote runtime from the active configuration.

### Simple and Advanced modes

**Simple mode** is the default and supports one Edge Node instance per machine. It keeps machine-level
details out of the normal flow and is the best choice for a conventional fleet.

**Advanced mode** exposes **Register Machine** and **Fleet Summary** and permits multiple instances on
one machine with explicit expert confirmation. The switch from Simple to Advanced is one-way for a
configuration because multi-instance machine state cannot be represented in Simple mode. Create a
new configuration if you later need a clean Simple-mode setup.

### CPU and GPU deployment

The deployment menu offers separate paths:

- **Install GPU Nodes** prepares Docker, NVIDIA support, and the GPU Edge Node image.
- **Install CPU Nodes** deploys the CPU Edge Node image without the NVIDIA workload path.
- **Prepare Machines** checks or installs host prerequisites without assigning a new instance.

Choose per actual hardware. A service name such as `edge_node2` does not by itself mean that a machine
needs Advanced mode; the number of instances tracked on that physical machine determines the mode.

## Verify your model

Open **Configuration → View Configuration** to confirm the active network and instances. In Advanced
mode, open **Configuration → Fleet Summary** and check that every instance appears under the correct
physical machine; empty registered machines should appear without an assigned instance.

## Troubleshooting and safety

- If **Register Machine** is hidden, the configuration is in Simple mode. Switch only if you need
  machine-level or multi-instance controls.
- Never assume that removing an instance also removes its registered machine, or that registering a
  machine deploys a node. Verify the resulting fleet summary.
- Keep the control machine and its configuration backups protected: they contain connection and
  operational state for the fleet.

## Next steps

Follow [r1setup Quick Setup](./r1setup-quick-setup) or return to the [r1setup guide](./).

## Review and public sources

- Reviewed on **August 6, 2026** against the current shared `r1setup` CLI and fleet-model tests.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
