const { test: base } = require('@playwright/test');
const path = require('path');
const fs = require('fs');



const AUTH_STATE_PATH = path.join(__dirname, 'auth-state.json');

/**
 * Custom fixture that provides an authenticated page context.
 * Uses storageState from auth-state.json generated during global setup.
 * Quiz, Task, and Dashboard tests use this to skip UI login.
 */
const test = base.extend({
  loggedInPage: async ({ browser }, use, testInfo) => {
    let storageState = undefined;
    if (fs.existsSync(AUTH_STATE_PATH)) {
      storageState = AUTH_STATE_PATH;
    }

    const context = await browser.newContext({ storageState });
    const page = await context.newPage();



    await use(page);

    // AfterEach: take screenshot on failure


    await context.close();
  }
});

module.exports = { test, expect: base.expect };
