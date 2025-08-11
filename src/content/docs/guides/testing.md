---
title: Testing Guide
description: Comprehensive testing strategies for PageZero applications including unit tests, integration tests, and end-to-end testing.
---

This guide covers the complete testing strategy for PageZero applications, from unit tests to end-to-end testing, ensuring your application is reliable and maintainable.

## Testing Philosophy

PageZero follows a comprehensive testing pyramid approach:

- **Unit Tests (70%)** - Fast, isolated tests for individual functions and components
- **Integration Tests (20%)** - Tests for component interactions and API endpoints
- **End-to-End Tests (10%)** - Full user journey testing through the browser

## Testing Stack

### Core Testing Tools

- **Vitest** - Fast unit test runner with TypeScript support
- **Testing Library** - React component testing utilities
- **Playwright** - End-to-end browser testing
- **MSW (Mock Service Worker)** - API mocking for tests

### Test Structure

```
tests/
├── unit/                 # Unit tests
│   ├── components/       # React component tests
│   ├── utils/           # Utility function tests
│   └── hooks/           # Custom hook tests
├── integration/         # Integration tests
│   ├── api/            # API endpoint tests
│   └── database/       # Database operation tests
├── e2e/                # End-to-end tests
│   ├── auth.spec.ts    # Authentication flows
│   ├── user.spec.ts    # User management
│   └── admin.spec.ts   # Admin functionality
└── setup/              # Test configuration
    ├── vitest.config.ts
    ├── test-utils.tsx
    └── msw-handlers.ts
```

## Unit Testing with Vitest

### Basic Test Setup

```typescript
// tests/setup/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
export { userEvent } from '@testing-library/user-event'
```

### Testing React Components

```typescript
// tests/unit/components/Button.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../setup/test-utils'
import { Button } from '../../../src/components/Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies variant styles correctly', () => {
    render(<Button variant="secondary">Secondary Button</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-gray-200')
  })

  it('is disabled when loading', () => {
    render(<Button loading>Loading Button</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument() // Loading spinner
  })
})
```

### Testing Custom Hooks

```typescript
// tests/unit/hooks/useUser.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUser } from '../../../src/hooks/useUser'
import { server } from '../../setup/msw-server'

// Mock API responses
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useUser Hook', () => {
  beforeEach(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    server.close()
  })

  it('fetches user data successfully', async () => {
    const { result } = renderHook(() => useUser('user-123'), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual({
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
    })
  })

  it('handles error states', async () => {
    // Configure MSW to return error
    server.use(
      rest.get('/api/users/:id', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: 'User not found' }))
      })
    )

    const { result } = renderHook(() => useUser('invalid-user'), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error?.message).toContain('User not found')
  })
})
```

### Testing Utility Functions

```typescript
// tests/unit/utils/validation.test.ts
import { describe, it, expect } from "vitest"
import {
  validateEmail,
  validatePassword,
  formatCurrency,
} from "../../../src/utils/validation"

describe("Validation Utils", () => {
  describe("validateEmail", () => {
    it("validates correct email addresses", () => {
      expect(validateEmail("user@example.com")).toBe(true)
      expect(validateEmail("test.email+tag@domain.co.uk")).toBe(true)
    })

    it("rejects invalid email addresses", () => {
      expect(validateEmail("invalid-email")).toBe(false)
      expect(validateEmail("user@")).toBe(false)
      expect(validateEmail("@domain.com")).toBe(false)
      expect(validateEmail("")).toBe(false)
    })
  })

  describe("validatePassword", () => {
    it("validates strong passwords", () => {
      const result = validatePassword("StrongP@ssw0rd!")
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it("identifies weak passwords", () => {
      const result = validatePassword("weak")
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain("Password must be at least 8 characters")
    })
  })

  describe("formatCurrency", () => {
    it("formats currency correctly", () => {
      expect(formatCurrency(1234.56, "USD")).toBe("$1,234.56")
      expect(formatCurrency(0, "EUR")).toBe("€0.00")
      expect(formatCurrency(999.9, "GBP")).toBe("£999.90")
    })
  })
})
```

## API Mocking with MSW

### MSW Setup

```typescript
// tests/setup/msw-handlers.ts
import { rest } from "msw"

export const handlers = [
  // User API endpoints
  rest.get("/api/users/:id", (req, res, ctx) => {
    const { id } = req.params

    return res(
      ctx.json({
        id,
        name: "John Doe",
        email: "john@example.com",
        createdAt: "2024-01-01T00:00:00Z",
      }),
    )
  }),

  rest.post("/api/users", async (req, res, ctx) => {
    const userData = await req.json()

    return res(
      ctx.status(201),
      ctx.json({
        id: "new-user-id",
        ...userData,
        createdAt: new Date().toISOString(),
      }),
    )
  }),

  // Authentication endpoints
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const { email, password } = await req.json()

    if (email === "admin@example.com" && password === "password") {
      return res(
        ctx.json({
          user: { id: "1", email, role: "admin" },
          token: "mock-jwt-token",
        }),
      )
    }

    return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }))
  }),

  // Error simulation
  rest.get("/api/error-endpoint", (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: "Internal server error" }))
  }),
]
```

