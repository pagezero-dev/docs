---
title: Environment Variables
description: Complete reference for environment variables used in PageZero applications.
---

This reference provides a comprehensive guide to all environment variables used in PageZero applications, including their purpose, required values, and configuration across different environments.

## Environment Files

PageZero uses different environment files for different contexts:

| File                | Purpose                | When Used                  |
| ------------------- | ---------------------- | -------------------------- |
| `.env.local`        | Local development      | Development server         |
| `.env.preview`      | Preview deployments    | PR previews                |
| `.env.production`   | Production             | Live application           |
| `.dev.vars`         | Cloudflare development | Local Cloudflare functions |
| `.dev.vars.example` | Template               | Initial setup              |

## Core Application Variables

### `APP_ENV`

**Type**: `string`  
**Required**: Yes  
**Default**: `development`  
**Values**: `development` | `preview` | `production`

Defines the current application environment. Affects logging, error handling, and feature flags.

```bash
# Development
APP_ENV=development

# Preview (staging)
APP_ENV=preview

# Production
APP_ENV=production
```

**Usage**:

```typescript
const isProduction = process.env.APP_ENV === "production"
const isDevelopment = process.env.APP_ENV === "development"
```

### `NODE_ENV`

**Type**: `string`  
**Required**: Yes (usually auto-set)  
**Default**: Set by build tools  
**Values**: `development` | `production` | `test`

Standard Node.js environment variable that affects library behavior and optimizations.

```bash
NODE_ENV=production
```

## Database Configuration

### `DATABASE_URL`

**Type**: `string`  
**Required**: Yes for local development  
**Format**: SQLite path or connection string

Path to your local SQLite database file.

```bash
# Local SQLite file
DATABASE_URL=file:./local.db

# Absolute path
DATABASE_URL=file:/absolute/path/to/database.db

# In-memory (testing)
DATABASE_URL=:memory:
```

### `DB_AUTH_TOKEN`

**Type**: `string`  
**Required**: For remote D1 access  
**Description**: Authentication token for D1 database access

```bash
DB_AUTH_TOKEN=your-d1-auth-token
```

## Authentication & Security

### `JWT_SECRET`

**Type**: `string`  
**Required**: Yes  
**Description**: Secret key for signing JWT tokens  
**Length**: Minimum 32 characters

```bash
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
```

**Generation**:

```bash
# Generate secure random secret
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### `SESSION_SECRET`

**Type**: `string`  
**Required**: For session-based auth  
**Description**: Secret for session encryption  
**Length**: Minimum 32 characters

```bash
SESSION_SECRET=another-super-secret-session-key-minimum-32-chars
```

### `BCRYPT_ROUNDS`

**Type**: `number`  
**Required**: No  
**Default**: `12`  
**Range**: 10-15

Number of salt rounds for password hashing. Higher values are more secure but slower.

```bash
# Development (faster)
BCRYPT_ROUNDS=10

# Production (more secure)
BCRYPT_ROUNDS=12
```

## API Configuration

### `API_BASE_URL`

**Type**: `string`  
**Required**: For external API calls  
**Description**: Base URL for your API endpoints

```bash
# Development
API_BASE_URL=http://localhost:3000/api

# Production
API_BASE_URL=https://your-app.pages.dev/api
```

### `CORS_ORIGIN`

**Type**: `string` or `string[]`  
**Required**: For API CORS configuration  
**Description**: Allowed origins for CORS

```bash
# Single origin
CORS_ORIGIN=https://your-frontend.com

# Multiple origins (JSON array)
CORS_ORIGIN=["https://your-frontend.com","https://admin.your-app.com"]

# Development (allow all)
CORS_ORIGIN=*
```

### `RATE_LIMIT_MAX`

**Type**: `number`  
**Required**: No  
**Default**: `100`  
**Description**: Maximum requests per window

```bash
RATE_LIMIT_MAX=100
```

### `RATE_LIMIT_WINDOW`

**Type**: `number`  
**Required**: No  
**Default**: `900000` (15 minutes)  
**Description**: Rate limit window in milliseconds

```bash
# 15 minutes
RATE_LIMIT_WINDOW=900000

