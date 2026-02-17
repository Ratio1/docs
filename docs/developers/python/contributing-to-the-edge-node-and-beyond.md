---
title: Contributing to the Edge Node and Beyond
sidebar_position: 5
description: how to contribute to the project
---

# Contributing to the Edge Node and Beyond

This page covers practical contribution paths across the Ratio1 developer repos used in daily work.

## Where to contribute

- **SDK client workflows**: `Ratio1/ratio1_sdk`
- **Edge runtime packaging/extensions**: `Ratio1/edge_node`
- **Core runtime contracts/engine**: `ratio1/naeural_core`
- **Developer-facing docs**: this docs repository

## Contribution workflow

1. Pick scope and target repo.
2. Open/confirm issue context (bug, gap, feature request, docs clarification).
3. Implement focused change set with tests/examples where relevant.
4. Submit PR with:
   - behavior summary,
   - validation steps,
   - migration/compatibility notes (if any).

## Local setup patterns

SDK local editable setup:

```bash
git clone https://github.com/Ratio1/ratio1_sdk
cd ratio1_sdk
pip install -e .
```

Edge-node local setup pattern (cross-repo editable development):

```bash
pip install -r requirements.txt
pip install -e ../naeural_core ../ratio1_sdk
```

## Validation expectations

- Keep changes source-backed and reproducible.
- Prefer narrow tests over broad unverified assumptions.
- Validate docs/examples against current package/repo behavior.

Examples from edge-node repository validation patterns:

```bash
python3 -m unittest discover -s plugins -p "*test*.py"
python3 -m unittest extensions.business.cybersec.red_mesh.test_redmesh
```

## Contribution quality checklist

- API names/signatures used in docs match current package version.
- New commands/options are documented in relevant docs pages.
- High-impact wording is linked to canonical sources.
- Backward compatibility impacts are explicitly called out.

## Ground truth references

Primary:
- https://github.com/Ratio1/ratio1_sdk
- https://github.com/Ratio1/edge_node
- https://github.com/ratio1/naeural_core

Supporting:
- https://ratio1.ai/whitepaper
- https://ratio1.ai/blog/what-is-ratio1-and-why-it-matters

## Notable date
- Reviewed on **February 17, 2026**.

## Next steps
- Back to [Python](../).
