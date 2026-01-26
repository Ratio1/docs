---
title: Using with SDKs
sidebar_position: 5
description: configure SDKs to target the sandbox instead of a live node
---

# Using with SDKs

The sandbox prints ready-to-copy environment exports. Most Ratio1 SDK clients can discover the sandbox automatically by reading:
- `EE_CHAINSTORE_API_URL`
- `EE_R1FS_API_URL`

## Start the sandbox and export env vars
```bash
r1-plugins-sandbox --cstore-addr :8787 --r1fs-addr :8788
export EE_CHAINSTORE_API_URL=http://127.0.0.1:8787
export EE_R1FS_API_URL=http://127.0.0.1:8788
```

## Go SDK
With the environment variables set, the Go SDK can initialise clients via:
- `cstore.NewFromEnv()`
- `r1fs.NewFromEnv()`

Then run the upstream examples (from the SDK repo):
```bash
go run ./examples/runtime_modes
go run ./examples/cstore
go run ./examples/r1fs
```

## TypeScript / JavaScript SDK (edge-sdk-ts)
Repository:
- `https://github.com/Ratio1/edge-sdk-ts`

Use the sandbox exactly like a live node by pointing the SDK at the same base URLs:
- CStore: `EE_CHAINSTORE_API_URL`
- R1FS: `EE_R1FS_API_URL`

### Node.js (recommended for local dev)
Export the variables in your shell before running your TS/JS program:
```bash
export EE_CHAINSTORE_API_URL=http://127.0.0.1:8787
export EE_R1FS_API_URL=http://127.0.0.1:8788
node ./dist/index.js
```

If your project uses `.env` files, load them (for example via `dotenv`) so `process.env.EE_CHAINSTORE_API_URL` and `process.env.EE_R1FS_API_URL` are available at runtime.

### Browser apps (Vite/Next/Webpack)
Browser bundles do not automatically inherit shell environment variables at runtime.
Prefer running your SDK usage on the server (Node.js) or inject the sandbox URLs via your framework’s public env mechanism, then pass them to the SDK’s configuration (use the SDK’s documented config keys if they differ from the `EE_*` variables).

## Other SDKs (Python, etc.)
If your SDK uses the same environment variables, it can point to the sandbox without code changes.
If it uses different configuration keys, map them to the printed sandbox URLs.

## Next steps
- Validate endpoints: [HTTP surface](./http-surface).
- Debug failures: [Troubleshooting](./troubleshooting).
- Back to [Sandbox](./).
