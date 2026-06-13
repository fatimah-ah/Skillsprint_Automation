// TC-10 | Navigate | "Enter Workspace" redirects to getstarted.html
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');

test.describe('Landing Page', () => {
  test('TC-10 | Enter Workspace Redirect | Should navigate to getstarted.html', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    await landing.clickEnterWorkspace();

    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('getstarted');
  });
});
