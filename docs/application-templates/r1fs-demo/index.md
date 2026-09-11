---
title: R1FS Demo
sidebar_position: 1
description: Learn how R1FS Demo combines distributed file storage, CStore discovery, and encrypted file sharing.
---

# R1FS Demo

The [R1FS Demo](https://github.com/Ratio1/r1fs-demo) demonstrates the building blocks of a file-sharing
application on Ratio1: store a file in **R1FS**, make it discoverable through **CStore**, and use a
**custom file secret** to share encrypted contents with a recipient. Anyone can download the public
app, run it against edge-node services, and adapt it for their own application.

The example connects a familiar browser workflow—upload, list, share, and download—to Ratio1's
storage services. It shows both ordinary file exchange and the secret-based sharing pattern used
to keep file contents private. The current app is a starter with the access-control limitations
described below.

## What you can explore

- Log in with a CStore-backed account and manage users through the existing admin interface.
- Upload a file, receive its content identifier (CID), and find its metadata in the file list.
- Upload with a custom secret and retrieve the encrypted file using that same secret.
- Switch between Base64 and Streaming transfer modes.
- Inspect CStore/R1FS status and copy a link to a file page.

## How files move through the app

```text
Sender -> App + TypeScript SDK -> R1FS: store file, return CID
                              -> CStore: record CID and file metadata

Recipient -> App + TypeScript SDK -> CStore: discover file records
                                 -> R1FS: retrieve by CID and file secret
```

**R1FS holds the file contents.** Uploading returns a content identifier, or CID, which identifies
the stored content for later retrieval. For an encrypted upload, the recipient needs the file's
custom secret to decrypt its contents as well as the CID to locate them.

**CStore makes files discoverable.** The app records the CID, filename, upload time, owner label,
and whether a custom secret was supplied. Reading those records produces the file list, without
having to download every file. Uploading the file and recording its metadata are separate steps.

**The TypeScript SDK connects the app to both services.** The browser sends requests to the Next.js
server, which uses the [SDK](https://github.com/Ratio1/edge-sdk-ts) to store, announce, discover, and
retrieve files.

## Encryption and private sharing

When you supply a custom file secret, the app passes it to R1FS with the upload. R1FS encrypts the
file contents before storing them. On download, R1FS uses the supplied secret to decrypt the stored
content before returning it to the app. Knowing the CID alone does not provide the custom
decryption secret.

A private-sharing experiment follows this flow:

1. The sender uploads a test file with a strong, unique file secret.
2. The app receives the CID and adds a discoverable file record to CStore.
3. The sender shares the CID with the recipient and sends the file secret separately through a
   trusted channel.
4. The recipient finds the file in the same demo instance and supplies the secret when downloading.
5. The recipient compares the downloaded file with the original to verify retrieval and decryption.

For this experiment, use **Base64** for both upload and download from the file list. The reviewed
app has Streaming compatibility issues, including on shared file pages; see the
[development walkthrough](./how-to-develop#try-encrypted-sharing).

Three distinctions matter when adapting this pattern:

- **A file secret and a login password serve different purposes.** The file secret is needed for
  decryption; the app's separate auth secret supports its user accounts. Keep the file secret for
  later downloads. An upload without a custom secret uses the R1FS default behavior and should not
  be treated as private sharing.
- **Encrypted contents do not hide the file listing.** The demo still records the filename, owner
  label, upload time, and CID in CStore. Avoid putting sensitive information in that metadata.
- **The app server and edge node are part of the trust boundary.** This demo passes the file and
  its secret to them; encryption happens in R1FS, rather than exclusively in the sender's browser.
  Use HTTPS for remote access and trust the infrastructure handling your files.

The app's sharing UI can also put the secret in a share URL. Anyone receiving that complete URL
receives both the file reference and the secret; browser history and logs can retain it. Keep the
secret out of the URL when demonstrating separate sharing of the CID and secret.

## Accounts and application data

User records belong to a separate CStore hash selected with `R1EN_CSTORE_AUTH_HKEY`. Use different
file and authentication keys for each independent application/environment. These keys organize
records; they are not access-control boundaries.

## Choose where to run it

| Path | Use it for |
| --- | --- |
| Local app with real edge-node services | Developing against actual CStore and R1FS behavior. Start with [How to Develop](./how-to-develop). |
| Worker App Runner | Letting Deeploy fetch the public Git repository and build/run the app. |
| Container App Runner | Running the published app image through Deeploy. Both runners are covered in [How to Deeploy](./how-to-deeploy). |
| Plugins Sandbox | Limited local API experiments. Its temporary mocks do not support the demo's complete file workflow; see the [sandbox notes](./how-to-develop#sandbox-alternative). |

:::caution Starter application

Use non-sensitive test files and accounts. The current application does not enforce authentication
on all file APIs, and its session cookie is not cryptographically signed. The encrypted-sharing
pattern above does not replace application-level authorization. Address those controls before
using this starter as a private file-sharing service for confidential data.

:::

## In this section

- [How to Develop](./how-to-develop): download, configure, run, and understand the application.
- [How to Deeploy](./how-to-deeploy): configure Worker App Runner or Container App Runner.
- [Distributed Storage](../../ratio1-overview/distributed-storage): the roles of R1FS and CStore.
- [JavaScript R1FS Integration](../../developers/javascript/r1fs-integration) and
  [CStore Integration](../../developers/javascript/cstore-integration): SDK operations beyond this demo.

## Review and public sources

Reviewed on **September 11, 2026** against [R1FS Demo **1.3.0**](https://github.com/Ratio1/r1fs-demo).
The lockfile selects `@ratio1/edge-sdk-ts` **1.5.2** and `@ratio1/cstore-auth-ts` **0.6.1**.
The procedures are source-checked; a live edge-node round trip was not run for this review.
