---
title: CStore Integration
sidebar_position: 3
description: using CStore with the JavaScript SDK for TypeScript and JavaScript
---

# CStore Integration

CStore is the key-value coordination layer exposed by the Ratio1 Edge Node API.
In the JavaScript SDK for TypeScript and JavaScript, all CStore operations are available under `ratio1.cstore`.

## Install the SDK

```bash
npm install @ratio1/edge-sdk-ts
# or
pnpm add @ratio1/edge-sdk-ts
# or
yarn add @ratio1/edge-sdk-ts
```

## Initialize the SDK

```ts
import createEdgeSdk from "@ratio1/edge-sdk-ts";

const ratio1 = createEdgeSdk({
	cstoreUrl: process.env.CSTORE_API_URL, // optional
	r1fsUrl: process.env.R1FS_API_URL, // optional
	chainstorePeers: ["0xPeerAddress1", "0xPeerAddress2"], // optional
	verbose: false, // optional
});
```

By default, the SDK resolves:

- `cstoreUrl` from `CSTORE_API_URL`, then `EE_CHAINSTORE_API_URL`, then `localhost:31234`
- `r1fsUrl` from `R1FS_API_URL`, then `EE_R1FS_API_URL`, then `localhost:31235`
- `chainstorePeers` from `EE_CHAINSTORE_PEERS` (JSON array string) or `[]`

If a URL has no protocol, the SDK prepends `http://`.

:::note
In Ratio1 containerized deployments, the `EE_*` variables are typically injected for you.
:::

## Use CStore from the SDK

After SDK initialization, use `ratio1.cstore` directly.

```ts
const cstore = ratio1.cstore;

await cstore.setValue({
	key: "app:counter",
	value: 1,
});

const counter = await cstore.getValue<number>({ key: "app:counter" });
console.log(counter);
```

## Response pattern: regular vs `Full`

For each operation, the SDK exposes:

- a regular method (for example `setValue`) that returns only `result`
- a `Full` method (for example `setValueFull`) that returns the full envelope with node/network metadata

`Full` responses follow this base shape:

```ts
interface CStoreBaseResponse<T> {
	result: T;
	server_node_addr: string;
	evm_network: string;
	ee_node_alias: string;
	ee_node_address: string;
	ee_node_eth_address: string;
	ee_node_network: string;
	ee_node_ver: string;
}
```

## CStore endpoint summary

| Method                      | HTTP route                   | What it does                            | Returns                       | Use when                                   |
| --------------------------- | ---------------------------- | --------------------------------------- | ----------------------------- | ------------------------------------------ |
| [`getStatus`](#get-status)  | `GET /get_status`            | Reads CStore service status             | `Promise<CStoreStatusResult>` | Service checks and debugging               |
| [`setValue`](#set-value)    | `POST /set`                  | Writes one top-level key-value pair     | `Promise<boolean>`            | Store small shared state by key            |
| [`getValue<T>`](#get-value) | `GET /get?key=...`           | Reads one top-level key                 | `Promise<T>`                  | Retrieve state saved with `setValue`       |
| [`hset`](#hset)             | `POST /hset`                 | Writes one field inside a hash (`hkey`) | `Promise<boolean>`            | Group related values under one logical key |
| [`hget<T>`](#hget)          | `GET /hget?hkey=...&key=...` | Reads one field from a hash             | `Promise<T>`                  | Retrieve one value from grouped hash data  |
| [`hgetall<T>`](#hgetall)    | `GET /hgetall?hkey=...`      | Reads all fields from a hash            | `Promise<Record<string, T>>`  | Load full grouped state in one call        |

:::note
Each method above has a `Full` variant (`getStatusFull`, `setValueFull`, `getValueFull`, `hsetFull`, `hgetFull`, `hgetallFull`) when you also need node/network metadata in the response.
:::

## Endpoint details

### Status (`getStatus`) {#get-status}

- SDK methods: `getStatus()`, `getStatusFull()`
- HTTP route: `GET /get_status`
- Parameters: none
- Regular return type: `CStoreStatusResult` (status payload returned by the CStore manager)
- Use when: checking if the CStore service is reachable and responding

```ts
const status = await ratio1.cstore.getStatus();
console.log(status);
```

### Set value (`setValue`) {#set-value}

- SDK methods: `setValue(data)`, `setValueFull(data)`
- HTTP route: `POST /set`
- Request type: `SetValueRequest`
- Required fields:
    - `key: string`
    - `value: ChainStoreValue`
- Optional fields: none at call level
- Regular return type: `boolean`
- Use when: storing small shared state under a single key

`ChainStoreValue` supports JSON-like values:

```ts
type ChainStoreValue = string | number | boolean | object | any[];
```

```ts
await ratio1.cstore.setValue({
	key: "app:counter",
	value: 42,
});
```

### Get value (`getValue<T>`) {#get-value}

- SDK methods: `getValue<T>(data)`, `getValueFull<T>(data)`
- HTTP route: `GET /get?key=...`
- Request type: `GetValueRequest`
- Required fields:
    - `key: string`
- Optional fields: generic type parameter `T` (defaults to `unknown`)
- Regular return type: `T`
- Use when: reading one top-level value by key

```ts
const counter = await ratio1.cstore.getValue<number>({ key: "app:counter" });
```

### Set hash field (`hset`) {#hset}

- SDK methods: `hset(data)`, `hsetFull(data)`
- HTTP route: `POST /hset`
- Request type: `HSetRequest`
- Required fields:
    - `hkey: string`
    - `key: string`
    - `value: ChainStoreValue`
- Optional fields: none at call level
- Regular return type: `boolean`
- Use when: saving structured state as grouped fields (for example, `user:123` hash with multiple keys)

```ts
await ratio1.cstore.hset({
	hkey: "user:123",
	key: "role",
	value: "admin",
});
```

### Get hash field (`hget<T>`) {#hget}

- SDK methods: `hget<T>(data)`, `hgetFull<T>(data)`
- HTTP route: `GET /hget?hkey=...&key=...`
- Request type: `HGetRequest`
- Required fields:
    - `hkey: string`
    - `key: string`
- Optional fields: generic type parameter `T` (defaults to `unknown`)
- Regular return type: `T`
- Use when: reading one field from grouped hash data

```ts
const role = await ratio1.cstore.hget<string>({
	hkey: "user:123",
	key: "role",
});
```

### Get all hash fields (`hgetall<T>`) {#hgetall}

- SDK methods: `hgetall<T>(data)`, `hgetallFull<T>(data)`
- HTTP route: `GET /hgetall?hkey=...`
- Request type: `HGetAllRequest`
- Required fields:
    - `hkey: string`
- Optional fields: generic type parameter `T` (defaults to `unknown`)
- Regular return type: `Record<string, T>`
- Use when: loading all fields for one hash in a single call

```ts
const profile = await ratio1.cstore.hgetall<string>({ hkey: "user:123" });
```

## Good To Know

- The SDK validates required fields before HTTP calls and throws early for invalid input (`key === ""`, `hkey === ""`, `value === undefined`).
- Lean methods (`getValue`, `hget`, etc.) return only the `result` payload.
- `*Full` methods return the full envelope (`result` + node/network metadata).
- `chainstorePeers` are configured once in SDK initialization (or `EE_CHAINSTORE_PEERS`) and are automatically included in write operations (`setValue`, `hset`).
- Non-2xx responses throw `Error("Request failed with status <code>")`.
- Values should be JSON-serializable to stay compatible with chainstore normalization on the node side.

## Next steps

- Back to [JavaScript](../)
