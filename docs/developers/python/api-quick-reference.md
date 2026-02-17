---
title: API Quick Reference
sidebar_position: 3
description: detailed API documentation
---

# API Quick Reference

This page is a practical quick reference for frequently used Python SDK entry points.
For exhaustive signatures, inspect your installed version directly (`help(...)`, `inspect.signature(...)`).

## Core imports

```python
from ratio1 import (
    Session,
    Pipeline,
    Instance,
    Payload,
    CustomPluginTemplate,
    DistributedCustomCodePresets,
    PLUGIN_TYPES,
    PLUGIN_SIGNATURES,
    PAYLOAD_DATA,
    HEARTBEAT_DATA,
)
```

## Session API (high-frequency)

- `Session(...)`
  - main client/session object.
  - supports callbacks such as `on_payload`, `on_notification`, `on_heartbeat`.
- `wait_for_any_node(timeout=...)`
  - waits for at least one active node.
- `wait_for_node(node, timeout=...)`
  - waits for a specific node.
- `get_active_nodes()`
  - returns currently active nodes seen by the session.
- `create_pipeline(node=..., name=..., data_source=..., config=...)`
  - creates a pipeline object on a target node.
- `attach_to_pipeline(node=..., name=...)`
  - attaches to an existing pipeline.
- `create_or_attach_to_pipeline(...)`
  - create-if-missing/attach-if-existing workflow.
- `create_chain_dist_custom_job(...)`
  - helper for distributed custom-code jobs.
- `create_web_app(...)`, `create_custom_webapi(...)`, `create_container_web_app(...)`, `create_worker_web_app(...)`
  - app-oriented deployment helpers.
- `get_network_known_nodes(...)`
  - returns network report data (tabular report + reporter metadata).
- `get_nodes_apps(...)`
  - retrieves visible apps/pipelines on node(s) where client is authorized.
- `run(...)`, `sleep(...)`, `wait(...)`, `close(...)`
  - loop control and shutdown helpers.

## Pipeline API

- `create_plugin_instance(signature=..., instance_id=..., config=..., on_data=...)`
  - add a plugin instance to pipeline.
- `create_custom_plugin_instance(instance_id=..., custom_code=..., ...)`
  - deploy custom remote execution logic.
- `create_chain_dist_custom_plugin_instance(...)`
  - lower-level distributed custom plugin builder.
- `create_or_attach_to_plugin_instance(...)`
  - create-if-missing/attach-if-existing for plugin instances.
- `deploy(with_confirmation=..., wait_confirmation=...)`
  - sends staged pipeline/instance changes to node.
- `update_acquisition_parameters(...)`
  - updates pipeline-level acquisition/source config.
- `send_pipeline_command(command=..., payload=...)`
  - sends runtime command to pipeline.
- `wait_exec(custom_code=..., timeout=...)`
  - executes REST-like one-shot custom execution and waits for result.
- `close(...)`
  - closes pipeline and associated instances.

## Instance API

- `update_instance_config(config=..., **kwargs)`
  - stage instance config changes.
- `send_instance_command(command=..., payload=..., wait_confirmation=...)`
  - send runtime command to instance.
- `send_instance_command_and_wait_for_response_payload(...)`
  - command + response payload helper.
- `get_status()`
  - latest known instance status.
- `temporary_attach(on_data=..., on_notification=...)`
  - temporary callback attachments.
- `temporary_detach(attachment)`
  - remove temporary callbacks.
- `close()` / `stop()`
  - remove/stop the instance from pipeline.

## Useful constants and presets

- `PLUGIN_TYPES`
  - typed helpers for built-in instance wrappers (`CHAIN_DIST_CUSTOM_JOB_01`, `CUSTOM_WEBAPI_01`, etc.).
- `PLUGIN_SIGNATURES`
  - canonical plugin signature constants.
- `DistributedCustomCodePresets`
  - preset processors/finish conditions/aggregators for chain-distributed jobs.
- `PAYLOAD_DATA`, `HEARTBEAT_DATA`
  - payload/heartbeat field constants for robust parsing.

## Introspection snippet

```python
import inspect
from ratio1 import Session, Pipeline, Instance

print(inspect.signature(Session.create_pipeline))
print(inspect.signature(Pipeline.create_plugin_instance))
print(inspect.signature(Instance.send_instance_command))
```

## Ground truth references

Primary:
- https://github.com/Ratio1/ratio1_sdk
- https://pypi.org/project/ratio1/

Supporting:
- https://ratio1.ai/blog/ratio1-end-to-end-tutorial
- https://ratio1.ai/blog/ratio1-sdk-for-typescript-your-bridge-to-edge-nodes
- https://ratio1.ai/blog/go-developers-meet-the-new-ratio1-sdk-and-sandbox

## Notable date
- Reviewed on **February 17, 2026**.

## Next steps
- Back to [Python](../).
