---
title: Create and Use Databases
sidebar_position: 3
description: Create an example shop database, store orders, and connect an application with limited permissions.
---

# Create and Use Databases

Your deployment already created `appdb` (or the name you entered). Use it for
your application, or create another database to organize a different workload.
This optional walkthrough creates `shop` for orders. A CRM could instead use
`crm` for contacts; a device application could use `telemetry` for readings.

Sign in to [the console](./dashboard) as your configured database user, such as
`app_user`, with **Database** set to `appdb` (or your chosen initial name).
For steps 1 and 2, run each SQL block
separately in **SQL**, using **Run query** each time. Steps 3 and 4 use a SQL client
because the console does not support creating users or changing passwords.

## 1. Create a database

```sql
CREATE DATABASE shop;
```

Verify it exists:

```sql
SHOW DATABASES;
```

You should see `shop`. If the name already exists, choose a different example
name or inspect the existing database; do not delete it to repeat the tutorial.
This creates a database in the existing cluster, not a new Deeploy job.

## 2. Add a table and a row

Create a schema named `app` to group your tables and manage access. Using a
schema owned by your user lets you grant access without needing `root`:

```sql
CREATE SCHEMA shop.app;
```

`shop.app.orders` names the database, schema, and table:

```sql
CREATE TABLE shop.app.orders (
  order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email STRING NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  status STRING NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp()
);
```

Insert one sample order:

```sql
INSERT INTO shop.app.orders (customer_email, total)
VALUES ('buyer@example.com', 49.90);
```

Read it back:

```sql
SELECT customer_email, total, status
FROM shop.app.orders
ORDER BY created_at DESC
LIMIT 10;
```

Expect a row containing `buyer@example.com`, `49.90`, and `new`. To see the
table in **Tables**, sign out and sign back in with **Database** set to `shop`.

To add another database for a separate workload, repeat the pattern with a new
name, for example `CREATE DATABASE support;`. Databases share cluster capacity
and users; adding one does not add nodes or storage.

## 3. Connect a SQL client

In the running job's **Deployment** section, click **Download CA certificate**.
Keep the downloaded `r1-meshdb-ca.crt` file on the machine running your SQL client.
Use the job's **SQL endpoint**, not its console URL.

With PostgreSQL's [`psql` client](https://www.postgresql.org/docs/17/app-psql.html)
installed, run this in a **terminal**. Replace the host, port, and certificate
path with your values (use a path without spaces for this example). Replace
`user=app_user` too if you chose a different database user:

```bash
psql -W "host=YOUR_SQL_HOST port=YOUR_SQL_PORT dbname=shop user=app_user sslmode=verify-full sslrootcert=/absolute/path/r1-meshdb-ca.crt"
```

Enter your configured database user's password when prompted. `-W` avoids
putting it in the command or a URL. `verify-full` checks the CA and server
hostname. Use the assigned hostname, not an IP substituted for it.

If certificates are regenerated, download the current CA and update your
clients. Do not bypass certificate errors by disabling verification.

## 4. Give your application its own login

The configured user can create databases and manage non-admin users. It is not
`root` or an `admin` member, but is still more powerful than most applications
need. Keep it for database setup and create a separate runtime login.

In the `psql` session opened as `app_user`, create a login:

```sql
CREATE USER orders_app;
```

Set a unique generated password using the `psql` prompt, rather than embedding
the secret in SQL text. Enter it twice when asked, and store it in your password
manager:

```text
\password orders_app
```

Allow it to connect to `shop`:

```sql
GRANT CONNECT ON DATABASE shop TO orders_app;
```

Allow access to the schema:

```sql
GRANT USAGE ON SCHEMA shop.app TO orders_app;
```

Grant only the table operations this example application needs:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE shop.app.orders TO orders_app;
```

For a read-only application, grant only `SELECT` instead. These grants cover
this existing table, not every future table. Repeat the appropriate grants
when adding tables; do not grant `admin` or database-management privileges just
to resolve an application permission error.

In the console, sign out, then sign in as `orders_app` with **Database** set to
`shop`, and run the SELECT query above. It should return the sample order.
Review grants and
inherited roles when designing access controls; separate database names alone
are not a tenant-isolation guarantee.

## Application connection settings

Use the SQL endpoint from the running job, not the console URL:

| Setting | Value |
|---|---|
| Host and port | The assigned SQL tunnel hostname and port shown by Deeploy. |
| Database | `shop` |
| User | `orders_app` |
| Password | The password created for this user, kept in your application's secret configuration. |
| TLS mode | `verify-full`, or the driver's equivalent CA and hostname verification. |
| CA certificate | The `r1-meshdb-ca.crt` downloaded from this job. |

To test these settings in `psql`, exit the operator session with `\q`, then
repeat the terminal command from step 3 with `user=orders_app`. Enter the new
user's password, not the operator password.

PostgreSQL-compatible drivers can connect, but check SQL and extension
compatibility for your application. For transactions, handle retryable
serialization errors (`SQLSTATE 40001`) using your driver's transaction retry
pattern. Keep backups outside this cluster before storing important data.

## Sources

- [MeshDB database/user bootstrap](https://github.com/Ratio1/r1-meshdb/blob/e638553f899bdc8578afcdc2c3c1e37e1e8163b8/entrypoint.sh)
- [SQL reference: CREATE DATABASE](https://www.cockroachlabs.com/docs/v23.1/create-database),
  [CREATE USER](https://www.cockroachlabs.com/docs/v23.1/create-user), and
  [GRANT](https://www.cockroachlabs.com/docs/v23.1/grant)
- [PostgreSQL client TLS verification](https://www.postgresql.org/docs/17/libpq-ssl.html)
