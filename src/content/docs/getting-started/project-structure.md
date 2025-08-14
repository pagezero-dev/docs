---
title: Project Structure
description: Complete reference for PageZero's project structure and file organization.
---

This reference provides a comprehensive overview of PageZero's project structure, explaining the purpose of each directory and file to help you navigate and understand the codebase.

## Root Directory Overview

```
my-pagezero-project/
├── .github/                  # GitHub Actions workflows and templates
├── .storybook/              # Storybook configuration
├── .vscode/                 # VS Code workspace settings
├── apps/                    # Application code (monorepo structure)
├── e2e/                     # End-to-end tests
├── functions/               # Cloudflare Workers functions
├── migrations/              # Database migration files
├── packages/                # Shared packages
├── public/                  # Static assets
├── tests/                   # Test utilities and setup
├── .dev.vars.example        # Example environment variables
├── .gitignore              # Git ignore patterns
├── .npmrc                  # NPM configuration
├── .prettierrc.json        # Prettier configuration
├── .tool-versions          # Tool version specifications
├── components.json         # UI component configuration
├── drizzle.config.ts       # Database ORM configuration
├── eslint.config.mjs       # ESLint configuration
├── load-context.ts         # Application context loader
├── package.json            # Dependencies and scripts
├── playwright.config.ts    # E2E testing configuration
├── react-router.config.ts  # Router configuration
├── setup.dom.vitest.ts     # Test DOM setup
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Build tool configuration
└── wrangler.toml           # Cloudflare deployment configuration
```

## Application Structure (`apps/`)

The `apps/` directory contains the main application code organized in a monorepo structure.

### Frontend Application (`apps/web/`)

```
apps/web/
├── public/                  # Static assets specific to web app
│   ├── favicon.ico         # Site favicon
│   ├── robots.txt          # Search engine directives
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── forms/         # Form components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature-specific components
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts     # Authentication hook
│   │   ├── useLocalStorage.ts
│   │   └── useApi.ts      # API interaction hook
│   ├── lib/               # Utility libraries
│   │   ├── utils.ts       # General utilities
│   │   ├── api.ts         # API client setup
│   │   ├── auth.ts        # Authentication utilities
│   │   └── validations.ts # Form validation schemas
│   ├── routes/            # React Router route definitions
│   │   ├── _layout.tsx    # Root layout
│   │   ├── _index.tsx     # Home page
│   │   ├── auth/          # Authentication routes
│   │   ├── dashboard/     # Dashboard routes
│   │   └── admin/         # Admin routes
│   ├── styles/            # CSS and styling
│   │   ├── globals.css    # Global styles
│   │   └── components.css # Component-specific styles
│   ├── types/             # TypeScript type definitions
│   │   ├── api.ts         # API response types
│   │   ├── user.ts        # User-related types
│   │   └── global.d.ts    # Global type declarations
│   ├── entry.client.tsx   # Client-side entry point
│   ├── entry.server.tsx   # Server-side entry point
│   └── root.tsx           # Root React component
├── .env.example           # Environment variables template
├── package.json           # Web app dependencies
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.ts     # TailwindCSS configuration
└── vite.config.ts         # Vite configuration for web app
```

### API Application (`apps/api/`)

```
apps/api/
├── src/
│   ├── routes/            # API route handlers
│   │   ├── auth/          # Authentication endpoints
│   │   ├── users/         # User management endpoints
│   │   ├── admin/         # Admin-only endpoints
│   │   └── health/        # Health check endpoints
│   ├── middleware/        # Express/Hono middleware
│   │   ├── auth.ts        # Authentication middleware
│   │   ├── cors.ts        # CORS middleware
│   │   ├── logger.ts      # Request logging
│   │   └── errorHandler.ts # Error handling
│   ├── services/          # Business logic services
│   │   ├── userService.ts # User operations
│   │   ├── authService.ts # Authentication logic
│   │   └── emailService.ts # Email sending
│   ├── lib/               # API utilities
│   │   ├── validation.ts  # Request validation
│   │   ├── responses.ts   # Standard API responses
│   │   └── constants.ts   # API constants
│   └── index.ts           # API entry point
├── package.json           # API dependencies
└── tsconfig.json          # TypeScript config for API
```

## Shared Packages (`packages/`)

Shared code organized as separate packages for reusability.

### UI Package (`packages/ui/`)

