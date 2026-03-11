---
title: Quick end-to-end example
sidebar_position: 1
description: a complete example of using the JavaScript SDK for TypeScript and JavaScript
---

# Quick end-to-end example

This walkthrough shows a full flow with:

- `@ratio1/edge-sdk-ts` for `cstore` + `r1fs`
- `@ratio1/cstore-auth-ts` for simple username/password auth
- upload file to R1FS
- save returned CID in a CStore hash key
- read CID back from CStore
- download the file again from R1FS using that CID

The goal is to give you a single script you can run and adapt in real apps.

## Install

```bash
npm install @ratio1/edge-sdk-ts @ratio1/cstore-auth-ts
# or
pnpm add @ratio1/edge-sdk-ts @ratio1/cstore-auth-ts
# or
yarn add @ratio1/edge-sdk-ts @ratio1/cstore-auth-ts
```

## Environment setup

```bash
# CStore / R1FS endpoints (local development example)
export EE_CHAINSTORE_API_URL=http://localhost:31234
export EE_R1FS_API_URL=http://localhost:31235

# Simple auth configuration
export EE_CSTORE_AUTH_HKEY=auth:quickstart
export EE_CSTORE_AUTH_SECRET=replace-with-a-long-random-secret

# Needed only until the first admin is bootstrapped
export EE_CSTORE_BOOTSTRAP_ADMIN_PASS=change-me-admin-password
```

:::note
On deployed Ratio1 node containers, `EE_CHAINSTORE_API_URL` and `EE_R1FS_API_URL` are injected automatically.  
So in production, `createEdgeSdk()` usually works without manual endpoint config.
:::

:::warning
`EE_CSTORE_BOOTSTRAP_ADMIN_PASS` is required only when no `admin` user exists yet in the auth hash.  
After admin bootstrap, you can remove it.
:::

## Complete script (TypeScript, Node.js)

```ts
import { Buffer } from "node:buffer";
import createEdgeSdk from "@ratio1/edge-sdk-ts";
import {
	CStoreAuth,
	UserExistsError,
	createDefaultCStoreClient,
} from "@ratio1/cstore-auth-ts";

type StoredUploadRef = {
	cid: string;
	filename: string;
	uploadedBy: string;
	uploadedAt: string;
};

const ratio1 = createEdgeSdk({
	verbose: true,
});

const auth = new CStoreAuth({
	// Endpoint + auth config are automatically resolved from env vars.
	client: createDefaultCStoreClient(),
});

async function main(): Promise<void> {
	// 1) Initialize auth and ensure at least one user exists
	await auth.simple.init();

	try {
		await auth.simple.createUser("alice", "S3curePassw0rd!", {
			metadata: { email: "alice@example.com" },
		});
	} catch (error) {
		if (!(error instanceof UserExistsError)) {
			throw error;
		}
	}

	const user = await auth.simple.authenticate("alice", "S3curePassw0rd!");
	console.log("Authenticated user:", user.username);

	// 2) Upload a file to R1FS (base64 payload in this example)
	const upload = await ratio1.r1fs.addFileBase64({
		file_base64_str: Buffer.from(
			"Hello from Ratio1 JavaScript SDK.\n",
		).toString("base64"),
		filename: "hello-ratio1.txt",
	});

	const uploadRef: StoredUploadRef = {
		cid: upload.cid,
		filename: "hello-ratio1.txt",
		uploadedBy: user.username,
		uploadedAt: new Date().toISOString(),
	};

	// 3) Store CID in CStore hash (hkey -> field -> value)
	const uploadsHKey = "docs:quickstart:uploads";
	await ratio1.cstore.hset({
		hkey: uploadsHKey,
		key: user.username,
		value: JSON.stringify(uploadRef),
	});

	// 4) Read CID back from CStore
	const rawRef = await ratio1.cstore.hget<string>({
		hkey: uploadsHKey,
		key: user.username,
	});

	if (!rawRef) {
		throw new Error("No upload reference found in CStore.");
	}

	const parsedRef = JSON.parse(rawRef) as StoredUploadRef;
	console.log("CID loaded from CStore:", parsedRef.cid);

	// 5) Download from R1FS using the CID loaded from CStore
	const downloaded = await ratio1.r1fs.getFileBase64({ cid: parsedRef.cid });
	if (!downloaded.file_base64_str) {
		throw new Error("Downloaded file payload is empty.");
	}
	const fileText = Buffer.from(downloaded.file_base64_str, "base64").toString(
		"utf8",
	);

	console.log(
		"Downloaded filename:",
		downloaded.filename ?? parsedRef.filename,
	);
	console.log("Downloaded content preview:", fileText.trim());
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
```

## What this example proves

1. Auth works without a separate SQL/NoSQL database, using CStore hashes.
2. R1FS upload returns a CID you can persist as an application reference.
3. CStore is a good place for lightweight structured metadata (like CID pointers).
4. You can restore files from R1FS at any time using CIDs stored in CStore.

## Next steps

- See [CStore Integration](./cstore-integration) for endpoint-level details.
- See [R1FS Integration](./r1fs-integration) for upload/download patterns.
- See [Simple auth](./simple-auth) for auth flows in app APIs.
- Back to [JavaScript](../).
