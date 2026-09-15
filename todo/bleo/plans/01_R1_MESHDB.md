# R1 MeshDB user guide

Owner: Bleo. Status: written, verified, and reviewed on 2026-09-15; submitted for PR review.
Worktree: `/mnt/c/workspaces/r1_wrapper/worktrees/docs-r1-meshdb`
Branch: `docs/r1-meshdb-guides`, based on docs `origin/main` at `2767e17`.

## Goal and Placement

Help an application owner deploy a fresh R1 MeshDB cluster, sign in to its
console, and create/use databases without node shell access. Add section 9.3
under Deployable Services, after Native App. Use existing folder-generated
navigation and category/frontmatter conventions, not new site components.

Four short pages, one continuous path:

1. `docs/deployable-services/r1-meshdb/index.md`: what it is, cluster/database/
   table distinction, same database credentials for SQL and console, three-node
   starting point, links to the three tasks. Explain PostgreSQL-compatible
   clients without promising full PostgreSQL or enterprise feature parity.
2. `how-to-deeploy.md`: existing Deeploy account/project/funding and tunneling
   prerequisites linked to general guides; Service -> R1 MeshDB; resource tier
   and at least three distinct explicitly selected nodes; input examples appdb /
   app_user / generated secret; Public Service and SQL TCP tunnel; automatic peer
   and console tunnels; duration, review/payment, running instances and successful
   query as checks. Map SQL endpoint vs HTTPS Console vs CA download. No guessed
   fixed endpoint/digest/prices. Brief clock, expiry, backup, and topology cautions.
3. `dashboard.md`: running job Deployment -> Open R1 MeshDB Console; User,
   Password, Database login fields (replace defaultdb with configured appdb).
   Overview / Tables / SQL / Run query / Refresh / Sign out match actual source.
   One statement per click, result/error handling, no psql backslash commands,
   no expectation that USE persists across requests. Sign out/in with another
   Database to change context, or use fully qualified SQL. Health indicator is
   not proof of replica/quorum health. No invented metrics or table editor.
4. `databases.md`: create a shop database and an orders table; insert and select
   one sample order; confirm via console Tables after choosing shop. A second
   database can separate another app but shares cluster users/resources/failure
   domain. Explain configured operator vs restricted app user. Optional scoped
   login and explicit CONNECT / schema USAGE / table DML grants, with clear
   password placeholder and no admin role. Grants apply to existing objects,
   not all future tables. PostgreSQL-compatible client settings and a password-
   prompting psql example with downloaded r1-meshdb-ca.crt, verify-full, and the
   actual assigned hostname/port. No insecure fallback or secrets in URI.

Keep deployment internals, upgrade/recovery runbooks, performance claims,
release workflows, and exhaustive SQL reference out of this beginner section.
Existing legacy jobs are not migrated by creating a new job on the same nodes.
Target roughly 1,500-2,000 words total; prefer direct steps over template boilerplate.

## Other Surgical Edits

- Add category metadata at position 3, links in Deployable Services index.
- Replace only the CockroachDB row and related node-count/name references in the
  existing Service Catalog, linking to MeshDB. Preserve other service claims.
- Register section 9.3 and Bleo ownership in todo/README.md and TODO_BLEO.md.
- Keep plan and review evidence in todo/bleo; no root AGENTS task history.

## Sources Checked Before Drafting

Freshly fetched main refs, read with git show (main checkouts unchanged):

- Deeploy `/mnt/c/repos/deeploy-dapp`, `552075cc`:
  src/data/services.ts (name, minimum=3, fields, stable image, storage);
  src/lib/deeploy/cockroachdb-service.ts (validation/tunnels/topology);
  src/components/create-job/steps/deployment/ServiceDeployment.tsx;
  src/components/job/config/JobDeploymentSection.tsx (console and CA actions);
  src/components/create-job/steps/deployment/CockroachDbTlsControls.tsx.
- MeshDB `/mnt/c/workspaces/r1_wrapper/r1-distributed-sql`, `e638553f`:
  README.md, entrypoint.sh (operator permissions and all-node replica/voter
  settings), RATIO1_PATCHES.md, engine/pkg/ui/distoss/assets/bundle.js
  (first-party console and stateless SQL API use), secure single-node smoke.
- Version-pinned upstream SQL docs: /docs/v23.1/create-database, create-user,
  grant. Implementation and runnable checks take precedence over current-version
  upstream UI instructions. No claims of endorsement or upstream support.

## Review and Verification Plan

1. Adversarial subagent reviews this plan and source-backed assumptions before
   any published page is drafted. Resolve findings here first.
2. Establish baseline build/typecheck using Node >=20 (host Node 18 is too old)
   and the existing lockfile. Do not change package manifests or lockfile to
   obtain a passing build. Use temporary tool/runtime containers if necessary.
3. After drafting, compile docs and validate new routes, sidebar order, links,
   source provenance and no secrets/unsupported UI claims. Check desktop/mobile
   rendered pages and use a genuine local console screenshot if useful.
4. Replay each SQL statement against a disposable local MeshDB v1.0.2 runtime
   using the same non-admin CREATEDB/CREATEROLE/CREATELOGIN bootstrap contract.
   Verify positive CRUD and negative restricted-user access. Exercise console
   login, SQL, Tables, and database switching where feasible. Test SQL TLS with
   verified CA/hostname, not sslmode=disable/require as a recommended shortcut.
