// TC-04 | UI | "Enter Workspace" button exists and is clickable
const { test, expect } = require('@playwright/test');
const LandingPage = require('../../pages/LandingPage');

test.describe('Landing Page', () => {
  test('TC-04 | Workspace Button | Should be present and enabled', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.open();

    const btn = page.locator(landing.enterWorkspaceBtn).first();
    const isVisible = await btn.isVisible();
    const isEnabled = await btn.isEnabled();

    expect(isVisible).toBe(true);
    expect(isEnabled).toBe(true);
  });
});
