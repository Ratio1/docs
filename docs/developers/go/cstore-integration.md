---
title: CStore Integration
sidebar_position: 3
description: using CStore with the Go SDK
---

# CStore Integration

## What CStore is
CStore is the Ratio1 edge-node key/value store exposed via a REST manager API.
The Go SDK provides a small HTTP client with helpers for:
- key/value reads and writes
- hash operations (field maps under a single key)

## Configure
Set the base URL for the node (or sandbox) you want to talk to:
- `EE_CHAINSTORE_API_URL`

Example:
```bash
export EE_CHAINSTORE_API_URL="http://<node-host>:<port>/"
```

## Concepts
- **Key/value**: store one JSON document per key.
- **Hash**: store many JSON documents under a single “hash key”, addressed by **field**.
- **Missing data**: `Get` / `HGet` return `(nil, nil)` when the upstream returns `null` (treat as “not found”).

## Patterns and best practices
- Always use a `context.Context` with timeouts for network calls.
- Use stable key prefixes (e.g. `app:<name>:`) so you can locate your data later.
- Keep values JSON-serialisable; the SDK encodes/decodes with `encoding/json`.

## Bootstrap
```go
client, err := cstore.NewFromEnv()
```

## Key/value flow (Set + Get)
```go
type Counter struct {
  Count int `json:"count"`
}

if err := client.Set(ctx, "jobs:123", Counter{Count: 1}, nil); err != nil {
  return err
}

var out Counter
item, err := client.Get(ctx, "jobs:123", &out)
if err != nil {
  return err
}
if item == nil {
  // Key does not exist (upstream returned null).
  return nil
}
```

## Hash flow (HSet + HGet + HGetAll)
```go
if err := client.HSet(ctx, "jobs", "123", map[string]any{"status": "queued"}, nil); err != nil {
  return err
}

var payload map[string]any
hashItem, err := client.HGet(ctx, "jobs", "123", &payload)
if err != nil {
  return err
}
if hashItem == nil {
  // Field does not exist (upstream returned null).
  return nil
}

all, err := client.HGetAll(ctx, "jobs")
if err != nil {
  return err
}
_ = all
```

## Connectivity check
`GetStatus` is a lightweight way to validate connectivity and inspect keys reported by the manager:
```go
status, err := client.GetStatus(ctx)
if err != nil {
  return err
}
if status != nil {
  fmt.Println(status.Keys)
}
```

## Runnable example
The SDK repo includes a complete example:
```bash
go run ./examples/cstore
```

## Troubleshooting
- `cstore.NewFromEnv()` fails: verify `EE_CHAINSTORE_API_URL` is set and reachable.
- Decode errors: ensure the value stored under the key is valid JSON for the struct you pass to `Get`/`HGet`.

## Next steps
- For file/object storage, see [R1FS Integration](./r1fs-integration).
- Back to [Go](../).
