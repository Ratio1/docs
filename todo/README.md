# TODO Index

This folder centralizes contributor queues and working spaces.

## Contributor Queues

- `TODO_ANDREI.md`
- `TODO_PETRICA.md`
- `TODO_VITALII.md`
- `TODO_ALESSANDRO.md`
- `TODO_BASTIA.md`
- `TODO_BLEO.md`

## Contributor Workspaces

- `andrei/`
- `petrica/`
- `vitalii/`
- `alessandro/`
- `bastia/`
- `bleo/`

Each contributor workspace includes:

- `plans/` for execution plans
- `prompts/` for reusable prompts
- `scraps/` for rough notes and temporary material

## Ratio1 Documentation Structure

> Moved from the old `STRUCTURE.md`.
> Instructions: everything after dash is a short description of the content to be included in that section/page and does not represent the actual title.

1. Ratio1 Docs - welcome message (P)

2. [x] Ratio1 Overview - introduction to Ratio1 (AID)
       2.1. [x] Decentralized Orchestration - orchestration review including Deeploy ChainDist CAR/WAR (AID)
       2.2. [x] Distributed Storage - R1FS storage review (AID)
       2.3. [x] Decentralized Apps - Distributed app state memory CStore (AID)
       2.4. [x] The Plugins system - how plugins work on Ratio1 (AID)

3. For Node Operators - introduction to node operation (P)
   3.1. Getting Started with the main Dashboard - intro to the dashboard (P)
   3.1.1. Buying your first Ratio1 license - purchasing and activating a license (P)
   3.1.2. Linking your Edge Node - connecting your license with your nodes (P)
   3.1.3. Rewards Understanding and Claiming- how rewards work on Ratio1 (P)
   3.1.4. Selling or transferring your license - transferring ownership of your license (P)
   3.2. [x] Managing Edge Nodes with r1setup (V)
   3.2.1. [x] r1setup Overview - overview presentation with no details (V)
   3.2.2. [x] r1setup Quick Setup - an end-to-end multi-node express configuration (V)
   3.2.3. [x] r1setup Fleet Management - managing multiple nodes (V)
   3.2.4. [x] r1setup Migration Guide - migrating existing node configurations (V)
   3.2.5. [x] r1setup Managing and Monitoring Nodes - monitoring node status and logs (V)
   3.2.6. [x] r1setup Hardening your fleet logins - security best practices via SSH keys (V)
   3.2.7. [x] r1setup Other Advanced Tools - advanced settings and options (V)
   3.2.8. [x] r1setup FAQ - frequently asked questions and troubleshooting (V)
   3.3. [x] Using Ratio1 Node Launcher (V)
   3.3.1. [x] Node Launcher Overview - overview presentation with no details (V)
   3.3.2. [x] Node Launcher Quick Setup - an end-to-end local node configuration (V)

4. For CSPs - introduction to CSP operation (P)
   4.1. Getting Started with Ratio1 for CSPs - why and intro to the requirements (P)
   4.1.1. Becoming a CSP - steps to become a CSP on Ratio1 (P)
   4.1.1. Pricing and Business Model Intro - understanding costs and revenue (P)
   4.2. Deepploying with Deeploy (P)
   4.2.1. Deeploy Overview - overview presentation with no details (P)
   4.2.2. Deeploy Quick Setup - a end-to-end setup with escroq and stuff (P)
   4.2.3. Deeploy Managing Deployments - managing multiple deployments (P)
   4.2.4. Deeploy End-to-End Example - complete example of a deployment (P)

