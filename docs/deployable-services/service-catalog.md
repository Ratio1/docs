---
title: Service Catalog
sidebar_position: 1
description: Active Deeploy service templates, exposure options, persistence, and required inputs.
---

# Service Catalog

## Audience and purpose

This catalog helps operators select among the service templates active in the current Deeploy UI. It
lists stable behavior and required inputs without volatile prices or image tags.

## Prerequisites

- A Deeploy project and an approved target-node/resource plan.
- A decision to expose the service publicly through a tunnel or privately through node port mapping.
- Secure values prepared for every required credential input.
- A backup, retention, and upgrade plan for stateful services.

## Active catalog

“Public/private” means a service with a port can use a public tunnel or a private host-to-service port
mapping. “Private only” means the template does not publish an application port.

| Service | Purpose | Runner | Exposure | Persistence | Required operator inputs |
|---|---|---|---|---|---|
| PostgreSQL | Relational database | CAR | Public/private TCP | PostgreSQL data | Superuser password |
| MySQL | Relational database | CAR | Public/private | MySQL data | Root password |
| MongoDB | Document database | CAR | Public/private | Database data | Root username and password |
| n8n | Workflow automation | CAR | Public/private | n8n configuration/data | Credential-encryption key |
| vdo_ninja | Peer-to-peer video web application | WAR | Public/private HTTP | None in the template | None |
| Docker Registry | Private image registry | CAR | Public/private | Registry data | Registry HTTP secret |
| Neo4j Community Edition | Graph database | CAR | Public/private HTTP | Graph data | Initial authentication setting |
| Moodle | Learning-management system | CAR | Public/private HTTP | Application and uploaded data | Database host/port/name/user/password plus initial admin username/password/email |
| Matrix Synapse | Matrix homeserver | CAR | Public/private HTTP | Homeserver configuration/data | Public server name and anonymous-statistics choice |
| OpenBao | Secrets and encryption management | CAR | Public/private HTTP | OpenBao data and logs | None at job creation; initialize and secure after deployment |
| CockroachDB | Multi-node distributed SQL database | CAR | Public/private TCP | Per-node database data | Database name, application user, password, and at least two explicit target nodes |
| GitHub Runner | Self-hosted GitHub Actions runner | CAR | Private only | Runner work directory | Access token, repository/organization URL, scope, runner name, labels, and ephemeral choice |

GitLab and EMQX are not active catalog entries and are intentionally omitted.

## Deployment procedure

1. Add a **Service** job to the project and choose the catalog entry.
2. Select its service resource tier and validate target-node capacity. CockroachDB requires at least
   two manually selected targets; other services use their form's current targeting rules.
3. Choose public or private exposure where a port exists. A public service requires a tunnel;
   private mode creates a host-to-service port mapping.
4. Enter the required values. Deeploy can generate new secret-shaped inputs, but the operator remains
   responsible for secure storage and rotation.
5. Review persistence, duration, cost, targets, and endpoint before adding the job draft and paying.

## Verify the service

After deployment, confirm the requested nodes are online, the job shows the expected CAR/WAR runner,
the tunnel or private mapping matches the exposure choice, and every persistent volume is mounted.
Then use the service's own health or client check with a least-privileged account.

## Troubleshooting and safety

- Do not expose databases or control planes publicly unless access controls and network policy have
  been reviewed. A tunnel is reachability, not authentication.
- Back up stateful volumes and test restore before upgrades.
- Initialize OpenBao securely and protect its recovery material; the absence of a create-time input is
  not a secure default credential.
- Scope GitHub runner tokens to the intended repository or organization and prefer ephemeral runners
  for untrusted workloads.
- Treat CockroachDB clock health, node count, and target selection as cluster requirements, not UI
  decoration.

## Next steps

Return to [Deployable Services](./) or use [How to Deeploy a Native App](./native-app/how-to-deeploy)
for custom plugin pipelines.

## Review and public sources

- Reviewed on **August 6, 2026** against the active service entries and validation schemas in shared Deeploy `develop`.
- [Ratio1 Deeploy application](https://deeploy.ratio1.ai/)
- [Ratio1 Deeploy source repository](https://github.com/Ratio1/deeploy-dapp)
- [Worker App Runner overview](https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required)
