---
title: Seeding data
sidebar_position: 3
description: start the sandbox with a predictable dataset for repeatable tests
---

# Seeding data

Seed files let you start the sandbox with predictable initial state, which is useful for:
- reproducible integration tests
- demos and tutorials
- validating migrations and edge cases

Pass seeds at startup:
```bash
r1-plugins-sandbox --kv-seed ./seeds/cstore.json --fs-seed ./seeds/r1fs.json
```

## CStore seed format
`--kv-seed` expects a JSON array of entries with `key` and JSON `value`:
```json
[
  {
    "key": "jobs:123",
    "value": { "status": "queued" }
  }
]
```

## R1FS seed format
`--fs-seed` expects a JSON array of entries with:
- `path` (string)
- `base64` (string, base64-encoded file content)
- optional `content_type` (string)
- optional `metadata` (object)
- optional `last_modified` (RFC3339 string)

Example:
```json
[
  {
    "path": "/artifacts/report.json",
    "base64": "eyJvayI6IHRydWV9",
    "content_type": "application/json",
    "metadata": { "workflow": "ci" }
  }
]
```

## Tips
- Keep seed files small and focused; use separate fixtures per test suite.
- For binary payloads, base64-encode the raw bytes.

## Next steps
- Start the server: [Running the sandbox](./running).
- Back to [Sandbox](./).
