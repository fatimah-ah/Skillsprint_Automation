const { test, expect } = require('../../fixtures/logged-in-user');
const { openSessionModal } = require('../../utils/wait-helpers');

test.describe('Live Session — Scheduling', () => {
  test('TC-LS-05 | Close modal via X button — form resets', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionNameInput').fill('This should be cleared');
    await page.locator('#sessionPurposeInput').fill('Temp description');

    await page.locator('#closeLiveModal').click();
    await expect(page.locator('#createLiveSessionModal')).not.toHaveClass(/active/);

    await openSessionModal(page);
    await expect(page.locator('#sessionNameInput')).toHaveValue('');
    await expect(page.locator('#sessionPurposeInput')).toHaveValue('');
    await expect(page.locator('#sessionDurationInput')).toHaveValue('60');
  });
});
