---
title: R1FS Integration
sidebar_position: 4
description: using R1FS with the Go SDK
---

# R1FS Integration

## What R1FS is
R1FS is the Ratio1 edge-node file/object storage layer (backed by the upstream IPFS manager).
The Go SDK provides helpers to:
- upload data and get back a CID
- resolve stored metadata (path, filename, optional meta)
- compute CIDs for JSON/pickle payloads without storing them

## Configure
Set the base URL for the node (or sandbox) you want to talk to:
- `EE_R1FS_API_URL`

Example:
```bash
export EE_R1FS_API_URL="http://<node-host>:<port>/"
```

## Concepts
- **CID**: content identifier returned by the service (used to download/resolve/delete).
- **Upload name vs path**:
  - `DataOptions.Filename` is the name attached to uploads.
  - `DataOptions.FilePath` is the (virtual) path you want the manager to store.
  - Some endpoints require *one of them*; the SDK enforces this.
- **Secret**: optional access control token passed as `secret` to supported endpoints.
- **Nonce**: optional integer forwarded to endpoints that support deterministic CID derivation.

## Patterns and best practices
- Always use a `context.Context` with timeouts for network calls.
- Use a predictable `FilePath` prefix like `my-app/<env>/<run-id>/...` for easier organisation.
- If you plan to delete data, design your paths so you can locate related CIDs (store an index in CStore, for example).

## Bootstrap
```go
client, err := r1fs.NewFromEnv()
```

## Upload and download (base64 endpoints)
These endpoints send file contents base64-encoded inside JSON. They are convenient for small payloads.
```go
cid, err := client.AddFileBase64(ctx, bytes.NewReader([]byte("hello")), &r1fs.DataOptions{
  FilePath: "ratio1-sdk-demo/hello.txt",
})
if err != nil {
  return err
}

data, filename, err := client.GetFileBase64(ctx, cid, "")
if err != nil {
  return err
}
_ = data
_ = filename
```

## Multipart upload + metadata lookup
Use `/add_file` when you want a classic multipart upload. Then resolve where it was stored using `/get_file`.
```go
cid, err := client.AddFile(ctx, bytes.NewReader([]byte{0xca, 0xfe}), &r1fs.DataOptions{
  FilePath: "ratio1-sdk-demo/artifacts/artifact.bin",
})
if err != nil {
  return err
}

loc, err := client.GetFile(ctx, cid, "")
if err != nil {
  return err
}
fmt.Println("download path:", loc.Path, "filename:", loc.Filename)
```

## Store YAML and read it back
```go
yamlCID, err := client.AddYAML(ctx, map[string]any{"service": "r1fs"}, &r1fs.DataOptions{Filename: "config.yaml"})
if err != nil {
  return err
}

var out map[string]any
_, err = client.GetYAML(ctx, yamlCID, "", &out)
if err != nil {
  return err
}
```

## Store JSON / pickle directly
If you already have structured data, you can store it without manually serialising bytes:
```go
cid, err := client.AddJSON(ctx, map[string]any{"job": 123, "status": "queued"}, &r1fs.DataOptions{
  Filename: "job.json",
})
if err != nil {
  return err
}
_ = cid
```

## Calculate CIDs without storing content
Useful for deduplication and “pre-flight” checks.
```go
cid, err := client.CalculateJSONCID(ctx, map[string]any{"job": 123}, 42, &r1fs.DataOptions{
  Secret: "optional",
})
if err != nil {
  return err
}
_ = cid
```

## Delete content
R1FS exposes delete endpoints for a single CID or a list of CIDs.
```go
unpinRemote := true
runGC := false
cleanupLocal := true

result, err := client.DeleteFile(ctx, cid, &r1fs.DeleteOptions{
  UnpinRemote:       &unpinRemote,
  RunGC:             &runGC,
  CleanupLocalFiles: &cleanupLocal,
})
if err != nil {
  return err
}
fmt.Println(result.Success, result.Message)
```

## Runnable example
The SDK repo includes a complete example:
```bash
go run ./examples/r1fs
```

## Troubleshooting
- `r1fs.NewFromEnv()` fails: verify `EE_R1FS_API_URL` is set and reachable.
- `filename or filepath is required`: pass `DataOptions.Filename` or `DataOptions.FilePath` for upload endpoints.
- `GetFileBase64` fails to decode: ensure the upstream returns a valid base64 payload.

## Next steps
- For key/value storage, see [CStore Integration](./cstore-integration).
- Back to [Go](../).
