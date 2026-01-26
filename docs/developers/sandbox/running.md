---
title: Running the sandbox
sidebar_position: 2
description: how to start and configure the Ratio1 Plugins Sandbox
---

# Running the sandbox

## Install options
The sandbox is shipped as release artifacts (recommended) and can also be built from source.

- Releases: `https://github.com/Ratio1/r1-plugins-sandbox/releases/latest`
- Build from source (Go 1.21+):
  ```bash
  go build -o r1-plugins-sandbox
  ./r1-plugins-sandbox --help
  ```

## Start
```bash
r1-plugins-sandbox --cstore-addr :8787 --r1fs-addr :8788
```

On startup, it prints the environment variables you should export:
```bash
export EE_CHAINSTORE_API_URL=http://127.0.0.1:8787
export EE_R1FS_API_URL=http://127.0.0.1:8788
```

## Flags
| Flag | Default | Meaning |
| --- | --- | --- |
| `--cstore-addr` | `:8787` | Listen address for the CStore mock. |
| `--r1fs-addr` | `:8788` | Listen address for the R1FS mock. |
| `--kv-seed` | | Path to a JSON file with initial CStore entries. |
| `--fs-seed` | | Path to a JSON file with initial R1FS files. |
| `--latency` | `0` | Adds fixed delay (e.g. `200ms`) to every request. |
| `--fail` | | Failure injection string `rate=<float>,code=<status>` (code defaults to `500`). |

## Examples
Add latency:
```bash
r1-plugins-sandbox --latency 150ms
```

Inject failures (about 3% HTTP 429):
```bash
r1-plugins-sandbox --fail rate=0.03,code=429
```

Use seed files:
```bash
r1-plugins-sandbox --kv-seed ./seeds/cstore.json --fs-seed ./seeds/r1fs.json
```

## Next steps
- Add predictable state: [Seeding data](./seeding).
- Browse endpoints: [HTTP surface](./http-surface).
- Back to [Sandbox](./).
