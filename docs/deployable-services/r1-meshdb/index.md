---
title: R1 MeshDB
sidebar_position: 3
description: Deploy a distributed SQL database, open its console, and store data for your applications.
---

# R1 MeshDB

R1 MeshDB is Ratio1's distributed SQL database service. Deeploy runs a cluster
across your selected edge nodes and provides an HTTPS console plus a SQL endpoint
for PostgreSQL-compatible clients. It is based on CockroachDB's open-source
engine; it is not a PostgreSQL server or the full CockroachDB enterprise product.

## Start here

1. [Deeploy a cluster](./how-to-deeploy) on at least three nodes.
2. [Open the dashboard](./dashboard) using the database credentials you chose.
3. [Create and use databases](./databases) with a worked example and a separate
   application login.

Deployment creates your initial database, such as `appdb`, and its user, such as
`app_user`. You can use that database immediately. You do not need to create a
second one to finish setup.

## One cluster, multiple databases

| Term | Meaning |
|---|---|
| Deeploy job | The paid deployment: nodes, resources, duration, and endpoints. |
| Cluster | The database service running across those nodes. |
| Database | A named collection of tables, such as `shop` or `support`, within that cluster. |
| Table | Structured records, such as orders or support tickets. |

Create a database once through the cluster, not once on every node. Separate
databases help organize applications, but share cluster resources and users.
They are not separate deployments or a complete tenant-isolation boundary.

Use backups as well as replication. Keep the job funded and extend its duration
before expiry; a fresh deployment does not automatically recover another job's
data, even on the same nodes.

## Version and sources

These guides describe the R1 MeshDB **1.0.2** console and Deeploy source reviewed
on **September 15, 2026**. Existing jobs may use older images or configurations.
Upstream CockroachDB documentation can help with SQL syntax, but its dashboard
and enterprise features differ from MeshDB.

- [R1 MeshDB source and support policy](https://github.com/Ratio1/r1-meshdb/tree/e638553f899bdc8578afcdc2c3c1e37e1e8163b8)
- [Deeploy service definition](https://github.com/Ratio1/deeploy-dapp/blob/552075cc326952125b2bd1adc9bcb7fdc457ad0c/src/data/services.ts)
