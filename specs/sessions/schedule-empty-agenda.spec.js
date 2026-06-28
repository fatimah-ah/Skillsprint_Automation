const { test, expect } = require('../../fixtures/logged-in-user');
const { openSessionModal } = require('../../utils/wait-helpers');
const { futureDateTimeLocal } = require('../../utils/date-helper');

test.describe('Live Session — Scheduling', () => {
  test('TC-LS-07 | Submit with empty agenda/purpose — blocked with toast', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionNameInput').fill('No Purpose Session');
    await page.locator('#sessionDateTimeInput').fill(futureDateTimeLocal(1, 12, 0));

    await page.locator('#submitCreateLiveSession').click();

    await expect(page.locator('.toast').first()).toContainText(/fill required fields/i, { timeout: 5000 });
    await expect(page.locator('#createLiveSessionModal')).toHaveClass(/active/);
  });
});
