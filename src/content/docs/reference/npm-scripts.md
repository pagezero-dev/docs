---
title: NPM Scripts Reference
description: Complete reference for all available NPM scripts in PageZero projects.
---

This reference provides a comprehensive guide to all NPM scripts available in PageZero projects, including their purpose, usage, and options.

## Essential Scripts

### Development

#### `npm run dev`

**Purpose**: Start the development server with hot module replacement

```bash
npm run dev
```

**What it does**:

- Starts Vite development server on `http://localhost:3000`
- Enables hot module replacement for instant updates
- Compiles TypeScript and processes TailwindCSS
- Serves static assets from `public/` directory
- Enables source maps for debugging

**Options**:

```bash
# Run on different port
npm run dev -- --port 3001

# Expose to network (accessible from other devices)
npm run dev -- --host

# Open browser automatically
npm run dev -- --open
```

#### `npm run setup`

**Purpose**: Complete project initialization for new installations

```bash
npm run setup
```

**What it does**:

1. Installs all npm dependencies
2. Sets up environment variables from templates
3. Initializes local SQLite database
4. Runs initial database migrations
5. Installs Playwright browser drivers
6. Seeds database with sample data (if configured)

**Equivalent to**:

```bash
npm install
cp .env.example .env.local
npm run db:migrate
npx playwright install
```

### Production

#### `npm run build`

**Purpose**: Build the application for production deployment

```bash
npm run build
```

**What it does**:

- Compiles TypeScript with strict type checking
- Bundles and optimizes JavaScript/CSS
- Generates static assets with cache-friendly hashes
- Optimizes images and fonts
- Creates production-ready files in `dist/` directory
- Generates build manifest and stats

**Build artifacts**:

```
dist/
├── assets/           # Bundled and hashed assets
├── _routes.json      # Route manifest for Cloudflare
├── index.html        # Entry point
└── server/           # Server-side code
```

#### `npm start`

**Purpose**: Run the production build locally for testing

```bash
npm start
```

**What it does**:

- Serves the built application from `dist/` directory
- Simulates production environment
- Useful for testing production builds before deployment

### Quality Assurance

#### `npm run doctor`

**Purpose**: Run all quality checks in sequence

```bash
npm run doctor
```

**What it does**:

1. Code formatting check (`npm run format`)
2. Linting check (`npm run lint`)
3. TypeScript type checking (`npm run test:types`)
4. Unit test execution (`npm run test:run`)

**Exit codes**:

- `0`: All checks passed
- `1`: One or more checks failed

Use this command before committing code or in CI/CD pipelines.

## Testing Scripts

### Unit Testing

#### `npm test`

**Purpose**: Run unit tests in watch mode for development

```bash
npm test
```

**What it does**:

- Runs Vitest in watch mode
- Re-runs tests when files change
- Provides interactive test filtering
- Shows test coverage information

**Interactive commands** (while running):

- `a`: Run all tests
- `f`: Run only failed tests
- `t`: Filter by test name pattern
- `p`: Filter by file name pattern
- `c`: Show coverage report
- `q`: Quit watch mode

#### `npm run test:run`

**Purpose**: Run all unit tests once (CI mode)

```bash
npm run test:run
```

**Options**:

```bash
# Run specific test file
npm run test:run -- user.test.ts

# Run tests matching pattern
npm run test:run -- --grep "user authentication"

# Run tests with coverage
npm run test:run -- --coverage

# Run tests with verbose output
npm run test:run -- --reporter=verbose
```

#### `npm run test:coverage`

**Purpose**: Generate detailed test coverage report

```bash
npm run test:coverage
```

**What it does**:

- Runs all unit tests
- Generates coverage report in `coverage/` directory
- Creates HTML report for browser viewing
- Outputs coverage summary to console

**Coverage thresholds** (configurable in `vitest.config.ts`):

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

#### `npm run test:types`

**Purpose**: Check TypeScript types without running tests

```bash
npm run test:types
```

**What it does**:

- Runs TypeScript compiler in check mode
- Validates all type definitions
- Reports type errors without generating files
- Faster than full compilation