# 1 hour
RATE_LIMIT_WINDOW=3600000
```

## Email Configuration

### `EMAIL_PROVIDER`

**Type**: `string`  
**Required**: For email functionality  
**Values**: `sendgrid` | `resend` | `smtp`

```bash
EMAIL_PROVIDER=resend
```

### `RESEND_API_KEY`

**Type**: `string`  
**Required**: For Resend email service  
**Description**: API key from Resend dashboard

```bash
RESEND_API_KEY=re_your-resend-api-key
```

### `SENDGRID_API_KEY`

**Type**: `string`  
**Required**: For SendGrid email service  
**Description**: API key from SendGrid dashboard

```bash
SENDGRID_API_KEY=SG.your-sendgrid-api-key
```

### `EMAIL_FROM`

**Type**: `string`  
**Required**: Yes for email  
**Format**: Email address  
**Description**: Default "from" address for emails

```bash
EMAIL_FROM=noreply@your-app.com
```

### `SMTP_*` Variables

For custom SMTP configuration:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## File Storage

### `STORAGE_PROVIDER`

**Type**: `string`  
**Required**: For file uploads  
**Values**: `r2` | `s3` | `local`

```bash
STORAGE_PROVIDER=r2
```

### `R2_ACCOUNT_ID`

**Type**: `string`  
**Required**: For Cloudflare R2  
**Description**: Your Cloudflare account ID

```bash
R2_ACCOUNT_ID=your-cloudflare-account-id
```

### `R2_ACCESS_KEY_ID`

**Type**: `string`  
**Required**: For Cloudflare R2  
**Description**: R2 access key ID

```bash
R2_ACCESS_KEY_ID=your-r2-access-key-id
```

### `R2_SECRET_ACCESS_KEY`

**Type**: `string`  
**Required**: For Cloudflare R2  
**Description**: R2 secret access key

```bash
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
```

### `R2_BUCKET_NAME`

**Type**: `string`  
**Required**: For Cloudflare R2  
**Description**: Name of your R2 bucket

```bash
R2_BUCKET_NAME=your-app-uploads
```

## External Services

### `STRIPE_PUBLISHABLE_KEY`

**Type**: `string`  
**Required**: For Stripe payments  
**Description**: Stripe publishable key (safe for client-side)

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
```

### `STRIPE_SECRET_KEY`

**Type**: `string`  
**Required**: For Stripe payments  
**Description**: Stripe secret key (server-side only)

```bash
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
```

### `STRIPE_WEBHOOK_SECRET`

**Type**: `string`  
**Required**: For Stripe webhooks  
**Description**: Webhook endpoint secret from Stripe

```bash
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### `ANALYTICS_ID`

**Type**: `string`  
**Required**: For analytics tracking  
**Description**: Google Analytics or other analytics service ID

```bash
# Google Analytics
ANALYTICS_ID=G-XXXXXXXXXX

# Plausible
ANALYTICS_ID=your-domain.com
```

## Development & Debugging

### `DEBUG`

**Type**: `string`  
**Required**: No  
**Description**: Enable debug logging for specific modules

```bash
# Debug all modules
DEBUG=*

# Debug specific module
DEBUG=app:auth

# Debug multiple modules
DEBUG=app:*,db:*
```

### `LOG_LEVEL`

**Type**: `string`  
**Required**: No  
**Default**: `info`  
**Values**: `error` | `warn` | `info` | `debug` | `trace`

```bash
# Development
LOG_LEVEL=debug

# Production
LOG_LEVEL=info
```

### `VITE_*` Variables

Variables prefixed with `VITE_` are exposed to the client-side code:

```bash
# API URL for client
VITE_API_URL=http://localhost:3000/api

# Feature flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT=false

# Public keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
```

**Usage in frontend**:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS === "true"
```

## Testing Variables

### `TEST_DATABASE_URL`

**Type**: `string`  
**Required**: For integration tests  
**Description**: Database URL for test environment

```bash
TEST_DATABASE_URL=file:./test.db
```

### `TEST_EMAIL_PROVIDER`

**Type**: `string`  
**Required**: No  
**Default**: `console`  
**Values**: `console` | `memory` | same as production

```bash
# Log emails to console
TEST_EMAIL_PROVIDER=console

# Store emails in memory for testing
TEST_EMAIL_PROVIDER=memory
```

### `CI`

**Type**: `boolean`  
**Required**: Auto-set in CI  
**Description**: Indicates running in CI environment

```bash
CI=true
```

## Environment-Specific Examples

### Development (`.env.local`)

```bash
# Application
APP_ENV=development
NODE_ENV=development

# Database
DATABASE_URL=file:./local.db

# Authentication
JWT_SECRET=dev-jwt-secret-at-least-32-characters-long
SESSION_SECRET=dev-session-secret-at-least-32-characters

# API
API_BASE_URL=http://localhost:3000/api
CORS_ORIGIN=*

# Email (development)
EMAIL_PROVIDER=console
EMAIL_FROM=dev@localhost

# Debug
DEBUG=app:*
LOG_LEVEL=debug

# Client-side
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_ANALYTICS=false
```

### Preview (`.env.preview`)

