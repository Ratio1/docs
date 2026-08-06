---
title: How to Develop
sidebar_position: 2
description: Extend RedMesh workers, probes, reports, analysis, and integrations without breaking contracts.
---

# How to Develop RedMesh

## Audience and purpose

This guide is for Edge Node contributors extending the native RedMesh backend. It identifies stable
subsystem boundaries and verification obligations without exposing target-specific techniques or
turning the client guide into an internal implementation map.

## Prerequisites

- A checkout aligned with the Edge Node version deployed to the target fleet.
- An isolated test environment containing only systems you are authorized to assess.
- The nearest RedMesh unit, contract, and integration tests for the subsystem being changed.
- A compatibility plan for stored CStore records, R1FS artifacts, plugin configuration, semaphore
  keys, and API consumers.

## Subsystem boundaries

- **API and launch services** validate requests, authorization, scope, scan type, safe defaults,
  budgets, and worker assignments. Keep security-sensitive validation at this boundary.
- **Workers and probe registries** execute bounded network or graybox work. A new graybox probe has a
  probe class plus a registry entry; its authentication, session, and stateful capabilities belong
  on the probe, not in duplicated launcher logic.
- **Repositories** separate mutable `JobStateRepository` data in CStore from durable
  `ArtifactRepository` objects in R1FS. Do not place full report blobs or raw secrets in CStore.
- **Models and finalization** define job, progress, finding, pass-report, and archive contracts. The
  launcher must confirm the R1FS archive before pruning a live CStore record to a finalized stub.
- **Analysis** is optional and isolated behind `REDMESH_LLM_AGENT_API`. Provider selection, prompt
  profile, response validation, and secret isolation should remain independent of scanning.
- **Integrations** build redacted events or standards-based artifacts before an approved export.
  Destination clients must not weaken the core scan/report contract.

## Supported extension points

### Add or change a probe

Register the probe in the applicable network feature catalog or graybox registry. Declare whether it
requires authentication, a regular-user comparison session, or state-changing behavior. Enforce a
request budget, bounded timeouts, safe cancellation, and structured evidence. Default to passive or
non-stateful behavior; a state-changing test must remain behind the stateful policy gate.

### Extend orchestration

Keep scan types explicit and preserve deterministic worker assignments, revision handling, progress
ordering, re-announcement bounds, stop behavior, and terminal states. New mutable fields require
backward-compatible parsing because active and finalized CStore records can outlive one process.

### Extend reports

Preserve the aggregation sequence:

```text
thread result -> per-node report -> aggregated pass data -> pass report -> job archive
```

Use stable field names and typed status/error states. Store per-node and aggregate payloads in R1FS
and keep their content identifiers in higher-level records. Retain scan type, scope, authorization,
safety policy, enabled features, timing, and redaction provenance needed to interpret the result.
Treat a storage failure as terminally visible; never publish success and discard the only full
artifact.

### Add analysis or an export

Consume the normalized report contract, not worker internals. Redact credentials and sensitive raw
evidence before forming prompts or outbound events. New remote providers and destinations must be
disabled by default, verify TLS, retrieve credentials from an approved secret source, use bounded
timeouts, and expose a status path that does not reveal secrets.

## Verification procedure

1. Run RedMesh model and contract tests for job configuration, CStore records, repositories, reports,
   findings, state transitions, finalization, and backward-compatible normalization.
2. Run the affected API/launch, authorization, allowlist, safety, budget, secret-isolation, and
   cancellation tests.
3. For a probe change, run its registry and focused probe tests plus the relevant worker aggregation
   tests in an isolated authorized fixture.
4. For LLM work, test local and explicit remote-provider selection, input isolation, output
   validation, structured reports, timeouts, and semaphore-derived connectivity.
5. For an integration, test disabled/unconfigured behavior, redaction, TLS/auth failures, dry-run
   output where supported, status reporting, and retry boundaries.
6. Serialize the Native App configuration through Deeploy's sample, dynamic-environment, and plugin
   semaphore-key tests before rollout.

Do not make a live network request merely to prove a unit or contract change. End-to-end tests must
use an isolated target covered by the test authorization.

## Troubleshooting and safety

- A report consumer failure after a model change signals a contract/migration issue; do not patch
  around it by reading private worker fields.
- Duplicate or regressing progress usually indicates assignment-revision or sequence handling, not a
  reason to discard terminal state.
- A graybox scenario without clear statefulness or budget metadata is incomplete and must not ship.
- Do not log authorization documents, credentials, bearer tokens, private keys, raw secret payloads,
  or unredacted third-party responses.
- Keep public examples non-operational: use placeholders, omit exploit recipes, and never include a
  reachable target.

## Next steps

Hand the reviewed plugin contract to the operator and follow [How to Deeploy](./how-to-deeploy), or
return to [RedMesh](./).

## Review and public sources

- Reviewed on **August 6, 2026** against current RedMesh services, repositories, models, workers, and tests.
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
- [Ratio1 RedMesh: Decentralized Distributed Cybersecurity](https://ratio1.ai/blog/ratio1-redmesh-decentralized-distributed-cybersecurity)
