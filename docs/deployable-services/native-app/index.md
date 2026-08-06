---
title: Your Native App on Ratio1
sidebar_position: 2
description: Build a Deeploy job from a Ratio1 Edge Node pipeline and one or more plugin signatures.
---

# Your Native App on Ratio1

## Audience and purpose

This section is for developers and CSP operators deploying functionality that already exists as a
Ratio1 Edge Node plugin. A **Native App** is a pipeline containing plugin instances. It is not a
host-native executable, installer, system service, or arbitrary command running outside the Edge Node.

## Prerequisites

- A plugin signature available on every intended target node, or a coordinated rollout plan.
- A documented plugin configuration contract, resource tier, pipeline input, and response behavior.
- Target nodes that satisfy capacity and compatibility requirements.
- An exposure and secret-management design before entering custom parameters.

## Architecture

```text
Deeploy project
  └─ Native App job
       ├─ pipeline identity, input, parameters, targets, resources
       ├─ plugin instance A: SIGNATURE + INSTANCE_ID + custom parameters
       ├─ plugin instance B: SIGNATURE + INSTANCE_ID + custom parameters
       └─ optional dynamic environment links between plugin semaphores
```

The pipeline is the scheduling and identity boundary. Each plugin signature selects Edge Node code;
each instance ID distinguishes a configured instance. Plugin custom parameters configure behavior.
When one plugin needs a runtime value from another, Deeploy can serialize a dynamic-environment
reference to the provider plugin's semaphore key.

Known signatures in the current UI include inference APIs, `PENTESTER_API_01`, and
`REDMESH_LLM_AGENT_API`, plus a custom-signature option. Availability in the selector does not prove
that every target node has the corresponding implementation; validate the targets.

## In this section

- [How to Deeploy](./how-to-deeploy): create targets, pipeline identity, plugin instances, dynamic
  environment, tunnel settings, and the paid deployment.
- [How to Develop](./how-to-develop): implement and test the plugin, configuration, semaphore, and
  report/response contracts.

## Verify the architecture

Confirm that every plugin name is unique in the job, each signature is installed on each target, all
dynamic-environment providers and keys exist, and the pipeline's chainstore response completes within
the expected time.

## Troubleshooting and safety

- Do not select Native App for a container image or Git repository; use a Generic App with CAR or WAR.
- Do not embed credentials directly in reusable sample JSON. Resolve them from protected deployment
  inputs or runtime secret mechanisms.
- A plugin port is not automatically public. Known native signatures default to no tunnel in the
  current form; expose only a deliberately supported API.
- Duplicate plugin aliases or invalid semaphore providers make dynamic wiring ambiguous and should be
  rejected before payment.

## Next steps

Continue to [How to Deeploy](./how-to-deeploy), then [How to Develop](./how-to-develop).

## Review and public sources

- Reviewed on **August 6, 2026** against current Native App forms, schemas, and semaphore tests.
- [Ratio1 Deeploy source repository](https://github.com/Ratio1/deeploy-dapp)
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
