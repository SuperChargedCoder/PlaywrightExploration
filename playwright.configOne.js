// @ts-check
const { defineConfig, devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  //testDir to tell where are your tests
  testDir: './tests',
  //Maximum time one test can run for 
  timeout: 30 * 1000,
  retries : 1,
  //Expect is for assertion
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  //Use is for defining common properties for test like what browser to use, screenshot, logs
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    trace: 'on',
    // browserName: "firefox",
    // headless: false,
    screenshot: 'on',
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    video: 'retain-on-failure',
  },

  projects: [
    {
      name : 'ChromeHeadless',
      use: {
        browserName: 'chromium',
        headless: true
      }
    },
    {
      name : 'WebkitHeaded',
      use: {
        browserName: 'webkit',
        headless: false,
        ...devices['Pixel 7']
      }
    },
    {
      name : 'ChromeHeaded',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1920, height: 1080 }
      }
    }
  ],

  /* Configure projects for major browsers 
  Running Test in multiple browser*/
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   {
  //     name: 'Mobile Chrome',
  //     use: { ...devices['Pixel 5'] },
  //   },
  //   {
  //     name: 'Mobile Safari',
  //     use: { ...devices['iPhone 12'] },
  //   },

  //   /* Test against branded browsers. */
  //   {
  //     name: 'Microsoft Edge',
  //     use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   },
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
  // ],

});

