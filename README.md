# Ratio1 Docs Template

This repo is a customized Docusaurus v3 starter tailored for deploying documentation on Ratio1 edge nodes. It keeps the classic DX while adding Ratio1-specific branding, metadata, and hooks (build hash display, edge host indicator) so you can ship a docs site that fits the Ratio1 ecosystem out of the box.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Preview a Production Build

```bash
npm run build
npm run serve
```

This builds the site and serves the static output from `build/` so you can verify the production bundle locally.

## Deploying with Ratio1 Deeploy dApp

In the Ratio1 Deeploy flow, add the following worker commands:

```bash
npm install
npm run build
npm run serve
```

This installs dependencies, builds the static site, and serves it for deployment on Ratio1 edge nodes.

## Deployment
Deploy the generated `build/` directory to your Ratio1 edge node or preferred static hosting. The template also supports standard Docusaurus deploy flows if you want GitHub Pages or similar.
