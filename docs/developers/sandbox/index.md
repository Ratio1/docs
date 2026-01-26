---
title: Sandbox
sidebar_position: 1
description: using the Ratio1 Plugins Sandbox for testing and development
---

# Sandbox

The Ratio1 Plugins Sandbox is a self-contained HTTP server that mimics the **CStore** and **R1FS** manager APIs exposed by Ratio1 edge nodes.
Use it to develop and test SDK clients locally without needing a live node.

## What you get
- CStore mock endpoints like `/set`, `/get`, `/hset`, `/hgetall`, `/get_status`.
- R1FS mock endpoints like `/add_file`, `/get_file_base64`, `/add_json`, `/calculate_json_cid`, `/delete_files`, `/get_status`.
- Deterministic seeding for repeatable tests.
- Latency and failure injection to validate retries and timeouts.
- Environment variable exports that match the SDK defaults:
  - `EE_CHAINSTORE_API_URL`
  - `EE_R1FS_API_URL`

## Quick start
1. Start the sandbox:
   ```bash
   r1-plugins-sandbox --cstore-addr :8787 --r1fs-addr :8788
   ```
2. Copy the exports printed by the sandbox into your shell:
   ```bash
   export EE_CHAINSTORE_API_URL=http://127.0.0.1:8787
   export EE_R1FS_API_URL=http://127.0.0.1:8788
   ```
3. Run your SDK client (Go/Python/JS) against those URLs.

## Repository
- `https://github.com/Ratio1/r1-plugins-sandbox`

## Next steps
- Learn how to run and configure it: [Running the sandbox](./running).
- Seed predictable data: [Seeding data](./seeding).
- See the full endpoint list: [HTTP surface](./http-surface).
- Integrate with SDKs: [Using with SDKs](./using-with-sdks).
- Debug common issues: [Troubleshooting](./troubleshooting).
