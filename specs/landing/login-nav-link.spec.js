// TC-08 | Navigate | Clicking navbar "Login" navigates to login.html
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');

test.describe('Landing Page', () => {
  test('TC-08 | Login Nav Link | Should navigate to login page', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    await landing.clickNavLogin();

    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('login');
  });
});
