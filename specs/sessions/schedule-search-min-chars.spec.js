const { test, expect } = require('../../fixtures/logged-in-user');
const { openSessionModal } = require('../../utils/wait-helpers');

test.describe('Live Session — Scheduling', () => {
  test('TC-LS-11 | Invite search does not trigger below 2 characters', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionInviteInput').fill('f');
    await page.waitForTimeout(400);

    await expect(page.locator('#userSearchResults')).toBeHidden();
  });
});
