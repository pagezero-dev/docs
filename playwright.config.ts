import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "dot" : "list",
  maxFailures: process.env.CI ? 5 : undefined,
  outputDir: "./.reports/e2e-tests-results",
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "e2e",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /.*smoke.spec.ts/,
    },
    {
      name: "smoke",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*smoke.spec.ts/,
    },
  ],

  ...(!process.env.TEST_PAGE_URL && {
    webServer: {
      command: process.env.CI ? "npm run start" : "npm run dev",
      url: "http://localhost:3000",
      reuseExistingServer: !process.env.CI,
    },
  }),
})