```
packages/ui/
├── src/
│   ├── components/        # Shared UI components
│   │   ├── Button.tsx     # Button component
│   │   ├── Input.tsx      # Input component
│   │   ├── Modal.tsx      # Modal component
│   │   └── index.ts       # Component exports
│   ├── hooks/             # Shared React hooks
│   ├── utils/             # UI utilities
│   └── styles/            # Shared styles
├── .storybook/            # Storybook configuration
├── stories/               # Component stories
├── package.json           # UI package dependencies
└── tsconfig.json          # TypeScript configuration
```

### Database Package (`packages/database/`)

```
packages/database/
├── src/
│   ├── schema/            # Database schema definitions
│   │   ├── users.ts       # User table schema
│   │   ├── posts.ts       # Posts table schema
│   │   └── index.ts       # Schema exports
│   ├── queries/           # Reusable database queries
│   │   ├── users.ts       # User queries
│   │   ├── posts.ts       # Post queries
│   │   └── index.ts       # Query exports
│   ├── migrations/        # Database migrations
│   ├── seeds/             # Database seed data
│   └── utils/             # Database utilities
├── drizzle.config.ts      # Drizzle configuration
├── package.json           # Database package dependencies
└── tsconfig.json          # TypeScript configuration
```

### Configuration Package (`packages/config/`)

```
packages/config/
├── src/
│   ├── eslint/            # Shared ESLint configurations
│   ├── typescript/        # Shared TypeScript configurations
│   ├── tailwind/          # Shared TailwindCSS configurations
│   └── vite/              # Shared Vite configurations
├── package.json           # Config package dependencies
└── tsconfig.json          # TypeScript configuration
```

## Cloudflare Functions (`functions/`)

```
functions/
├── api/                   # API endpoints as Cloudflare Functions
│   ├── auth/
│   │   ├── login.ts       # Login endpoint
│   │   ├── logout.ts      # Logout endpoint
│   │   └── refresh.ts     # Token refresh endpoint
│   ├── users/
│   │   ├── [id].ts        # User CRUD operations
│   │   └── index.ts       # User listing
│   └── _middleware.ts     # Function middleware
├── scheduled/             # Scheduled functions (cron jobs)
│   ├── cleanup.ts         # Data cleanup tasks
│   └── reports.ts         # Automated reporting
└── webhooks/              # Webhook handlers
    ├── stripe.ts          # Payment webhooks
    └── email.ts           # Email webhooks
```

## Testing Structure (`tests/` and `e2e/`)

### Unit and Integration Tests (`tests/`)

```
tests/
├── unit/                  # Unit tests
│   ├── components/        # Component tests
│   ├── hooks/             # Hook tests
│   ├── utils/             # Utility function tests
│   └── services/          # Service tests
├── integration/           # Integration tests
│   ├── api/               # API endpoint tests
│   └── database/          # Database operation tests
├── setup/                 # Test configuration
│   ├── test-utils.tsx     # Testing utilities
│   ├── msw-handlers.ts    # Mock Service Worker handlers
│   └── test-database.ts   # Test database setup
├── fixtures/              # Test data fixtures
├── mocks/                 # Mock implementations
└── __helpers__/           # Test helper functions
```

### End-to-End Tests (`e2e/`)

```
e2e/
├── auth.spec.ts           # Authentication flow tests
├── user-management.spec.ts # User CRUD tests
├── admin.spec.ts          # Admin functionality tests
├── performance.spec.ts    # Performance tests
├── accessibility.spec.ts  # A11y tests
├── fixtures/              # E2E test fixtures
├── page-objects/          # Page object models
│   ├── LoginPage.ts       # Login page interactions
│   ├── DashboardPage.ts   # Dashboard page interactions
│   └── UserPage.ts        # User page interactions
└── utils/                 # E2E test utilities
    ├── auth-setup.ts      # Authentication helpers
    └── data-setup.ts      # Test data setup
```

## Configuration Files

### Environment Configuration

```
.env.local              # Local development environment
.env.preview            # Preview environment variables
.env.production         # Production environment variables
.dev.vars.example       # Template for Cloudflare dev variables
```

### Build and Development Tools

| File                     | Purpose                              |
| ------------------------ | ------------------------------------ |
| `vite.config.ts`         | Main Vite configuration for frontend |
| `vitest.config.ts`       | Test runner configuration            |
| `playwright.config.ts`   | E2E testing configuration            |
| `drizzle.config.ts`      | Database ORM configuration           |
| `wrangler.toml`          | Cloudflare deployment settings       |
| `react-router.config.ts` | Router and framework configuration   |

### Code Quality and Standards

| File                | Purpose                         |
| ------------------- | ------------------------------- |
| `eslint.config.mjs` | Code linting rules              |
| `.prettierrc.json`  | Code formatting rules           |
| `tsconfig.json`     | TypeScript compiler settings    |
| `.gitignore`        | Version control ignore patterns |
| `.npmrc`            | NPM registry and configuration  |

