---
title: Create and Use Databases
sidebar_position: 3
description: Create a database and table in the R1DB Console, then connect an application with limited access.
---

# Create and Use Databases

Your deployment already has an initial database, usually `appdb`. This
walkthrough creates a separate `shop` database and an `orders` table, then
gives an application user access to that table. A new database shares the
existing cluster's nodes and capacity; it is not another Deeploy job.

Sign in to [the R1DB Console](./dashboard) as the configured database user,
usually `app_user`, with **Database** set to the initial database. This user
has cluster-wide administrator access in current R1DB deployments. Keep its
password for administration, not for application connections.

## Create a database

1. Open **Manage** and select **Databases**.
2. Enter `shop` and create the database.
3. Check that **Database** in the top bar now shows `shop`.

If `shop` already exists, inspect it or choose another name. Do not delete an
existing database merely to repeat this example. The console's **SQL** page
does not accept `CREATE DATABASE`; use **Manage** or a SQL client.

## Create a table and add data

Open **Tables**, click **New table**, and name it `orders` in the `public`
schema. Keep the form's generated `id` column (`UUID` primary key with
`gen_random_uuid()` as its default). Add these required columns:

| Column | Type | Nullable |
|---|---|---|
| `customer_email` | `STRING` | No |
| `total` | `DECIMAL` | No |
| `status` | `STRING` | No |

Create the table, then open **SQL**. Run each statement separately with
**Run query**:

```sql
INSERT INTO shop.public.orders (customer_email, total, status)
VALUES ('buyer@example.com', 49.90, 'new');
```

```sql
SELECT customer_email, total, status
FROM shop.public.orders
ORDER BY customer_email
LIMIT 10;
```

The result should contain `buyer@example.com`, `49.90`, and `new`. Use the
top-bar database selector to return to `shop` if you switch databases. To
add or alter columns beyond what the form supports, use a SQL client; schema
changes are not allowed through the console's general SQL editor.

## Give an application its own login

In **Manage**, open **Create user** and create `orders_app` with a unique,
generated password. Enable initial access, select the `shop` database,
choose **One table**, select `public.orders`, and choose **Editor**. Keep the
password in your application's secret configuration.

The table **Editor** preset allows `SELECT`, `INSERT`, `UPDATE`, and `DELETE`
on that table, along with the access needed to connect to its database. For
a read-only application, choose **Viewer** instead. These grants apply to
the selected table, not every future table. Use **Manage > Access** to review
or change them later; do not grant cluster administrator access to resolve an
application permission error.

User creation and its initial grant are separate operations. If the user is
created but the grant fails, check **Users** and retry the grant in
**Manage > Access** rather than creating a second user.

Sign out, then sign in as `orders_app` with **Database** set to `shop`. Run
the `SELECT` query above. It should return the sample order. Database names
alone are not a tenant-isolation guarantee; review grants and inherited roles
for sensitive workloads.

## Connect a SQL client

In the running Deeploy job's **Deployment** section, download the CA
certificate. Keep `r1db-ca.crt` on the machine running the client. Use the
job's **SQL endpoint**, not the browser console URL.

With PostgreSQL's [`psql` client](https://www.postgresql.org/docs/17/app-psql.html),
replace the host, port, and certificate path with your job's values:

```bash
psql -W "host=YOUR_SQL_HOST port=YOUR_SQL_PORT dbname=shop user=orders_app sslmode=verify-full sslrootcert=/absolute/path/r1db-ca.crt"
```

Enter the `orders_app` password when prompted. `-W` keeps it out of the
command line; `verify-full` checks both the CA and server hostname. Use the
assigned hostname, not a substituted IP address. If the service's
certificates are regenerated, download its current CA and update clients.
Do not disable verification to bypass a certificate error.

For advanced schema changes, migrations, or transactions, use a SQL client
rather than the console SQL editor. PostgreSQL-compatible drivers can
connect, but check SQL and extension compatibility for your application.
Handle retryable serialization errors (`SQLSTATE 40001`) with your driver's
transaction retry pattern. Keep backups outside the cluster before storing
important data.

## Sources

- [R1DB console implementation](https://github.com/Ratio1/r1db/blob/c057e55a1c42b7edecc1d4b23ce87b839a1d3a0c/engine/pkg/ui/distoss/assets/bundle.js)
- [R1DB console management API](https://github.com/Ratio1/r1db/blob/c057e55a1c42b7edecc1d4b23ce87b839a1d3a0c/engine/pkg/server/api_v2_r1db.go)
- [R1DB deployment bootstrap](https://github.com/Ratio1/r1db/blob/c057e55a1c42b7edecc1d4b23ce87b839a1d3a0c/entrypoint.sh)
- [PostgreSQL client TLS verification](https://www.postgresql.org/docs/17/libpq-ssl.html)
