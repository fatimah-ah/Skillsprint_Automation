// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './specs',
  timeout: 60000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  expect: {
    timeout: 10000
  },
  workers: process.env.CI ? 1 : 1,

  /* 1. Reporter Configuration Update */
  reporter: [
    ['list'],
    ['allure-playwright', { 
      outputFolder: 'allure-results', // Explicitly folder ka naam batayein
      detail: true,
      suiteTitle: true
    }]
  ],

  use: {
    baseURL: 'https://skillsprint-gdcfg9h6e4dxakcf.centralindia-01.azurewebsites.net',
    headless: true,
    
    screenshot: 'on', 
    
    trace: 'on', 
    
    video: 'on-first-retry',
    actionTimeout: 10000,
    navigationTimeout: 20000
  },

  globalSetup: './hooks/global-setup.js',
  globalTeardown: './hooks/global-teardown.js',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});