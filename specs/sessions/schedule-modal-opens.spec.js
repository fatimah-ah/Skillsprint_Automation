const { test, expect } = require('../../fixtures/logged-in-user');
const { openSessionModal } = require('../../utils/wait-helpers');

test.describe('Live Session — Scheduling', () => {
  test('TC-LS-01 | Schedule session modal opens from bottom nav + button', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await expect(page.locator('#sessionNameInput')).toBeVisible();
    await expect(page.locator('#sessionPurposeInput')).toBeVisible();
    await expect(page.locator('#sessionDurationInput')).toHaveValue('60'); // default
    await expect(page.locator('#sessionDateTimeInput')).toBeVisible();
    await expect(page.locator('#sessionInviteInput')).toBeVisible();
    await expect(page.locator('#submitCreateLiveSession')).toBeVisible();
  });
});
