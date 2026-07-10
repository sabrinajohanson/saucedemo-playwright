import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Directory where tests are located
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Retry on failure in CI
  retries: 0,

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
        launchOptions: {
          slowMo: 500,
        },
      },
    },
  ],
});