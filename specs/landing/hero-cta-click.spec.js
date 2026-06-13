// TC-06 | Navigate | Hero CTA "Start Your First Sprint" navigates to signup.html
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');

test.describe('Landing Page', () => {
  test('TC-06 | Hero CTA Click | Should navigate to signup page', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    await landing.clickHeroCta();

    await page.waitForLoadState('domcontentloaded');

    expect(page.url()).toContain('signup');
  });
});
