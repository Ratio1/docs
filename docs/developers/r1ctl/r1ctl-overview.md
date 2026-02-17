---
title: r1ctl Overview
sidebar_position: 1
description: command-line operational model and usage scope
---

# r1ctl Overview

`r1ctl` is the CLI surface for SDK-connected operational and diagnostic workflows.
It is useful when you want fast terminal-level control without writing Python scripts.

## Install and check

```bash
pip install --upgrade ratio1
r1ctl --help
```

## Operational model

1. CLI initializes/uses local SDK config and identity context.
2. Commands open session context to query network/node state.
3. Sensitive operations (restart/shutdown/rollout) follow guardrails and may require explicit confirmation.

## Primary command families

- `get ...`
  - read-only views (nodes, supervisors, comm relay summary, address lookups, availability, apps, networks).
  - includes subcommands such as `get comms` and `get eth <node_addr>`.
- `config ...`
  - local client config operations (show/reset/address/network/alias).
- `inspect`
  - node-level inspection by address/alias.
- `restart`, `shutdown`
  - node control commands (authorization dependent).
- `oracle-rollout`
  - staged rollout helper across seed/oracle/worker node groups (`--skip-seeds`, `--skip-oracles`, `--skip-workers`, `--timeout`).
- `update`
  - update local SDK package.

## Safety guidance

- Prefer read-only commands first (`get`, `inspect`) when diagnosing.
- Use explicit node targeting for restart/shutdown actions.
- Treat `oracle-rollout` as high-impact operational action and run only with clear intent.

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
