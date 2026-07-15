import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Directory where tests are located
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Retry on failure in CI
  retries: 0,

  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['json', { outputFile: 'playwright-report.json' }],
  ],

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: !!process.env.CI,
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
        launchOptions: {
          slowMo: process.env.CI ? 0 : 500,
        },
      },
    },
  ],
});