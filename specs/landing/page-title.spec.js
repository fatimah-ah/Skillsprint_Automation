// TC-01 | UI | Verifies the browser tab title on the landing page
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');
const data = require('../../data/landing-content.json');

test.describe('Landing Page', () => {
  test('TC-01 | Page Title | Should display correct browser tab title', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    const title = await landing.getTitle();

    expect(title).toBe(data.pageTitle);
  });
});
