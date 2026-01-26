---
title: Troubleshooting
sidebar_position: 6
description: common issues and how to debug the sandbox
---

# Troubleshooting

## The SDK can’t connect
- Confirm the sandbox is running and listening on the expected ports.
- Confirm you exported:
  - `EE_CHAINSTORE_API_URL`
  - `EE_R1FS_API_URL`
- If you changed ports/hosts, re-export the variables (or restart your shell session).

## “not found” vs errors
Depending on the SDK, missing keys/files may be represented as:
- `null` responses from the API, decoded as `nil` items/documents
- explicit not-found errors (SDK-specific)

Treat transport errors (connection refused, timeouts, HTTP 5xx) differently from “missing data”.

## Simulate timeouts and retries
Use latency injection:
```bash
r1-plugins-sandbox --latency 300ms
```

Use failure injection:
```bash
r1-plugins-sandbox --fail rate=0.1,code=503
```

## Seed parsing errors
- Validate the JSON is well-formed.
- For R1FS seeds, ensure `base64` is valid base64 and `path` is a non-empty string.

## Next steps
- Add fixtures: [Seeding data](./seeding).
- Back to [Sandbox](./).
