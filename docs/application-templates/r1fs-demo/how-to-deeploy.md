---
title: How to Deeploy
sidebar_position: 1
description: Deploy R1FS Demo from public Git with Worker App Runner or from its published image with Container App Runner.
---

# How to Deeploy

Use **Worker App Runner (WAR)** to build the public repository on a node, or **Container App
Runner (CAR)** to run the published image. Both serve the Next.js application on port **3333**
and use the node's CStore/R1FS services.

This guide deploys the [starter application](./), whose current file APIs and session handling
are not sufficient for a private file-sharing service. Use non-sensitive test data and a controlled
evaluation environment. See [How to Develop](./how-to-develop) for configuration details and
transfer limitations.

## Before creating the job

1. Complete [Deeploy setup](../../cloud-service-providers/deeploy/deeploy-quick-setup) and the
   required account/secrets configuration. The [first-deploy guide](../../cloud-service-providers/deeploy/deeploy-first-deploy)
   explains project creation and funding.
2. Choose the project's target nodes and CPU, memory, and storage allocation. WAR needs enough
   memory to install dependencies and build Next.js as well as run it; inspect build logs before
   treating a running container as a ready application.
3. Configure an **HTTPS** endpoint/tunnel for container port `3333`. Production session cookies
   are marked Secure, so use the HTTPS URL for browser verification.
4. Choose separate, application-specific file and auth namespaces and generate a new auth secret
   and initial admin password. Use the same namespace/secret values across replicas only when
   they are intended to share the application's records.

## Shared application settings

Set these values in the job's environment configuration for either runner. Replace the examples
with your own values; keep secret values out of Git, screenshots, and build commands.

| Variable | Value or purpose |
| --- | --- |
| `CSTORE_HKEY` | A dedicated file namespace, for example `my-r1fs-demo-eval-files`. |
| `R1EN_CSTORE_AUTH_HKEY` | A different user namespace, for example `my-r1fs-demo-eval-auth`. |
| `R1EN_CSTORE_AUTH_SECRET` | A generated authentication secret; keep it stable for this user namespace. |
| `R1EN_CSTORE_AUTH_BOOTSTRAP_ADMIN_PWD` | Initial admin password; remove after bootstrap and successful login. |
| `NEXT_TELEMETRY_DISABLED` | `1`, if you want to disable Next.js telemetry. |

The node injects `R1EN_CHAINSTORE_API_URL`, `R1EN_R1FS_API_URL`, and their legacy
`EE_CHAINSTORE_API_URL`/`EE_R1FS_API_URL` aliases. The legacy CStore alias also configures the auth
dependency bundled with the demo. **Keep these injected URLs**: do not override them with
`localhost:31234`, sandbox addresses, or values copied from `.env.local`. Avoid a custom
`CSTORE_API_URL`, which takes precedence in that auth dependency.

