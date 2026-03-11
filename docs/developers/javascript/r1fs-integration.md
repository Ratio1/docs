---
title: R1FS Integration
sidebar_position: 4
description: using R1FS with the JavaScript SDK for TypeScript and JavaScript
---

# R1FS Integration

R1FS is the Ratio1 file/object storage layer exposed by the Edge Node manager API. In the JavaScript SDK for TypeScript and JavaScript, all R1FS operations are available under `ratio1.r1fs`.

## Install the SDK

```bash
npm install @ratio1/edge-sdk-ts
# or
pnpm add @ratio1/edge-sdk-ts
# or
yarn add @ratio1/edge-sdk-ts
```

## Initialize the SDK

### Node.js

```ts
import createEdgeSdk from "@ratio1/edge-sdk-ts";

const ratio1 = createEdgeSdk({
	r1fsUrl: process.env.R1FS_API_URL ?? process.env.EE_R1FS_API_URL,
	cstoreUrl: process.env.CSTORE_API_URL ?? process.env.EE_CHAINSTORE_API_URL,
	verbose: false,
});
```

:::note
If `r1fsUrl` is not provided, the SDK tries `R1FS_API_URL`, then `EE_R1FS_API_URL`, then defaults to `localhost:31235`. If you omit `http://` or `https://`, the SDK adds `http://` automatically.
:::

## Find all R1FS endpoints in the SDK

```ts
// All R1FS operations are exposed under ratio1.r1fs
const r1fs = ratio1.r1fs;

// Example call
const status = await r1fs.getStatus();
console.log(status);
```

`ratio1.r1fs` includes these methods:

- `getStatus`, `getStatusFull`
- `addFile`, `addFileFull`
- `addFileBase64`, `addFileBase64Full`
- `getFile`, `getFileFull`
- `getFileBase64`, `getFileBase64Full`
- `addYaml`, `addYamlFull`
- `getYaml`, `getYamlFull`
- `addJson`, `addJsonFull`
- `calculateJsonCid`, `calculateJsonCidFull`
- `addPickle`, `addPickleFull`
- `calculatePickleCid`, `calculatePickleCidFull`
- `deleteFile`, `deleteFileFull`
- `deleteFiles`, `deleteFilesFull`

## Response pattern: regular vs `Full`

For each endpoint pair:

- Regular method (for example `addJson`) returns only `result`.
- `Full` method (for example `addJsonFull`) returns the full envelope with node metadata.

`Full` responses implement this base shape:

