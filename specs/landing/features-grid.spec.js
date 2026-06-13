// TC-07 | UI | Bento grid has 6 feature cards
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');
const data = require('../../data/landing-content.json');

test.describe('Landing Page', () => {
  test('TC-07 | Features Grid | Should render 6 bento feature cards', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    await page.waitForSelector(landing.bentoGrid);
    const cardCount = await landing.getBentoItemCount();

    expect(cardCount).toBe(data.bentoGridCount);
  });
});
