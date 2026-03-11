---
title: JavaScript
sidebar_position: 2
description: using the JavaScript SDK for TypeScript and JavaScript on Ratio1
---

# JavaScript

The Ratio1 JavaScript SDK is designed for TypeScript and JavaScript applications, making core Ratio1 capabilities easy to consume from Node.js services and server runtimes.

The main package is `@ratio1/edge-sdk-ts`, which exposes:

- `cstore` for distributed key-value and hash operations.
- `r1fs` for distributed file and structured data storage/retrieval.

For plug-and-play username/password authentication without a separate database,
you can add the companion package `@ratio1/cstore-auth-ts`, which stores user
records in CStore hashes.

## Install the SDK

```bash
npm install @ratio1/edge-sdk-ts
# or
pnpm add @ratio1/edge-sdk-ts
# or
yarn add @ratio1/edge-sdk-ts
```

Optional companion package for simple auth:

```bash
npm install @ratio1/cstore-auth-ts
# or
pnpm add @ratio1/cstore-auth-ts
# or
yarn add @ratio1/cstore-auth-ts
```

## Where to use it

Use the SDK in server-side JavaScript/TypeScript components deployed on
Ratio1, including:

- Node.js APIs and backend services
- Next.js App Router handlers (`app/api/.../route.ts`)
- Next.js Pages Router APIs (`pages/api/...`)
- Worker/cron-style background processes

For browser-side integration, use `createEdgeSdkBrowserClient` from
`@ratio1/edge-sdk-ts/browser`.

## Zero-config endpoint discovery

`createEdgeSdk()` resolves endpoints in this order:

1. Explicit constructor options (`cstoreUrl`, `r1fsUrl`).
2. Environment variables:
    - `CSTORE_API_URL` or `EE_CHAINSTORE_API_URL`
    - `R1FS_API_URL` or `EE_R1FS_API_URL`
3. Fallback defaults: `localhost:31234` (CStore) and `localhost:31235` (R1FS).

When your app runs on a Ratio1 Edge Node, the container runtime injects these
environment variables automatically. This makes SDK calls target local node
APIs, minimizing network hops and latency.

:::note
In most Ratio1 deployments, `const ratio1 = createEdgeSdk()` is enough.
:::

:::warning
If you run outside a Ratio1 deployment, set URLs manually via env vars or SDK
options before calling CStore or R1FS methods.
:::

## Minimal server-side example

```ts
import createEdgeSdk from "@ratio1/edge-sdk-ts";

const ratio1 = createEdgeSdk();

await ratio1.cstore.hset({
	hkey: "users",
	key: "alice",
	value: JSON.stringify({ role: "admin" }),
});

const user = await ratio1.cstore.hget({ hkey: "users", key: "alice" });

const upload = await ratio1.r1fs.addFileBase64({
	file_base64_str: Buffer.from("hello from ratio1").toString("base64"),
	filename: "hello.txt",
});

console.log({ user, cid: upload.cid });
// Expected shape: { user: '{"role":"admin"}', cid: 'Qm...' }
```

## Simple auth without a database

`@ratio1/cstore-auth-ts` provides a ready-to-use auth layer over CStore hashes.
It supports admin bootstrap and username/password flows with secure hashing.

Typical environment variables:

- `EE_CSTORE_AUTH_HKEY`
- `EE_CSTORE_AUTH_SECRET`
- `EE_CSTORE_BOOTSTRAP_ADMIN_PASS`

## Local development and sandbox

Developer experience matters: before deploying, you can simulate and iterate
locally with the Ratio1 Sandbox workflows.

Read more in [The Sandbox](../the-sandbox).

## Read more on each SDK component

import DocCardList from '@theme/DocCardList';

<DocCardList />
