---
title: How to Deeploy R1 MeshDB
sidebar_position: 1
description: Create a MeshDB service job, choose nodes and credentials, and verify your cluster is usable.
---

# How to Deeploy R1 MeshDB

This guide creates a **fresh cluster**. It does not migrate an existing
CockroachDB or MeshDB job.

## Before you start

- Complete [Deeploy setup](../../cloud-service-providers/deeploy/deeploy-quick-setup),
  including wallet/project access, funding, and Cloudflare tunneling secrets.
- Identify at least **three distinct, online target nodes** with enough available
  CPU, memory, and storage. Choose nodes on different machines for resilience.
- Ensure the node operators keep their host clocks synchronized. Clock errors can
  prevent the database from starting; increasing clock tolerance is not a fix.
- Have a password manager ready to store the database credentials.

## 1. Add the service

Open [Deeploy](https://deeploy.ratio1.ai/), select your project, add a **Service**
job, and choose **R1 MeshDB**.

In **Specifications**, select a service resource tier and a target-node count of
at least three. Start with three unless you have planned a larger cluster.
Storage is allocated per node: three replicated copies do not provide three
times the logical database capacity.

Continue to **Cost & Duration**, choose how long the job should run, and review
the estimated cost. Then continue to **Deployment**.

## 2. Configure the deployment

In **Deployment**, give the job a recognizable alias and manually select the
same number of distinct target nodes as in Specifications. MeshDB does not use
automatic assignment, spare nodes, or replication onto unselected nodes.

Under **Service Parameters**, keep **Public Service** enabled. Use **Generate
Tunnel**, or select an appropriate existing **TCP** tunnel, for SQL clients.
The current service requires this client-facing tunnel; an HTTP website tunnel
is not a substitute.

Enter the database inputs:

| Field | Example | What it creates |
|---|---|---|
| Database Name | `appdb` | Your initial database. |
| Database User | `app_user` | A database operator login, also used for the console. |
| Database Password | A unique password from your password manager | The password for that login. |

Use simple lowercase names with letters, digits, and underscores, starting with
a letter or underscore, up to 63 characters. Do not use `root`, `admin`, `node`,
or `public` as the user name. Keep passwords and tunnel tokens out of job aliases
and shared screenshots.

Deeploy prepares the peer tunnels, TLS certificates, and a separate HTTPS
console tunnel. You do not need to configure those on each node or choose a
second dashboard password.

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
| **Open R1 MeshDB Console** | The database dashboard in your browser. |
| **Download CA certificate** | The `r1-meshdb-ca.crt` file used to verify SQL connections. |

Follow [the dashboard guide](./dashboard) to sign in and run a query. A paid job
or a reachable tunnel alone does not prove the database is ready.

## If startup does not complete

- Check all selected node instances, available resources, and clock synchronization.
- Check the SQL and console tunnels separately. They are different endpoints.
- If the CA download is disabled, refresh the running job after its configuration
  becomes available. Do not disable TLS verification to work around missing trust.
- For missing console controls on older jobs, check the deployed versions with
  the operator. Do not recreate the job as a data-recovery shortcut.

Before changing an existing cluster, back up its data. Current targeting permits
append-only scale-up, but not removing, replacing, or reordering existing nodes.
New jobs use the promoted `stable` image channel; a later pull/restart can adopt
a newly promoted image, so plan maintenance rather than treating restarts as
version-neutral.

Next: [Use the dashboard](./dashboard).

## Sources

- [Deeploy allocation and targeting rules](https://github.com/Ratio1/deeploy-dapp/blob/552075cc326952125b2bd1adc9bcb7fdc457ad0c/src/lib/deeploy/cockroachdb-service.ts)
- [Running-job console and certificate controls](https://github.com/Ratio1/deeploy-dapp/blob/552075cc326952125b2bd1adc9bcb7fdc457ad0c/src/components/job/config/JobDeploymentSection.tsx)
