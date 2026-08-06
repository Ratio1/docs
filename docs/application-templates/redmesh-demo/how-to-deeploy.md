---
title: How to Deeploy
sidebar_position: 1
description: Configure a safe RedMesh Native App deployment with optional local or remote analysis.
---

# How to Deeploy RedMesh

## Audience and purpose

This procedure is for CSP and security operators deploying the native RedMesh backend through
Deeploy. It covers the plugin topology and safety review; launching an assessment remains a separate,
explicitly authorized action.

## Prerequisites

- A Deeploy project, connected authorized account, sufficient balance, and compatible target nodes.
- Written assessment authorization and rules of engagement stored through an approved process.
- The resource tier, target-node count, and geographic/tag constraints for the worker fleet.
- A secret-management path for integration keys, LLM tokens, graybox credentials, and any
  attestation private key.
- Approval for a public tunnel or remote LLM provider, if either is required.

## Plugin topology

Add `PENTESTER_API_01` as the required plugin. It supplies the launcher API, worker orchestration,
CStore coordination, R1FS artifact lifecycle, reports, and optional export integrations.

Add `REDMESH_LLM_AGENT_API` only when automated analysis is in scope. The core plugin's `LLM_AGENT`
group is disabled by default. When enabled, connect the core plugin to the LLM API with the provider
plugin's exported `API_HOST` and `API_PORT` semaphore values rather than a guessed address or port.
Both plugins also export `HOST`, `PORT`, `URL`, and their `API_*` equivalents for supported runtime
wiring.

## Procedure

### 1. Create the Native App job

In a Deeploy project, choose **Add Job → Native App**. Select the Native resource tier, target count,
assignment constraints, duration, pipeline identity, and unique plugin instance names. Do not put a
customer name, target, authorization document, or secret in the job alias.

### 2. Configure the core plugin

Use the current `PENTESTER_API_01` configuration contract. The following are the main
deployment-facing controls; names are case-sensitive.

| Area | Current keys | Safe operating position |
| --- | --- | --- |
| API and peers | `PORT`, `TUNNEL_ENGINE_ENABLED`, `CHAINSTORE_PEERS` | Keep tunneling off unless authenticated external access is approved; select only expected peers. |
| Distribution | `NR_LOCAL_WORKERS`, `DISTRIBUTION_STRATEGY`, `PORT_ORDER`, `EXCLUDED_FEATURES` | Start with one local worker and bounded features; use `SLICE` unless the engagement requires reviewed mirrored work. |
| Scheduling | `RUN_MODE`, `MONITOR_INTERVAL`, `MONITOR_JITTER`, `PROGRESS_PUBLISH_INTERVAL` | Prefer `SINGLEPASS`; approve continuous monitoring and its interval separately. |
| Scope | `SCAN_TARGET_ALLOWLIST` | Restrict the plugin to approved target patterns and still require authorization at launch. |
| Pacing | `SCAN_MIN_RND_DELAY`, `SCAN_MAX_RND_DELAY` | Use conservative delays established in the rules of engagement. |
| Safety | `REDACT_CREDENTIALS`, `ICS_SAFE_MODE`, `RATE_LIMIT_ENABLED` | Keep all three enabled. Riskier overrides require an explicit launch confirmation and approval. |
| Analysis | `LLM_AGENT`, `LLM_AGENT_API_HOST`, `LLM_AGENT_API_PORT` | Keep disabled unless the optional agent is deployed and data processing is approved. |
| Integrations | `MISP_EXPORT`, `EVENT_EXPORT`, `WAZUH_EXPORT`, `SURICATA_CORRELATION`, `STIX_EXPORT`, `OPENCTI_EXPORT`, `TAXII_EXPORT` | Disabled by default; configure only the intended destination. |
| Attestation | `ATTESTATION` | Review whether attestation is required; inject its key as a secret, never static documentation or source. |

Leave reconciliation, warm-up, archive, and API retry defaults unchanged unless a tested operational
requirement calls for tuning them. `GRAYBOX_BUDGETS` limits authentication attempts, route discovery,
and stateful actions; lowering a budget is safer than increasing it.

### 3. Configure optional analysis

The current `REDMESH_LLM_AGENT_API` keys are:

- `LLM_PROVIDER`, with `local` as the default;
- `LOCAL_LLM_API_URL`, or the `LOCAL_LLM_API_HOST`, `LOCAL_LLM_API_PORT`, and
  `LOCAL_LLM_API_PATH` components;
- `LOCAL_LLM_API_TOKEN` or the environment variable named by `LOCAL_LLM_API_TOKEN_ENV`;
- `LOCAL_LLM_MODEL`, `LOCAL_LLM_MAX_TOKENS`, and `LOCAL_LLM_MAX_FINDINGS`;
- `REMOTE_LLM_PROVIDER`, `REMOTE_LLM_MODEL`, and `REMOTE_LLM_API_URL` for explicit remote mode;
- `REMOTE_LLM_API_KEY` or the environment variable named by `REMOTE_LLM_API_KEY_ENV`;
- `DEFAULT_TEMPERATURE`, `DEFAULT_MAX_TOKENS`, `DEFAULT_TOP_P`, and
  `REQUEST_TIMEOUT_SECONDS`.

Prefer environment-backed tokens. Do not put values in Deeploy aliases, pipeline input, screenshots,
or tracked JSON. The older `DEEPSEEK_*` RedMesh sample keys are not the current native-plugin
contract.

### 4. Review exposure and pay

Review targets, resources, pipeline identity, signatures, instance IDs, every custom parameter,
dynamic references, ports, duration, and price. If a tunnel is necessary, expose only the launcher
API, require its supported authentication, and restrict upstream access. A tunnel creates
reachability; it does not authorize scans or secure the API by itself.

Submit payment only after the review is correct. Monitor allocation and plugin startup before any
assessment request.

### 5. Perform a controlled readiness check

Confirm the core API reports ready, expected peers are visible, CStore coordination is healthy, and
R1FS can write and retrieve a non-sensitive test artifact. If analysis is enabled, verify the
semaphore-derived LLM endpoint and a non-sensitive health request. Do not use a real target for a
deployment smoke test.

## Before launching an assessment

Require `authorized=true` and an exact target confirmation. Enforce the configured target allowlist,
and supply the engagement's scope and authorization references when those records are used. For
graybox work, provide secrets through the separate secret payload path, keep TLS verification and
credential redaction enabled, and leave stateful probes off unless the rules of engagement explicitly
permit them.

## Troubleshooting and safety

- No workers or stale progress: compare selected peers, version compatibility, CStore reachability,
  and reconciliation status before retrying.
- Missing LLM endpoint: compare the provider instance alias and exact `API_HOST`/`API_PORT` semaphore
  keys; do not hard-code a runtime port.
- R1FS write failure: do not treat the engagement as finalized or prune coordination state until the
  archive is confirmed.
- Validation requests an unsafe confirmation: stop and review the affected control with the named
  approver instead of mechanically accepting it.
- Never use production credentials or an external address to test the form. Never publish exploit
  payloads or replay instructions in deployment records.

## Next steps

Read [Develop RedMesh](./how-to-develop) for extension and report contracts, or return to
[RedMesh](./).

## Review and public sources

- Reviewed on **August 6, 2026** against `PENTESTER_API_01`, `REDMESH_LLM_AGENT_API`, and current Deeploy Native App behavior.
- [Ratio1 RedMesh: Decentralized Distributed Cybersecurity](https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity)
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
- [Ratio1 Deeploy application](https://deeploy.ratio1.ai/)