```typescript
// tests/setup/msw-server.ts
import { setupServer } from "msw/node"
import { handlers } from "./msw-handlers"

export const server = setupServer(...handlers)
```

## Integration Testing

### API Route Testing

```typescript
// tests/integration/api/users.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { createTestDB, clearTestDB } from "../../setup/test-database"
import { userQueries } from "../../../src/db/queries"

describe("Users API", () => {
  beforeEach(async () => {
    await createTestDB()
  })

  afterEach(async () => {
    await clearTestDB()
  })

  describe("GET /api/users/:id", () => {
    it("returns user data for valid ID", async () => {
      // Setup test data
      const testUser = await userQueries.create({
        id: "test-user",
        email: "test@example.com",
        name: "Test User",
      })

      // Make request
      const response = await fetch(`/api/users/${testUser.id}`)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toMatchObject({
        id: testUser.id,
        email: testUser.email,
        name: testUser.name,
      })
      expect(data.password).toBeUndefined() // Sensitive data should be excluded
    })

    it("returns 404 for non-existent user", async () => {
      const response = await fetch("/api/users/non-existent")

      expect(response.status).toBe(404)
      expect(await response.json()).toEqual({
        error: "User not found",
      })
    })
  })

  describe("POST /api/users", () => {
    it("creates new user with valid data", async () => {
      const userData = {
        email: "new@example.com",
        name: "New User",
        password: "SecureP@ssw0rd!",
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      expect(response.status).toBe(201)

      const created = await response.json()
      expect(created).toMatchObject({
        email: userData.email,
        name: userData.name,
      })
      expect(created.id).toBeDefined()
      expect(created.password).toBeUndefined()
    })

    it("validates email uniqueness", async () => {
      // Create initial user
      await userQueries.create({
        id: "existing",
        email: "existing@example.com",
        name: "Existing User",
      })

      // Try to create duplicate
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "existing@example.com",
          name: "Duplicate User",
          password: "password",
        }),
      })

      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({
        error: "Email already exists",
      })
    })
  })
})
```

### Database Integration Tests

```typescript
// tests/integration/database/user-queries.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { createTestDB, clearTestDB } from "../../setup/test-database"
import { userQueries } from "../../../src/db/queries"

describe("User Database Queries", () => {
  beforeEach(async () => {
    await createTestDB()
  })

  afterEach(async () => {
    await clearTestDB()
  })

  it("creates and retrieves users", async () => {
    const userData = {
      id: "test-123",
      email: "test@example.com",
      name: "Test User",
    }

    const created = await userQueries.create(userData)
    expect(created).toMatchObject(userData)

    const retrieved = await userQueries.findById("test-123")
    expect(retrieved).toMatchObject(userData)
  })

  it("handles unique constraint violations", async () => {
    const userData = {
      id: "test-1",
      email: "duplicate@example.com",
      name: "First User",
    }

    await userQueries.create(userData)

    // Try to create user with same email
    await expect(
      userQueries.create({
        id: "test-2",
        email: "duplicate@example.com",
        name: "Second User",
      }),
    ).rejects.toThrow("UNIQUE constraint failed")
  })

  it("updates user data correctly", async () => {
    const user = await userQueries.create({
      id: "update-test",
      email: "original@example.com",
      name: "Original Name",
    })

    const updated = await userQueries.update(user.id, {
      name: "Updated Name",
    })

    expect(updated.name).toBe("Updated Name")
    expect(updated.email).toBe("original@example.com") // Unchanged
    expect(updated.updatedAt).not.toEqual(user.updatedAt)
  })
})
```

## End-to-End Testing with Playwright

### E2E Test Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

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
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
})
```

### Authentication E2E Tests

```typescript
// e2e/auth.spec.ts
import { test, expect } from "@playwright/test"

