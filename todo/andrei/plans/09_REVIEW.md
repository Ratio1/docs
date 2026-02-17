# 09_REVIEW

Owner: Andrei (`AID`)
Role: **CRITIC**
Date: 2026-02-17
Execution mode: 5-pass escalating CRITIC loop
Scope: all AID-owned docs from `todo/TODO_ANDREI.md`

## AID Chapters in Scope
- `2` -> `docs/ratio1-overview/index.md`
- `2.1` -> `docs/ratio1-overview/decentralized-orchestration.md`
- `2.2` -> `docs/ratio1-overview/distributed-storage.md`
- `2.3` -> `docs/ratio1-overview/decentralized-apps.md`
- `2.4` -> `docs/ratio1-overview/the-plugins-system.md`
- `5` -> `docs/developers/index.md`
- `5.1` -> `docs/developers/python/index.md`
- `5.1.1` -> `docs/developers/python/quick-end-to-end-example.md`
- `5.1.2` -> `docs/developers/python/navigating-the-tutorials.md`
- `5.1.3` -> `docs/developers/python/api-quick-reference.md`
- `5.1.4` -> `docs/developers/python/the-edge-node-software.md`
- `5.1.5` -> `docs/developers/python/contributing-to-the-edge-node-and-beyond.md`
- `5.5` -> `docs/developers/r1ctl/index.md`
- `5.5.1` -> `docs/developers/r1ctl/r1ctl-overview.md`
- `5.5.2` -> `docs/developers/r1ctl/r1ctl-features.md`
- `8` -> `docs/application-templates/index.md`

## Source Registry
- `SRC01` `todo/TODO_ANDREI.md` (scope ownership truth)
- `SRC02` `todo/README.md` (taxonomy truth)
- `SRC03` https://ratio1.ai/whitepaper
- `SRC04` https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
- `SRC05` https://ratio1.ai/blog/ratio1-deeploy-blog-1-decentralized-managed-container-orchestration
- `SRC06` https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required
- `SRC07` https://ratio1.ai/blog/introducing-the-worker-app-runner-deploy-from-git-to-edge
- `SRC08` https://ratio1.ai/blog/from-zero-to-node-runner-mainnet
- `SRC09` https://ratio1.ai/blog/shipping-the-future-why-today-s-3send-launch-shows-what-the-ratio1-protocol-was-built-for
- `SRC10` https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters
- `SRC11` https://github.com/Ratio1/ratio1_sdk (repo + API tree checks)
- `SRC12` https://github.com/Ratio1/edge_node (repo + API tree checks)
- `SRC13` https://github.com/ratio1/naeural_core
- `SRC14` https://pypi.org/project/ratio1/
- `SRC15` local CLI runtime checks:
  - `r1ctl --help`
  - `r1ctl get --help`
  - `r1ctl config network --help`
  - `r1ctl oracle-rollout --help`
- `SRC16` local SDK runtime introspection:
  - `Session.create_worker_web_app`
  - `Session.create_container_web_app`
  - `Session.create_web_app`
  - `Pipeline`/`Instance` signatures
- `SRC17` local package state checks:
  - `python3 -m pip show ratio1`
  - `python3 -m pip index versions ratio1`
- `SRC18` local installed package layout check (`ratio1/tutorials` absent)
- `SRC19` https://deeploy.ratio1.ai/
- `SRC20` https://app.ratio1.ai/
- `SRC21` https://explorer.ratio1.ai/
- `SRC22` Edge-node tree proof for extension and test paths (`extensions/*`, `plugins/*`, `test_redmesh.py`)
- `SRC23` Ratio1 SDK tree proof for tutorials (`ex23`-`ex26`, asset folders, `eth2025`, `video_presentation`)

---

## Pass 1 - Source Discovery (baseline completeness)
Goal: identify chapter-by-chapter source sets before judging claims.

Chapter -> sources identified:
- `2`: `SRC03`, `SRC04`, `SRC08`, `SRC10`, `SRC19`, `SRC20`, `SRC21`
- `2.1`: `SRC03`, `SRC04`, `SRC05`, `SRC06`, `SRC07`, `SRC12`, `SRC19`
- `2.2`: `SRC03`, `SRC09`, `SRC11`, `SRC12`
- `2.3`: `SRC03`, `SRC04`, `SRC08`, `SRC09`, `SRC10`, `SRC19`, `SRC20`, `SRC21`
- `2.4`: `SRC03`, `SRC11`, `SRC12`, `SRC13`, `SRC22`
- `5`: `SRC03`, `SRC11`, `SRC14`, `SRC15`, `SRC19`, `SRC21`
- `5.1`: `SRC11`, `SRC14`, `SRC16`, `SRC18`
- `5.1.1`: `SRC11`, `SRC14`, `SRC16`, `SRC18`
- `5.1.2`: `SRC11`, `SRC14`, `SRC18`, `SRC23`
- `5.1.3`: `SRC11`, `SRC14`, `SRC16`
- `5.1.4`: `SRC11`, `SRC12`, `SRC13`, `SRC22`
- `5.1.5`: `SRC11`, `SRC12`, `SRC13`, `SRC22`
- `5.5`: `SRC11`, `SRC14`, `SRC15`
- `5.5.1`: `SRC11`, `SRC15`
- `5.5.2`: `SRC11`, `SRC15`
- `8`: `SRC03`, `SRC04`, `SRC05`, `SRC06`, `SRC07`, `SRC09`, `SRC19`, `SRC20`, `SRC21`

