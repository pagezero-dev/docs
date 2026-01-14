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

## Unit Tests

Unit tests verify individual functions, components, and modules in isolation. They run fast and catch bugs early in development. Vitest is configured with two separate environments:

| Environment | File Pattern | Use Case |
|-------------|--------------|----------|
| Node | `*.test.ts` | Server-side logic, utilities, API handlers |
| DOM (happy-dom) | `*.test.tsx` | React components, hooks, client-side code |

Tests are co-located with their source files. Component tests use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for rendering and interacting with components.

## End-to-End Tests

End-to-end tests verify complete user flows by automating a real browser. They test the full application stack—frontend, backend, and database—ensuring everything works together correctly. E2E tests are located in the `e2e/` directory and use Playwright. Tests automatically start the development server when running locally.

## Smoke Tests

Smoke tests are lightweight checks that run against deployed environments to verify a deployment succeeded. They test critical paths like page loading and basic functionality. Smoke tests (`*.smoke.spec.ts`) are triggered automatically in CI after deployment.

Run them locally against a deployed environment:

```bash
TEST_PAGE_URL=https://your-app.pages.dev bun run test:smoke
```
