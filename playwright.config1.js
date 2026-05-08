// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  retries : 1,
  workers : 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects : [
    {
      name : 'safari',
      use: {
        browserName: 'webkit',
        headless : false,
        screenshot: 'off',
        trace: 'retain-on-failure',
        //...devices['iPhone 13 Pro Max'],
           }
    },
    {
      name : 'chrome',
      use: {
        browserName: 'chromium',
        headless : false,
        screenshot: 'on',
        video : 'retain-on-failure',
        ignoreHTTPSErrors : true,
        permissions : ['geolocation'],
        trace: 'retain-on-failure',
        //viewport : {width: 720 , height : 720}
      }
    },
  ]

  /* Configure projects for major browsers */
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
}
module.exports = config;