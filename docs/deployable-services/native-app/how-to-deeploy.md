---
title: How to Deeploy
sidebar_position: 1
description: Configure and validate a Native App job in the current Deeploy workflow.
---

# How to Deeploy

## Audience and purpose

This procedure is for CSP operators turning an implemented Edge Node plugin pipeline into a funded
Deeploy job. Coordinate the configuration with the plugin developer before starting the form.

## Prerequisites

- A Deeploy project, connected authorized account, and sufficient payment balance.
- The exact plugin signatures, unique plugin names/instance IDs, and required custom parameters.
- A resource tier and target count supported by the intended nodes.
- Tunnel credentials only if a supported API must be public.
- A dynamic-environment map when plugins or containers consume runtime-generated values.

## Procedure

### 1. Add the job to a project

Open the project draft, choose **Add Job → Native App**, and give the job an alias. A project can hold
several jobs; the alias should identify this app without containing customer names, secrets, or target
details.

### 2. Choose specifications and targets

Select the Native worker resource tier, optional GPU type, target-node count, country/tag constraints,
and assignment policy. Review capacity results. Auto-assignment is useful for interchangeable nodes;
explicit targets are appropriate when a plugin rollout, data locality, or integration dependency is
node-specific.

### 3. Define pipeline identity and input

Set the pipeline input type and optional input URI, then add pipeline parameters. Keep a stable job
alias and document what the pipeline expects. Native Apps must implement the chainstore response
mechanism; otherwise deployment can time out even when a plugin starts.

### 4. Add plugin instances

For each plugin:

1. assign a unique plugin name and instance ID;
2. select the built-in signature or enter a reviewed custom signature;
3. add custom parameters with the correct string or JSON value type;
4. configure a port only when the plugin exposes a supported API;
5. enable tunneling only when the form allows it and public reachability is required.

Changing from a custom signature to a known native signature resets manual tunnel state in the
current form because known signatures default to tunneling disabled.

### 5. Wire dynamic environment and semaphores

Use dynamic environment data rather than copying runtime values into static configuration:

- `host_ip` supplies the target host IP;
- `container_ip` supplies a selected container's IP for generic/stack components;
- `plugin_value` resolves a provider plugin's exported semaphore key;
- `static` supplies a deliberate non-secret constant.

For Native App custom JSON, the backend dynamic-environment shape uses `host_ip`, `static`, or a
shared-memory path of `[provider-plugin, exported-key]`. Deeploy normalizes supported plugin aliases
and validates that the provider exists. Do not hand-create `SEMAPHORE` or `SEMAPHORED_KEYS` custom
parameters; those are protected orchestration keys.

### 6. Review exposure, duration, and cost

Complete cost and duration, return to the project draft, and inspect the complete job: resources,
targets, pipeline, every plugin signature/instance, parameters, dynamic references, ports, and tunnel.
The displayed endpoint must agree with the intended protocol and main port.

### 7. Pay and monitor

Submit payment only after the review is correct. Follow wallet confirmations without refreshing away
from an in-flight transaction. After activation, open the running job and inspect allocated nodes,
plugin configuration, pipeline data, deployment/tunnel details, and balance/duration.

## Verify the deployment

Confirm every requested node is online, every expected plugin instance appears once, dynamic values
resolve, the chainstore response completes, and the intended health/status endpoint works. For a
public tunnel, test both reachability and application authentication; for a private app, confirm no
unexpected public endpoint exists.

## Troubleshooting and safety

- A missing signature on one target is a rollout/compatibility problem, not a form retry problem.
- A dynamic value that resolves empty usually indicates a wrong provider alias or exported key.
- Do not pay while target capacity is blocking or the form reports a validation error.
- Tunnels publish reachability; they do not replace API authentication or authorization.
- Never put secrets in aliases, pipeline identity, or screenshots of the review page.

## Next steps

Use [How to Develop](./how-to-develop) for the plugin contract or return to [Your Native App on
Ratio1](./).

## Review and public sources

- Reviewed on **August 6, 2026** against current project/job forms, dynamic-environment serialization, tunnel behavior, and payment flow.
- [Ratio1 Deeploy application](https://deeploy.ratio1.ai/)
- [Ratio1 Deeploy source repository](https://github.com/Ratio1/deeploy-dapp)