5. No live customer job, external tunnel, blockchain action or hybrid test is
   required for docs. Local standalone database is example verification, not
   proof of distributed failover/deployment readiness. Bind loopback only,
   unique task-owned names/directories; clean up disposable database containers.
6. Request a final adversarial content review, resolve findings, rerun affected
   checks. Keep the docs worktree uncommitted unless asked to commit/open a PR.

## Risks to Check

- Actual console state differs from upstream DB Console; login defaults to
  defaultdb and switching cannot rely on a persistent USE session.
- Do not confuse the paid deployment/job, the distributed cluster and SQL
  databases, or advertise automatic legacy-store recovery/expiry restoration.
- A selected node count does not multiply usable logical database storage;
  replication is not backup. No strong HA claim for a single public tunnel.
- Credentials are SQL identities, not wallet/Deeploy logins. Configured user has
  management powers, not root/admin, and should not be copied into every app.
- Browser HTTPS and SQL CA trust are separate; do not import the SQL CA into
  the browser or instruct bypassing certificate warnings.
- Existing docs have unrelated stale information; update only links and claims
  necessary to prevent contradictions with this MeshDB section.

## Adversarial Plan Review - 2026-09-15

Independent read-only reviewer: meshdb_docs_critic. Verdict: accept with minor
clarifications; no blockers. Resolved before drafting:

- Deploy already creates appdb. Creating shop is optional, not a missing setup step.
- Restrict claims to granted table operations; inherited/public privileges mean
  a separate database/login is not a complete tenant-isolation guarantee. Test
  denied access to an ungranted table, not merely connection to another database.
- Topology is not wholly immutable: append-only scale-up exists, while removal,
  replacement and reordering are rejected. Keep scaling procedures out of scope.
- Replay tutorial SQL through the console API, not just a persistent SQL client.
- Date and source-pin factual review, without claiming current main proves every
  hosted UI or existing cluster has been upgraded.

## Draft Verification Findings

- Final reviewer identified wizard order: Select Service -> Specifications ->
  Cost & Duration -> Deployment. Guide corrected before acceptance.
- Real v1.0.2 console SQL replay caught a source/API limit missed by initial
  review: CREATE USER returns Ack, rejected by api_v2_sql.go; USE and ALTER USER
  are rejected too. Kept database/table/CRUD steps in console, moved user/grant
  setup to a clearly introduced SQL-client step. No engine changes requested.
- PostgreSQL 17 psql `\password` succeeded against v1.0.2, including login with
  the resulting password. Use this prompt instead of a secret-bearing SQL
  literal. The final flow also passed with the configured non-admin user.
- Baseline build and typecheck passed in Node 22 container, no dependency edits.
- Non-admin replay then found GRANT USAGE ON SCHEMA shop.public is not delegable
  by the configured operator: public inherits USAGE/CREATE without grant option.
  Tutorial now creates an operator-owned app schema and uses shop.app.orders,
  allowing explicit schema delegation without root or an engine patch. Test both
  denied reads on an ungranted table and denied schema changes as orders_app.

## Final Verification and Review

- Independent adversarial reviewer accepted the revised final pages with no
  blocking findings. Its last clarity suggestion (replace user=app_user in the
  psql command when deploying with another name) was applied. Parent final
  review checked source pins, scope, screenshot content, and rendered navigation.
- `npm run build` and `npm run typecheck` passed under Node 22 with the existing
  lockfile. `git diff --check` passed. Unchanged baseline warnings: absent blog
  directory and old browser-compatibility datasets. No dependency/theme edits.
- Secure standalone image `ghcr.io/ratio1/r1-meshdb:v1.0.2`, digest
  `sha256:fe6e5fef489cd1f7690ed549d4db163bb375d9b545bb96d227fedbe978a28781`:
  all 11 Markdown SQL blocks passed (7 console API, 4 psql), plus the optional
  support database, interactive psql password creation, and verified-TLS login.
- Restricted orders_app CRUD passed. Six negative checks denied reading two
  ungranted tables, creating a table in app, creating a database/user, and gaining
  admin membership. Anonymous console SQL was rejected. API session restrictions
  and per-request database context were confirmed independently.
- Playwright 1.58.2: console login, Overview, Tables/Refresh, exact documented
  SELECT, sign-out/in database switching, and logout passed. Captured the real
  sample-data console screenshot, with no credentials or live customer data.
- Rendered all four docs routes at 1440px desktop and 390px mobile; checked
  navigation, 30 internal links/fragments, image loading, and horizontal overflow.
  No browser JavaScript errors. Screenshot inspected against actual console UI.
- Local evidence/scripts: workspace `.local/meshdb-docs-20260915/`, especially
  `verify-examples.py`, `verify-browser.cjs`, `verify-docs-browser.cjs`, and
  desktop/mobile screenshots. Python runner: umbrella313 venv; browser runner:
  official Playwright container. No test harness/dependencies added to docs.
- Local-only SQL/console checks are not a real Deeploy deployment or distributed
  failover test. No customer job, remote node, tunnel, payment, or release changed.
- Preview: `http://localhost:3094/deployable-services/r1-meshdb/`, served from
  this worktree's build by `r1-meshdb-docs-preview-20260915`. Stop that container
  when no longer needed. User subsequently requested a commit and PR against
  docs main; the tested documentation content is unchanged for submission.
