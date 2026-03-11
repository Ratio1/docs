---
title: Simple auth
sidebar_position: 5
description: using SDK simple auth with the JavaScript SDK for TypeScript and JavaScript
---

# Simple auth

`@ratio1/cstore-auth-ts` is a plug-and-play authentication layer built on top of Ratio1 CStore.
It is designed for developers who want username/password auth without managing a separate database.

It is built for TypeScript and JavaScript server-side runtimes.

It is a strong fit for:

- product teams building quickly on Ratio1;
- developers with low infrastructure experience;
- AI coding agents and LLM workflows that need a small, typed auth API.

## SDK init

```ts
import createRatio1EdgeNodeClient from "@ratio1/edge-node-client";
import { CStoreAuth } from "@ratio1/cstore-auth-ts";

// Core Ratio1 SDK (CStore + R1FS)
const ratio1 = createRatio1EdgeNodeClient();

// Simple Auth SDK (uses CStore under the hood)
const auth = new CStoreAuth();
await auth.simple.init();
```

## Environment configuration and Deeploy

Simple Auth requires:

- `EE_CSTORE_AUTH_HKEY`: CStore hash key that stores user records.
- `EE_CSTORE_AUTH_SECRET`: server-side pepper used in password hashing.
- `EE_CSTORE_BOOTSTRAP_ADMIN_PASS`: required only for first bootstrap (until an `admin` user exists).

:::tip Deeploy behavior
When deployed through Ratio1 Deeploy, container runtime injects `EE_CHAINSTORE_API_URL` and `EE_R1FS_API_URL` automatically.  
For Deeploy-managed container/worker runner deployments, auth values are also generated and injected automatically when missing.
:::

:::warning Local and custom deployments
Outside Deeploy-managed flows (for example local development or custom runtime setups), provide auth variables explicitly:
`EE_CSTORE_AUTH_HKEY`, `EE_CSTORE_AUTH_SECRET`, and `EE_CSTORE_BOOTSTRAP_ADMIN_PASS` (bootstrap only).
:::

## Next.js integration example

This pattern is suitable for Next.js App Router, API routes, and server actions.

### 1. Server-side auth singleton

```ts
// lib/auth.ts
import { CStoreAuth } from "@ratio1/cstore-auth-ts";

let authClient: CStoreAuth | null = null;
let initPromise: Promise<void> | null = null;

export function getAuthClient(): CStoreAuth {
	if (!authClient) {
		authClient = new CStoreAuth();
	}
	return authClient;
}

export async function ensureAuthInitialized(): Promise<void> {
	if (!initPromise) {
		initPromise = getAuthClient()
			.simple.init()
			.catch((err) => {
				initPromise = null;
				throw err;
			});
	}
	await initPromise;
}
```

### 2. Login API route

```ts
// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { InvalidCredentialsError } from "@ratio1/cstore-auth-ts";
import { ensureAuthInitialized, getAuthClient } from "@/lib/auth";

export async function POST(request: Request) {
	const { username, password } = await request.json();
	await ensureAuthInitialized();

	try {
		const user = await getAuthClient().simple.authenticate(
			username,
			password,
		);

		// Minimal example: write your own session cookie/JWT here.
		const response = NextResponse.json({
			success: true,
			user: {
				username: user.username,
				role: user.role,
				metadata: user.metadata,
			},
		});
		return response;
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return NextResponse.json(
				{ success: false, error: "Invalid credentials" },
				{ status: 401 },
			);
		}
		return NextResponse.json(
			{ success: false, error: "Auth service failure" },
			{ status: 500 },
		);
	}
}
```

### 3. Optional user creation route (admin flow)

```ts
// app/api/users/route.ts
import { NextResponse } from "next/server";
import { ensureAuthInitialized, getAuthClient } from "@/lib/auth";

export async function POST(request: Request) {
	const { username, password, role, metadata } = await request.json();
	await ensureAuthInitialized();

	const user = await getAuthClient().simple.createUser(username, password, {
		role, // 'admin' | 'user'
		metadata, // JSON-serializable object
	});

	return NextResponse.json({ success: true, user }, { status: 201 });
}
```

