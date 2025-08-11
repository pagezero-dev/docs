---
title: Configuration Files
description: Complete reference for all configuration files used in PageZero projects.
---

This reference covers all configuration files in PageZero projects, explaining their purpose, key settings, and customization options.

## Build and Development

### `vite.config.ts`

**Purpose**: Main build tool configuration for Vite

```typescript
import { defineConfig } from "vite"
import { reactRouter } from "@react-router/dev/vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  // React Router plugin for file-based routing
  plugins: [
    reactRouter(),
    tsconfigPaths(), // Enable path mapping from tsconfig.json
  ],

  // Development server configuration
  server: {
    port: 3000,
    host: true, // Expose to network
    open: true, // Open browser automatically
  },

  // Build configuration
  build: {
    target: "esnext",
    minify: "terser",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for better caching
          vendor: ["react", "react-dom"],
          router: ["@react-router/dom"],
        },
      },
    },
  },

  // Environment variables
  envPrefix: "VITE_",

  // Path resolution
  resolve: {
    alias: {
      "@": "/src",
    },
  },

  // CSS configuration
  css: {
    postcss: "./postcss.config.js",
  },
})
```

**Key Settings**:

- `plugins`: Vite plugins for React Router, TypeScript paths
- `server`: Development server options
- `build`: Production build optimization
- `resolve.alias`: Path aliases for cleaner imports

### `tsconfig.json`

**Purpose**: TypeScript compiler configuration

```json
{
  "compilerOptions": {
    // Target and module
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],

    // Module resolution
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    // JavaScript support
    "allowJs": true,
    "checkJs": false,

    // Strict type checking
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components": ["./src/components"],
      "@/lib": ["./src/lib"],
      "@/types": ["./src/types"]
    },

    // JSX configuration
    "jsx": "react-jsx",
    "jsxImportSource": "react",

    // Declaration files
    "skipLibCheck": true
  },

  // Include and exclude patterns
  "include": ["src/**/*", "tests/**/*", "e2e/**/*", "*.config.ts"],
  "exclude": ["node_modules", "dist", "build"]
}
```

**Key Features**:

- Strict type checking enabled
- Path mapping for clean imports
- React JSX support
- Modern ES modules

### `react-router.config.ts`

**Purpose**: React Router v7 configuration

```typescript
import type { Config } from "@react-router/dev/config"

export default {
  // App directory containing routes
  appDirectory: "src",

  // Build directory
  buildDirectory: "dist",

  // Server build path
  serverBuildFile: "server/index.js",

  // Asset build directory
  assetsBuildDirectory: "dist/assets",

  // Public path for assets
  publicPath: "/assets/",

  // Future flags for new features
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  },

  // Preload routes for better performance
  preloadRoutes: true,

  // Server configuration
  serverModuleFormat: "esm",

  // CSS handling
  cssModules: false,

  // Development options
  dev: {
    port: 3000,
  },
} satisfies Config
```

## Testing Configuration

### `vitest.config.ts`

**Purpose**: Unit test configuration with Vitest

```typescript
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  test: {
    // Test environment
    environment: "jsdom",

    // Setup files
    setupFiles: ["./tests/setup/vitest.setup.ts"],

    // Global test utilities
    globals: true,

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: ["node_modules/", "tests/", "e2e/", "**/*.config.*", "dist/"],
      thresholds: {
        global: {
          statements: 80,
          branches: 75,
          functions: 80,
          lines: 80,
        },
      },
    },

    // Test patterns
    include: ["tests/**/*.{test,spec}.{js,ts,tsx}"],
    exclude: ["e2e/**/*"],

    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
  },
})
```

### `playwright.config.ts`

**Purpose**: End-to-end test configuration

```typescript
import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  // Test directory
  testDir: "./e2e",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry configuration
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ["html"],
    ["json", { outputFile: "playwright-report/results.json" }],
    ["junit", { outputFile: "playwright-report/results.xml" }],
  ],

  // Global test configuration
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // Browser projects
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Development server
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

## Database Configuration

### `drizzle.config.ts`

**Purpose**: Database ORM configuration

```typescript
import type { Config } from "drizzle-kit"

