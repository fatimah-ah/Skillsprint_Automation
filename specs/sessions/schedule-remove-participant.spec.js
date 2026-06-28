const { test, expect } = require('../../fixtures/logged-in-user');
const { getCredentials } = require('../../utils/data-reader');
const { deleteTestSessions } = require('../../utils/auth-helper');
const { openSessionModal } = require('../../utils/wait-helpers');
const { futureDateTimeLocal } = require('../../utils/date-helper');

test.describe('Live Session — Scheduling', () => {
  let credentials;

  test.beforeAll(async ({ request }) => {
    credentials = getCredentials();
    const loginRes = await request.post('/api/auth/login', {
      data: { email: credentials.validUser.email, password: credentials.validUser.password }
    });
    if (loginRes.ok()) {
      const { token } = await loginRes.json();
      await deleteTestSessions(request, token);
    }
  });

  test.afterEach(async ({ page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    if (token) {
      await deleteTestSessions(request, token);
    }
  });

  test('TC-LS-04 | Remove invited participant before submitting', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionNameInput').fill('[TEST] Quick Sync');
    await page.locator('#sessionPurposeInput').fill('Brief alignment meeting');
    await page.locator('#sessionDateTimeInput').fill(futureDateTimeLocal(1, 9, 0));

    await page.locator('#sessionInviteInput').fill('fareed');
    await page.waitForTimeout(400);

    await page.locator('#userSearchResults div').filter({ hasText: 'fareed ahmed' }).first().click();
    await expect(page.locator('#selectedUsersContainer')).toContainText('fareed ahmed');

    await page.locator('#selectedUsersContainer div').filter({ hasText: 'fareed ahmed' }).locator('i.fa-times').click();
    await expect(page.locator('#selectedUsersContainer')).not.toContainText('fareed ahmed');

    await page.locator('#submitCreateLiveSession').click();
    const successToast = page.locator('.toast.success, .toast:has-text("Session scheduled!")').first();
    await expect(successToast).toBeVisible({ timeout: 8000 });
  });
});
