// TC-03 | UI | Navbar contains Features, About, and Login links
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');
const data = require('../../data/landing-content.json');

test.describe('Landing Page', () => {
  test('TC-03 | Navbar Links | Should display Features, About, and Login links', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    const featuresVisible = await page.locator(landing.navFeaturesLink).isVisible();
    const aboutVisible    = await page.locator(landing.navAboutLink).isVisible();
    const loginVisible    = await page.locator(landing.navLoginLink).isVisible();

    expect(featuresVisible).toBe(true);
    expect(aboutVisible).toBe(true);
    expect(loginVisible).toBe(true);
  });
});