export default {
  // Database connection
  dialect: "sqlite",
  driver: "d1-http",

  // Schema files
  schema: "./src/db/schema.ts",

  // Migration directory
  out: "./migrations",

  // Database credentials (for local development)
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:./local.db",
    authToken: process.env.DB_AUTH_TOKEN,
  },

  // Generation options
  verbose: true,
  strict: true,

  // Introspection options
  introspect: {
    casing: "camel",
  },

  // Migration options
  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
  },
} satisfies Config
```

## Styling Configuration

### `tailwind.config.ts`

**Purpose**: TailwindCSS configuration

```typescript
import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // Custom colors
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Custom border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Custom fonts
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      // Custom animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
} satisfies Config
```

### `postcss.config.js`

**Purpose**: CSS post-processing configuration

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
}
```

## Code Quality

### `eslint.config.mjs`

**Purpose**: ESLint configuration for code quality

```javascript
import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",

      // General rules
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
]
```

### `.prettierrc.json`

**Purpose**: Code formatting configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Deployment Configuration

### `wrangler.toml`

**Purpose**: Cloudflare deployment configuration

```toml
name = "my-pagezero-app"
main = "dist/server/index.js"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# Pages configuration
[build]
command = "npm run build"
cwd = "."

# Environment variables
[env.production.vars]
APP_ENV = "production"

[env.preview.vars]
APP_ENV = "preview"

# D1 Database bindings
[[d1_databases]]
binding = "DB"
database_name = "my-app-production"
database_id = "your-production-db-id"
migrations_dir = "migrations"

# R2 Storage bindings (optional)
[[r2_buckets]]
binding = "UPLOADS"
bucket_name = "my-app-uploads"

# KV Storage bindings (optional)
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"

# Analytics (optional)
[analytics]
engine = "cloudflare"

# Routes configuration
[[routes]]
pattern = "*"
zone_name = "your-domain.com"
custom_domain = true
```

## Component Configuration

### `components.json`

**Purpose**: UI component library configuration

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## Storybook Configuration

### `.storybook/main.ts`

**Purpose**: Storybook configuration

```typescript
import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  viteFinal: async (config) => {
    // Customize Vite config for Storybook
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "/src",
    }
    return config
  },
}

export default config
```

## Package Configuration

### `package.json`

**Purpose**: Project metadata and dependencies

```json
{
  "name": "my-pagezero-app",
  "version": "1.0.0",
  "description": "A PageZero application",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node dist/server/index.js",
    "setup": "npm install && npm run db:migrate && npx playwright install",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --check .",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-router/dom": "^7.0.0",
    "drizzle-orm": "^0.28.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "vitest": "^0.34.0",
    "@playwright/test": "^1.37.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Git Configuration

### `.gitignore`

**Purpose**: Version control ignore patterns

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.output/

# Environment variables
.env
.env.local
.env.production
.env.preview
.dev.vars

# Database
*.db
*.sqlite

# IDE
.vscode/settings.json
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
playwright-report/
test-results/

# Temporary files
*.tmp
*.temp
.cache/

# Logs
logs/
*.log

# Cloudflare
.wrangler/
```

## VS Code Configuration

### `.vscode/settings.json`

**Purpose**: VS Code workspace settings

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "emmet.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

### `.vscode/extensions.json`

**Purpose**: Recommended VS Code extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

## Configuration Best Practices

### 1. Environment-Specific Configs

Use different configurations for different environments:

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  return {
    // Development-specific settings
    server: isDev ? { port: 3000 } : undefined,
    // Production-specific settings
    build: !isDev ? { minify: "terser" } : undefined,
  }
})
```

### 2. Shared Configuration

Extract common settings to shared configs:

```typescript
// packages/config/vite.config.base.ts
export const baseConfig = {
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: { "@": "/src" },
  },
}
```

### 3. Type-Safe Configuration

Use TypeScript for configuration files when possible:

```typescript
// Use .ts extension and proper typing
import type { Config } from "tailwindcss"
export default {
  // Configuration with full TypeScript support
} satisfies Config
```

### 4. Documentation

Comment complex configuration options:

```typescript
export default defineConfig({
  // Enable React Fast Refresh for better DX
  plugins: [react()],

  // Optimize bundle splitting for better caching
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
})
```

This comprehensive configuration reference ensures your PageZero project is properly set up for development, testing, and deployment! ⚙️
