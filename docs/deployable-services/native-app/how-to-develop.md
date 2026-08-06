---
title: How to Develop
sidebar_position: 2
description: Implement the plugin, configuration, semaphore, and response contracts behind a Native App.
---

# How to Develop

## Audience and purpose

This guide is for Edge Node plugin developers preparing code that a CSP can select as a Deeploy
Native App. The deployable unit is a pipeline and plugin instance configuration, not a host-native
binary.

## Prerequisites

- A development checkout aligned with the Edge Node version on the intended targets.
- The closest existing plugin of the same family and its tests.
- A defined signature, instance configuration schema, resource needs, API/report contract, and
  failure behavior.
- A plan for secrets, runtime-generated values, and backward compatibility.

## Development contract

### Signature and configuration

Choose a stable uppercase plugin signature and a unique instance ID. Start from the framework base
class appropriate to the workload. Keep defaults safe, validate every operator-supplied parameter,
and document which values can be changed without recreating state.

Custom parameters reach the instance configuration. Use strings for scalar values and JSON only for
structured data. Reject unknown or malformed security-sensitive values rather than silently guessing.

### Pipeline input and response

Declare the supported pipeline input type and optional URI semantics. Native jobs must participate in
the chainstore response mechanism expected by Deeploy; provide a bounded success/error response so a
job does not remain pending indefinitely.

### Runtime values and semaphores

Export only the runtime values that another component must consume, such as `HOST`, `PORT`,
`API_HOST`, `API_PORT`, or `API_URL`. Treat the semaphore namespace as a contract:

- provider plugin names/aliases must be unique;
- exported keys must remain stable or be versioned;
- consumers reference `[provider, key]` through dynamic environment;
- secrets must not be exported as general-purpose semaphore values.

For a host address, use the host-IP dynamic source. For a value from another plugin, use its exported
semaphore key. Do not substitute a build-time constant for a value chosen at runtime.

### API and tunneling

Bind the service according to the Edge Node web-app/plugin framework and publish a health/status
contract. Keep tunneling disabled by default unless the API is designed for external access. When it
is public, require application authentication and avoid returning node internals or secrets.

### State and reports

Separate durable state from process memory and define any CStore or R1FS ownership explicitly. Report
objects should have stable field names, explicit status/error states, and bounded payloads. Consumers
must be able to distinguish scheduled, running, completed, failed, and unavailable results.

## Verification procedure

1. Run the plugin's unit and contract tests, including invalid configuration and missing dependency
   cases.
2. Test the pipeline response and each exported semaphore key.
3. Serialize a representative Native App configuration through Deeploy's sample, dynamic-environment,
   and semaphore-key tests.
4. Test no-tunnel operation first, then a deliberately authenticated tunnel if supported.
5. Validate on a compatible non-production Edge Node before asking a CSP to fund a deployment.

## Troubleshooting and safety

- If Deeploy lists a signature but a target rejects it, align the Edge Node/plugin rollout.
- If a consumer receives no dynamic value, compare the provider plugin alias and exact exported key.
- Avoid logs that include credentials, tokens, raw private data, or complete operator configuration.
- Do not make an incompatible report or semaphore change under an existing signature without a
  migration plan.

## Next steps

Hand the tested configuration contract to the operator and follow [How to Deeploy](./how-to-deeploy).

## Review and public sources

- Reviewed on **August 6, 2026** against current Edge Node plugin conventions and Deeploy Native App contracts.
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
- [Ratio1 Deeploy source repository](https://github.com/Ratio1/deeploy-dapp)
