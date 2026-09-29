---
title: R1DB
sidebar_position: 3
description: Deploy a distributed SQL database, open its console, and store data for your applications.
---

# R1DB

R1DB is Ratio1's distributed SQL database service. Deeploy runs a cluster
across your selected edge nodes and provides a browser console and a separate
SQL endpoint for PostgreSQL-compatible clients. R1DB is a Ratio1 distribution
of an open-source CockroachDB engine snapshot, not a PostgreSQL server or the
full upstream enterprise product.

## Start here

1. [Deeploy a fresh cluster](./how-to-deeploy) on at least three nodes.
2. [Sign in to the console](./dashboard) with the database credentials from
   the job.
3. [Create a table and an application user](./databases) with a worked example.

Deployment creates your initial database, such as `appdb`, and its configured
user, such as `app_user`. That user has cluster-wide administrator privileges
in current R1DB images. Keep its password protected and create a separate,
limited login for each application.

## One cluster, multiple databases

| Term | Meaning |
|---|---|
| Deeploy job | The paid deployment: target nodes, resources, duration, and endpoints. |
| Cluster | The database service running across those nodes. |
| Database | A named collection of tables, such as `shop` or `support`, within the cluster. |
| Table | Structured records, such as orders or support tickets. |

You can use the initial database immediately. Creating another database does
not create another Deeploy job or add storage. Databases share cluster
resources and users; names alone are not a tenant-isolation boundary.

Replication is not a backup. Keep backups outside the cluster, keep the job
funded, and extend its duration before expiry. A new deployment does not
automatically recover another job's data, even on the same nodes.

## Version and sources

These guides describe the **R1DB 1.0.8** console and Deeploy service reviewed
on **September 29, 2026**. Existing jobs may run a different image or retain
older permissions. Upstream CockroachDB documentation can help with SQL
syntax, but its console and enterprise features may differ from R1DB.

- [R1DB source and support policy](https://github.com/Ratio1/r1db/tree/c057e55a1c42b7edecc1d4b23ce87b839a1d3a0c)
- [Deeploy service definition](https://github.com/Ratio1/deeploy-dapp/blob/bd8cae66658e5ac50eae11b6fa5da5378135bd23/src/data/services.ts)