The [edge-node runtime](https://github.com/Ratio1/edge_node) supplies these values for containerized apps.
For standalone local development, where this injection is absent, use the explicit settings in
[How to Develop](./how-to-develop#2-configure-the-app).

## Option 1: Worker App Runner

In [Deeploy](https://deeploy.ratio1.ai/), create a project/job with a Worker App Runner deployment.
Use the generic worker configuration; a dedicated R1FS Demo template is not required.

| Field | Value |
| --- | --- |
| Public repository URL | `https://github.com/Ratio1/r1fs-demo` |
| Branch | `main` |
| Git credentials | Leave empty for this public repository. |
| Runtime image | `node:22` |
| Application/container port | `3333` |

Enter these as **three ordered build/run commands**:

```bash
npm ci
npm run build
npm start
```

The first command installs the locked dependencies, the second produces the Next.js build, and
the last keeps the application running on port 3333. Allow development dependencies during
installation because the build uses them; do not add `--omit=dev` to the install command or set
`NODE_ENV=production` for that install step. `next start` runs the built app in production mode.

Add the shared application settings and HTTPS exposure, review the deployment cost, and use
Deeploy's normal funding/deployment flow. Watch logs through installation, compilation, and
application startup. Use the configured branch intentionally: WAR monitors Git for updates, so
`main` is not a fixed release. Record the deployed revision when comparing behavior with this guide.

These commands and the port apply to the reviewed [app version](https://github.com/Ratio1/r1fs-demo).
For the general Git deployment flow, see the existing
[Deeploy end-to-end example](../../cloud-service-providers/deeploy/deeploy-end-to-end-example).

## Option 2: Container App Runner

Create a Container App Runner deployment using:

| Field | Value |
| --- | --- |
| Registry | Docker Hub (`docker.io`), public access. |
| Image | `docker.io/ratio1/r1fs-demo:latest` |
| Application/container port | `3333` |
| Startup command | Use the image default, `npm start`. |

Apply the same environment settings and HTTPS exposure as above. This image already contains the
built app; do not add WAR's install/build commands to the CAR job. The
[app repository](https://github.com/Ratio1/r1fs-demo) includes a Dockerfile for building a
customized image.

On **September 11, 2026**, Docker Hub reported `latest` available for Linux **AMD64** and **ARM64**,
with this manifest-list digest:

```text
sha256:cb1970e2f6e645a8da425e7a318c8a02fa2d0faf41de9c6590545c126a9b5787
```

For a fixed artifact, use the digest form supported by container image references:

```text
docker.io/ratio1/r1fs-demo@sha256:cb1970e2f6e645a8da425e7a318c8a02fa2d0faf41de9c6590545c126a9b5787
```

`latest` can move. Check the [current tag metadata](https://hub.docker.com/v2/repositories/ratio1/r1fs-demo/tags/latest)
before deployment and record the resolved digest. Registry availability was checked, but this
image was not run for the documentation review and its source revision was not established.
Do not assume it contains exactly the same code as Git `main`; verify the selected artifact below.

## Verify the deployment

1. Confirm the job reaches its running state and the logs show the app listening on port 3333.
2. Open the configured **HTTPS** URL and log in as `admin` with the bootstrap password.
3. Inspect both CStore and R1FS status in the app. If login fails while storage status works,
   verify the legacy CStore URL is present and no `CSTORE_API_URL` points elsewhere.
4. Select **Base64**, upload a small non-sensitive text file, refresh the file list, and download
   it from the list. Compare the downloaded bytes with the original. A returned CID alone does
   not verify the CStore metadata write.
5. Remove the bootstrap password from the job configuration and apply/restart the deployment.
   Check that the existing admin can still log in and the file remains listed. Removing the
   bootstrap setting does not remove the stored account.
6. Record the node/app revision or image digest and the result of the file round trip.

Then use a second test file to [try encrypted sharing](./how-to-develop#try-encrypted-sharing):
upload with a custom secret, share the CID and secret separately, and have a recipient download
in Base64 mode. This exercises the demo's file-encryption workflow as well as storage/discovery.

For an empty streaming download or a failing share link, use the
[known transfer limitations](./how-to-develop#transfer-limitations) before investigating node
storage. Keep auth/file namespaces stable when restarting the same application; changing a key
selects a different set of records rather than migrating existing data.

Use [Managing Deployments](../../cloud-service-providers/deeploy/deeploy-managing-deployments) for
routine logs, configuration changes, and lifecycle operations.

## Review and public sources

Reviewed on **September 11, 2026** against
[R1FS Demo 1.3.0](https://github.com/Ratio1/r1fs-demo),
the [edge-node runtime](https://github.com/Ratio1/edge_node),
and the [public Worker App Runner guide](https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required).
Configuration and public image metadata were checked; neither a paid Deeploy deployment nor a
live login/upload/list/download round trip was performed for this review.

## Next steps

- [How to Develop](./how-to-develop) for local setup and the integration model.
- Back to [R1FS Demo](./).
