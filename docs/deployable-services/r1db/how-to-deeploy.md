---
title: How to Deeploy R1DB
sidebar_position: 1
description: Create an R1DB service job, choose nodes and credentials, and verify your cluster is usable.
---

# How to Deeploy R1DB

This guide creates a **fresh cluster**. It does not migrate an existing
CockroachDB or R1DB job.

## Before you start

- Complete [Deeploy setup](../../cloud-service-providers/deeploy/deeploy-quick-setup),
  including wallet/project access, funding, and Cloudflare tunneling secrets.
- Identify at least **three distinct, online target nodes** with enough CPU,
  memory, and storage. Choose nodes on different machines for resilience.
- Ensure the node operators keep their host clocks synchronized. Clock errors
  can prevent the database from starting; increasing clock tolerance is not
  a fix.
- Have a password manager ready for the database administrator password.

## 1. Add the service

Open [Deeploy](https://deeploy.ratio1.ai/), select your project, add a
**Service** job, and choose **R1DB**.

In **Specifications**, select a service resource tier and a target-node count
of at least three. Start with three unless you have planned a larger cluster.
Storage is allocated per node: three replicated copies do not provide three
times the logical database capacity.

Continue to **Cost & Duration**, choose how long the job should run, and review
the estimated cost. Then continue to **Deployment**.

## 2. Configure the deployment

Give the job a recognizable alias and manually select the same number of
distinct target nodes as in Specifications. R1DB does not use automatic
assignment, spare nodes, or replication onto unselected nodes.

Under **Service Parameters**, keep **Public Service** enabled. Generate or
select a **TCP** tunnel for SQL clients. The current service requires this
client-facing tunnel; an HTTP website tunnel is not a substitute. Deeploy
also prepares the peer connections, TLS certificates, and a separate HTTPS
console tunnel.

Enter the database inputs:

| Field | Example | What it creates |
|---|---|---|
| Database Name | `appdb` | The initial database. |
| Database User | `app_user` | The configured cluster administrator and console login. |
| Database Password | A unique generated password | The password for that administrator. |

The configured user has **cluster-wide admin** membership on current R1DB
images. Do not put this password in application connection settings. Create
a separate, limited application user after deployment.

Use lowercase names with letters, digits, and underscores, starting with a
letter or underscore, up to 63 characters. Do not use `root`, `admin`, `node`,
or `public` as the user name. Keep passwords and tunnel tokens out of job
aliases, logs, and shared screenshots.

## 3. Review, pay, and verify

Finish the form, review the draft, then complete the
[payment and deployment flow](../../cloud-service-providers/deeploy/deeploy-first-deploy).
Check the node count, storage, duration, credentials, and SQL tunnel before
confirming.

Wait for the requested job instances to run on all selected nodes. In the
running job's **Deployment** section, you will find:

| Item | Use it for |
|---|---|
| SQL endpoint (`host:port`) | Database clients and application connection settings, not a browser page. |
| **Open R1DB Console** | The database dashboard in your browser. |
| **Download CA certificate** | The `r1db-ca.crt` file used to verify SQL connections. |

Use the configured database user and password to [sign in and run a
query](./dashboard). A paid job or reachable tunnel alone does not prove the
database is ready. The current **Overview** page's local-node indicator is
not a cluster-wide health or quorum check.

## If startup does not complete

- Check the selected node instances, available resources, and clock
  synchronization.
- Check the SQL and console tunnels separately; they are different endpoints.
- If the CA download is disabled, refresh the running job after its
  configuration becomes available. Do not disable TLS verification to work
  around missing trust.
- For missing console controls on older jobs, check the deployed image and
  Deeploy versions. Do not recreate a job as a data-recovery shortcut.

Before changing an existing cluster, back up its data. Current targeting
permits append-only scale-up, but not removing, replacing, or reordering
existing nodes. New jobs use the promoted `stable` image channel; a later
pull or restart can adopt a newly promoted image. Plan maintenance rather
than treating restarts as version-neutral.

Next: [Use the console](./dashboard).

## Sources

- [Deeploy allocation and targeting rules](https://github.com/Ratio1/deeploy-dapp/blob/bd8cae66658e5ac50eae11b6fa5da5378135bd23/src/lib/deeploy/cockroachdb-service.ts)
- [Running-job console control](https://github.com/Ratio1/deeploy-dapp/blob/bd8cae66658e5ac50eae11b6fa5da5378135bd23/src/components/job/config/JobDeploymentSection.tsx)
- [Certificate download](https://github.com/Ratio1/deeploy-dapp/blob/bd8cae66658e5ac50eae11b6fa5da5378135bd23/src/components/create-job/steps/deployment/CockroachDbTlsControls.tsx)
- [Configured administrator bootstrap](https://github.com/Ratio1/r1db/blob/c057e55a1c42b7edecc1d4b23ce87b839a1d3a0c/entrypoint.sh)