### End-to-End Testing

#### `npm run test:e2e`

**Purpose**: Run all E2E tests headlessly

```bash
npm run test:e2e
```

**What it does**:

- Starts development server automatically
- Runs Playwright tests in headless browsers
- Tests across Chrome, Firefox, and Safari
- Generates test report in `playwright-report/`

**Options**:

```bash
# Run specific test file
npm run test:e2e -- auth.spec.ts

# Run tests in headed mode (visible browser)
npm run test:e2e -- --headed

# Run tests in specific browser
npm run test:e2e -- --project=chromium

# Run tests with debugging
npm run test:e2e -- --debug
```

#### `npm run test:e2e:ui`

**Purpose**: Run E2E tests with interactive UI

```bash
npm run test:e2e:ui
```

**What it does**:

- Opens Playwright Test UI in browser
- Allows running tests individually
- Provides real-time test execution view
- Enables step-by-step debugging
- Shows test timeline and screenshots

#### `npm run test:e2e:debug`

**Purpose**: Debug E2E tests with browser DevTools

```bash
npm run test:e2e:debug
```

**What it does**:

- Runs tests in headed mode
- Enables debugging breakpoints
- Opens browser DevTools
- Allows step-by-step execution

## Code Quality Scripts

### Linting

#### `npm run lint`

**Purpose**: Check code for linting errors

```bash
npm run lint
```

**What it does**:

- Runs ESLint on all TypeScript and JavaScript files
- Checks for code quality issues
- Enforces coding standards
- Reports unused variables and imports

**Options**:

```bash
# Fix auto-fixable issues
npm run lint -- --fix

# Lint specific files
npm run lint -- src/components/

# Show warning details
npm run lint -- --format=detailed

# Lint and output JSON
npm run lint -- --format=json
```

#### `npm run lint:fix`

**Purpose**: Automatically fix linting issues where possible

```bash
npm run lint:fix
```

**What it does**:

- Runs ESLint with `--fix` flag
- Automatically fixes code style issues
- Adds missing semicolons, removes unused imports
- Formats code according to ESLint rules

### Code Formatting

#### `npm run format`

**Purpose**: Check code formatting without making changes

```bash
npm run format
```

**What it does**:

- Runs Prettier in check mode
- Reports formatting inconsistencies
- Exits with error code if formatting needed
- Useful for CI/CD validation

#### `npm run format:fix`

**Purpose**: Format all code files

```bash
npm run format:fix
```

**What it does**:

- Runs Prettier on all supported files
- Automatically formats code
- Applies consistent spacing, quotes, semicolons
- Updates files in place

**File types supported**:

- TypeScript/JavaScript (`.ts`, `.tsx`, `.js`, `.jsx`)
- JSON (`.json`)
- Markdown (`.md`, `.mdx`)
- CSS (`.css`)
- YAML (`.yml`, `.yaml`)

## Database Scripts

### Migrations

#### `npm run db:generate`

**Purpose**: Generate database migration from schema changes

```bash
npm run db:generate
```

**What it does**:

- Compares current schema with database
- Generates SQL migration file
- Creates timestamped migration in `migrations/` directory
- Handles table creation, alterations, and deletions

**Example output**:

```
migrations/
└── 0003_add_user_profile_table.sql
```

#### `npm run db:migrate`

**Purpose**: Apply pending migrations to database

```bash
npm run db:migrate
```

**What it does**:

- Runs all pending migrations
- Updates database schema
- Records applied migrations in migration table
- Creates database if it doesn't exist

**Options**:

```bash
# Migrate to specific migration
npm run db:migrate -- --to=0002

# Show migration status
npm run db:migrate -- --dry-run
```

#### `npm run db:push`

**Purpose**: Push schema changes directly to database (development only)

```bash
npm run db:push
```

**What it does**:

- Applies schema changes without generating migrations
- Useful for rapid prototyping
- ⚠️ **Warning**: Can cause data loss in production

#### `npm run db:studio`

**Purpose**: Open database studio for visual editing

```bash
npm run db:studio
```

**What it does**:

- Starts Drizzle Studio on `http://localhost:3333`
- Provides web interface for database browsing
- Allows viewing and editing data
- Shows table relationships and schema

### Database Utilities

#### `npm run db:seed`

**Purpose**: Populate database with sample data

```bash
npm run db:seed
```

**What it does**:

- Runs seed scripts from `src/db/seeds/`
- Populates tables with test data
- Useful for development and testing
- Idempotent (safe to run multiple times)

#### `npm run db:reset`

**Purpose**: Reset database to initial state

```bash
npm run db:reset
```

**What it does**:

- Drops all tables
- Re-runs all migrations
- Applies seed data
- ⚠️ **Warning**: Destroys all data

## Storybook Scripts

#### `npm run storybook`

**Purpose**: Start Storybook development server

```bash
npm run storybook
```

**What it does**:

- Starts Storybook on `http://localhost:6006`
- Hot-reloads component stories
- Provides component isolation environment
- Enables interactive component testing

#### `npm run build-storybook`

**Purpose**: Build Storybook for production

```bash
npm run build-storybook
```

**What it does**:

- Generates static Storybook build
- Outputs to `storybook-static/` directory
- Ready for hosting on any static server
- Includes all stories and documentation

## Deployment Scripts

#### `npm run preview`

**Purpose**: Preview production build locally

```bash
npm run preview
```

**What it does**:

- Serves production build with Vite preview
- Simulates production environment
- Useful for final testing before deployment

#### `npm run deploy`

**Purpose**: Deploy to Cloudflare Pages (if configured)

```bash
npm run deploy
```

**What it does**:

- Builds application for production
- Uploads to Cloudflare Pages
- Runs database migrations on production
- Updates environment-specific configurations

## Environment-Specific Scripts

### Development Environment

```bash
# Full development setup
npm run dev:full
# Equivalent to: npm run dev & npm run storybook

# Development with database studio
npm run dev:db
# Equivalent to: npm run dev & npm run db:studio
```

### CI/CD Scripts

```bash
# CI pipeline script
npm run ci
# Equivalent to: npm run test:run && npm run test:e2e && npm run lint && npm run test:types

# Pre-commit hook
npm run pre-commit
# Equivalent to: npm run lint:fix && npm run format:fix && npm run test:run
```

## Custom Script Examples

### Adding Custom Scripts

Add custom scripts to `package.json`:

```json
{
  "scripts": {
    "dev:api": "cd apps/api && npm run dev",
    "dev:web": "cd apps/web && npm run dev",
    "dev:all": "concurrently \"npm run dev:api\" \"npm run dev:web\"",
    "clean": "rm -rf dist coverage node_modules/.cache",
    "deps:check": "npm audit && npm outdated",
    "deps:update": "npm update && npm audit fix"
  }
}
```

### Script Composition

Chain scripts for complex workflows:

```bash
# Pre-deployment check
npm run build && npm run test:e2e && npm run lint

# Full reset and setup
npm run clean && npm install && npm run setup

# Development with all tools
npm run dev & npm run storybook & npm run db:studio
```

## Troubleshooting Scripts

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Use different port
npm run dev -- --port 3001
```

#### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

#### Database Issues

```bash
# Reset database
rm -f local.db
npm run db:migrate

# Check database status
npm run db:studio
```

### Performance Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for unused dependencies
npx depcheck

# Update dependencies
npm audit fix
npm update
```

## Script Configuration

### Environment Variables

Scripts can be configured via environment variables:

```bash
# Custom test timeout
VITEST_TIMEOUT=10000 npm test

# Custom build target
BUILD_TARGET=production npm run build

# Debug mode
DEBUG=true npm run dev
```

### Package.json Configuration

Configure script behavior in `package.json`:

```json
{
  "config": {
    "port": "3000",
    "host": "localhost"
  },
  "scripts": {
    "dev": "vite --port $npm_config_port --host $npm_config_host"
  }
}
```

This comprehensive script reference ensures you can efficiently manage your PageZero project throughout its entire lifecycle! 🚀

For more details on specific tools, see the [Development Guide](/guides/development/) and [Testing Guide](/guides/testing/).