Pass 1 verdict:
- Coverage complete for all AID chapters.
- Early risk signals: portal-role ambiguity (`deeploy` vs `app`) and CLI drift risk.

---

## Pass 2 - Evidence Extraction + Required Changes (critical pass)
Goal: extract concrete facts from sources and record required chapter deltas.

### `2` `docs/ratio1-overview/index.md`
Evidence:
- `SRC04`: Deeploy App described as Ratio1 control center for CSPs, with first login at `deeploy.ratio1.ai`.
- `SRC08`: `app.ratio1.ai` flow centered on KYC/KYB, buying licenses, linking licenses, claiming rewards.
Required changes:
- Replace "operations in `app.ratio1.ai`" with deployment operations via Deeploy (`SRC19`) and node/license account operations via `app.ratio1.ai` (`SRC20`).
- Expand PoA/PoAI acronyms on first use.

### `2.1` `docs/ratio1-overview/decentralized-orchestration.md`
Evidence:
- `SRC05`: production-grade orchestration goes through Deeploy API; includes app-level and instance-level command model.
- `SRC06`/`SRC07`: WAR presented as Deeploy workflow.
Required changes:
- Name Deeploy UI and Deeploy API explicitly as first-class production orchestration channels.
- Reframe ChainDist/direct SDK as lower-level orchestration controls.

### `2.2` `docs/ratio1-overview/distributed-storage.md`
Evidence:
- `SRC09`: explicit CStore control-plane + R1FS payload-plane descriptions in 3send technical section.
- `SRC12`/`SRC22`: live edge-node tree exposes `cstore` and `r1fs` business surfaces.
Required changes:
- Replace inferential wording with source-backed phrasing for CStore/R1FS split.
- Keep 3send as evidence but avoid blanket architecture claims beyond cited text.

### `2.3` `docs/ratio1-overview/decentralized-apps.md`
Evidence:
- `SRC04` and `SRC08` split deployment control vs license/KYC operations.
- `SRC09` supports production-grade app narrative.
Required changes:
- Clarify operational split: deploy/manage apps in Deeploy; account/license/reward workflows in `app.ratio1.ai`; telemetry in Explorer.

### `2.4` `docs/ratio1-overview/the-plugins-system.md`
Evidence:
- `SRC12`/`SRC22`: top-level extension groups are `business`, `data`, `serving`, `utils`; no top-level `extensions/default`.
Required changes:
- Remove `extensions/default/` as top-level group.
- Add `serving` and `utils`.
- Tone down "stable orientation surface" wording.

### `5` `docs/developers/index.md`
Evidence:
- `SRC15`: CLI is real developer/operator surface.
- `SRC04`/`SRC05`: managed production deployment is Deeploy-centered.
Required changes:
- Add explicit production boundary: SDK/CLI for dev/integration/ops control; managed production via Deeploy UI/API.

### `5.1` `docs/developers/python/index.md`
Evidence:
- `SRC16`: Python API has broad low-level control including worker/container/web helpers.
- `SRC04`/`SRC05`: production-managed posture remains Deeploy-first.
Required changes:
- Add "Python SDK first for dev/integration" boundary language.

### `5.1.1` `docs/developers/python/quick-end-to-end-example.md`
Evidence:
- `SRC16`: code path used is valid API.
- `SRC18`: local package does not ship tutorials/examples tree.
Required changes:
- Add explicit "dev/low-level quickstart" note and context for local-node allowlist commands.

### `5.1.2` `docs/developers/python/navigating-the-tutorials.md`
Evidence:
- `SRC23`: repo tutorials include `ex23`-`ex26` and additional assets.
- `SRC18`: installed package lacks local `tutorials/` directory.
Required changes:
- Add missing `ex23`-`ex26`.
- Replace "SDK ships with tutorials" with "tutorials live in repo source tree".

