---
title: How to Develop
sidebar_position: 2
description: Run R1FS Demo against real edge-node services, verify a file round trip, and understand its integration code.
---

# How to Develop

This walkthrough runs the Next.js app on your computer and connects it to real CStore and R1FS
services. The [public repository](https://github.com/Ratio1/r1fs-demo) contains the app; you do not
need to clone or build either SDK separately.

## Prerequisites

- Git, **Node.js 22**, and npm. The app's `.nvmrc` selects Node 22 and its Dockerfile uses Node 22;
  the locked Next.js 16.1.5 package requires at least Node 20.9.0. The README's Node 18 requirement
  is outdated.
- A running edge node and CStore/R1FS URLs reachable from the machine running Next.js. If you need
  a node, start with [Node Launcher setup](../../node-operators/node-launcher/node-launcher-quick-setup)
  or [r1setup](../../node-operators/r1setup/r1setup-quick-setup), then confirm how its service ports
  are exposed to your development machine.
- Non-sensitive test data and distinct CStore namespaces for this experiment.

The examples below assume the node's services are exposed on **your machine** at
`http://127.0.0.1:31234` (CStore) and `http://127.0.0.1:31235` (R1FS). A running node container does
not automatically make these host ports available. Substitute the operator-provided addresses
when using different port mappings or an existing private connection to another host.

## 1. Download and install

Run these commands in a terminal; the shell examples use Bash-compatible syntax:

```bash
git clone https://github.com/Ratio1/r1fs-demo.git
cd r1fs-demo
npm ci
```

`npm ci` uses the repository's lockfile. Record `git rev-parse HEAD` if you need to reproduce the
version you tested; `main` can change after this guide's review date.

## 2. Configure the app

From the app directory, exclude the local configuration from Git before creating it:

```bash
printf '\n.env.local\n' >> .git/info/exclude
```

The reviewed repository does not ignore `.env.local` by default. Create that file in the app root
with the following settings, replacing the two secret placeholders and choosing your own
namespace names:

```dotenv
R1EN_CHAINSTORE_API_URL=http://127.0.0.1:31234
R1EN_R1FS_API_URL=http://127.0.0.1:31235
EE_CHAINSTORE_API_URL=http://127.0.0.1:31234

CSTORE_HKEY=my-r1fs-demo-dev-files
R1EN_CSTORE_AUTH_HKEY=my-r1fs-demo-dev-auth
R1EN_CSTORE_AUTH_SECRET=REPLACE_WITH_A_RANDOM_SECRET
R1EN_CSTORE_AUTH_BOOTSTRAP_ADMIN_PWD=REPLACE_WITH_AN_INITIAL_PASSWORD
```

Use a password manager to generate the auth secret and initial password. Keep the auth secret
stable for that user namespace. Never commit this file or include it in an image build context.

| Setting | Purpose |
| --- | --- |
| `R1EN_CHAINSTORE_API_URL` | CStore endpoint for the app's file metadata client. |
| `R1EN_R1FS_API_URL` | R1FS endpoint for file uploads and downloads. |
| `EE_CHAINSTORE_API_URL` | Points the bundled authentication dependency at the same CStore service. |
| `CSTORE_HKEY` | Namespace for file records. The code default is `r1fs-demo-test`; set your own value. |
| `R1EN_CSTORE_AUTH_HKEY` | Separate namespace for user records. |
| `R1EN_CSTORE_AUTH_SECRET` | Secret used by the authentication library when hashing/verifying passwords. |
| `R1EN_CSTORE_AUTH_BOOTSTRAP_ADMIN_PWD` | Creates `admin` when it does not exist in that auth namespace. |

The file client and auth library construct separate SDK clients. The auth dependency bundled with
version 1.3.0 reads `CSTORE_API_URL` before `EE_CHAINSTORE_API_URL`; it does not use
`R1EN_CHAINSTORE_API_URL`. Remove any conflicting `CSTORE_API_URL` from your environment, or point
it at the same endpoint. Keep both CStore URLs above aligned. The separate authentication client comes from
[`cstore-auth-ts`](https://github.com/Ratio1/cstore-auth-ts). Recheck configuration requirements
when upgrading the app or its dependencies.

Optional settings include `AUTH_SESSION_COOKIE` (default `r1-session`) and
`AUTH_SESSION_TTL_SECONDS` (default `86400`). The upload UI uses `MAX_FILE_SIZE_MB` with a default
of 10 MB; this is not a guarantee of a server-enforced upload limit. Use a much smaller text file
for the first test.

## 3. Check the services and start

For the example local port mapping:

```bash
curl --fail http://127.0.0.1:31234/get_status
curl --fail http://127.0.0.1:31235/get_status
npm run dev
```

Use your configured URLs in the checks when they differ. Inspect the responses for errors; an
HTTP response alone does not prove that file storage works. The app is available at
`http://localhost:3333`.

Open the login page and sign in as **admin** using your bootstrap password. After the first successful
login, remove `R1EN_CSTORE_AUTH_BOOTSTRAP_ADMIN_PWD` from `.env.local`, restart the app, and check
that the same account can still log in. Bootstrap does not reset an existing admin's password.

## 4. Verify a file round trip

1. On the dashboard, switch the transfer control to **Base64**. Streaming is selected by default.
2. Create a small file such as `hello.txt` containing `Hello from R1FS`.
3. Upload it without a custom file secret for this first test. Record the returned CID.
4. Refresh the file list and check the CID and filename. This verifies the CStore discovery step
   separately from the R1FS upload.
5. Download from that list while still in Base64 mode. Compare the downloaded bytes with the
   original, rather than relying only on a success message.
6. Refresh the browser and verify the record is still listed.

For example, save the download to a different directory and compare it on Linux/macOS:

```bash
cmp ./hello.txt ./downloaded/hello.txt
```

No output and exit status zero mean the files match. This checks one app/node path, not network
replication or retention guarantees.

### Try encrypted sharing

After the ordinary round trip works, demonstrate the
[encrypted-sharing pattern](./#encryption-and-private-sharing) with another non-sensitive file:

1. Keep **Base64** selected and supply a strong, unique custom file secret during upload.
2. Check that the new file is listed and marked as using a custom key. This label records the
   upload option; verify the actual decryption with a download too.
3. Share the CID with another user of the same demo instance. Send the secret separately through
   a trusted channel, keeping it out of the share URL.
4. Have the recipient log in, select Base64, find the CID in the file list, and download with the
   supplied secret. Use the admin interface to create a separate test account if needed.
5. Compare the downloaded bytes with the original. Also check that an incorrect secret does not
   produce the original file contents.

The file secret is separate from the login password and the application's authentication secret.
Keep it for later retrieval. The app still announces descriptive metadata in CStore, and the app
server/node handle the file and secret; this is not encryption performed only in the browser.

### Transfer limitations

The reviewed app expects a different Streaming download response from the forms returned by
the inspected SDK/node implementation. An empty download can therefore
be an application compatibility issue even when the file exists. Use Base64 for this procedure.

The shared file page uses Streaming, and the normal browser flow redirects unauthenticated
visitors to login. Do not use a share link as the first download test. The sharing UI also offers
links containing a `secret` query parameter; such links carry the file secret in the URL and may
appear in browser history or logs. Use test data and keep real secrets out of shared URLs.

## 5. Understand and adapt the integration

The integration has four responsibilities:

- **Configuration:** selects service URLs, file/auth namespaces, and session settings.
- **Storage access:** uses the TypeScript SDK from server-side code to talk to CStore and R1FS.
- **Upload and discovery:** stores file contents in R1FS, then records the returned CID and node
  identity in CStore so the browser can discover the file.
- **Retrieval:** resolves a selected CID through R1FS and returns the content to the browser.

Use the [app repository](https://github.com/Ratio1/r1fs-demo) to explore the current implementation
of these responsibilities; its internal file organization can change between releases.

Each file record has `cid`, `filename`, `date_uploaded`, `owner`, and
`isEncryptedWithCustomKey`. The last field records whether an upload supplied a secret; the
secret itself is not part of that metadata record. The owner is descriptive metadata, not an
enforced ownership check. The upload route reads/modifies/writes an array under the node address;
it does not provide an atomic transaction spanning R1FS and CStore.

Start customization with your own namespaces and UI. Keep SDK calls that need server configuration
in server-side code. Before extending the app to private data, address the
[starter's access-control limits](./#choose-where-to-run-it). See the existing
[JavaScript R1FS](../../developers/javascript/r1fs-integration) and
[CStore](../../developers/javascript/cstore-integration) references for additional operations.
The [Go SDK](https://github.com/Ratio1/edge_sdk_go) is an alternative for building a Go service;
it is not a prerequisite for this Next.js app.

## Sandbox alternative

The [Plugins Sandbox](https://github.com/Ratio1/r1-plugins-sandbox) can exercise APIs locally without
a node. Download the binary for your platform from its
[releases page](https://github.com/Ratio1/r1-plugins-sandbox/releases), extract it, and run:

```bash
./r1-plugins-sandbox --cstore-addr :41234 --r1fs-addr :41235
```

On Windows, run the extracted `.exe`. A release binary does not need Go. If you build from source,
the inspected v0.0.18 `go.mod` requires Go 1.24.0 and selects toolchain go1.24.9; the README's
Go 1.21 requirement is stale.

In `.env.local`, change both CStore URL settings to `http://127.0.0.1:41234` and the R1FS URL to
`http://127.0.0.1:41235`. Also update or remove `CSTORE_API_URL` if set. Choose separate sandbox
namespaces, provide a bootstrap password, and restart `npm run dev`. The app's `npm run sandbox`
shortcut sets only the `R1EN_*` service URLs, so it does not configure the auth client's URL by itself.

This is a limited alternative, not a substitute for the real-node round trip:

- Sandbox uploads return a CID without `ee_node_address`. The app then skips its CStore metadata
  write, so the new file does not appear in the list.
- Streaming download returns metadata the app does not turn into file bytes. Multipart metadata
  handling also differs between the SDK and sandbox.
- Users, file records, and file contents live in memory and disappear when the sandbox restarts.
  A fresh instance needs admin bootstrap again.
- The mocks do not verify actual encryption, content addressing, replication, or durable retrieval.

These limitations were checked against **v0.0.18** of the
[Plugins Sandbox](https://github.com/Ratio1/r1-plugins-sandbox).
The existing [Sandbox documentation](../../developers/sandbox/) covers additional API experiments.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Connection refused | The node's host port mapping and the URLs reachable from Next.js. Localhost inside a container identifies that container. |
| Status works but login fails | Auth namespace/secret/bootstrap settings and `EE_CHAINSTORE_API_URL`; remove a conflicting `CSTORE_API_URL`. |
| Upload returns a CID but no file appears | Response includes `ee_node_address`, the file namespace is correct, and the CStore write succeeded. Sandbox responses omit that address. |
| Download succeeds with an empty file | Switch to Base64; the Streaming adapter has the compatibility limitation described above. |
| Login fails after restarting the sandbox | Its user store was lost; provide bootstrap configuration for the new instance. |

## Review and public sources

Reviewed on **September 11, 2026**, using
[R1FS Demo 1.3.0](https://github.com/Ratio1/r1fs-demo)
and its locked dependencies. Source and response contracts were inspected; a live edge-node
login/upload/list/download round trip was not run for this review.

## Next steps

- [How to Deeploy](./how-to-deeploy) using Git or the published container image.
- Back to [R1FS Demo](./).
