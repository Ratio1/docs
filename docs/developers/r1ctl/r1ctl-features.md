---
title: r1ctl Features
sidebar_position: 2
description: command groups, examples, and operational guardrails
---

# r1ctl Features

This page maps `r1ctl` features to practical command groups and usage patterns.

## 1) Node and network visibility (`get`)

- `r1ctl get nodes`
- `r1ctl get nodes --peered --wide`
- `r1ctl get supervisors --wide`
- `r1ctl get comms`
- `r1ctl get eth <node_addr>`
- `r1ctl get networks`

Use this group first for troubleshooting connectivity, peering, and active fleet status.

## 2) App inspection and availability

- `r1ctl get apps --node <node_addr_or_eth> --wide`
- `r1ctl get avail <node_eth_addr> --start <epoch> --end <epoch>`
- `r1ctl get avail <node_eth_addr> --start <epoch> --end <epoch> --rounds 3`

Notes:
- availability checks use oracle-response tooling in CLI implementation;
- `--json` mode is available on `get avail` and `get apps`.

## 3) Local client configuration (`config`)

- `r1ctl config show`
- `r1ctl config addr`
- `r1ctl config network --set mainnet`
- `r1ctl config network --set testnet`
- `r1ctl config alias --set my-dev-alias`
- `r1ctl config reset`

Use these when switching environments, validating address context, or resetting local state.
Current CLI network setter accepts `mainnet` and `testnet`.

## 4) Node control commands

- `r1ctl restart <node>`
- `r1ctl restart <node> --ignore-peering`
- `r1ctl shutdown <node>`

These commands are operational actions, not diagnostics. Verify target and authorization before executing.

## 5) Rollout and maintenance

- `r1ctl oracle-rollout`
- `r1ctl oracle-rollout --skip-seeds`
- `r1ctl oracle-rollout --skip-oracles`
- `r1ctl oracle-rollout --skip-workers`
- `r1ctl oracle-rollout --timeout`

`oracle-rollout` includes explicit confirmation flow and group sequencing in current CLI logic.

## 6) Inspection and updates

- `r1ctl inspect <node> --wide`
- `r1ctl update`
- `r1ctl update --quiet`

Use `inspect` for focused node diagnostics and `update` for package maintenance.

## Ground truth references

Primary:
- https://github.com/Ratio1/ratio1_sdk
- https://pypi.org/project/ratio1/

Supporting:
- https://ratio1.ai/whitepaper
- https://explorer.ratio1.ai/

## Notable date
- Reviewed on **February 17, 2026**.

## Next steps
- Back to [r1ctl](../).