### `5.1.3` `docs/developers/python/api-quick-reference.md`
Evidence:
- `SRC16`: `Session.create_worker_web_app(...)` exists and is currently callable.
Required changes:
- Add `create_worker_web_app(...)` to high-frequency helper list.

### `5.1.4` `docs/developers/python/the-edge-node-software.md`
Evidence:
- `SRC12`/`SRC22`: same extension topology as chapter `2.4`.
Required changes:
- Replace stale "default/core extension modules" wording with current grouping.

### `5.1.5` `docs/developers/python/contributing-to-the-edge-node-and-beyond.md`
Evidence:
- `SRC22`: referenced redmesh test module path exists in current tree.
Required changes:
- Keep commands but add branch/version caveat and CI-target drift warning.

### `5.5` `docs/developers/r1ctl/index.md`
Evidence:
- `SRC15`: `get` subcommands include `comms` and `eth`.
Required changes:
- Expand capability summary with `get comms`, `get eth`.

### `5.5.1` `docs/developers/r1ctl/r1ctl-overview.md`
Evidence:
- `SRC15`: rollout flags include `--skip-workers`, `--timeout`.
Required changes:
- Update rollout and `get` family examples to include current options.

### `5.5.2` `docs/developers/r1ctl/r1ctl-features.md`
Evidence:
- `SRC15`: `config network` accepts only `mainnet`/`testnet`.
- `SRC15`: `oracle-rollout` supports `--skip-workers` and `--timeout`; no `--no-timeout`.
Required changes:
- Remove `devnet` and `--no-timeout`.
- Add `get comms`, `get eth`, `--skip-workers`, `--timeout`.

### `8` `docs/application-templates/index.md`
Evidence:
- `SRC04`/`SRC05`/`SRC06`/`SRC07`: deployment channel is Deeploy.
- `SRC08`: `app.ratio1.ai` is node-license-account lifecycle.
Required changes:
- In template flow, verify deployments through Deeploy + Explorer; keep app portal for account/license context.

---

## Pass 3 - Contradiction Sweep (strict, breakage-focused)
Goal: escalate hard contradictions that can mislead operators/builders.

Critical contradictions:
1. `2` `2.3` `8` - control-plane ambiguity between Deeploy vs `app.ratio1.ai` (risk: wrong operational portal).
2. `5.5.2` - unsupported commands documented (`devnet`, `--no-timeout`) (risk: direct CLI failure).

High contradictions:
1. `2.4` `5.1.4` - stale extension topology (`extensions/default` top-level) vs current tree.
2. `5.1.2` - "SDK ships tutorials" conflicts with installed package state.

Medium contradictions:
1. `2.1` - orchestration hierarchy unclear between Deeploy and low-level SDK/ChainDist.
2. `5` `5.1` `5.1.1` - production vs developer workflow boundaries too soft.

Pass 3 severity verdict by chapter:
- `BLOCKER`: `2`, `2.3`, `5.5.2`, `8`
- `HIGH`: `2.1`, `2.4`, `5.1.2`, `5.1.4`
- `MEDIUM`: `5`, `5.1`, `5.1.1`, `5.5`, `5.5.1`
- `LOW`: `2.2`, `5.1.3`, `5.1.5`

---

## Pass 4 - Critical Thinking Pass (proof strength + claim hygiene)
Goal: question over-claims, hidden assumptions, and weakly linked assertions.

Escalated criticism:
- `2.2`: CStore/R1FS split is now source-backed (`SRC09`), but should still avoid claiming full protocol invariants not explicitly documented in whitepaper.
- `2.4`/`5.1.4`: avoid wording that implies extension topology is stable over time; frame as "current tree as of review date".
- `5.1.2`: tutorial guidance should distinguish between "repository tutorial assets" and "runtime APIs guaranteed in package".
- `5.1.5`: example test commands are valid today, but docs should explicitly say "verify against branch CI matrix".
- `5.5` family: command docs must be treated as version-coupled; add version marker tied to `ratio1` package state.

Proof-strength grading:
- Strongly verified: `2`, `2.1`, `2.3`, `2.4`, `5.1.2`, `5.1.3`, `5.1.4`, `5.5`, `5.5.1`, `5.5.2`, `8`
- Verified with moderate inference: `2.2`, `5`, `5.1`, `5.1.1`, `5.1.5`
- Unsupported after pass 4: none

---

## Pass 5 - Final Adjudication (release-readiness gate)
Goal: final chapter-level disposition and fix queue with strict prioritization.

### Release-blocking fixes (must do first)
1. Correct portal role mapping in `2`, `2.3`, `8`:
   - deployment operations -> Deeploy (`SRC19`/`SRC04`/`SRC05`)
   - node-license-KYC-reward operations -> `app.ratio1.ai` (`SRC20`/`SRC08`)
   - telemetry -> Explorer (`SRC21`)
