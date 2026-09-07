---
title: Partner Applications
sidebar_position: 10
description: Open-source, template-ready applications built on Ratio1 by partner teams.
---

# Partner Applications

## Audience and purpose

Partner applications are complete, open-sourced products built on Ratio1 by partner teams and
published under the same open-source ethos as the rest of the stack. This section is for teams
evaluating a real workload end to end: what it does, how it is deployed through Deeploy, and which
Ratio1 primitives it builds on.

## How this differs from Application Templates

- [Application Templates](../application-templates/) are starting points you fork and adapt. They are
  deliberately generic.
- Partner applications are working products with their own domain, constraints, and operating
  requirements. Read them to see how the primitives combine under real-world pressure, not as a
  scaffold to copy wholesale.

## How to read a partner application

Each application follows the same two-track split used elsewhere in these docs:

1. The application page covers audience, roles, workflow, architecture, and operating boundaries.
2. `How to Deeploy` covers the deployment path, job type, configuration, and verification steps.
3. `How to Develop` covers the integration contracts — storage, authentication, inference, and the
   extension points you would change.

## In this section

- [CerviGuard](./cerviguard/) — clinical decision-support pilot for on-edge cervical image analysis.
  - [How to Deeploy](./cerviguard/how-to-deeploy)
  - [How to Develop](./cerviguard/how-to-develop)

## Scope boundary

Partner applications are documented as deployed by their owning teams. Several are pilots rather than
production-hardened systems, and each page states its own operating limits. Read those limits before
adapting an application for your own use — particularly where regulated data, clinical judgement, or
multi-tenant access control is involved.

## Notable date

- Reviewed on **September 7, 2026**.
