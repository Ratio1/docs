---
title: How to Deeploy
sidebar_position: 1
description: Configure the CerviGuard inference plugin and web application as one Native App job.
---

# How to Deeploy CerviGuard

## Audience and purpose

This procedure is for CSP operators assembling the current CerviGuard pilot topology in Deeploy. It
does not authorize clinical use: the pilot owner remains responsible for model validation, clinical
governance, de-identification, access review, and data handling.

## Prerequisites

- A Deeploy project, connected authorized account, sufficient balance, and a compatible Edge Node.
- Approval for a Native resource tier appropriate to the inference models and web workload.
- The `SmartCloverAI/CerviGuard` repository revision and its Node 22 toolchain.
- Reviewed lesion and transformation-zone model artifacts and the exact analyzer parameters needed
  to load them; the analyzer defaults do not enable either model.
- Server-side secret values for the session and CStore authentication, supplied through an approved
  secret mechanism rather than the job alias or tracked parameters.
- An approved UI hostname/tunnel, TLS termination, access restriction, monitoring, backup, and
  retention plan.

## Required topology

Create one Native App job with these two components:

| Component | Type | Required contract |
| --- | --- | --- |
| Inference | Native plugin | Signature `CV_INFERENCE_API`; set `AI_ENGINE` to `CERVIGUARD_IMAGE_ANALYZER`; configure reviewed analyzer model parameters explicitly. |
| Web UI | Worker App Runner (WAR) | Repository `SmartCloverAI/CerviGuard`; Node 22; install with `npm ci`, build with `npm run build`, start with `npm run start`. |

`LOCAL_SERVING_API` appears in an older tutorial implementation, but it is not the topology for this
deployment. Do not add it alongside `CV_INFERENCE_API`.

## Procedure

### 1. Create the Native App job

Choose **Add Job → Native App**, select the resource tier and target constraints, and assign stable,
non-sensitive instance names. Keep the inference API local to the Edge Node. Do not enable its tunnel
for normal web-app-to-analyzer communication.

### 2. Add the inference plugin

Add one `CV_INFERENCE_API` instance and set:

```text
AI_ENGINE = CERVIGUARD_IMAGE_ANALYZER
```

Leave anonymous access acceptable only while the API remains loopback/local and untunneled. If its
exposure changes, configure the plugin's supported inference token controls and update the web client
before making it reachable. Verify model configuration independently: the default analyzer enables
image validation but leaves the lesion and transformation-zone model slots disabled.

### 3. Add the web WAR

Configure the WAR with the CerviGuard GitHub repository, Node 22, and the repository's lockfile-based
commands:

```text
Install: npm ci
Build:   npm run build
Start:   npm run start
```

Set the WAR's own main port to the port supplied to the Next.js process. This is the browser-facing
UI port; it is separate from the inference API port. Enable a tunnel only for this UI port and only
after TLS, authentication, and access restrictions are in place.

### 4. Wire runtime environment values

Use Deeploy dynamic environment data for the analyzer connection:

| WAR variable | Dynamic source | Value contract |
| --- | --- | --- |
| `R1EN_HOST_IP` | `host_ip` | The target Edge Node host address. |
| `API_PORT` | `plugin_value` | The `CV_INFERENCE_API` instance's exported `API_PORT` semaphore value. |

Reference the exact provider instance name. Do not hard-code a host or copy a runtime-selected port
from logs. The web app constructs its internal analyzer URL from these two variables and calls
`/predict`.

### 5. Configure non-mock storage and authentication

Set `USE_RATIO1_MOCK=false`. Configure the real R1FS and CStore endpoints/peers required by the
target environment, the case metadata namespace, and the CStore authentication namespace. Provide:

- `SESSION_SECRET` as a strong server-only secret;
- `EE_CSTORE_AUTH_HKEY` as the approved authentication namespace;
- `EE_CSTORE_AUTH_SECRET` through the secret mechanism;
- any one-time bootstrap administrator password out of band, then rotate or remove it according to
  the pilot access procedure.

Do not use a `NEXT_PUBLIC_*` variable for a secret. Do not rely on the application's mock admin,
demo session fallback, or mock CStore secret. Never publish the mock password as a deployment
default.

### 6. Review, pay, and validate

Before payment, review the target, duration, resources, plugin signature, `AI_ENGINE`, WAR source and
commands, dynamic environment sources, UI port, and tunnel. Confirm no secret or patient context is
visible in the review.

After activation, validate with an approved non-identifying fixture: inference health, model
identities, UI login, role behavior, R1FS write/read, CStore case status, result rendering, timeout,
and logout. A successful `/health` response is infrastructure evidence only, not model or clinical
validation.

## Troubleshooting and safety

- Connection refused from WAR to inference: compare `R1EN_HOST_IP`, provider instance alias,
  exported `API_PORT`, plugin readiness, and local firewall rules.
- UI reachable but storage fails: verify non-mock mode, CStore/R1FS configuration, namespace access,
  and peer connectivity before accepting another case.
- Missing classifications: verify the two clinical model slots, artifact access, class contracts,
  and load logs; do not treat generic image validation as a clinical prediction.
- Repeated request timeouts: the current case creation path is synchronous. Review model latency and
  resource capacity rather than increasing timeouts without bounds.
- Stop the pilot if access boundaries, de-identification, model provenance, or retention cannot be
  verified.

## Next steps

Read [Develop CerviGuard](./how-to-develop) for application and model contracts, or return to
[CerviGuard](./).

## Review and public sources

- Reviewed on **August 6, 2026** against the current Native App, WAR, dynamic-environment, and semaphore contracts.
- [SmartCloverAI CerviGuard repository](https://github.com/SmartCloverAI/CerviGuard)
- [SmartCloverAI CerviGuardModels repository](https://github.com/SmartCloverAI/CerviGuardModels)
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
- [Ratio1 Deeploy application](https://deeploy.ratio1.ai/)