2. Fix invalid CLI docs in `5.5.2` using live help from `SRC15`.
3. Fix extension family references in `2.4` and `5.1.4` using `SRC22`.

### High-priority fixes
1. Clarify orchestration hierarchy in `2.1`.
2. Refresh tutorial map and packaging caveat in `5.1.2`.
3. Add `create_worker_web_app` in `5.1.3`.

### Medium-priority fixes
1. Strengthen production-boundary language in `5`, `5.1`, `5.1.1`.
2. Add branch/version caveat in `5.1.5`.
3. Tighten source trace wording in `2.2`.

### Final status by chapter
- `2`: **BLOCKED**
- `2.1`: **HIGH-RISK**
- `2.2`: **WARN**
- `2.3`: **BLOCKED**
- `2.4`: **HIGH-RISK**
- `5`: **WARN**
- `5.1`: **WARN**
- `5.1.1`: **WARN**
- `5.1.2`: **HIGH-RISK**
- `5.1.3`: **WARN**
- `5.1.4`: **HIGH-RISK**
- `5.1.5`: **WARN**
- `5.5`: **WARN**
- `5.5.1`: **WARN**
- `5.5.2`: **BLOCKED**
- `8`: **BLOCKED**

---

## Net New Findings vs prior review draft
- Added explicit 5-pass execution history with escalating scrutiny.
- Added chapter-by-chapter source identification for all AID chapters.
- Added stronger source-backed evidence for `2.2` (3send CStore/R1FS split).
- Confirmed current CLI/API/package reality:
  - `r1ctl` command surface (`SRC15`)
  - SDK helper surface including `create_worker_web_app` (`SRC16`)
  - installed package does not ship tutorials (`SRC18`)
- Upgraded contradiction severity model to release-readiness statuses.

## Command Log (evidence generation)
- `r1ctl --help`
- `r1ctl get --help`
- `r1ctl config network --help`
- `r1ctl oracle-rollout --help`
- `python3 -m pip show ratio1`
- `python3 -m pip index versions ratio1`
- Python introspection of `ratio1.Session`, `ratio1.Pipeline`, `ratio1.Instance`
- GitHub API tree queries for `ratio1_sdk` and `edge_node`
- HTML source extraction for Ratio1 blog pages listed in `SRC04`-`SRC10`

---

## Remediation Execution Log (5 passes completed)

### Pass A - Blocking-fix tuning
Checked:
- `2`, `2.1`, `2.3`, `8` against `SRC04`, `SRC05`, `SRC08`, `SRC19`, `SRC20`, `SRC21`.
- `5.5.2` against `SRC15`.
- `2.4`, `5.1.4` against `SRC12`, `SRC22`.
Tuned:
- Fixed Deeploy/App/Explorer role split.
- Fixed unsupported `r1ctl` options.
- Updated extension groups to `business`, `data`, `serving`, `utils`.
Outcome:
- All Pass A blockers addressed in docs.

### Pass B - Source re-check + wording hardening
Checked:
- Portal-role evidence in `SRC04`, `SRC05`, `SRC08`.
- Deeploy API command-model language in `SRC05`.
Tuned:
- Added explicit Deeploy API wording in `2.3` and `8`.
- Tightened developer chapter production boundary wording.
Outcome:
- No remaining Deeploy/App role inversions.

### Pass C - CLI precision pass
Checked:
- Live command surface from `SRC15` (`get`, `config network`, `oracle-rollout`).
Tuned:
- Added version-coupled note (`ratio1` `3.5.1`) in `5.5`.
- Added explicit `get comms` / `get eth` mention in `5.5.1`.
- Added `mainnet`/`testnet` setter restriction note in `5.5.2`.
Outcome:
- CLI docs aligned with current runtime help output.

### Pass D - SDK/tutorial topology pass
Checked:
- Tutorial inventory from `SRC11`/`SRC23`.
- Installed package layout from `SRC18`.
- Extension tree from `SRC12`/`SRC22`.
Tuned:
- Added `ex23`-`ex26`, asset folders, and source-tree caveat in `5.1.2`.
- Added date-qualified topology caution in `2.4`.
Outcome:
- Tutorial/API/runtime topology drift closed.

### Pass E - Final audit pass
Checked:
- Deterministic presence/absence checks for all previously critical tokens across:
  - `2`, `2.1`, `2.3`, `2.4`, `5.1.2`, `5.1.3`, `5.1.4`, `5.5.2`, `8`.
- Live reconfirmation with `SRC15`, `SRC16`, `SRC22`, `SRC23`.
Tuned:
- No additional tuning required after final audit.
Outcome:
- Final audit: **PASS** for all previously blocked/high-risk mismatches.
