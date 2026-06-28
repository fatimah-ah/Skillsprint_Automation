const { test, expect } = require('../../fixtures/logged-in-user');
const { openSessionModal } = require('../../utils/wait-helpers');

test.describe('Live Session — Scheduling', () => {
  test('TC-LS-09 | Submit with all three required fields empty — blocked', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#submitCreateLiveSession').click();

    await expect(page.locator('.toast').first()).toContainText(/fill required fields/i, { timeout: 5000 });
    await expect(page.locator('#createLiveSessionModal')).toHaveClass(/active/);
  });
});
