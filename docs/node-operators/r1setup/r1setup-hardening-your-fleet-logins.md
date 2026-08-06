---
title: r1setup Hardening Fleet Logins
sidebar_position: 6
description: Migrate fleet access to verified SSH keys without locking out operators.
---

# r1setup Hardening Fleet Logins

## Audience and purpose

This guide is for operators replacing password-based SSH access with keys and optionally disabling
password authentication on remote machines. The safe order is install, verify, retain recovery
access, then harden.

## Prerequisites

- Console, provider, or another tested recovery path that does not depend on the key being changed.
- A private key stored securely on the trusted control machine and a matching public key.
- At least one recovery public key stored outside the target machine.
- A test host or staged rollout before changing an entire production fleet.

## SSH states

| State | Meaning | Safe next action |
|---|---|---|
| `password_only` | Inventory still authenticates with a password. | Install a selected public key. |
| `key_configured_legacy` | Key auth predates r1setup's SSH metadata. | Validate it from this controller. |
| `key_installed_unverified` | Key installation ran, but login is not confirmed. | Verify; do not harden yet. |
| `key_verified` | Controller-side key login succeeded. | Confirm recovery access, then harden if required. |
| `verification_failed` | Key login or hardening verification failed. | Restore/fix access and revalidate. |
| `password_disabled` | Remote sshd no longer accepts password authentication. | Protect and periodically test all retained keys. |

## Safe hardening procedure

1. Open **Advanced → SSH Key Management → Install Key / Migrate Password Hosts**.
2. Select an existing keypair or generate one. Never paste a private key into documentation or chat.
3. Allow r1setup to install the public key. Inventory switches to key authentication only after
   controller-side verification succeeds.
4. Run **Validate Key Authentication** and then **Show SSH Auth Status**. Continue only when the host
   is `key_verified` and does not require revalidation.
5. Test the independent recovery path and retain at least one recovery key outside the machine.
6. Select **Disable Password Authentication** only for verified hosts. This changes the machine's
   SSH daemon policy, not merely the r1setup configuration.
7. Open a new session and verify key login again before closing the existing recovery session.

Use **Add Extra Public Key** to install additional operator or recovery keys without replacing the
primary authentication record.

## Verify the hardening

Run **Show SSH Auth Status**, **Operations → Test Connectivity**, and a new interactive SSH session
from the control machine. Confirm the state is `password_disabled` only after key access succeeds.
Record the recovery procedure in your secure operations system—not in a public repository.

## Troubleshooting and safety

- Never disable password authentication from an unverified or `verification_failed` state.
- If verification fails, keep the existing authenticated session open, restore known-good sshd
  settings through the recovery path, and revalidate.
- Some providers also require public keys in instance metadata or their control panel.
- Restrict private-key file permissions and rotate any key that may have been exposed.
- Roll out one machine at a time; a shared mistake applied fleet-wide can create a fleet-wide lockout.

## Next steps

Return to [Managing and Monitoring Nodes](./r1setup-managing-and-monitoring-nodes) and test routine
operations using the new authentication state.

## Review and public sources

- Reviewed on **August 6, 2026** against the current SSH state machine, playbooks, and key-manager tests.
- [Ratio1 r1setup repository](https://github.com/Ratio1/r1setup)
- [Introducing Multi Node Launcher (r1setup)](https://ratio1.ai/blog/introducing-multi-node-launcher-r1setup-gpu-deployment-at-scale-made-simple)
