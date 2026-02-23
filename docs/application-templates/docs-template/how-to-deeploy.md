---
title: How to Deeploy
sidebar_position: 1
description: deployment details of Docs Template
---

# How to Deeploy

For Deeploy, use the docs template as a static-site workload and run the standard worker command sequence.

---

## Worker commands for Deeploy

```bash
npm install
npm run build
npm run serve
```

---

## What each command does

- `npm install`: installs dependencies.
- `npm run build`: builds the static docs site into `build/`.
- `npm run serve`: serves the static output for edge deployment runtime.

---

## Container deployment guidance (optional)

If your deployment workflow requires a container image, package the static `build/` output in a runtime image and deploy that artifact.

---

### Example Dockerfile

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

---

### Validate the container locally

```bash
docker build -t ratio1-docs:local .
docker run --rm -p 3000:3000 ratio1-docs:local
```

---

### Use with Deeploy

1. Build and push the image from your CI pipeline.
2. Set the image reference in your Deeploy deployment configuration.
3. Use container port `3000` as the exposed service port.

---

## Deployment target

This template is designed specifically for deployment on Ratio1 edge nodes.

---

## Notable date
- Reviewed on **February 23, 2026**.