test.describe("Authentication Flow", () => {
  test("user can sign up, log in, and log out", async ({ page }) => {
    // Sign up flow
    await page.goto("/signup")

    await page.fill('[data-testid="email-input"]', "newuser@example.com")
    await page.fill('[data-testid="password-input"]', "SecureP@ssw0rd!")
    await page.fill('[data-testid="name-input"]', "New User")

    await page.click('[data-testid="signup-button"]')

    // Should redirect to dashboard after signup
    await expect(page).toHaveURL("/dashboard")
    await expect(page.locator('[data-testid="welcome-message"]')).toContainText(
      "Welcome, New User",
    )

    // Log out
    await page.click('[data-testid="user-menu"]')
    await page.click('[data-testid="logout-button"]')

    await expect(page).toHaveURL("/login")

    // Log back in
    await page.fill('[data-testid="email-input"]', "newuser@example.com")
    await page.fill('[data-testid="password-input"]', "SecureP@ssw0rd!")
    await page.click('[data-testid="login-button"]')

    await expect(page).toHaveURL("/dashboard")
  })

  test("shows validation errors for invalid inputs", async ({ page }) => {
    await page.goto("/signup")

    // Try to submit empty form
    await page.click('[data-testid="signup-button"]')

    await expect(page.locator('[data-testid="email-error"]')).toContainText(
      "Email is required",
    )
    await expect(page.locator('[data-testid="password-error"]')).toContainText(
      "Password is required",
    )

    // Try invalid email
    await page.fill('[data-testid="email-input"]', "invalid-email")
    await page.blur('[data-testid="email-input"]')

    await expect(page.locator('[data-testid="email-error"]')).toContainText(
      "Invalid email address",
    )

    // Try weak password
    await page.fill('[data-testid="password-input"]', "weak")
    await page.blur('[data-testid="password-input"]')

    await expect(page.locator('[data-testid="password-error"]')).toContainText(
      "Password must be at least 8 characters",
    )
  })

  test("handles login errors gracefully", async ({ page }) => {
    await page.goto("/login")

    await page.fill('[data-testid="email-input"]', "nonexistent@example.com")
    await page.fill('[data-testid="password-input"]', "wrongpassword")
    await page.click('[data-testid="login-button"]')

    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      "Invalid email or password",
    )
    await expect(page).toHaveURL("/login") // Should stay on login page
  })
})
```

### User Journey Tests

```typescript
// e2e/user-journey.spec.ts
import { test, expect } from "@playwright/test"

test.describe("User Management Journey", () => {
  test.beforeEach(async ({ page }) => {
    // Set up authenticated user
    await page.goto("/login")
    await page.fill('[data-testid="email-input"]', "admin@example.com")
    await page.fill('[data-testid="password-input"]', "adminpassword")
    await page.click('[data-testid="login-button"]')
    await expect(page).toHaveURL("/dashboard")
  })

  test("admin can create and manage users", async ({ page }) => {
    // Navigate to users page
    await page.click('[data-testid="users-nav"]')
    await expect(page).toHaveURL("/users")

    // Create new user
    await page.click('[data-testid="create-user-button"]')

    await page.fill('[data-testid="user-email"]', "newuser@example.com")
    await page.fill('[data-testid="user-name"]', "New Test User")
    await page.selectOption('[data-testid="user-role"]', "user")

    await page.click('[data-testid="save-user-button"]')

    // Verify user appears in list
    await expect(
      page
        .locator('[data-testid="user-row"]')
        .filter({ hasText: "newuser@example.com" }),
    ).toBeVisible()

    // Edit user
    await page.click('[data-testid="edit-user-button"]')
    await page.fill('[data-testid="user-name"]', "Updated User Name")
    await page.click('[data-testid="save-user-button"]')

    await expect(
      page
        .locator('[data-testid="user-row"]')
        .filter({ hasText: "Updated User Name" }),
    ).toBeVisible()

    // Delete user
    await page.click('[data-testid="delete-user-button"]')
    await page.click('[data-testid="confirm-delete"]')

    await expect(
      page
        .locator('[data-testid="user-row"]')
        .filter({ hasText: "newuser@example.com" }),
    ).not.toBeVisible()
  })

  test("user profile management", async ({ page }) => {
    await page.click('[data-testid="profile-nav"]')
    await expect(page).toHaveURL("/profile")

    // Update profile
    await page.fill('[data-testid="profile-name"]', "Updated Admin Name")
    await page.fill('[data-testid="profile-bio"]', "This is my updated bio")

    await page.click('[data-testid="save-profile-button"]')

    await expect(page.locator('[data-testid="success-message"]')).toContainText(
      "Profile updated successfully",
    )

    // Change password
    await page.click('[data-testid="change-password-tab"]')

    await page.fill('[data-testid="current-password"]', "adminpassword")
    await page.fill('[data-testid="new-password"]', "newadminpassword")
    await page.fill('[data-testid="confirm-password"]', "newadminpassword")

    await page.click('[data-testid="change-password-button"]')

    await expect(page.locator('[data-testid="success-message"]')).toContainText(
      "Password changed successfully",
    )
  })
})
```

### Performance and Accessibility Tests

```typescript
// e2e/performance.spec.ts
import { test, expect } from "@playwright/test"