```ts
interface R1FSBaseResponse<T> {
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

## R1FS endpoint summary

| Endpoint                                      | SDK methods                                     | HTTP route                   | Regular return type                            |
| --------------------------------------------- | ----------------------------------------------- | ---------------------------- | ---------------------------------------------- |
| [Status](#status)                             | `getStatus` / `getStatusFull`                   | `GET /get_status`            | `R1FSStatusResult`                             |
| [Upload file (multipart)](#add-file)          | `addFile` / `addFileFull`                       | `POST /add_file`             | `R1FSUploadResult`                             |
| [Upload file (base64)](#add-file-base64)      | `addFileBase64` / `addFileBase64Full`           | `POST /add_file_base64`      | `R1FSUploadResult`                             |
| [Download file](#get-file)                    | `getFile` / `getFileFull`                       | `GET /get_file`              | `R1FSDownloadResult` (or `Response`, see note) |
| [Download file as base64](#get-file-base64)   | `getFileBase64` / `getFileBase64Full`           | `POST /get_file_base64`      | `R1FSDownloadResult`                           |
| [Store YAML](#add-yaml)                       | `addYaml` / `addYamlFull`                       | `POST /add_yaml`             | `R1FSCidResult`                                |
| [Read YAML](#get-yaml)                        | `getYaml` / `getYamlFull`                       | `GET /get_yaml`              | `R1FSYamlDataResult`                           |
| [Store JSON](#add-json)                       | `addJson` / `addJsonFull`                       | `POST /add_json`             | `R1FSCidResult`                                |
| [Calculate JSON CID](#calculate-json-cid)     | `calculateJsonCid` / `calculateJsonCidFull`     | `POST /calculate_json_cid`   | `R1FSCidResult`                                |
| [Store pickle](#add-pickle)                   | `addPickle` / `addPickleFull`                   | `POST /add_pickle`           | `R1FSCidResult`                                |
| [Calculate pickle CID](#calculate-pickle-cid) | `calculatePickleCid` / `calculatePickleCidFull` | `POST /calculate_pickle_cid` | `R1FSCidResult`                                |
| [Delete one CID](#delete-file)                | `deleteFile` / `deleteFileFull`                 | `POST /delete_file`          | `DeleteFileResult`                             |
| [Delete many CIDs](#delete-files)             | `deleteFiles` / `deleteFilesFull`               | `POST /delete_files`         | `DeleteFilesResult`                            |

## Endpoint details

### Status (`/get_status`) {#status}

- SDK methods: `getStatus()`, `getStatusFull()`
- Request type: no payload
- Regular return type: `R1FSStatusResult` (`Record<string, any>` with optional `EE_ID`)
- Use when: service health checks, node identity checks

### Upload file (`/add_file`) {#add-file}

- SDK methods: `addFile(data)`, `addFileFull(data)`
- Request type: `UploadFileRequest`
- Required: at least one of `file` or `formData`
- Optional fields:
    - `fieldName` (default: `file`)
    - `filename`
    - `secret`
    - `nonce`
    - `metadata: { filename?, secret?, nonce? }`
    - `contentType`
- Regular return type: `R1FSUploadResult` (`{ message: string; cid: string }`)
- Use when: uploading file streams, Node `Buffer`, or Node.js readable streams

```ts
const upload = await ratio1.r1fs.addFile({
	file: readableStream,
	filename: "report.csv",
	contentType: "text/csv",
	secret: "optional-secret",
	nonce: 7,
});

console.log(upload.cid);
```

### Upload file as base64 (`/add_file_base64`) {#add-file-base64}

- SDK methods: `addFileBase64(data)`, `addFileBase64Full(data)`
- Request type: `UploadBase64Request`
- Required: `file_base64_str`
- Optional: `filename`, `secret`, `nonce`
- Regular return type: `R1FSUploadResult`
- Use when: JSON-only transports without multipart

### Download file (`/get_file`) {#get-file}

- SDK methods: `getFile(data)`, `getFileFull(data)`
- Request type: `DownloadFileRequest` (`{ cid: string; secret?: string }`)
- Required: `cid`
- Regular return type: `R1FSDownloadResult`
- Use when: downloading file content or resolving stored file metadata

`R1FSDownloadResult` can include:

- `file_path?`
- `file_base64_str?`
- `filename?`
- `meta?: { file: string; filename: string }`
- `file_data?`

:::warning
`getFile()` can return two runtime shapes:

- JSON response: you get metadata fields like `file_path`, `meta`, `filename`.
- Binary response: you get a native `Response` object (from `fetch`) instead of parsed JSON fields.

Handle both cases explicitly:

```ts
const fileResult = await ratio1.r1fs.getFile({ cid, secret });

