---
title: CerviGuard
sidebar_position: 1
description: Understand the CerviGuard pilot workflow, roles, storage, and on-edge image analysis.
---

# CerviGuard

## Audience and purpose

CerviGuard is a pilot application for authorized clinical teams to submit de-identified cervical
images, request on-edge image analysis, and review the resulting decision-support signals. This
section is for pilot operators, clinicians, administrators, and developers evaluating that workflow
on Ratio1.

CerviGuard is **not a standalone diagnosis**, does not replace clinical judgment or an established
screening pathway, and is not currently hardened for production medical use. Use it only under an
approved pilot protocol with de-identified inputs, appropriate consent, clinical oversight, and a
documented data-retention plan.

## Roles and workflow

- A **clinician** uses the application role named `user` to sign in, submit an image and optional
  notes, and review case results.
- An **administrator** can manage pilot users and has broader case visibility.

The current pilot must not be treated as a multi-tenant clinical record system. Some current API
paths return case listings to any authenticated user, so role-labelled screens do not establish
complete clinician-to-clinician case isolation. Use only approved de-identified pilot data and
complete an access-control review before expanding the user group.

## Architecture and data flow

```text
Clinician browser
      |
      v
CerviGuard Next.js web app (WAR)
      |-- CStore authentication and case metadata
      |-- R1FS image storage by content identifier
      |
      +-- POST /predict --> CV_INFERENCE_API
                              |
                              +-- AI_ENGINE=CERVIGUARD_IMAGE_ANALYZER
```

For a new case, the current web app sends the image to the on-edge analyzer synchronously. If image
validation accepts the result, it stores the image in R1FS and writes a case record containing the
R1FS content identifier, status, notes, timestamps, and analysis result to CStore. Authentication
and user records also use CStore. Long inference therefore extends the web request duration, and a
validation failure prevents the case from being stored.

R1FS content addressing is not, by itself, an authorization or retention policy. Protect the web
routes, CStore namespaces, R1FS access, backups, logs, and content identifiers as sensitive clinical
pilot data.

## Current analysis capability

`CV_INFERENCE_API` provides the local computer-vision API, and
`CERVIGUARD_IMAGE_ANALYZER` provides image decoding, validation, and configured model inference. The
pinned analyzer enables generic image validation by default, but its lesion and transformation-zone
model slots are disabled and have no model names by default. Those clinical classification outputs
are unavailable until reviewed model artifacts are explicitly configured and verified.

A healthy API or a completed deployment therefore does not prove that the clinical models are
loaded, validated, calibrated, or suitable for use. Every displayed result needs model provenance,
quality review, and clinician interpretation.

## Prerequisites

- An approved pilot protocol, de-identification process, consent handling, and clinical owner.
- A compatible Edge Node with the inference plugin and explicitly approved model artifacts.
- A secure CStore/R1FS design, session-secret rotation process, user provisioning process, audit
  plan, retention rules, and incident response.
- A private deployment path for the web UI; external exposure requires TLS, authentication, access
  restriction, monitoring, and security review.

## Verify the pilot workflow

1. Confirm the expected analyzer version and explicitly configured model identities before testing.
2. Use an approved non-identifying validation fixture and verify analyzer health and response shape.
3. Sign in with separate clinician and administrator test accounts and verify intended role behavior.
4. Submit the fixture, confirm the R1FS content identifier and CStore case status, then retrieve the
   case through the authenticated UI.
5. Verify error, timeout, invalid-image, backend-unavailable, and session-expiry behavior.
6. Review logs and stored records for image bytes, credentials, tokens, identifying notes, and other
   data that must not be retained.

## Troubleshooting and safety

- Missing lesion or transformation-zone results usually mean the model slots are not enabled or did
  not load; do not invent a clinical interpretation from image-validation output.
- An analyzer timeout blocks case creation in the current synchronous flow. Check local connectivity,
  configured timeout, model readiness, and node capacity before retrying.
- If CStore or R1FS is unavailable, stop intake until data ownership and persistence are understood.
- Never use the local mock account, demo secrets, or default bootstrap values outside isolated
  development.
- Do not enter patient names, record numbers, contact details, or identifying notes.

## In this section

- [Deploy CerviGuard](./how-to-deeploy)
- [Develop CerviGuard](./how-to-develop)

## Review and public sources

- Reviewed on **August 6, 2026** against the current CerviGuard app, Edge Node inference plugin/analyzer, and model repository.
- [SmartCloverAI CerviGuard repository](https://github.com/SmartCloverAI/CerviGuard)
- [SmartCloverAI CerviGuardModels repository](https://github.com/SmartCloverAI/CerviGuardModels)
- [Ratio1 Edge Node repository](https://github.com/Ratio1/edge_node)
