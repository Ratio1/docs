---
title: HTTP surface
sidebar_position: 4
description: endpoints exposed by the sandbox and what they do
---

# HTTP surface

The sandbox mirrors the REST surface of the production plugins closely enough for SDK development.
It is intentionally small and focused: the goal is “exercise clients end-to-end” rather than fully emulate the node.

## CStore endpoints
- `POST /set` – store a JSON value by key.
- `GET /get?key=<key>` – fetch a value by key.
- `POST /hset` – store a JSON value under a hash key + field.
- `GET /hget?hkey=<hashKey>&key=<field>` – fetch a hash field.
- `GET /hgetall?hkey=<hashKey>` – fetch all hash fields.
- `GET /get_status` – inspect current keys.

## R1FS endpoints
- `POST /add_file` – multipart upload (binary).
- `POST /add_file_base64` – JSON upload with base64 payload.
- `GET /get_file?cid=<cid>[&secret=<secret>]` – resolve stored metadata/path.
- `GET /get_file_base64?cid=<cid>[&secret=<secret>]` – download content (base64).
- `POST /add_yaml` / `POST /add_json` / `POST /add_pickle` – store structured payloads.
- `POST /calculate_json_cid` / `POST /calculate_pickle_cid` – compute CIDs without storing.
- `GET /get_yaml?cid=<cid>[&secret=<secret>]` – fetch YAML payload.
- `POST /delete_file` / `POST /delete_files` – remove stored content by CID(s).
- `GET /get_status` – list known files.

## Observability
All handlers log request/response bodies and duration, which is useful when debugging SDK behaviour.

## Next steps
- Practical setup and flags: [Running the sandbox](./running).
- SDK integration: [Using with SDKs](./using-with-sdks).
- Back to [Sandbox](./).