if (fileResult && typeof (fileResult as any).arrayBuffer === "function") {
	// Binary response path
	const bytes = Buffer.from(await (fileResult as Response).arrayBuffer());
	// Save bytes to disk, return them from your API, etc.
} else {
	// JSON response path
	console.log(fileResult.file_path, fileResult.meta?.filename);
}
```

:::

### Download file as base64 (`/get_file_base64`) {#get-file-base64}

- SDK methods: `getFileBase64(data)`, `getFileBase64Full(data)`
- Request type: `DownloadFileRequest`
- Required: `cid`
- Optional: `secret`
- Regular return type: `R1FSDownloadResult` (typically `file_base64_str` and `filename`)
- Use when: APIs that must return JSON-safe file payloads

### Store YAML (`/add_yaml`) {#add-yaml}

- SDK methods: `addYaml(data)`, `addYamlFull(data)`
- Request type: `StoreYamlRequest`
- Required: `data: Record<string, any>`
- Optional: `fn`, `secret`, `nonce`
- Regular return type: `R1FSCidResult` (`{ cid: string }`)
- Use when: storing structured, human-readable configs/documents

### Read YAML (`/get_yaml`) {#get-yaml}

- SDK methods: `getYaml(data)`, `getYamlFull(data)`
- Request type: `RetrieveYamlRequest` (`{ cid: string; secret?: string }`)
- Required: `cid`
- Regular return type: `R1FSYamlDataResult` (`{ file_data: Record<string, any> }`)
- Use when: restoring YAML back into a JavaScript object

### Store JSON (`/add_json`) {#add-json}

- SDK methods: `addJson(data)`, `addJsonFull(data)`
- Request type: `StoreJsonRequest`
- Required: `data: Record<string, any>`
- Optional: `fn`, `secret`, `nonce`
- Regular return type: `R1FSCidResult`
- Use when: storing structured application payloads

### Calculate JSON CID without storing (`/calculate_json_cid`) {#calculate-json-cid}

- SDK methods: `calculateJsonCid(data)`, `calculateJsonCidFull(data)`
- Request type: `CalculateCidRequest`
- Required: `data`, `nonce`
- Optional: `fn`, `secret`
- Regular return type: `R1FSCidResult`
- Use when: pre-computing deterministic references before upload

:::tip
Use the same `data`, `nonce`, `fn`, and `secret` values in both `calculateJsonCid` and `addJson` when you want CID predictability.
:::

### Store pickle (`/add_pickle`) {#add-pickle}

- SDK methods: `addPickle(data)`, `addPickleFull(data)`
- Request type: `StorePickleRequest`
- Required: `data: any`
- Optional: `fn`, `secret`, `nonce`
- Regular return type: `R1FSCidResult`
- Use when: interoperating with Python pickle-based workflows

### Calculate pickle CID without storing (`/calculate_pickle_cid`) {#calculate-pickle-cid}

- SDK methods: `calculatePickleCid(data)`, `calculatePickleCidFull(data)`
- Request type: `CalculatePickleCidRequest`
- Required: `data`, `nonce`
- Optional: `fn`, `secret`
- Regular return type: `R1FSCidResult`
- Use when: checking deterministic pickle CIDs before persistence

### Delete one CID (`/delete_file`) {#delete-file}

- SDK methods: `deleteFile(data)`, `deleteFileFull(data)`
- Request type: `DeleteFileRequest`
- Required: `cid`
- Optional: `unpin_remote`, `run_gc`, `cleanup_local_files`
- Regular return type: `DeleteFileResult`
    - `success: boolean`
    - `message: string`
    - `cid: string`
- Use when: removing one object and optionally triggering cleanup

:::tip
Do not enable `run_gc` in client code. Garbage collection is handled automatically by the system.
:::

### Delete many CIDs (`/delete_files`) {#delete-files}

- SDK methods: `deleteFiles(data)`, `deleteFilesFull(data)`
- Request type: `DeleteFilesRequest`
- Required: `cids: string[]` (non-empty)
- Optional: `unpin_remote`, `run_gc_after_all`, `cleanup_local_files`
- Regular return type: `DeleteFilesResult`
    - `success: string[]`
    - `failed: string[]`
    - `total: number`
    - `success_count: number`
    - `failed_count: number`
- Use when: batch cleanup (more efficient than many single deletes)

:::tip
Do not enable `run_gc_after_all` in client code. Garbage collection is handled automatically by the system.
:::

## Good to know

- The SDK does client-side validation and throws early for missing required fields (for example: missing `cid`, empty `cids`, missing `data`, missing `nonce` for CID calculations).
- `addFile` supports server-side upload sources such as `Buffer` and Node.js readable streams.
- If you pass both explicit fields and `metadata` to `addFile`, `metadata` has priority.
- Even if delete APIs expose GC flags (`run_gc`, `run_gc_after_all`), you do not need to call GC manually; it is system-managed.
- Prefer `*Full` methods only when you need node/network metadata (`ee_node_address`, `evm_network`, etc.) for logging, tracing, or audit pipelines.

## Next steps

- Back to [JavaScript](../)
