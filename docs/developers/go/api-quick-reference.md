---
title: API Quick Reference
sidebar_position: 2
description: detailed API documentation
---

# API Quick Reference

## Package layout
- `github.com/Ratio1/edge_sdk_go/pkg/cstore` – CStore client (key/value + hash operations)
- `github.com/Ratio1/edge_sdk_go/pkg/r1fs` – R1FS client (file/object helpers)

## Bootstrap (recommended)
Both clients can be initialised from the standard Ratio1 env vars:
- `EE_CHAINSTORE_API_URL` for CStore
- `EE_R1FS_API_URL` for R1FS

```go
cs, err := cstore.NewFromEnv()
fs, err := r1fs.NewFromEnv()
```

## Error and “not found” semantics
- Most methods return Go `error` values for transport/protocol failures.
- When the upstream returns `null` for missing data, the SDK returns a `nil` item/document (with `err == nil`).
  - CStore: `Get` / `HGet` can return `nil`
  - R1FS: `GetYAML` can return `nil`

## CStore highlights
- `Set(ctx, key, value, opts)` – store JSON-serialisable values
- `Get(ctx, key, out)` – fetch and decode values
- `HSet(ctx, hash, field, value, opts)` – set a field inside a hash key
- `HGet(ctx, hash, field, out)` / `HGetAll(ctx, hash)` – retrieve hash data
- `GetStatus(ctx)` – lightweight connectivity/status call

## R1FS highlights
- `AddFileBase64(ctx, r, opts)` / `GetFileBase64(ctx, cid, secret)` – store and retrieve content
- `AddFile(ctx, r, opts)` / `GetFile(ctx, cid, secret)` – multipart upload + metadata lookup
- `AddYAML(ctx, data, opts)` / `GetYAML(ctx, cid, secret, out)` – YAML convenience helpers
- `CalculateJSONCID(ctx, data, seed, opts)` / `CalculatePickleCID(...)` – compute content IDs without storing
- `AddJSON(ctx, data, opts)` / `AddPickle(ctx, data, opts)` – store structured payloads directly
- `DeleteFile(ctx, cid, opts)` / `DeleteFiles(ctx, cids, opts)` – remove stored content

## R1FS options
`r1fs.DataOptions` (used by upload/calculate endpoints):
- `Filename` – name associated with the uploaded payload
- `FilePath` – virtual path to store the payload under
- `Secret` – optional access secret (forwarded to the manager)
- `Nonce` – optional integer used by endpoints that support deterministic CID calculation

`r1fs.DeleteOptions` (used by delete endpoints):
- `UnpinRemote` – request unpin on remote pinning backends
- `RunGC` – request garbage collection (`run_gc` / `run_gc_after_all`)
- `CleanupLocalFiles` – request local cleanup on the node

## Next steps
- See [CStore Integration](./cstore-integration) for a step-by-step KV flow.
- See [R1FS Integration](./r1fs-integration) for uploads/downloads.
- Back to [Go](../).
