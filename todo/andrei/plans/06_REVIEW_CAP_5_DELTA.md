# Executive Verdict
Chapter 5 recent updates had multiple factual drifts versus current `ratio1_sdk` (tutorial inventory, `r1ctl` command surface, and one API helper name). All detected medium-severity issues were remediated in this pass; no critical/high blockers remain.

# Findings (ordered by severity)
## MEDIUM-01: Non-existent tutorial files referenced in Python tutorial map
- Affected: `docs/developers/python/navigating-the-tutorials.md:30`, `docs/developers/python/navigating-the-tutorials.md:40`, `docs/developers/python/navigating-the-tutorials.md:42`
- Issue: The page referenced tutorials not present in the current `ratio1_sdk` tree (`ex23_deploy_worker_app.py`, `ex24_multi_video_stream_monitor.py`, `ex25_local_serving_api.py`, `ex26_cerviguard_war_loopback.py`).
- Why this matters: Broken tutorial inventory degrades discoverability and creates false implementation paths for developers.
- Evidence:
  - https://github.com/Ratio1/ratio1_sdk/tree/main/tutorials
  - https://github.com/Ratio1/ratio1_sdk/blob/main/tutorials/ex22_deeploy_custom_code.py
- Assessment: OUTDATED
- Required change: Replace missing tutorial references with existing files from current `tutorials/` (`ex17`, `ex19`, `ex20`, `ex22`, `ex14`, `ex15`, `eth2025/*`).
- Confidence: HIGH

## MEDIUM-02: `r1ctl` pages documented unsupported command/flag surface
- Affected: `docs/developers/r1ctl/index.md:13`, `docs/developers/r1ctl/r1ctl-overview.md:28`, `docs/developers/r1ctl/r1ctl-features.md:16`, `docs/developers/r1ctl/r1ctl-features.md:55`
- Issue: Docs referenced `r1ctl get comms` and `r1ctl oracle-rollout --skip-workers`, which are not in current CLI command definitions.
- Why this matters: Operators following these commands will fail at runtime and lose trust in docs.
- Evidence:
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/cli/cli_commands.py
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/cli/cli.py
- Assessment: OUTDATED
- Required change: Remove `get comms` / `--skip-workers`; align examples to current supported surface (`get nodes/supervisors/networks/apps/avail`, `oracle-rollout --skip-seeds|--skip-oracles|--no-timeout`).
- Confidence: HIGH

## MEDIUM-03: API quick reference listed a non-existent helper
- Affected: `docs/developers/python/api-quick-reference.md:48`
- Issue: `create_worker_web_app(...)` was listed as a `Session` helper but is not present in current SDK.
- Why this matters: Developers will search for a method that does not exist and may assume package/version issues.
- Evidence:
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/base/generic_session.py
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/__init__.py
- Assessment: UNSUPPORTED
- Required change: Remove `create_worker_web_app(...)` from quick reference and keep only current web app helpers.
- Confidence: HIGH

## LOW-01: Quick example labeled `e2_addr` as alias
- Affected: `docs/developers/python/quick-end-to-end-example.md:39`
- Issue: Example key named `node_alias` held `plugin.e2_addr` (address-type field naming), which is semantically imprecise.
- Why this matters: Minor terminology drift in sample output can confuse readers during debugging.
- Evidence:
  - https://github.com/Ratio1/ratio1_sdk/blob/main/tutorials/ex02_part1_deploy_webapi.py
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/base/plugin_template.py
- Assessment: PARTIALLY_SUPPORTED
- Required change: Rename sample key to `node_e2_addr`.
- Confidence: MEDIUM

