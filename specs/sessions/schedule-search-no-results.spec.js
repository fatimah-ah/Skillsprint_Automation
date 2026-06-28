const { test, expect } = require('../../fixtures/logged-in-user');
const { openSessionModal } = require('../../utils/wait-helpers');

test.describe('Live Session — Scheduling', () => {
  test('TC-LS-10 | User search returns no results for unknown name', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionInviteInput').fill('xyznonexistentuser999');
    await page.waitForTimeout(400); // debounce

    const resultsDropdown = page.locator('#userSearchResults');
    await expect(resultsDropdown).toBeVisible({ timeout: 5000 });
    await expect(resultsDropdown).toContainText('No users found');
  });
});
