---
title: r1setup Other Advanced Tools
sidebar_position: 7
description: Use configuration portability, backups, service customization, and diagnostic controls.
---

# r1setup Other Advanced Tools

## Audience and purpose

This page covers expert tools that are useful after the basic fleet flow is understood. Several can
export sensitive material or change remote runtime definitions, so use them deliberately.

## Prerequisites

- A backed-up active configuration and verified SSH access.
- A clear target list and maintenance window for changes that restart services.
- Secure local storage for configuration exports, node-data backups, logs, or key material.

## Tools and procedures

### Configuration backup and transfer

**Manage Configurations** can switch, export, and import named configurations. Treat an exported
configuration as sensitive because it can contain machine endpoints and authentication metadata.
Import into a trusted controller, activate it, and run connectivity before making remote changes.

### Network and controller settings

Use **Configuration → Switch Environment** to change mainnet, testnet, or devnet only after confirming
that the configuration and discovered services belong on that network. Use **Settings** for display
preferences and connection timeouts. Raising a timeout can accommodate a slow link; it does not fix
bad credentials or an unreachable firewall path.

### Service customization

**Advanced → Customize Service** changes only the service-template variables allowed by r1setup and
reapplies the template to selected deployed instances. It can restart services. Record each override,
review the target list, and verify status and version afterward.

### Node-data backup

**Advanced → Backup Node Data** downloads a compressed snapshot of one instance's persistent volume.
Check free disk space, protect the resulting archive, and verify that it can be read before relying on
it. A downloaded archive is not a complete disaster-recovery plan unless its restore procedure has
also been tested.

### SSH, logs, and private-key collection

The Advanced menu can open SSH, stream or save logs, and collect node wallet keys. Private-key
collection is a high-impact security operation: run it only for an approved backup or migration,
store output encrypted with restrictive access, and remove unneeded copies securely. Never attach
keys to a support request.

### Updates and debug output

`r1setup` can check for CLI updates at startup. After an update, review the active configuration and
service-file drift before applying remote changes. Use `r1setup --debug` or `--debug-ansible` only in
a controlled diagnostic session; verbose output can reveal operational metadata.

## Verify an advanced action

After configuration import, confirm the selected configuration and network. After a service or remote
change, run connectivity and **Node Status & Info**. After an export or backup, verify file presence,
permissions, and integrity without displaying its sensitive contents.

## Troubleshooting and safety

- Do not treat a longer timeout as a connectivity repair.
- Backups and exported logs can contain sensitive data even when the command succeeds.
- Reapplying a service template may restart the workload and preserve approved overrides; review
  both the version and override set.
- Keep CLI updates separate from fleet-wide operational changes so a failure has a clear cause.

## Next steps

See [Managing and Monitoring Nodes](./r1setup-managing-and-monitoring-nodes), [Fleet Login
Hardening](./r1setup-hardening-your-fleet-logins), or the [FAQ](./r1setup-faq).

## Review and public sources

- Reviewed on **August 6, 2026** against the current configuration, settings, backup, log, customization, and update code.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
