---
title: Quick end-to-end example
sidebar_position: 1
description: a complete example of using the Python SDK
---

# Quick end-to-end example

This walkthrough gets you from local setup to a deployed remote custom execution pipeline.
It is a low-level SDK quickstart pattern, not the preferred managed production deployment path.

## Prerequisites

1. Python `>=3.10`.
2. Install SDK package:

```bash
pip install --upgrade ratio1
```

3. Have at least one reachable edge node where your SDK client is allowed to deploy workloads.

If you run a local test node, inspect and allowlist your SDK client:

```bash
docker exec r1node get_node_info
docker exec r1node add_allowed <your_sdk_client_address> <optional_alias>
```

For managed CSP deployments through Deeploy, allowlisting and access policies are handled by that
operational control plane rather than ad-hoc local node commands.

## Minimal end-to-end script

```python
from ratio1 import CustomPluginTemplate, Pipeline, Session


def remote_job(plugin: CustomPluginTemplate):
    # Runs on the remote node.
    return {
        "node_addr": plugin.node_addr,
        "node_e2_addr": plugin.e2_addr,
        "message": "hello from remote execution",
    }


def on_custom_data(pipeline: Pipeline, exec_result: dict, full_payload: dict):
    pipeline.P(f"Custom execution result: {exec_result}")


if __name__ == "__main__":
    session = Session(silent=False)

    if not session.wait_for_any_node(timeout=30):
        raise RuntimeError("No online nodes found for this client")

    node = session.get_active_nodes()[0]
    pipeline = session.create_pipeline(
        node=node,
        name="py_quickstart_pipeline",
        data_source="Void",
    )

    pipeline.create_custom_plugin_instance(
        instance_id="hello_custom_exec",
        custom_code=remote_job,
        on_data=on_custom_data,
        process_delay=10,
        allow_empty_inputs=True,
        run_without_image=True,
    )

    pipeline.deploy()
    session.wait(seconds=30, close_pipelines=True, close_session=True)
```

## What to expect

1. Session connects and waits for at least one active node.
2. Pipeline is created on that node.
3. Custom plugin instance is staged and deployed.
4. SDK receives execution payloads and prints callback results.
5. Session closes and pipeline is cleaned up.

## Troubleshooting quick checks

- No nodes found:
  - verify comm/auth config and that node appears online;
  - verify client address is allowlisted on the node.
- Deploy acknowledged but no payload:
  - keep session open long enough (`session.wait(...)`);
  - confirm instance config supports execution (`allow_empty_inputs`, `run_without_image` for `Void` flows).
- Command/API mismatch:
  - ensure package version is current (`pip show ratio1`).

## Ground truth references

Primary:
- https://github.com/Ratio1/ratio1_sdk
- https://pypi.org/project/ratio1/

Supporting:
- https://ratio1.ai/blog/ratio1-end-to-end-tutorial
- https://ratio1.ai/blog/distributed-prime-number-calculation
- https://ratio1.ai/blog/deploying-a-custom-web-application

## Notable date
- Reviewed on **February 17, 2026**.

## Next steps
- Back to [Python](../).