5. [x] For Developers - introduction to developing on Ratio1 (AID)
       5.1. [x] Python - using the Python SDK for Ratio1 (AID)
       5.1.1. [x] Quick end-to-end example - a complete example of using the Python SDK (AID)
       5.1.2. [x] Navigating the Tutorials - list of tutorials and explanations(AID)
       5.1.3. [x] API Quick Reference - detailed API documentation (AID)
       5.1.4. [x] The Edge Node Software - understanding the edge node software architecture (AID)
       5.1.5. [x] Contributing to the Edge Node and Beyond - how to contribute to the project (AID)
       5.2. JavaScript - using the JavaScript SDK for Ratio1 (Ale)
       5.2.1. Quick end-to-end example - a complete example of using the JavaScript SDK (Ale)
       5.2.2. API Quick Reference - detailed API documentation (Ale)
       5.2.3. CStore Integration - using CStore with the JavaScript SDK (Ale)
       5.2.4. R1FS Integration - using R1FS with the JavaScript SDK (Ale)
       5.2.5. Simple auth - using SDK simple auth with the JavaScript SDK (Ale)
       5.3. Go - using the Go SDK for Ratio1 (B)
       5.3.1. Quick end-to-end example - a complete example of using the Go SDK (B)
       5.3.2. API Quick Reference - detailed API documentation (B)
       5.3.3. CStore Integration - using CStore with the Go SDK (B)
       5.3.4. R1FS Integration - using R1FS with the Go SDK (B)
       5.4. The Sandbox - using the Ratio1 Plugins Sandbox for testing and development (B)
       5.4.1. Running the sandbox - start/install and CLI flags (B)
       5.4.2. Seeding data - how to seed CStore and R1FS fixtures (B)
       5.4.3. HTTP surface - endpoint list and what they do (B)
       5.4.4. Using with SDKs - configure SDKs to target the sandbox (B)
       5.4.5. Troubleshooting - common issues and debugging tips (B)
       5.5. [x] r1ctl - the kubectl for Ratio1 (AID)
       5.5.1. [x] r1ctl Overview - overview presentation with no details (AID)
       5.5.2. [x] r1ctl Features (AID)

6. The Explorer - short introduction to the Ratio1 Explorer (P)
   6.1. Nodes and Licenses - how to use the Explorer to view nodes and licenses (P)
   6.2. Nodel Operators and CSPs - how to use the Explorer to view node operators and CSPs (P)
   6.3. Stats and Analytics - how to use the Explorer to view stats and analytics (P)

7. Other Tools - introduction to other Ratio1 tools (P)
   7.1. Telegram Bot - using the Ratio1 Telegram Bot (Ale)

8. [x] Application Templates - introduction to Ratio1 application templates (AID)
       8.1. R1FS Demo - js/ts demo application for R1FS (Ale)
       8.1.1. How to Deeploy - deployment details of R1FS Demo (Ale)
       8.1.2. How to Develop - technical details of R1FS Demo (Ale)
       8.2. [x] RedMesh - native distributed security assessment on Ratio1 (V)
       8.2.1. [x] How to Deeploy - safe native deployment of RedMesh (V)
       8.2.2. [x] How to Develop - RedMesh extension and report contracts (V)
       8.3. Docs Template - the documentation site you are currently reading (P)
       8.3.1. How to Deeploy - deployment details of Docs Template (P)
       8.3.2. How to Develop - technical details of Docs Template (P)

9. [x] Deployable Services - introduction to deployable services on Ratio1 (V)
   9.1. [x] Service Catalog - catalog of services that can be deployed on Ratio1 (V)
   9.2. [x] Your Native App on Ratio1 - guide to deploying your Native App on Ratio1 (V)
   9.2.1. [x] How to Deeploy - deployment details of Your Native App on Ratio1 (V)
   9.2.2. [x] How to Develop - technical details of Your Native App on Ratio1 (V)

10. Partner Applications - Open Sourced template-ready partner applications built on Ratio1 (P)
    10.1. [x] CerviGuard - clinical decision-support pilot on Ratio1 (V)
    10.1.1. [x] How to Deeploy - safe pilot deployment details for CerviGuard (V)
    10.1.2. [x] How to Develop - web, storage, authentication, and inference contracts (V)
