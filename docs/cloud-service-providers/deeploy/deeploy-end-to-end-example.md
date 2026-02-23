---
title: Deeploy End-to-End Example
sidebar_position: 6
description: A practical Git-to-Deeploy flow using Worker App Runner.
---

# Deeploy End-to-End Example

## Scenario

You want to deploy a web worker app directly from Git without running your own
CI/CD pipeline.

## Step 1: Confirm prerequisites

- Wallet connected and funded with USDC for escrow.
- CSP profile ready for deployments.
- Deeploy Secrets configured (Cloudflare account/zone/token/domain).

## Step 2: Create a Project

In Deeploy, create a project for the target app (for example,
`my-worker-prod`).

## Step 3: Add a Worker App Runner Job

1. Choose a generic app template and enable worker mode.
2. Set resources (CPU, RAM, optional GPU) and runtime profile.
3. Configure app port and external exposure settings.

## Step 4: Connect your Git repository

Provide repository information:

- Repository URL
- Branch
- Build/install/start commands
- Private access token if repository access is restricted

After initial deployment, Worker App Runner can poll the repository for new
commits and trigger redeployments automatically.

## Step 5: Review cost and deploy

1. Review estimated deployment cost.
2. Approve USDC transfer when prompted.
3. Confirm deployment to fund escrow and start orchestration.

## Step 6: Validate and operate

- Check job logs and status until it is healthy.
- Open the generated endpoint/tunnel URL.
- Push a small commit to validate automatic redeploy behavior.

## Notable date
- Reviewed on **February 23, 2026**.
- Sources:
- https://ratio1.ai/blog/deploy-your-app-with-ratio1-s-worker-app-runner-no-ci-cd-required
- https://ratio1.ai/blog/deeploy-unlocked-accessing-the-power-of-ratio1
- https://ratio1.ai/blog/deeploy-secrets-setup-guide

## Next steps
- Back to [Deploying with Deeploy](../).