:::note
`@ratio1/cstore-auth-ts` handles credentials and user records.  
Session issuance (cookies/JWT), CSRF, rate limiting, and account lockout remain your application responsibility.
:::

## Simple Auth method summary

| Method                                         | Returns                              | Typical use                                              |
| ---------------------------------------------- | ------------------------------------ | -------------------------------------------------------- |
| [`simple.init()`](#simpleinit)                 | `Promise<void>`                      | Initialize config and bootstrap `admin` user if missing. |
| [`simple.createUser()`](#simplecreateuser)     | `Promise<PublicUser<TMeta>>`         | Create a new user record in CStore.                      |
| [`simple.authenticate()`](#simpleauthenticate) | `Promise<PublicUser<TMeta>>`         | Validate username/password and get public user data.     |
| [`simple.getUser()`](#simplegetuser)           | `Promise<PublicUser<TMeta> \| null>` | Read user profile without password verification.         |

## Method details

### `simple.init()`

Signature:

```ts
init(): Promise<void>
```

What it does:

- resolves auth config from constructor overrides or env (`EE_CSTORE_AUTH_HKEY`, `EE_CSTORE_AUTH_SECRET`);
- checks whether `admin` exists in the auth hash;
- if missing, bootstraps `admin` with `EE_CSTORE_BOOTSTRAP_ADMIN_PASS`.

When to use:

- once at startup in server runtime (API server, Next.js route handlers, worker boot).

Throws (common):

- `EnvVarMissingError` if required env values are missing;
- `AuthInitError` if called before internal config is ready.

---

### `simple.createUser()`

Signature:

```ts
createUser<TMeta = Record<string, unknown>>(
  username: string,
  password: string,
  options?: {
    role?: 'admin' | 'user';
    metadata?: TMeta;
  }
): Promise<PublicUser<TMeta>>
```

What it does:

- canonicalizes username to lowercase;
- validates username format and length;
- hashes password (Argon2id when available, secure scrypt fallback otherwise);
- stores user record in CStore hash;
- returns a public user object (no password hash).

When to use:

- signup/admin provisioning flows.

Returns:

- `PublicUser<TMeta>`:

```ts
type PublicUser<TMeta> = {
	username: string;
	role: "admin" | "user";
	metadata: TMeta;
	createdAt: string;
	updatedAt: string;
	type: "simple";
};
```

Throws (common):

- `UserExistsError` if username already exists (after canonicalization);
- `InvalidUsernameError`, `InvalidPasswordError`, `InvalidUserRoleError`;
- `UserSerializationError` for invalid/non-serializable record payloads.

---

### `simple.authenticate()`

Signature:

```ts
authenticate<TMeta = Record<string, unknown>>(
  username: string,
  password: string
): Promise<PublicUser<TMeta>>
```

What it does:

- canonicalizes username;
- reads user record from CStore;
- verifies password hash with configured pepper;
- returns public user profile if valid.

When to use:

- login route handlers and credential verification in backend services.

Throws (common):

- `InvalidCredentialsError` for wrong username/password;
- `InvalidUsernameError` for malformed usernames.

Security behavior:

- invalid credentials are intentionally normalized to the same error path, reducing credential probing detail.

---

### `simple.getUser()`

Signature:

```ts
getUser<TMeta = Record<string, unknown>>(
  username: string
): Promise<PublicUser<TMeta> | null>
```

What it does:

- canonicalizes username;
- fetches user record from CStore;
- returns public user object or `null` if the user does not exist.

When to use:

- admin/user introspection routes;
- pre-checks before create/update flows.

Throws (common):

- `InvalidUsernameError`;
- `UserSerializationError` if stored data is malformed.

## Good to know

- Usernames are trimmed + lowercased and must match `[a-z0-9._-]{3,64}`.
- `createUser('Alice', ...)` and `createUser('alice', ...)` target the same account.
- Metadata should be JSON-serializable.
- Bootstrap admin password is needed only until the first `admin` record is created.
- Simple Auth does not create sessions by itself; combine it with your app's cookie/JWT strategy.

## Next steps

- Back to [JavaScript](../)
