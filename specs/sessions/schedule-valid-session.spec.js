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

  test('TC-LS-02 | Schedule a valid session with all fields — succeeds', async ({ loggedInPage: page }) => {
    await openSessionModal(page);

    await page.locator('#sessionNameInput').fill('[TEST] Playwright Automation Review');
    await page.locator('#sessionPurposeInput').fill('Review the test suite and fix failing cases');
    await page.locator('#sessionDurationInput').fill('45');
    await page.locator('#sessionDateTimeInput').fill(futureDateTimeLocal(2, 15, 30));

    await page.locator('#submitCreateLiveSession').click();

    const successToast = page.locator('.toast.success, .toast:has-text("Session scheduled!")').first();
    await expect(successToast).toBeVisible({ timeout: 8000 });
    await expect(page.locator('#createLiveSessionModal')).not.toHaveClass(/active/, { timeout: 5000 });
  });
});
