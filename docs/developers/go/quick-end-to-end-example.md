---
title: Quick end-to-end example
sidebar_position: 1
description: a complete example of using the Go SDK
---

# Quick end-to-end example

This page shows the smallest working flow to:
- configure the SDK via env vars
- connect to CStore and R1FS
- perform one call against each service

## Prerequisites
- Go 1.20+ (recommended)
- A Ratio1 node (or sandbox) exposing the manager APIs:
  - `EE_CHAINSTORE_API_URL` for CStore
  - `EE_R1FS_API_URL` for R1FS

## Configure (environment variables)
Set these before running the examples:
```bash
export EE_CHAINSTORE_API_URL="http://<node-host>:<port>/"
export EE_R1FS_API_URL="http://<node-host>:<port>/"
```

The SDK initialisers `cstore.NewFromEnv()` and `r1fs.NewFromEnv()` fail fast if the variables are missing.

## Install
```bash
go get github.com/Ratio1/edge_sdk_go
```

## Run the upstream example
The SDK repo contains a ready-made program that validates the env vars and issues lightweight calls:
```bash
go run ./examples/runtime_modes
```

## Minimal code
```go
package main

import (
  "context"
  "fmt"
  "log"
  "time"

  "github.com/Ratio1/edge_sdk_go/pkg/cstore"
  "github.com/Ratio1/edge_sdk_go/pkg/r1fs"
)

func main() {
  // Always use timeouts for network calls.
  ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
  defer cancel()

  cs, err := cstore.NewFromEnv()
  if err != nil {
    log.Fatalf("init cstore: %v", err)
  }
  fs, err := r1fs.NewFromEnv()
  if err != nil {
    log.Fatalf("init r1fs: %v", err)
  }

  status, err := cs.GetStatus(ctx)
  if err != nil {
    log.Fatalf("cstore status: %v", err)
  }
  keyCount := 0
  if status != nil {
    keyCount = len(status.Keys)
  }
  fmt.Printf("CStore keys: %d\n", keyCount)

  // Calculate a CID without storing anything.
  cid, err := fs.CalculateJSONCID(ctx, map[string]any{"hello": "ratio1"}, 1, nil)
  if err != nil {
    log.Fatalf("r1fs calculate: %v", err)
  }
  fmt.Printf("Sample CID (not stored): %s\n", cid)
}
```

## Next steps
- If you want key/value operations, continue with [CStore Integration](./cstore-integration).
- If you want file/object operations, continue with [R1FS Integration](./r1fs-integration).
- Back to [Go](../).
