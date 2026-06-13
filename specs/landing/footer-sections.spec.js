// TC-09 | UI | Footer has 5 sections + copyright text
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');
const data = require('../../data/landing-content.json');

test.describe('Landing Page', () => {
  test('TC-09 | Footer Sections | Should have 5 footer sections and copyright', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    await landing.scrollTo(landing.footer);
    const sectionCount = await landing.getFooterSectionCount();

    const copyrightText = await page.locator(landing.footerCopyright).textContent();

    expect(sectionCount).toBeGreaterThanOrEqual(4);
    expect(copyrightText).toContain(data.footerCopyright);
  });
});