```bash
# Application
APP_ENV=preview
NODE_ENV=production

# Authentication
JWT_SECRET=preview-jwt-secret-32-chars-minimum
SESSION_SECRET=preview-session-secret-32-chars-min

# Email
EMAIL_PROVIDER=resend
EMAIL_FROM=preview@your-app.com
RESEND_API_KEY=re_preview_api_key

# API
API_BASE_URL=https://preview-branch.your-app.pages.dev/api
CORS_ORIGIN=https://preview-branch.your-app.pages.dev

# Client-side
VITE_API_URL=https://preview-branch.your-app.pages.dev/api
VITE_ENABLE_ANALYTICS=false
```

### Production (`.env.production`)

```bash
# Application
APP_ENV=production
NODE_ENV=production

# Authentication (stored in Cloudflare dashboard)
JWT_SECRET=${JWT_SECRET}
SESSION_SECRET=${SESSION_SECRET}

# Email
EMAIL_PROVIDER=resend
EMAIL_FROM=noreply@your-app.com
RESEND_API_KEY=${RESEND_API_KEY}

# API
API_BASE_URL=https://your-app.com/api
CORS_ORIGIN=https://your-app.com

# Analytics
ANALYTICS_ID=${ANALYTICS_ID}

# Client-side
VITE_API_URL=https://your-app.com/api
VITE_ENABLE_ANALYTICS=true
VITE_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}

# Logging
LOG_LEVEL=info
```

## Cloudflare-Specific Variables

### Wrangler Development (`.dev.vars`)

```bash
# Database access
DB_AUTH_TOKEN=your-local-d1-token

# API keys for local development
RESEND_API_KEY=re_your_local_key
STRIPE_SECRET_KEY=sk_test_local_key

# Storage
R2_ACCESS_KEY_ID=local_r2_key
R2_SECRET_ACCESS_KEY=local_r2_secret
```

### Cloudflare Pages Environment Variables

Set in Cloudflare Dashboard → Pages → Settings → Environment variables:

**Production**:

- `APP_ENV=production`
- `JWT_SECRET` (secret)
- `RESEND_API_KEY` (secret)
- `STRIPE_SECRET_KEY` (secret)

**Preview**:

- `APP_ENV=preview`
- `JWT_SECRET` (different from production)
- `RESEND_API_KEY` (preview key)

### Cloudflare D1 Bindings

Configure in `wrangler.toml` and Cloudflare dashboard:

```toml
# wrangler.toml
[[d1_databases]]
binding = "DB"
database_name = "your-app-production"
database_id = "your-db-id"
```

## Environment Variable Validation

### Runtime Validation

```typescript
// src/lib/env.ts
import { z } from "zod"

const envSchema = z.object({
  APP_ENV: z.enum(["development", "preview", "production"]),
  JWT_SECRET: z.string().min(32),
  EMAIL_FROM: z.string().email(),
  API_BASE_URL: z.string().url(),
  VITE_API_URL: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)
```

### TypeScript Declarations

```typescript
// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: "development" | "preview" | "production"
    JWT_SECRET: string
    EMAIL_FROM: string
    API_BASE_URL: string
    VITE_API_URL?: string
  }
}

declare interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
}
```

## Security Best Practices

### 1. Never Commit Secrets

```bash
# Add to .gitignore
.env.local
.env.production
.env.preview
.dev.vars
```

### 2. Use Strong Secrets

```bash
# Generate secure secrets
openssl rand -base64 32

# Use different secrets per environment
```

### 3. Validate Environment Variables

```typescript
// Fail fast on missing required variables
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required")
}
```

### 4. Use Environment-Specific Values

- Different secrets for each environment
- Different API endpoints
- Different service configurations

### 5. Client-Side Variables

Only expose necessary variables to client:

```bash
# ✅ Good - public configuration
VITE_API_URL=https://api.example.com

# ❌ Bad - secret exposed to client
VITE_JWT_SECRET=secret-key
```

## Troubleshooting

### Common Issues

#### Environment Variables Not Loading

```bash
# Check file location and name
ls -la .env*

# Verify syntax (no spaces around =)
KEY=value  # ✅ Good
KEY = value  # ❌ Bad
```

#### Client-Side Variables Not Available

```typescript
// Client-side variables must be prefixed with VITE_
console.log(import.meta.env.VITE_API_URL) // ✅ Works
console.log(import.meta.env.API_URL) // ❌ Undefined
```

#### Cloudflare Variables Not Working

1. Check Cloudflare Pages environment settings
2. Verify variable names match exactly
3. Ensure secrets are properly encrypted

This comprehensive environment variable reference ensures your PageZero application is properly configured across all environments! 🔧

For deployment-specific configuration, see the [Deployment Guide](/guides/deployment/).
