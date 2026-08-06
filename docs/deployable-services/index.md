---
title: Deployable Services
sidebar_position: 9
description: Choose the right Deeploy job type for containers, source-built apps, native plugins, services, or stacks.
---

# Deployable Services

## Audience and purpose

This section is for Cloud Service Providers and application teams choosing how to package a workload
in Deeploy. The first decision is the job type; the second, for containerized applications, is whether
Deeploy should run an existing image or build and run a source repository.

## Prerequisites

- Access to Deeploy and an eligible project/payment context.
- A defined workload boundary, resource requirement, target-node policy, and exposure model.
- Secrets stored outside source control and ready to enter through Deeploy's protected inputs.

## Choose a Deeploy job type

| Choice | Use it for | Runtime model |
|---|---|---|
| **Generic App** | A custom container image or application source repository. | One Container App Runner (CAR) or Worker App Runner (WAR) plugin. |
| **Native App** | One or more Edge Node plugin instances coordinated by a pipeline. | Ratio1 plugin signatures and pipeline configuration—not a host-native executable. |
| **Service** | A curated database, workflow tool, registry, runner, or similar template. | A validated catalog entry backed by CAR or WAR. |
| **Stack** | Several coordinated container definitions that must be deployed as one job. | Multiple generic container/worker components with shared job targeting. |

### CAR versus WAR

- Choose **Container App Runner (CAR)** when you already have a container image. Supply the registry,
  visibility/authentication when required, ports, variables, storage, and policies.
- Choose **Worker App Runner (WAR)** when Deeploy should clone a repository and run declared build
  and start commands inside a worker image. Supply the repository, branch when needed, visibility and
  credentials for private source, and explicit commands.

WAR is convenient for source-to-edge delivery without a separate CI/CD image build. CAR is preferable
when an image is already tested, immutable, and controlled through an image-release process.

## In this section

- Browse the active [Service Catalog](./service-catalog).
- Learn the [Native App](./native-app/) pipeline and plugin model.
- Follow [How to Deeploy a Native App](./native-app/how-to-deeploy) for the current UI flow.
- Use [How to Develop a Native App](./native-app/how-to-develop) for plugin contracts.

## Verify the choice

Before adding a job, confirm that its inputs match the selected model. A source repository with build
commands is WAR; an existing image is CAR; an Edge Node plugin signature is Native App; several
container components form a Stack. Review the draft job summary before payment.

## Troubleshooting and safety

- “Native” describes the Edge Node plugin pipeline. It does not run arbitrary host binaries.
- Never paste long-lived registry, repository, tunnel, or application secrets into aliases, custom
  parameters intended for display, or documentation.
- Public exposure is optional for many workloads. Prefer private access unless users truly need an
  internet endpoint.
- Persist stateful data explicitly; a container filesystem alone is not durable storage.

## Next steps

Choose a [catalog service](./service-catalog) or start with [Your Native App on Ratio1](./native-app/).

## Review and public sources

- Reviewed on **August 6, 2026** against the current shared Deeploy job forms and schemas.
- [Ratio1 Deeploy application](https://deeploy.ratio1.ai/)
- [Ratio1 Deeploy source repository](https://github.com/Ratio1/deeploy-dapp)
- [Worker App Runner: deploy without a separate CI/CD pipeline](https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required)
