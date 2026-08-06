---
title: How to Develop
sidebar_position: 2
description: Develop and verify the CerviGuard web, storage, authentication, and inference contracts.
---

# How to Develop CerviGuard

## Audience and purpose

This guide is for developers changing the CerviGuard pilot web app, its Edge Node inference path, or
its model artifacts. Preserve the boundary between a technical prediction and a clinician-reviewed
decision-support result.

## Prerequisites

- Node 22 and the CerviGuard lockfile for the web app.
- A compatible Edge Node checkout containing `CV_INFERENCE_API` and
  `CERVIGUARD_IMAGE_ANALYZER`.
- Approved, de-identified development fixtures; never use real patient data in local state, tests,
  screenshots, logs, or issue reports.
- A threat model for sessions, roles, CStore/R1FS access, content identifiers, inference traffic,
  model supply chain, and data retention.

## Application boundaries

### Web and clinical workflow

The Next.js app owns login/session handling, clinician/admin screens, case intake, result rendering,
and its API routes. Keep input validation, authorization, error mapping, and clinical limitations
consistent across the UI and server routes. Do not assume a hidden navigation item protects an API;
test every case, file, and user operation directly for both roles.

### Storage and authentication

R1FS owns image blobs and returns content identifiers. CStore owns case metadata and the
authentication/user records. A content identifier is sensitive linkage data, not a permission check.
Authorize the case and image request before retrieval, separate namespaces by environment, and keep
session/CStore secrets server-side.

### Inference

The web app posts base64 image data to `CV_INFERENCE_API` at the host and semaphore-derived port. The
plugin validates and tracks the request and dispatches it to the configured analyzer. The web app
expects a structured result containing status, request/processor metadata, image information, and
both `lesion` and `transformation_zone` classification objects on success.

The analyzer default is not a clinical model configuration: generic image validation is enabled,
while the lesion and transformation-zone slots are disabled and unnamed. Configure reviewed models
explicitly, pin their artifacts, validate class labels and preprocessing, and record model/version
provenance with results. Never describe an unvalidated output as a diagnosis.

## Development procedure

1. Select the nearest boundary: UI/API route, session/auth, CStore/R1FS adapter, analyzer client,
   inference API, analyzer, or model publishing code.
2. Define the request, stored-data, error, and authorization contract before changing behavior.
3. Keep `USE_RATIO1_MOCK=true` confined to isolated local development. Use generated local-only
   values, never deployment secrets or actual patient data.
4. Preserve `R1EN_HOST_IP` plus `API_PORT` as the WAR-to-plugin runtime contract; do not bake a node
   address or allocated port into the app.
5. Treat the synchronous inference call as bounded work. Preserve abort/timeout handling and explicit
   error status until a reviewed asynchronous design replaces it end to end.
6. Update model-loading validation and the web result mapper together when a classification schema
   changes.

The older `LOCAL_SERVING_API` tutorial is historical evidence only. New deployment and development
work targets `CV_INFERENCE_API` with `AI_ENGINE=CERVIGUARD_IMAGE_ANALYZER`.

## Verification

From a clean CerviGuard checkout using Node 22, run:

```bash
npm ci
npm run lint
npm run build
```

Treat any lint error as a release blocker even if the Next.js build succeeds. The current repository
does not provide an automated test suite, so add focused tests for changed authorization, storage,
mapping, or error behavior and perform a role matrix review:

| Operation | Clinician | Administrator | Required check |
| --- | --- | --- | --- |
| Sign in/out and change own password | Allowed | Allowed | Session invalidation, secure cookie, failure cases. |
| Create and view a case | Pilot workflow | Pilot workflow | De-identification confirmation, ownership policy, direct API authorization. |
| View case listings or image content | Defined by approved policy | Broader pilot visibility | Test server routes, not only UI filtering. |
| Create, disable, or change another user | Denied | Allowed | Role check and audit record. |

For the analyzer, verify invalid base64, invalid image, model unavailable, timeout, and structured
success/error responses. Use only non-identifying fixtures and confirm neither request bodies nor
full analysis payloads reach production logs.

## Troubleshooting and safety

- A UI/model schema mismatch must fail visibly; do not fill missing classifications with synthetic
  labels or placeholder confidence.
- If build output warns that a demo session secret is in use, correct environment injection before
  any shared deployment.
- If role tests reveal cross-user access beyond the approved policy, stop rollout and fix the server
  authorization boundary.
- Never commit model tokens, CStore secrets, session secrets, bootstrap passwords, image blobs,
  content identifiers from real cases, or local mock state.
- A model artifact, successful build, or passing fixture is not evidence of clinical performance.

## Next steps

Hand the reviewed contracts to the operator and follow [How to Deeploy](./how-to-deeploy), or return
to [CerviGuard](./).

## Review and public sources

- Reviewed on **August 6, 2026** against the current CerviGuard web app, Edge Node inference/analyzer code, and model publishing repository.
- [SmartCloverAI CerviGuard repository](https://github.com/SmartCloverAI/CerviGuard)
- [SmartCloverAI CerviGuardModels repository](https://github.com/SmartCloverAI/CerviGuardModels)
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
