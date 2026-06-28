const { test, expect } = require('../../fixtures/logged-in-user');
const { openSessionModal } = require('../../utils/wait-helpers');

test.describe('Live Session — Scheduling', () => {
  test('TC-LS-08 | Submit with no date/time — blocked with toast', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionNameInput').fill('No DateTime Session');
    await page.locator('#sessionPurposeInput').fill('This has no schedule time');

    await page.locator('#submitCreateLiveSession').click();

    await expect(page.locator('.toast').first()).toContainText(/fill required fields/i, { timeout: 5000 });
    await expect(page.locator('#createLiveSessionModal')).toHaveClass(/active/);
  });
});
