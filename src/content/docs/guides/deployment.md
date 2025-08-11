---
title: Deployment Setup
description: Complete guide to deploying PageZero applications to Cloudflare Pages with automated CI/CD.
---

This comprehensive guide will walk you through setting up automated deployment for your PageZero application using Cloudflare Pages and GitHub Actions.

## Overview

PageZero deployment consists of two main components:

1. **Cloudflare Pages** - Hosts your frontend application
2. **Cloudflare D1** - Manages your database with automatic migrations

The deployment process is fully automated through GitHub Actions, providing:

- **Production deployments** on every merge to `main`
- **Preview deployments** for every pull request
- **Database migrations** applied automatically
- **Environment-specific configurations**

## Prerequisites

Before starting, ensure you have:

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is sufficient)
- A [GitHub repository](https://github.com) with your PageZero project
- Admin access to both accounts

## Step 1: Cloudflare Services Setup

### 1.1 Create D1 Databases

Navigate to **Cloudflare Dashboard > Storage & Databases > D1 SQL Database**

Create two databases:

- `your-project-name_production` - For your live application
- `your-project-name_preview` - For preview deployments

> 💡 **Tip**: Replace `your-project-name` with your actual project name to keep things organized.

**Take note of the Database IDs** - you'll need them later for GitHub configuration.

### 1.2 Create Cloudflare Pages Project

Navigate to **Cloudflare Dashboard > Workers & Pages > Create Application**

1. Choose **"Pages"** tab
2. Select **"Direct Upload"** method
3. Enter your project name
4. Click **"Create project"**

> ⚠️ **Important**: Don't upload any files yet - GitHub Actions will handle deployments.

### 1.3 Configure Environment Variables and Bindings

In your newly created Pages project, go to **Settings > Environment variables**:

#### Production Environment

**Variables:**

```
APP_ENV=production
```

**Bindings:**

- Type: D1 database
- Variable name: `DB`
- D1 database: `your-project-name_production`

#### Preview Environment

**Variables:**

```
APP_ENV=preview
```

**Bindings:**

- Type: D1 database
- Variable name: `DB`
- D1 database: `your-project-name_preview`

## Step 2: GitHub Repository Setup

### 2.1 Required Information

Gather the following information from your Cloudflare dashboard:

| Information                | Location                         |
| -------------------------- | -------------------------------- |
| **Account ID**             | Pages project → Right sidebar    |
| **Project Name**           | Pages project name               |
| **Production Database ID** | D1 → Production database details |
| **Preview Database ID**    | D1 → Preview database details    |

### 2.2 Create Cloudflare API Token

Navigate to **Cloudflare Dashboard > My Profile > API Tokens**

1. Click **"Create Token"**
2. Use **"Edit Cloudflare Workers"** template
3. **Account**: Select your account
4. **Zone**: Select "All zones" or specific zone
5. **Permissions**:
   - `Cloudflare Pages:Edit`
   - `D1:Edit`
6. Click **"Continue to summary"** → **"Create Token"**

> 🔐 **Security**: Copy the token immediately - it won't be shown again!

### 2.3 Configure GitHub Secrets and Variables

Navigate to your GitHub repository: **Settings > Secrets and variables > Actions**

#### Repository Variables

| Variable Name                       | Value                      |
| ----------------------------------- | -------------------------- |
| `CLOUDFLARE_PROJECT_NAME`           | Your Pages project name    |
| `CLOUDFLARE_DATABASE_ID_PRODUCTION` | Production database ID     |
| `CLOUDFLARE_DATABASE_ID_PREVIEW`    | Preview database ID        |
| `CLOUDFLARE_ACCOUNT_ID`             | Your Cloudflare account ID |

#### Repository Secrets

| Secret Name            | Value                   |
| ---------------------- | ----------------------- |
| `CLOUDFLARE_API_TOKEN` | API token from step 2.2 |

#### Dependabot Secrets

Navigate to **Settings > Secrets and variables > Dependabot**

| Secret Name            | Value                                                           |
| ---------------------- | --------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN` | Same API token (enables preview deployments for dependency PRs) |

## Step 3: Verify GitHub Actions Workflow

Your PageZero project should include a pre-configured workflow at `.github/workflows/deploy.yml`.

Key workflow features:

- **Quality checks**: Linting, type checking, testing
- **Preview deployments**: For every PR
- **Production deployments**: On merge to main
- **Database migrations**: Automatic schema updates
- **Rollback support**: Previous versions remain accessible

### Workflow Triggers

```yaml
# Runs on every push to main (production deployment)
push:
  branches: [main]

# Runs on every pull request (preview deployment)
pull_request:
  branches: [main]
```

### Environment-Specific Deployments

The workflow automatically determines the environment:

- **Pull requests** → Preview environment
- **Main branch** → Production environment

## Step 4: Test Your Deployment

### 4.1 Create a Test Pull Request

1. **Create a feature branch**:

   ```bash
   git checkout -b test-deployment
   ```

2. **Make a small change** (e.g., update a text file):

   ```bash
   echo "Testing deployment" > test.txt
   git add test.txt
   git commit -m "test: verify deployment pipeline"
   git push origin test-deployment
   ```

3. **Create a pull request** on GitHub

4. **Monitor the workflow**:
   - Go to **Actions** tab in your repository
   - Watch the deployment workflow execute
   - Check for any errors in the logs

### 4.2 Verify Preview Deployment

Once the workflow completes:

1. **Check PR comments** - Cloudflare will comment with preview URL
2. **Click "View deployment"** button in the PR
3. **Test functionality** on the preview site
4. **Verify database** operations work correctly

### 4.3 Test Production Deployment

1. **Merge the pull request** to main
2. **Monitor production workflow** in Actions tab
3. **Visit your production domain** to verify deployment
4. **Check database migrations** were applied correctly

## Step 5: Custom Domain Setup (Optional)

### 5.1 Add Custom Domain

In your Cloudflare Pages project:

1. Go to **Custom domains** tab
2. Click **"Set up a custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions

### 5.2 SSL/TLS Configuration

Cloudflare automatically provides:

- **Free SSL certificates**
- **Automatic HTTPS redirects**
- **HTTP/2 and HTTP/3** support

## Troubleshooting Common Issues

### Deployment Failures

#### Issue: Database migration errors

```bash
# Check migration files syntax
npm run db:generate

# Test migrations locally
npm run db:migrate
```

#### Issue: Build failures

```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run test:types

# Verify all dependencies
npm run doctor
```

#### Issue: Environment variable problems

1. Verify all variables are set in Cloudflare Pages
2. Check variable names match exactly
3. Ensure bindings are configured correctly

### GitHub Actions Issues

#### Issue: API token permissions

- Verify token has `Cloudflare Pages:Edit` and `D1:Edit` permissions
- Check token hasn't expired
- Ensure account ID is correct

#### Issue: Database ID errors

- Double-check database IDs in GitHub variables
- Verify databases exist in Cloudflare dashboard
- Ensure naming matches exactly

### Performance Issues

#### Issue: Slow deployments

- Check bundle size with `npm run analyze`
- Optimize images and assets
- Review dependency size

## Advanced Configuration

### Multiple Environments

For staging environments, create additional:

- D1 database for staging
- Pages environment configuration
- GitHub workflow modifications

### Database Backup Strategy

```bash
# Export production database (manual backup)
wrangler d1 export your-project-name_production --output backup.sql

# Schedule regular backups through GitHub Actions
# (Add to your workflow file)
```

### Monitoring and Alerts

Set up monitoring for:

- **Application uptime** via Cloudflare Analytics
- **Error rates** through custom logging
- **Performance metrics** with Core Web Vitals
- **Database usage** in Cloudflare dashboard

## Security Considerations

### API Token Security

- Use tokens with minimal required permissions
- Rotate tokens regularly
- Monitor token usage in Cloudflare dashboard

### Environment Variables

- Never commit secrets to version control
- Use different values for production/preview
- Regularly audit configured variables

### Database Security

- Enable D1 audit logging if available
- Monitor database access patterns
- Use parameterized queries (Drizzle handles this)

## Cost Management

### Free Tier Limits

**Cloudflare Pages:**

- 1 build at a time
- 500 builds per month
- 20,000 files per deployment

**Cloudflare D1:**

- 5 GB storage
- 25 million reads per month
- 50,000 writes per month

### Cost Optimization Tips

1. **Optimize bundle size** to reduce deployment time
2. **Use caching strategies** to reduce database reads
3. **Monitor usage** in Cloudflare dashboard
4. **Archive old preview deployments** if needed

## Next Steps

Once deployment is working:

1. **[Database Management](/guides/database/)** - Advanced database operations
2. **[Testing Guide](/guides/testing/)** - Comprehensive testing strategies
3. **[Performance Optimization](/guides/performance/)** - Speed up your application
4. **[Monitoring & Analytics](/guides/monitoring/)** - Track your app's health

Your PageZero application is now automatically deployed! Every code change will trigger the appropriate deployment pipeline, ensuring your users always have access to the latest version. 🚀
