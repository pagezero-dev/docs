---
title: Testing
---

Comprehensive testing setup with **[Vitest](https://vitest.dev/)** for unit tests and **[Playwright](https://playwright.dev/)** for end-to-end tests. Both tools are pre-configured and ready to use out of the box.

**Key features**

- Unit tests for Node and DOM environments
- Component testing with React Testing Library
- End-to-end tests with Playwright
- Smoke tests for deployed environments
- Coverage reports

## Running Tests

```bash
bun run test              # Run all unit tests
bun run test:watch        # Run tests in watch mode
bun run test:coverage     # Run tests with coverage report
bun run test:e2e          # Run end-to-end tests
bun run test:e2e:ui       # Run e2e tests with interactive UI
bun run test:smoke        # Run smoke tests against deployed URL
```

### Unit Tests

Unit tests use Vitest with two separate environments:

| Environment | File Pattern | Use Case |
|-------------|--------------|----------|
| Node | `*.test.ts` | Server-side logic, utilities, API handlers |
| DOM (happy-dom) | `*.test.tsx` | React components, hooks, client-side code |

Tests are co-located with their source files.

### End-to-End Tests

E2E tests are located in the `e2e/` directory. Tests automatically start the development server when running locally.

### Smoke Tests

Smoke tests (`*.smoke.spec.ts`) run against deployed URLs to verify deployments succeeded. Run them locally against a deployed environment:

```bash
TEST_PAGE_URL=https://your-app.pages.dev bun run test:smoke
```
