---
title: Development Workflow
description: Learn the development workflow and best practices for building with PageZero.
---

This guide covers the complete development workflow for PageZero projects, from initial setup to production deployment.

## Development Environment Setup

### Prerequisites Check

Before starting development, ensure you have:

```bash
# Check Node.js version (18+ required)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

### Project Initialization

```bash
# Clone and setup
git clone --depth 1 https://github.com/pagezero-dev/pagezero.git my-project
cd my-project
npm run setup
```

## Daily Development Workflow

### 1. Start Development Server

```bash
# Start the development server with hot reloading
npm run dev

# Your app will be available at http://localhost:3000
```

The development server includes:

- **Hot Module Replacement** for instant updates
- **TypeScript compilation** with error reporting
- **TailwindCSS** with JIT compilation
- **Database connection** to local SQLite

### 2. Code Quality Checks

Run quality checks frequently during development:

```bash
# Type checking
npm run test:types

# Linting
npm run lint

# Code formatting check
npm run format

# Run all checks at once
npm run doctor
```

### 3. Testing Workflow

#### Unit Testing with Vitest

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

#### E2E Testing with Playwright

```bash
# Run E2E tests in UI mode (recommended for development)
npm run test:e2e:ui

# Run E2E tests headlessly
npm run test:e2e

# Debug E2E tests
npm run test:e2e:debug
```

## Development Tools and Commands

### Essential NPM Scripts

| Command               | Purpose                      |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start development server     |
| `npm run build`       | Build for production         |
| `npm start`           | Run production build locally |
| `npm run setup`       | Initial project setup        |
| `npm run doctor`      | Run all quality checks       |
| `npm test`            | Unit tests in watch mode     |
| `npm run test:e2e:ui` | E2E tests with UI            |
| `npm run lint`        | ESLint check                 |
| `npm run format`      | Prettier formatting          |
| `npm run storybook`   | Start Storybook              |

### Database Development

#### Working with Drizzle ORM

```bash
# Generate database migrations
npm run db:generate

# Apply migrations to local database
npm run db:migrate

# Open database studio (if available)
npm run db:studio

# Seed database with sample data
npm run db:seed
```

#### Database Schema Changes

1. **Modify schema** in `src/db/schema.ts`
2. **Generate migration** with `npm run db:generate`
3. **Apply migration** with `npm run db:migrate`
4. **Update TypeScript types** (happens automatically)

### Component Development with Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

Storybook helps you:

- Develop components in isolation
- Test different component states
- Document component APIs
- Visual regression testing

## Project Structure

Understanding the PageZero project structure:

```
my-project/
├── apps/                     # Main application code
│   ├── web/                  # React frontend
│   │   ├── src/
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── routes/       # React Router routes
│   │   │   ├── lib/          # Utility functions
│   │   │   └── types/        # TypeScript type definitions
│   │   └── public/           # Static assets
│   └── api/                  # Backend API routes
├── packages/                 # Shared packages
│   ├── ui/                   # Shared UI components
│   ├── database/             # Database schema and utilities
│   └── config/               # Shared configuration
├── functions/                # Cloudflare Workers functions
├── e2e/                      # End-to-end tests
├── .storybook/               # Storybook configuration
└── .github/                  # GitHub Actions workflows
```

## Coding Standards and Best Practices

### TypeScript Guidelines

1. **Always use types** - Avoid `any` type
2. **Prefer interfaces** over type aliases for object shapes
3. **Use strict mode** - Already configured in `tsconfig.json`
4. **Export types** from dedicated type files

```typescript
// Good: Explicit typing
interface User {
  id: string
  email: string
  createdAt: Date
}

// Good: Generic constraints
function updateUser<T extends Partial<User>>(
  id: string,
  updates: T,
): Promise<User>

// Avoid: Any type
function processData(data: any): any
```

### React Best Practices

1. **Functional components** with hooks
2. **Custom hooks** for reusable logic
3. **Error boundaries** for error handling
4. **Lazy loading** for code splitting

```tsx
// Good: Custom hook
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false))
  }, [userId])

  return { user, loading }
}

// Good: Error boundary usage
function UserProfile({ userId }: { userId: string }) {
  return (
    <ErrorBoundary fallback={<UserError />}>
      <Suspense fallback={<UserSkeleton />}>
        <UserDetails userId={userId} />
      </Suspense>
    </ErrorBoundary>
  )
}
```

### CSS and Styling

1. **TailwindCSS** for utility-first styling
2. **Component-scoped** styles when needed
3. **Design tokens** for consistent theming
4. **Responsive design** mobile-first

```tsx
// Good: Tailwind utilities
function Button({ variant = "primary", children }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors"
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  )
}
```

## Debugging and Troubleshooting

### Common Development Issues

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache

# Restart TypeScript server in your IDE
# VS Code: Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

#### Build Issues

```bash
# Clear all caches and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

#### Database Issues

```bash
# Reset local database
rm -f local.db
npm run db:migrate

# Check database file permissions
ls -la *.db
```

### Development Tools

#### VS Code Extensions (Recommended)

- **TypeScript + React** - Built-in support
- **Tailwind CSS IntelliSense** - Class name completion
- **ESLint** - Real-time linting
- **Prettier** - Code formatting
- **Auto Rename Tag** - HTML/JSX tag editing

#### Browser DevTools

- **React Developer Tools** - Component inspection
- **Redux DevTools** - State management (if using Redux)
- **Lighthouse** - Performance auditing
- **Network tab** - API request debugging

## Git Workflow

### Branch Strategy

```bash
# Feature development
git checkout -b feature/user-authentication
# ... make changes ...
git commit -m "feat: add user authentication"
git push origin feature/user-authentication
# Create PR on GitHub
```

### Commit Convention

Use conventional commits for better changelog generation:

```bash
# Feature
git commit -m "feat: add user profile page"

# Bug fix
git commit -m "fix: resolve login redirect issue"

# Documentation
git commit -m "docs: update API documentation"

# Refactor
git commit -m "refactor: simplify user service"
```

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for large dependencies
npx webpack-bundle-analyzer dist/stats.json
```

### Performance Monitoring

1. **Lighthouse scores** - Aim for 90+ in all categories
2. **Core Web Vitals** - Monitor LCP, FID, CLS
3. **Bundle size** - Keep chunks under 250KB
4. **Database queries** - Optimize N+1 queries

## Next Steps

Once you're comfortable with the development workflow:

1. **[Database Management](/guides/database/)** - Learn advanced database patterns
2. **[Testing Guide](/guides/testing/)** - Comprehensive testing strategies
3. **[Deployment Setup](/guides/deployment/)** - Set up automated deployments
4. **[Reference Documentation](/reference/npm-scripts/)** - Detailed command reference

Happy coding! 🚀
