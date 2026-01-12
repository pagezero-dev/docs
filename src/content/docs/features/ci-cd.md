---
title: CI / CD
---

Automated deployment pipeline using **GitHub Actions** and **Cloudflare Workers**. Every push triggers quality checks, tests, and deployments—zero manual steps required.

**Key features**

- Automatic deployments on every push to `main`
- Preview environments for pull requests
- Parallel quality, type, and unit test checks
- E2E tests before deployment
- Smoke tests after deployment
- Database migrations in the pipeline

## Pipeline Overview

```
Push/PR → Quality Check → Type Check → Unit Tests → E2E Tests → Database Migration → Deploy → Smoke Tests
              ↓              ↓             ↓              ↓
           (parallel)    (parallel)    (parallel)    (sequential)
```

The first three jobs (quality, types, unit tests) run in parallel. E2E tests wait for them to pass, then migration, deployment, and smoke tests run sequentially.

## Environments

| Branch | Environment | Database | URL |
|--------|-------------|----------|-----|
| `main` | Production | Production D1 | Your custom domain |
| PR branches | Preview | Preview D1 | `*.workers.dev` |

All PRs deploy to a shared preview environment with a separate database. This allows testing without affecting production data.

## Pipeline Jobs

### 1. Quality Check

Runs **Biome** for linting and formatting:

```bash
bunx biome ci
```

Catches code style issues, potential bugs, and formatting inconsistencies.

### 2. Type Check

Runs **TypeScript** compiler:

```bash
bun run check:types
```

Ensures type safety across the codebase.

### 3. Unit Tests

Runs **Vitest** with coverage:

```bash
bun run test:coverage
```

Executes all `*.test.ts` and `*.test.tsx` files.

### 4. E2E Tests

Runs **Playwright** tests after building the app:

```bash
bun run build
bun run test:e2e
```

Tests critical user flows against a local build.

### 5. Database Migration

Applies pending migrations to the target environment:

```bash
# Production
bun db:migrate:production

# Preview
bun db:migrate:preview
```

Migrations run before deployment to ensure the database schema is ready.

### 6. Deploy

Deploys to **Cloudflare Workers** using Wrangler:

- **Production** (`main` branch): Full deployment with `wrangler deploy`
- **Preview** (PRs): Version upload with `wrangler versions upload`

### 7. Smoke Tests

Runs a subset of Playwright tests against the deployed URL:

```bash
bun run test:smoke
```

Verifies the deployment is working correctly in the real environment.

## Setup

### GitHub Repository Variables

Add these as repository variables in GitHub Settings → Secrets and variables → Actions → Variables:

| Variable | Description |
|----------|-------------|
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `CLOUDFLARE_ACCESS_CLIENT_ID` | (Optional) For smoke tests through Cloudflare Access |

### GitHub Repository Secrets

Add these as repository secrets in GitHub Settings → Secrets and variables → Actions → Secrets:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | API token with Workers and D1 permissions |
| `CLOUDFLARE_ACCESS_CLIENT_SECRET` | (Optional) For smoke tests through Cloudflare Access |

### Creating a Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Add D1 edit permissions for your account
5. Copy the token to GitHub secrets

## Concurrency

The pipeline uses concurrency groups to prevent conflicts:

- **Workflow level**: Cancels in-progress runs when new commits are pushed to the same branch
- **Database level**: Ensures migrations don't run concurrently for the same environment

## Preview Database Reset

A separate workflow (`preview-db-reset.yml`) can reset the preview database to a clean state. Trigger it manually from GitHub Actions when needed:

1. Go to Actions → "Reset preview database"
2. Click "Run workflow"
3. Select the `main` branch

This cleans the database, runs migrations, and seeds with fresh data.

## Local Testing

Run the same checks locally before pushing:

```bash
# Quality check
bun run check

# Type check
bun run check:types

# Unit tests
bun run test

# E2E tests
bun run test:e2e
```

## Skipping CI

To skip the pipeline (e.g., for documentation-only changes), add `[skip ci]` to your commit message:

```bash
git commit -m "Update README [skip ci]"
```