### Component and UI Configuration

| File                 | Purpose                            |
| -------------------- | ---------------------------------- |
| `components.json`    | UI component library configuration |
| `tailwind.config.ts` | TailwindCSS customization          |
| `postcss.config.js`  | CSS post-processing                |

## Static Assets (`public/`)

```
public/
├── favicon.ico            # Website favicon
├── logo.svg               # Application logo
├── og-image.jpg           # Open Graph image for social sharing
├── robots.txt             # Search engine crawler instructions
├── sitemap.xml            # Website sitemap
├── manifest.json          # PWA manifest file
├── icons/                 # Application icons
│   ├── icon-192.png       # PWA icon (192x192)
│   ├── icon-512.png       # PWA icon (512x512)
│   └── apple-touch-icon.png # iOS home screen icon
├── images/                # Static images
│   ├── hero-bg.jpg        # Hero background
│   └── placeholders/      # Placeholder images
└── fonts/                 # Custom fonts (if any)
```

## GitHub Workflows (`.github/`)

```
.github/
├── workflows/             # GitHub Actions workflows
│   ├── ci.yml             # Continuous integration
│   ├── deploy.yml         # Deployment pipeline
│   ├── test.yml           # Test execution
│   ├── security.yml       # Security scanning
│   └── dependabot.yml     # Dependency updates
├── ISSUE_TEMPLATE/        # Issue templates
│   ├── bug_report.md      # Bug report template
│   └── feature_request.md # Feature request template
├── PULL_REQUEST_TEMPLATE.md # PR template
├── CODEOWNERS             # Code ownership rules
└── dependabot.yml         # Dependabot configuration
```

## Storybook Configuration (`.storybook/`)

```
.storybook/
├── main.ts               # Storybook main configuration
├── preview.ts            # Global story parameters
├── preview-head.html     # Additional head elements
└── theme.js              # Storybook theme customization
```

## Development Environment (`.vscode/`)

```
.vscode/
├── settings.json         # Workspace settings
├── extensions.json       # Recommended extensions
├── launch.json           # Debug configurations
└── tasks.json            # Task definitions
```

## File Naming Conventions

### React Components

- **PascalCase** for component files: `UserProfile.tsx`
- **camelCase** for utility files: `userUtils.ts`
- **kebab-case** for route files: `user-profile.tsx`

### Test Files

- **Component tests**: `ComponentName.test.tsx`
- **Utility tests**: `utilityName.test.ts`
- **E2E tests**: `feature-name.spec.ts`

### API Routes

- **REST endpoints**: `users.ts`, `auth.ts`
- **Dynamic routes**: `[id].ts`, `[...slug].ts`
- **Middleware**: `_middleware.ts`

### Database Files

- **Schema files**: `tableName.ts`
- **Migration files**: `0001_initial_schema.sql`
- **Seed files**: `seed-users.ts`

## Import/Export Patterns

### Barrel Exports

Use index files to create clean import paths:

```typescript
// packages/ui/src/components/index.ts
export { Button } from "./Button"
export { Input } from "./Input"
export { Modal } from "./Modal"

// Usage
import { Button, Input, Modal } from "@/components"
```

### Path Aliases

Configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components": ["./src/components"],
      "@/lib": ["./src/lib"],
      "@/types": ["./src/types"]
    }
  }
}
```

## Monorepo Management

### Package Dependencies

- **Internal packages**: Reference using workspace protocol
- **Shared dependencies**: Defined in root `package.json`
- **Package-specific**: Defined in individual `package.json` files

### Build Order

The build system respects package dependencies:

1. Shared packages (`packages/`)
2. API application (`apps/api/`)
3. Web application (`apps/web/`)
4. Functions (`functions/`)

## Security Considerations

### Sensitive Files

Never commit these files:

- `.env.local` - Local environment variables
- `.dev.vars` - Cloudflare development variables
- `*.key` - Private keys
- `*.pem` - Certificate files

### Environment Variables

- Use `.env.example` templates
- Store secrets in Cloudflare dashboard
- Validate environment variables at startup

## Performance Considerations

### Bundle Optimization

- **Code splitting**: Automatic with Vite and React Router
- **Tree shaking**: Enabled by default
- **Asset optimization**: Images and fonts optimized during build

### Caching Strategy

- **Static assets**: Long-term caching with hashed filenames
- **API responses**: Appropriate cache headers
- **Database queries**: Query optimization and indexing

This project structure is designed to scale from small projects to large applications while maintaining clear separation of concerns and excellent developer experience. 🏗️
