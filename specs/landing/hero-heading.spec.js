// TC-05 | UI | H1 hero heading contains expected text
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');
const data = require('../../data/landing-content.json');

test.describe('Landing Page', () => {
  test('TC-05 | Hero Heading | Should contain expected heading text', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    const headingText = await landing.getHeroHeadingText();

    expect(headingText).toContain(data.heroHeading);
  });
});