test.describe("Performance and Accessibility", () => {
  test("page loads within acceptable time", async ({ page }) => {
    const startTime = Date.now()

    await page.goto("/")
    await page.waitForLoadState("networkidle")

    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(3000) // 3 seconds max
  })

  test("core web vitals are acceptable", async ({ page }) => {
    await page.goto("/")

    // Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lcpEntry = entries[entries.length - 1]
          resolve(lcpEntry.startTime)
        }).observe({ entryTypes: ["largest-contentful-paint"] })
      })
    })

    expect(lcp).toBeLessThan(2500) // 2.5 seconds for good LCP
  })

  test("accessibility compliance", async ({ page }) => {
    await page.goto("/")

    // Test keyboard navigation
    await page.keyboard.press("Tab")
    const focusedElement = await page.locator(":focus")
    await expect(focusedElement).toBeVisible()

    // Test color contrast and ARIA labels
    const buttons = page.locator("button")
    for (const button of await buttons.all()) {
      const ariaLabel = await button.getAttribute("aria-label")
      const text = await button.textContent()

      expect(ariaLabel || text).toBeTruthy() // Must have accessible name
    }
  })
})
```

## Test Database Setup

```typescript
// tests/setup/test-database.ts
import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import * as schema from "../../src/db/schema"

let testDb: ReturnType<typeof drizzle>

export async function createTestDB() {
  const sqlite = new Database(":memory:")
  testDb = drizzle(sqlite, { schema })

  // Apply migrations
  migrate(testDb, { migrationsFolder: "./migrations" })

  return testDb
}

export async function clearTestDB() {
  if (testDb) {
    // Clear all tables
    await testDb.delete(schema.users)
    await testDb.delete(schema.posts)
    // ... clear other tables
  }
}

export function getTestDB() {
  return testDb
}
```

## Running Tests

### Development Workflow

```bash
# Run all tests in watch mode
npm test

# Run specific test file
npm test -- user.test.ts

# Run tests with coverage
npm run test:coverage

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests headlessly
npm run test:e2e

# Run all tests (CI mode)
npm run test:ci
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Testing Best Practices

### 1. Write Tests First (TDD)

```typescript
// Write failing test first
test("should calculate total price with tax", () => {
  expect(calculateTotal(100, 0.1)).toBe(110)
})

// Then implement the function
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate)
}
```

### 2. Use Descriptive Test Names

```typescript
// ❌ Bad
test("user test", () => {
  /* ... */
})

// ✅ Good
test("should create user with valid email and password", () => {
  /* ... */
})
test("should reject user creation with duplicate email", () => {
  /* ... */
})
```

### 3. Follow AAA Pattern

```typescript
test("should update user profile", () => {
  // Arrange
  const user = createTestUser()
  const updates = { name: "New Name" }

  // Act
  const result = updateUserProfile(user.id, updates)

  // Assert
  expect(result.name).toBe("New Name")
})
```

### 4. Test Edge Cases

```typescript
describe("validateAge", () => {
  test("valid ages", () => {
    expect(validateAge(18)).toBe(true)
    expect(validateAge(65)).toBe(true)
  })

  test("edge cases", () => {
    expect(validateAge(0)).toBe(false)
    expect(validateAge(-1)).toBe(false)
    expect(validateAge(150)).toBe(false)
    expect(validateAge(NaN)).toBe(false)
  })
})
```

### 5. Mock External Dependencies

```typescript
// Mock API calls
vi.mock("../api/userService", () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: "1", name: "Test User" }),
  updateUser: vi.fn().mockResolvedValue({ success: true }),
}))
```

## Debugging Tests

### Debugging Unit Tests

```bash
# Run single test with debugging
npm test -- --reporter=verbose user.test.ts

# Debug in VS Code
# Add breakpoint and run "Debug Test" in VS Code
```

### Debugging E2E Tests

```bash
# Run with headed browser
npx playwright test --headed

# Debug mode with breakpoints
npx playwright test --debug

# Record new test
npx playwright codegen localhost:3000
```

### Test Troubleshooting

Common issues and solutions:

1. **Async test timeouts** - Increase timeout or fix async handling
2. **Flaky tests** - Add proper waits and assertions
3. **Mock issues** - Verify mock setup and reset between tests
4. **Database state** - Ensure proper cleanup between tests

Your comprehensive testing setup ensures your PageZero application is reliable, maintainable, and ready for production! 🧪

Next: Learn about [Performance Optimization](/guides/performance/) to make your tested application lightning fast.
