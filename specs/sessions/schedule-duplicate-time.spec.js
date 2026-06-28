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

  test('TC-LS-12 | Cannot schedule two sessions at the same time — backend rejects second', async ({ loggedInPage: page }) => {
    const conflictTime = futureDateTimeLocal(4, 14, 0);

    // Schedule first
    await openSessionModal(page);
    await page.locator('#sessionNameInput').fill('[TEST] Conflict Session One');
    await page.locator('#sessionPurposeInput').fill('This one should go through');
    await page.locator('#sessionDateTimeInput').fill(conflictTime);
    await page.locator('#submitCreateLiveSession').click();
    const successToast = page.locator('.toast.success, .toast:has-text("Session scheduled!")').first();
    await expect(successToast).toBeVisible({ timeout: 8000 });

    // Schedule second at same time
    await openSessionModal(page);
    await page.locator('#sessionNameInput').fill('[TEST] Conflict Session Two');
    await page.locator('#sessionPurposeInput').fill('This should be blocked');
    await page.locator('#sessionDateTimeInput').fill(conflictTime);
    await page.locator('#submitCreateLiveSession').click();

    const errorToast = page.locator('.toast.error, .toast:has-text("already")').first();
    await expect(errorToast).toBeVisible({ timeout: 8000 });
    await expect(errorToast).toContainText(/already|conflict/i);
    await expect(page.locator('#createLiveSessionModal')).toHaveClass(/active/);
  });
});
