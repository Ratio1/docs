---
title: RedMesh
sidebar_position: 2
description: Understand RedMesh distributed security assessment on Ratio1 Edge Nodes.
---

# RedMesh

## Audience and purpose

This section is for authorized security teams, Ratio1 operators, and developers evaluating or
operating RedMesh. RedMesh is a native distributed security-assessment backend: a launcher
coordinates work across Edge Nodes, workers collect evidence, and the launcher assembles durable
reports. It is not a browser-only demo and it does not grant permission to test a target.

Only scan systems covered by written authorization and an approved rules of engagement. Confirm the
exact hosts, URLs, ports, time window, identities, probe types, rate limits, and stop contacts before
launching a job.

## Architecture

```text
Authorized request
       |
       v
PENTESTER_API_01 launcher <----> CStore mutable job/progress state
       |
       +---- assignments ----> RedMesh workers on selected Edge Nodes
       |                              |
       |                              +---- network or graybox probes
       |
       +---- R1FS: job config, node/pass reports, final archive
       |
       +---- optional REDMESH_LLM_AGENT_API analysis
       |
       +---- optional SOC/CTI exports
```

`PENTESTER_API_01` is the core native plugin. Its launcher announces jobs and worker assignments
through CStore, monitors live progress, collects node results, and finalizes the engagement. CStore
holds mutable coordination records and lightweight finalized references; R1FS holds immutable job
configuration and larger report/archive artifacts. A finalized archive is written and confirmed
before the mutable CStore record is reduced to a final stub.

### Assessment types

- **Network** scans distribute a port range and supported service/web checks across selected peers.
- **Web application** scans use authenticated graybox scenarios, bounded request budgets, and
  operator-supplied target configuration. Stateful probes remain separately gated.

Both types produce structured progress and report data. Multiple thread results become a per-node
report; node reports are aggregated into pass results and then a final job archive. This separation
lets the launcher coordinate a fleet without putting full report blobs into CStore.

### Optional analysis and integrations

`REDMESH_LLM_AGENT_API` can add structured analysis after scanning. It is disabled in the core
plugin by default, and its own provider default is local. Selecting a remote provider is an explicit
privacy and data-transfer decision.

RedMesh also has disabled-by-default paths for MISP, event/Wazuh export, Suricata correlation, STIX
2.1, OpenCTI, and TAXII. Enable only the integration needed for the engagement, with TLS verification,
least-privilege service credentials, and the receiving system's data-handling approval.

## Prerequisites

- Written authorization and a versioned rules of engagement for every target.
- Compatible Edge Nodes carrying the same RedMesh plugin version.
- A private plan for target configuration, credentials, authorization documents, reports, and
  retention.
- Approved resource, concurrency, delay, monitoring, and incident-stop limits.
- A validated Native App configuration; add the optional LLM plugin only when analysis is approved.

## Verify an assessment

1. Confirm the job records the intended scan type, scope, authorization reference, and selected peers.
2. Check that assigned workers publish progress and that no unapproved target is contacted.
3. Review terminal status and error fields before treating a report as complete.
4. Retrieve the final archive by its R1FS content identifier and verify it corresponds to the job.
5. Confirm credentials are redacted and that any export reached only its approved destination.

Findings require human review. A successful job means the configured assessment completed; it does
not prove that a system is secure or that every vulnerability was detected.

## Safety and troubleshooting

- Keep `SCAN_TARGET_ALLOWLIST`, launch authorization, target confirmation, and rules of engagement
  aligned. A technical allowlist never replaces written authorization.
- Preserve `REDACT_CREDENTIALS`, `ICS_SAFE_MODE`, rate limiting, and TLS verification unless a named
  approver accepts the specific risk and the launch records the required unsafe confirmation.
- Treat graybox credentials and API tokens as secrets. Keep them out of tracked configuration,
  CStore metadata, logs, screenshots, and support messages.
- Start with one worker, a bounded scope, conservative delays, and non-stateful probes. Expand only
  after reviewing target impact and worker output.
- Stop the job if scope is ambiguous, an industrial-control indicator appears, account lockout is
  possible, or monitoring shows unexpected load.

## In this section

- [Deploy RedMesh](./how-to-deeploy)
- [Develop RedMesh](./how-to-develop)

## Review and public sources

- Reviewed on **August 6, 2026** against the current native RedMesh implementation.
- [Ratio1 RedMesh: Decentralized Distributed Cybersecurity](https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity)
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