# Section Scorecard
- `docs/developers/index.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: None.
- `docs/developers/python/index.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: None.
- `docs/developers/python/quick-end-to-end-example.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: None after key rename.
- `docs/developers/python/navigating-the-tutorials.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: Keep tutorial inventory re-validated on SDK release bumps.
- `docs/developers/python/api-quick-reference.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: Keep helper list aligned with `generic_session.py`.
- `docs/developers/python/the-edge-node-software.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: None.
- `docs/developers/python/contributing-to-the-edge-node-and-beyond.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: None.
- `docs/developers/r1ctl/index.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: Keep command-surface wording tied to CLI source.
- `docs/developers/r1ctl/r1ctl-overview.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: None.
- `docs/developers/r1ctl/r1ctl-features.md`
  - Accuracy: Good
  - Completeness: Good
  - Traceability: Good
  - Main gap: Re-check flags on CLI release changes.

# TODO Execution Checklist (Patch Plan)
1. `docs/developers/python/navigating-the-tutorials.md`
- [x] Remove missing tutorial references.
- [x] Replace with files present in current `ratio1_sdk/tutorials`.
2. `docs/developers/r1ctl/index.md`
- [x] Remove unsupported communication-relay phrasing.
3. `docs/developers/r1ctl/r1ctl-overview.md`
- [x] Align `get` command-family description with actual CLI subcommands.
4. `docs/developers/r1ctl/r1ctl-features.md`
- [x] Remove `get comms`.
- [x] Replace `--skip-workers` with `--no-timeout`.
- [x] Add `devnet` in network-set examples.
5. `docs/developers/python/api-quick-reference.md`
- [x] Remove unsupported `create_worker_web_app(...)` helper.
6. `docs/developers/python/quick-end-to-end-example.md`
- [x] Rename payload key to `node_e2_addr` for semantic precision.
7. `todo/TODO_ANDREI.md`
- [x] Uncheck all Chapter 5 task checkboxes.
- [x] Split QA checkboxes so Chapter 5 is explicitly unchecked and Chapter 2 remains checked.

# Source Set Used
- Taxonomy/scope:
  - `todo/README.md`
  - `todo/TODO_ANDREI.md`
- Chapter 5 target docs:
  - `docs/developers/index.md`
  - `docs/developers/python/index.md`
  - `docs/developers/python/quick-end-to-end-example.md`
  - `docs/developers/python/navigating-the-tutorials.md`
  - `docs/developers/python/api-quick-reference.md`
  - `docs/developers/python/the-edge-node-software.md`
  - `docs/developers/python/contributing-to-the-edge-node-and-beyond.md`
  - `docs/developers/r1ctl/index.md`
  - `docs/developers/r1ctl/r1ctl-overview.md`
  - `docs/developers/r1ctl/r1ctl-features.md`
- Repos/package/docs used for fact-check:
  - https://github.com/Ratio1/ratio1_sdk
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/cli/cli_commands.py
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/cli/cli.py
  - https://github.com/Ratio1/ratio1_sdk/blob/main/ratio1/base/generic_session.py
  - https://github.com/Ratio1/ratio1_sdk/tree/main/tutorials
  - https://github.com/Ratio1/ratio1_sdk/blob/main/pyproject.toml
  - https://github.com/Ratio1/edge_node
  - https://github.com/ratio1/naeural_core
  - https://ratio1.ai/whitepaper
  - https://ratio1.ai/blog/ratio1-end-to-end-tutorial
  - https://ratio1.ai/blog/deploying-a-custom-web-application
  - https://ratio1.ai/blog/build-your-own-sandbox-in-minutes
  - https://ratio1.ai/blog/deep-dive-into-the-ratio1-community-telegram-bot-network-insights-for-everyone
  - https://ratio1.ai/blog/ratio1-sdk-for-typescript-your-bridge-to-edge-nodes
  - https://ratio1.ai/blog/go-developers-meet-the-new-ratio1-sdk-and-sandbox
  - https://ratio1.ai/blog/empowering-the-nodejs-ecosystem
  - https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters
  - https://app.ratio1.ai/
  - https://explorer.ratio1.ai/
  - https://pypi.org/project/ratio1/

# Stop Condition
CRITIC status: Pass with no critical blockers.
